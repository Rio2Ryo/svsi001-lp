"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useI18n } from "../lib/i18n";

export default function ProductSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  const { t, lang } = useI18n();
  const tr = (key) => {
    const v = t(key);
    return v && v !== key ? v : ""; // ← 未定義キーは空文字に
  };

  useEffect(() => setIsVisible(true), []);

  // ========== 価格フォーマッタ（特例: 3300円→$22.37 / 3100円→$21.02） ==========
  const USD_OVERRIDE = { 3300: 22.37, 3100: 21.02 };
  const JPY_TO_USD_RATE = 22.37 / 3300; // その他は同レートで換算
  const parseJPY = (v) => {
    if (typeof v === "number") return v;
    if (v == null) return 0;
    const num = String(v).replace(/[^\d.-]/g, ""); // "3,300円" -> "3300"
    return Number(num || 0);
  };
  const fmtPrice = (value, curLang) => {
    if (curLang === "ja") {
      if (typeof value === "string") return value; // 整形済ならそのまま
      const n = parseJPY(value);
      return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(n);
    } else {
      const n = parseJPY(value);
      const usd = USD_OVERRIDE[n] ?? n * JPY_TO_USD_RATE;
      return `$${usd.toFixed(2)}`;
    }
  };

  // ========== 商品JSON（言語別 or 単一）読み込み ==========
  // あなたのファイル名に合わせたベース名
  const BASENAME = "mvsi_products"; // public/mvsi_products.json がある
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setErr("");

        // 優先順にトライ:
        //   /mvsi_products.en.json → /mvsi_products.ja.json → /mvsi_products.json
        //   （最後に互換用 /products.xxx.json も試す）
        const urlCandidates = [
          `/${BASENAME}.${lang || "ja"}.json`,
          `/${BASENAME}.json`,
          `/products.${lang || "ja"}.json`,
          `/products.json`,
        ];

        let data = null, lastErr = null;
        for (const url of urlCandidates) {
          try {
            const res = await fetch(url, { cache: "no-store" });
            if (res.ok) {
              data = await res.json();
              break;
            } else {
              lastErr = `HTTP ${res.status} at ${url}`;
            }
          } catch (e) {
            lastErr = e?.message || String(e);
          }
        }
        if (!data) throw new Error(lastErr || "no data");

        if (!cancelled) setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Product load failed:", e);
        if (!cancelled) setErr(tr("products.error") || "商品データを読み込めませんでした。");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  // ========== グルーピング（エクトイン配合の判定） ==========
  const isEctoin = (p) =>
    /エクトイン|ectoin/i.test(p?.name || "") || (p?.slug || "").includes("-e-");
  const pure = items.filter((p) => !isEctoin(p)); // シリカのみ
  const ect  = items.filter((p) =>  isEctoin(p)); // エクトイン配合

  // ========== UIラベル（i18n） ==========
  const title        = tr("products.title") || "商品ラインナップ";
  const seriesSilica = tr("products.series.silica") || "マザベジコンフィデンス【シリカのみ版】";
  const seriesEctoin = tr("products.series.ectoin") || "マザベジコンフィデンス【エクトイン配合版】";
  const descSilica   = tr("products.desc.silica") || "成分 オーガニックシリカ 純度97.1%以上";
  const descEctoin   = tr("products.desc.ectoin") || "オーガニックシリカ97.1%以上＋エクトイン配合";
  const priceLabel   = tr("products.labels.price") || (lang === "en" ? "Price (incl. tax)" : "価格(税込)");
  const buyLabel     = tr("cta.buy") || tr("products.labels.buy") || (lang === "en" ? "Buy now" : "ご購入はこちら");

  // 細い罫線など
  const styles = { hr: { background: "#bfbfbf", height: 1, width: "100%" } };

  const Card = ({ p, priority = false }) => {
    const showOriginal =
      p.originalprice != null &&
      (typeof p.originalprice === "number"
        ? p.originalprice !== p.price
        : String(p.originalprice) !== String(p.price));
    return (
      <div className="product-card">
        <div className="product-img">
          <Image
            src={p.ItemPic || "/placeholder.png"}
            alt={p.name || "product"}
            fill
            sizes="(max-width: 1200px) 33vw, 270px"
            style={{ objectFit: "contain" }}
            priority={priority}
          />
        </div>
        <p className="product-name">{p.name}</p>
        <p className="product-price-label">{priceLabel}</p>
        {showOriginal && <p className="product-original">{fmtPrice(p.originalprice, lang)}</p>}
        <p className="product-price">{fmtPrice(p.price, lang)}</p>
        <a
          className="product-btn"
          href={p.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          {buyLabel}
        </a>
      </div>
    );
  };

  return (
    <>
      <section id="products" className={`products ${isVisible ? "is-visible" : ""}`}>
        <div className="container">
          <h2 className="products-title ja-serif">{title}</h2>
          <div className="products-logo">
            <Image src="/MV_LOGO.png" alt="Confidence" width={220} height={64} priority />
          </div>

          {err && <p style={{ color: "#c00", textAlign: "center" }}>{err}</p>}

          {/* シリカのみ */}
          {pure.length > 0 && (
            <>
              <h3 className="products-series">{seriesSilica}</h3>
              <div className="series-rule" style={styles.hr} />
              <p className="products-desc">{descSilica}</p>
              <div className="product-list three">
                {pure.map((p, i) => (
                  <Card key={p.slug || i} p={p} priority={i === 0} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* エクトイン配合 */}
        <div className="container">
          {ect.length > 0 && (
            <>
              <h3 className="products-series">{seriesEctoin}</h3>
              <div className="series-rule" style={styles.hr} />
              <p className="products-desc">{descEctoin}</p>
              <div className="product-list four">
                {ect.map((p, i) => (
                  <Card key={p.slug || `e-${i}`} p={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <style jsx>{`
        .products { background: #ffffff; color: #3a3a3a; padding: 36px 16px 84px; }
        .is-visible { animation: fadeInUp 0.7s ease-out both; }
        @keyframes fadeInUp { from { opacity: 0; transform: translate3d(0, 8px, 0); } to { opacity: 1; transform: translateZ(0); } }

        .container { max-width: 1080px; margin: 0 auto; }
        .ja-serif { font-family: "Yu Mincho","Hiragino Mincho ProN","Noto Serif JP","Hiragino Kaku Gothic ProN",serif; }

        .products-title { text-align: center; font-size: 36px; letter-spacing: 0.14em; color: #444; font-weight: 600; margin: 6px 0 6px; }
        .products-logo { display: flex; justify-content: center; margin: 2px 0 28px; }
        .products-series { text-align: center; font-size: 28px; letter-spacing: 0.08em; color: #3f3f3f; font-weight: 700; margin: 80px 0 6px; }
        .series-rule { max-width: 860px; margin: 0 auto 16px; }
        .products-desc { text-align: center; color: #666; font-size: 18.5px; line-height: 1.9; letter-spacing: 0.06em; margin: 0 0 18px; }

        .product-list { display: grid; gap: 36px 17px; justify-content: center; margin: 10px auto 48px; }
        .product-list.three { grid-template-columns: repeat(3, minmax(240px, 1fr)); max-width: 980px; }
        .product-list.four  { grid-template-columns: repeat(4, minmax(220px, 1fr)); max-width: 1080px; }

        .product-card { text-align: center; color: #3a3a3a; }
        
        .product-img {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1; /* 高さを固定せず、正方形の比率を維持 */
          margin: 0 auto 12px; /* 下の余白を少し調整 */
          background: #fff;
        }
        
        /* ▼▼▼ Next.jsがimgに直接スタイルを当てるため、この指定は不要で効かないため削除 ▼▼▼ */
        /*
        .product-img img {
          width: 100%!important;
          position:relative!important;
        }
        */
        /* ▲▲▲ ここまで修正 ▲▲▲ */

        .product-name { margin: 6px 0 10px; font-size: 13px; line-height: 1.5; letter-spacing: 0.02em; color: #444; }
        .product-price-label { margin: 0; color: #666; font-size: 12.5px; letter-spacing: 0.06em; }
        .product-original { margin: 2px 0; font-size: 12px; color: #888; text-decoration: line-through; }
        .product-price { margin: 0 0 12px; font-size: 16px; font-weight: 700; letter-spacing: 0.06em; color: #2f2f2f; }

        .product-btn {
          display: inline-block; padding: 10px 18px; border-radius: 9999px;
          background: #ffd84d; color: #333; font-size: 14px; letter-spacing: 0.06em;
          text-decoration: none; transition: transform 0.08s ease, filter 0.12s ease;
        }
        .product-btn:hover { filter: brightness(0.98); transform: translateY(-1px); }
        .product-btn:active { transform: translateY(0); filter: brightness(0.96); }

        @media (max-width: 1024px) {
          .product-list.three { grid-template-columns: repeat(2, minmax(240px, 1fr)); }
          .product-list.four  { grid-template-columns: repeat(2, minmax(220px, 1fr)); }
        }
        @media (max-width: 640px) {
          .series-rule { max-width: 100%; }
          .products-desc { font-size: 14px; }
          .product-list.three, .product-list.four { grid-template-columns: 1fr; gap: 28px 24px; }
        }
      `}</style>
    </>
  );
}