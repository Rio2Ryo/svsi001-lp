"use client";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "../lib/i18n";

/* ========= 元データ（日本語のままでOK） ========= */
const PRODUCTS = [
  {
    name: "【ミックスパック】\nマザベジコンフィデンスパウダー\n1,500mg",
    slug: "double-mvsi",
    description: "ミックスパックです。",
    originalprice: "3,300円",
    price: "3,300円",
    ItemPic: "/mix1500.png",
    wixProductId: "dcb1eb79-e65a-02df-a8f2-a80385c56e00",
    url: "https://www.dotpb.jp/product-page/double-mvsi"
  },
  {
    name: "【薬用スライドケース】\nマザベジコンフィデンスパウダー\n1,500mg",
    slug: "case-mvsi",
    description: "薬用スライドケ－スです。",
    originalprice: "3,300円",
    price: "3,300円",
    ItemPic: "/case1500.png",
    wixProductId: "7be06482-8fca-e20d-6a73-48bd3e914460",
    url: "https://www.dotpb.jp/product-page/case-mvsi"
  },
  {
    name: "【30本セット】\nマザベジコンフィデンスパウダー\n22,500mg",
    slug: "big-refill-mvsi",
    description: "30本セットです。",
    originalprice: "20,000円",
    price: "20,000円",
    ItemPic: "/30p22500.png",
    wixProductId: "fb6bbce6-a63f-b4d1-b817-da05d987e163",
    url: "https://www.dotpb.jp/product-page/big-refill-mvsi"
  },
  {
    name: "【ミックスパック】\nマザベジコンフィデンスパウダー\n2,000mg（エクトイン入り）",
    slug: "double-e-mvsi",
    description: "ミックスパック（エクトイン入り）です。",
    originalprice: "3,300円",
    price: "3,300円",
    ItemPic: "/mix2000.png",
    wixProductId: "7ba04481-0674-5262-9325-8d62f2d25095",
    url: "https://www.dotpb.jp/product-page/double-e-mvsi"
  },
  {
    name: "【薬用スライドケース】\nマザベジコンフィデンスパウダー\n2,000mg（エクトイン入り）",
    slug: "case-e-mvsi",
    description: "薬用スライドケ－ス（エクトイン入り）です。",
    originalprice: "3,300円",
    price: "3,300円",
    ItemPic: "/case2000.png",
    wixProductId: "48c2a407-4738-2f3f-e317-d118a4046e5c",
    url: "https://www.dotpb.jp/product-page/case-e-mvsi"
  },
  {
    name: "【10本セット】\nマザベジコンフィデンスパウダー\n10,000mg（エクトイン入り）",
    slug: "refill-e-mvsi",
    description: "10本セット（エクトイン入り）です。",
    originalprice: "12,000円",
    price: "12,000円",
    ItemPic: "/10p10000.png",
    wixProductId: "cc620bb2-fd77-8db3-4bf1-cff751f9e55d",
    url: "https://www.dotpb.jp/product-page/refill-e-mvsi"
  },
  {
    name: "【30本セット】\nマザベジコンフィデンスパウダー\n30,000mg（エクトイン入り）",
    slug: "big-refill-e-mvsi",
    description: "30本セット（エクトイン入り）です。",
    originalprice: "30,000円",
    price: "30,000円",
    ItemPic: "/30p30000.png",
    wixProductId: "c15bad90-8fff-b003-7792-2282202b6ccb",
    url: "https://www.dotpb.jp/product-page/big-refill-e-mvsi"
  }
];

/* ========= EN 表示名（slug -> 英語名） ========= */
const EN_NAME_BY_SLUG = {
  "double-mvsi": "[Mix Pack]\nMazavegi Confidence Powder\n1,500mg",
  "case-mvsi": "[Slide Case]\nMazavegi Confidence Powder\n1,500mg",
  "big-refill-mvsi": "[30 Pack]\nMazavegi Confidence Powder\n22,500mg",
  "double-e-mvsi": "[Mix Pack]\nMazavegi Confidence Powder\n2,000mg (with Ectoine)",
  "case-e-mvsi": "[Slide Case]\nMazavegi Confidence Powder\n2,000mg (with Ectoine)",
  "refill-e-mvsi": "[10 Pack]\nMazavegi Confidence Powder\n10,000mg (with Ectoine)",
  "big-refill-e-mvsi": "[30 Pack]\nMazavegi Confidence Powder\n30,000mg (with Ectoine)"
};

/* ========= 為替：円→ドル（3300円 => $22.19） ========= */
const USD_PER_JPY = Number(process.env.NEXT_PUBLIC_USD_PER_JPY) || 0.006724;

const fmtJPY = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  maximumFractionDigits: 0
});
const fmtUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
const parseJPY = (v) =>
  typeof v === "number" ? v : Number(String(v ?? "").replace(/[^\d]/g, "")) || 0;
const formatPrice = (raw, lang) => {
  const jpy = parseJPY(raw);
  return lang === "en" ? fmtUSD.format(jpy * USD_PER_JPY) : fmtJPY.format(jpy);
};

