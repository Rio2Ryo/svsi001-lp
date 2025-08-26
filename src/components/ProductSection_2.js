"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useI18n } from "@/lib/i18n";

/* ========== フォールバック（無い時だけ） ========== */
const PRODUCTS = [
  { name: "【ミックスパック】\nマザベジコンフィデンスパウダー\n1,500mg", slug: "double-mvsi", ItemPic: "/mix1500.png", price: "3,300円" },
  { name: "【薬用スライドケース】\nマザベジコンフィデンスパウダー\n1,500mg", slug: "case-mvsi", ItemPic: "/case1500.png", price: "3,300円" },
  { name: "【30本セット】\nマザベジコンフィデンスパウダー\n22,500mg", slug: "big-refill-mvsi", ItemPic: "/30p22500.png", price: "20,000円" },
  { name: "【ミックスパック】\nマザベジコンフィデンスパウダー\n2,000mg（エクトイン入り）", slug: "double-e-mvsi", ItemPic: "/mix2000.png", price: "3,300円" },
  { name: "【薬用スライドケース】\nマザベジコンフィデンスパウダー\n2,000mg（エクトイン入り）", slug: "case-e-mvsi", ItemPic: "/case2000.png", price: "3,300円" },
  { name: "【10本セット】\nマザベジコンフィデンスパウダー\n10,000mg（エクトイン入り）", slug: "refill-e-mvsi", ItemPic: "/10p10000.png", price: "12,000円" },
  { name: "【30本セット】\nマザベジコンフィデンスパウダー\n30,000mg（エクトイン入り）", slug: "big-refill-e-mvsi", ItemPic: "/30p30000.png", price: "30,000円" }
];

/* baseSlug（末尾IDを除いたキー）→ 英名フォールバック */
const EN_NAME_BY_BASESLUG = {
  "double":       "[Mix Pack] Mazavegi Confidence Powder 1,500mg",
  "case":         "[Slide Case] Mazavegi Confidence Powder 1,500mg",
  "big-refill":   "[30 Pack] Mazavegi Confidence Powder 22,500mg",
  "double-e":     "[Mix Pack] Mazavegi Confidence Powder 2,000mg (with Ectoine)",
  "case-e":       "[Slide Case] Mazavegi Confidence Powder 2,000mg (with Ectoine)",
  "refill-e":     "[10 Pack] Mazavegi Confidence Powder 10,000mg (with Ectoine)",
  "big-refill-e": "[30 Pack] Mazavegi Confidence Powder 30,000mg (with Ectoine)"
};

/* ========== 価格（円→USD） ========== */
const USD_PER_JPY = Number(process.env.NEXT_PUBLIC_USD_PER_JPY) || 0.006724; // 3,300 → $22.19
const fmtJPY = new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 });
const fmtUSD = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const parseJPY = (v) => (typeof v === "number" ? v : Number(String(v ?? "").replace(/[^\d]/g, "")) || 0);
const formatPrice = (raw, lang) => {
  const jpy = parseJPY(raw);
  return lang === "en" ? fmtUSD.format(jpy * USD_PER_JPY) : fmtJPY.format(jpy);
};

/* 末尾IDを落とす（" - 1111" などを非表示） */
const stripId = (s = "") => s.replace(/\s*-\s*\d+\s*$/, "");

/* baseSlug を得る（"double-1111" → "double"） */
const baseKey = (slug = "") => slug.replace(/-[^-]+$/, "");

/* ★ 3行化ヘルパー：先頭の［カテゴリ］・本体・容量(mg) を抽出して\n区切りで返す */
function intoThreeLinesName(raw, lang) {
  const s = stripId(raw || "");

  // 1) 先頭カテゴリ（【...】 or [...]）
  let prefix = "";
  let rest = s;
  const mCat = s.match(/^\s*(?:【([^】]+)】|\[([^\]]+)\])\s*/);
  if (mCat) {
    prefix = (mCat[1] || mCat[2] || "").trim();
    rest = s.slice(mCat[0].length).trim();
  }

  // 2) 容量（～mg + 付随語尾）
  //   例）"1,500mg" / "2,000mg（エクトイン入り）" / "10,000mg (with Ectoine)"
  const mDose = rest.match(/([0-9,]+mg(?:（エクトイン入り）|\s*\(with\s+Ectoine\))?)/i);
  let dose = "";
  if (mDose) {
    dose = mDose[1].trim();
    rest = (rest.slice(0, mDose.index) + rest.slice(mDose.index + mDose[1].length)).trim();
  }

  // 3) 本体名の整形（不要なダッシュや余分スペース除去）
  rest = rest.replace(/\s*[-–—]\s*$/, "").replace(/\s{2,}/g, " ").replace(/^[:：]/, "").trim();

  // 4) 行を構成
  const line1 = prefix ? (lang === "en" ? `[${prefix}]` : `【${prefix}】`) : ""; // 元の括弧系で
  const lines = [];
  if (line1) lines.push(line1);
  lines.push(rest);
  if (dose) lines.push(dose);

  // 5) 3行未満の補助（保険）
  if (lines.length < 3) {
    const mSplit = rest.match(/^(.*?(?:パウダー|Confidence\s+Powder))(.*)$/i);
    if (mSplit && mSplit[2].trim()) {
      // 2行目を2分割して合計3行に
      lines.splice(1, 1, mSplit[1].trim(), mSplit[2].trim());
    }
  }

  return lines.filter(Boolean).join("\n");
}

export default function ProductLineupSection() {
  const router = useRouter();
  const { t, lang } = useI18n();
  const tr = (k, fb = "") => t(k) ?? fb;

  const rawId = router.query?.itemId;
  const itemId = Array.isArray(rawId) ? rawId[0] : rawId;

  const [jsonItems, setJsonItems] = useState(null);

  useEffect(() => {
    if (!itemId) return;
    let ignore = false;
    (async () => {
      try {
        const path = `/${itemId}_products.json`;
        const res = await fetch(path, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load ${path}`);
        const data = await res.json();
        if (!ignore) setJsonItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        if (!ignore) setJsonItems([]);
      }
    })();
    return () => { ignore = true; };
  }, [itemId]);

  /* ====== JSON とフォールバックのマージ ====== */
  const itemsForDisplay = useMemo(() => {
    if (!jsonItems || !Array.isArray(jsonItems) || jsonItems.length === 0) {
      return PRODUCTS;
    }
    const fbByBase = new Map(PRODUCTS.map(p => [baseKey(p.slug), p]));
    return jsonItems.map(j => {
      const fb = fbByBase.get(baseKey(j.slug)) || {};
      return {
        ...fb,
        ...j,
        ItemPic: j.ItemPic || fb.ItemPic,
        price: j.price || fb.price,
        originalprice: j.originalprice || fb.originalprice,
        name: j.name || fb.name,
        name_en: j.name_en || fb.name_en
      };
    });
  }, [jsonItems]);

  const isEcto = (p) => String(p.slug || "").includes("-e-");
  const baseItems = itemsForDisplay.filter((p) => !isEcto(p));
  const ectoItems = itemsForDisplay.filter(isEcto);

  return (
    <section className="lineup">
      {/* ── 上部ヘッダー ── */}
      <div className="lineup-head">
        <h2 className="lineup-label">{tr("lineup.header", "商品ラインナップ")}</h2>
        <div className="brand-lockup">
          <Image
            src="/MV_LOGO.png"
            alt={tr("lineup.alt.brand", "Mother Vegetables Confidence")}
            width={250}
            height={110}
            priority
          />
        </div>
      </div>

      {/* ── 素版 ── */}
      <h3 className="title">{tr("lineup.baseTitle", "マザベジコンフィデンス【シリカのみ版】")}</h3>
      <div className="divider" />
      <p className="note">{tr("lineup.note.base", "成分 オーガニックシリカ純度97.1%以上")}</p>
      <Row items={baseItems} itemId={itemId} tr={tr} lang={lang} />

      {/* ── エクトイン配合版 ── */}
      <h3 className="title">{tr("lineup.ectoTitle", "マザベジコンフィデンス【エクトイン配合版】")}</h3>
      <div className="divider" />
      <p className="note">
        {tr("lineup.note.ecto", "成分 オーガニックシリカ純度97.1%以上\n保湿効果や炎症を抑える効果が期待できる／天然アミノ酸のエクトイン配合")}
      </p>
      <Row items={ectoItems} itemId={itemId} tr={tr} lang={lang} />

      <style jsx>{`
        .lineup { max-width: 1320px; margin: 0 auto; padding: 40px 16px 72px; background: #fff; }
        .lineup-head { text-align: center; margin: 6px 0 40px; }
        .lineup-label { font-family: "ot-bunyu-mincho-stdn", serif; font-size: 40px; font-weight: 400; letter-spacing: 0.18em; color: #222; margin: 50px 0 18px; }
        .brand-lockup :global(img) { display: inline-block; filter: grayscale(100%) contrast(95%) opacity(0.9); max-width: 480px; }

        .title { text-align: center; font-size: 30px; font-weight: 500; letter-spacing: 0.12em; color: #2b2b2b; margin: 44px 0 12px; }
        .divider { height: 1px; background: #dcdcdc; margin: 10px auto 14px; max-width: 1024px; }
        .note { text-align: center; color: #6d6d6d; font-size: 15px; letter-spacing: 0.06em; margin-bottom: 28px; white-space: pre-line; }

        @media (max-width: 1100px) {
          .brand-lockup :global(img) { max-width: 360px; }
          .title { font-size: 28px; }
          .divider { max-width: 92vw; }
          .note { font-size: 14px; }
        }
        @media (max-width: 560px) {
          .lineup-label { font-size: 26px; }
          .brand-lockup :global(img) { max-width: 280px; }
          .title { font-size: 21px; line-height: 1.6; margin: 32px 0 8px; }
          .note { font-size: 12px; }
        }
      `}</style>
    </section>
  );
}

function Row({ items, itemId, tr, lang }) {
  return (
    <>
      <div className="row" role="list">
        {items.map((p) => {
          const href = itemId ? `/item/${itemId}/${p.slug}` : "#";
          const base = baseKey(p.slug);

          // 1) 言語別の素の名前（ID付き/無しのまま）
          const rawName =
            lang === "en"
              ? (p.name_en || EN_NAME_BY_BASESLUG[base] || p.name)
              : (p.name || EN_NAME_BY_BASESLUG[base] || "");

          // 2) 3行に整形（カテゴリ / 本体 / 容量）、IDは内部で除去
          const displayName = intoThreeLinesName(rawName, lang);

          // 3) 価格
          const price = formatPrice(p.price, lang);
          const original = p.originalprice ? formatPrice(p.originalprice, lang) : null;

          return (
            <article key={p.slug} className="card" role="listitem">
              <div className="thumb">
                <Image
                  src={p.ItemPic || "/noimage.png"}
                  alt={displayName}
                  fill
                  sizes="(max-width: 1100px) 240px, 280px"
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
              <h3 className="name">{displayName}</h3>
              <div className="pricewrap">
                <span className="priceLabel">
                  {tr("lineup.priceLabel", lang === "en" ? "Price (tax incl.)" : "価格(税込)")}
                </span>
                {original && <span className="original">{original}</span>}
                <span className="price">{price}</span>
              </div>
              <Link href={href} aria-label={`${displayName} ${tr("lineup.ctaAria","を購入")}`}>
                <button type="button" className="btn">
                  {tr("lineup.cta", lang === "en" ? "Buy now" : "ご購入はこちら")}
                </button>
              </Link>
            </article>
          );
        })}
      </div>

      <style jsx>{`
        .row { width: min(100%, 1280px); margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: center; gap: 24px; }
        .card { width: 280px; text-align: center; padding: 10px 12px 20px; }
        .thumb { position: relative; width: 280px; height: 200px; margin: 0 auto 12px; }
        .name { font-weight: 400; color: #333; line-height: 1.7; font-size: 15px; letter-spacing: 0.02em; white-space: pre-line; } /* ← 改行反映 */
        .pricewrap { margin-top: 10px; font-size: 16px; color: #666; }
        .original { display: block; text-decoration: line-through; color: #9ca3af; margin-top: 2px; }
        .price { display: block; font-size: 18px; color: #111; margin-top: 2px; font-weight: 700; }
        .btn {
          display: inline-block; margin-top: 14px; padding: 7px 22px; border-radius: 30px;
          background: #ffe926; color: #000; font-weight: 500; letter-spacing: 0.06em; border: none; cursor: pointer;
          transition: transform .02s ease, opacity .2s ease; font-size: 14px;
        }
        @media (max-width: 1100px) {
          .row { width: 100%; gap: 20px; }
          .card { width: 240px; padding: 8px 10px 18px; }
          .thumb { width: 240px; height: 160px; margin-bottom: 10px; }
          .name { font-size: 15px; line-height: 1.6; }
          .pricewrap { font-size: 13px; }
          .price { font-size: 18px; }
          .btn { min-height: 44px; padding: 8px 18px; font-size: 13px; }
        }
        @media (max-width: 560px) {
          .row { width: 100%; gap: 16px; }
          .card { width: 100%; max-width: 360px; }
          .thumb { width: 100%; max-width: 360px; height: 180px; }
          .name { font-size: 14px; }
          .price { font-size: 17px; }
        }
      `}</style>
    </>
  );
}