export default function ProductLineupSection() {
  const { t, lang } = useI18n();
  const tr = (k, fb = "") => t(k) ?? fb;

  /* ★ バグの原因修正：エクトイン判定は slug 基準に */
  const isEcto = (p) => String(p.slug || "").includes("-e-");

  const baseItems = PRODUCTS.filter((p) => !isEcto(p));
  const ectoItems = PRODUCTS.filter(isEcto);

  return (
    <section className="lineup">
      {/* ーー セクションヘッダー ーー */}
      <div className="lineup-head">
        <h2 className="lineup-label">{tr("lineup.header", "商品ラインナップ")}</h2>
        <div className="brand-lockup">
          <Image
            src="/MV_LOGO.png"
            alt={tr("lineup.alt.brand", "Mother Vegetables Confidence")}
            width={480}
            height={140}
            priority
          />
        </div>
      </div>

      {/* ── 素版 ── */}
      <h3 className="title">{tr("lineup.baseTitle", "マザベジコンフィデンス【シリカのみ版】")}</h3>
      <div className="divider" />
      <p className="note">{tr("lineup.note.base", "成分 オーガニックシリカ純度97.1%以上")}</p>
      <Row items={baseItems} tr={tr} lang={lang} />

      {/* ── エクトイン配合版 ── */}
      <h3 className="title">{tr("lineup.ectoTitle", "マザベジコンフィデンス【エクトイン配合版】")}</h3>
      <div className="divider" />
      <p className="note">
        {tr(
          "lineup.note.ecto",
          "成分 オーガニックシリカ純度97.1%以上\n保湿効果や炎症を抑える効果が期待できる／天然アミノ酸のエクトイン配合"
        )}
      </p>
      <Row items={ectoItems} tr={tr} lang={lang} />

      <style jsx>{`
        .lineup {
          max-width: 1320px;
          margin: 0 auto;
          padding: 40px 16px 72px;
          background: #fff;
        }
        .lineup-head { text-align: center; margin: 6px 0 40px; }
        .lineup-label {
          font-family: "ot-bunyu-mincho-stdn", serif;
          font-weight: 400;
          font-size: 40px;
          letter-spacing: 0.18em;
          color: #222;
          margin: 50px 0 18px;
        }
        .brand-lockup :global(img) {
          display: inline-block;
          filter: grayscale(100%) contrast(95%) opacity(0.9);
          width: auto; height: auto; max-width: 480px;
        }
        .title {
          text-align: center;
          font-size: 30px;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: #2b2b2b;
          margin: 44px 0 12px;
        }
        .divider {
          height: 1px;
          background: #dcdcdc;
          margin: 10px auto 14px;
          max-width: 1024px;
        }
        .note {
          text-align: center;
          color: #6d6d6d;
          font-size: 15px;
          letter-spacing: 0.06em;
          margin-bottom: 28px;
          white-space: pre-line; /* 改行表示 */
        }
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

/* ===== 商品行 ===== */
function Row({ items, tr, lang }) {
  return (
    <>
      <div className="row" role="list">
        {items.map((p) => {
          const displayName =
            lang === "en" ? EN_NAME_BY_SLUG[p.slug] || p.name : p.name;

          const price = formatPrice(p.price, lang);
          const original = p.originalprice ? formatPrice(p.originalprice, lang) : null;

          const internalHref = `/item/mvsi/${p.slug}`;

          return (
            <article key={p.slug} className="card" role="listitem">
              <div className="thumb">
                <Image
                  src={p.ItemPic}
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
               
                <span className="price">{price}</span>
              </div>

              <Link
                href={internalHref}
                className="cta"
                aria-label={`${displayName} ${tr("lineup.ctaAria", "を購入")}`}
              >
                {tr("lineup.cta", lang === "en" ? "Buy now" : "ご購入はこちら")}
              </Link>
            </article>
          );
        })}
      </div>

      <style jsx>{`
        .row {
          width: min(100%, 1280px);
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 24px;
        }
        .card { width: 280px; text-align: center; padding: 10px 12px 20px; }
        .thumb { position: relative; width: 280px; height: 200px; margin: 0 auto 12px; }
        .name {
          font-weight: 400;
          color: #333;
          line-height: 1.7;
          font-size: 15px;
          letter-spacing: 0.02em;
          white-space: pre-line; /* \n 改行 */
        }
        .pricewrap { margin-top: 10px; font-size: 16px; color: #666; }
        .original { display: block; text-decoration: line-through; color: #9ca3af; margin-top: 2px; }
        .price { display: block; font-size: 18px; color: #111; margin-top: 2px; font-weight: 700; }

        :global(.cta),
        :global(.cta:link),
        :global(.cta:visited) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 14px;
          padding: 7px 22px;
          border-radius: 30px;
          background: #ffe926;
          color: #000;
          text-decoration: none !important;
          font-weight: 500;
          letter-spacing: 0.06em;
          border: none;
          cursor: pointer;
          font-size: 14px;
        }
        

        @media (max-width: 1100px) {
          .row { width: 100%; gap: 20px; }
          .card { width: 240px; padding: 8px 10px 18px; }
          .thumb { width: 240px; height: 160px; margin-bottom: 10px; }
          .name { font-size: 15px; line-height: 1.6; }
          .pricewrap { font-size: 13px; }
          .price { font-size: 18px; }
          :global(.cta) { min-height: 44px; padding: 8px 18px; font-size: 13px; }
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
