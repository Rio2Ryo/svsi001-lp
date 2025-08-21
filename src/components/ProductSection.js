"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";           // ← ロゴだけで使用
import { useI18n } from "../lib/i18n";

export default function ProductSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  const { t, lang } = useI18n();
  const tr = (k, fallback = "") => {
    const v = t(k);
    return v && v !== k ? v : fallback;
  };

  useEffect(() => setIsVisible(true), []);

  // ===== 価格表示 =====
  const USD_OVERRIDE = { 3300: 22.37, 3100: 21.02 };
  const JPY_TO_USD_RATE = 22.37 / 3300;
  const parseJPY = (v) => Number(String(v ?? "").replace(/[^\d.-]/g, "")) || 0;
  const fmtPrice = (value) => {
    if (lang === "ja") {
      const n = typeof value === "number" ? value : parseJPY(value);
      return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(n);
    } else {
      const n = parseJPY(value);
      const usd = USD_OVERRIDE[n] ?? n * JPY_TO_USD_RATE;
      return `$${usd.toFixed(2)}`;
    }
  };

  // ===== 商品データ（画像は固定で使う） =====
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setErr("");
        const base = "mvsi_products";
        const urls = [
          `/${base}.${lang || "ja"}.json`,
          `/${base}.json`,
          `/products.${lang || "ja"}.json`,
          `/products.json`,
        ];
        let data = null;
        for (const u of urls) {
          try {
            const r = await fetch(u, { cache: "no-store" });
            if (r.ok) { data = await r.json(); break; }
          } catch {}
        }
        if (!data) throw new Error("no data");
        if (!cancelled) setItems(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setErr(tr("products.error", "商品データを読み込めませんでした。"));
      }
    })();
    return () => { cancelled = true; };
  }, [lang]);

  // ===== グループ分け =====
  const isEctoin = (p) =>
    /エクトイン|ectoin/i.test(p?.name || "") || String(p?.slug || "").includes("-e-");
  const { pure, ect } = useMemo(
    () => ({ pure: items.filter((p) => !isEctoin(p)), ect: items.filter((p) => isEctoin(p)) }),
    [items]
  );

  // ===== ラベル =====
  const title = tr("products.title", "商品ラインナップ");
  const seriesSilica = tr("products.series.silica", "マザベジコンフィデンス【シリカのみ版】");
  const seriesEctoin = tr("products.series.ectoin", "マザベジコンフィデンス【エクトイン配合版】");
  const descSilica = tr("products.desc.silica", "成分 オーガニックシリカ 純度97.1%以上");
  const descEctoin = tr("products.desc.ectoin", "保湿・抗炎症が期待できる天然アミノ酸エクトイン配合");
  const priceLabel = tr("products.labels.price", lang === "en" ? "Price (incl. tax)" : "価格(税込)");
  const buyLabel = tr("cta.buy", tr("products.labels.buy", lang === "en" ? "Buy now" : "ご購入はこちら"));

  // ===== 画像は固定（absolute なし） =====
  const FIXED_IMAGE_SRC = "/mix1500.png"; // public/mix1500.png を配置

  // ===== カード =====
  const Card = ({ p }) => {
    const showOriginal = p?.originalprice != null && String(p.originalprice) !== String(p.price);
    return (
      <article className="card">
        <div className="thumb">
          {/* Next/Imageを使わず素の<img>で枠に完全フィット */}
          <img
            src={FIXED_IMAGE_SRC}
            alt={p?.name || "product"}
            loading="lazy"
            className="thumbImg"
          />
        </div>

        <h4 className="name">{p?.name || ""}</h4>
        <p className="priceLabel">{priceLabel}</p>
        {showOriginal ? (
          <p className="original">{fmtPrice(p.originalprice)}</p>
        ) : (
          <p className="original placeholder"> </p>
        )}
        <p className="price">{fmtPrice(p.price)}</p>

        <a className="btn" href={p?.url || "#"} target="_blank" rel="noopener noreferrer">
          {buyLabel}
        </a>
      </article>
    );
  };

  return (
    <>
      <section id="products" className={`wrap ${isVisible ? "is-visible" : ""}`}>
        <div className="inner">
          <h2 className="title ja-serif">{title}</h2>
          <div className="logo">
            <Image src="/MV_LOGO.png" alt="Confidence" width={220} height={64} priority />
          </div>

          {err && <p className="error">{err}</p>}

          {/* シリカのみ */}
          {pure.length > 0 && (
            <>
              <h3 className="series">{seriesSilica}</h3>
              <hr className="rule" />
              <p className="desc">{descSilica}</p>
              <div className="grid grid3">
                {pure.map((p, i) => (
                  <Card key={p.slug || i} p={p} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* エクトイン配合 */}
        <div className="inner">
          {ect.length > 0 && (
            <>
              <h3 className="series">{seriesEctoin}</h3>
              <hr className="rule" />
              <p className="desc">{descEctoin}</p>
              <div className="grid grid4">
                {ect.map((p, i) => (
                  <Card key={p.slug || `e-${i}`} p={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <style jsx>{`
        /* ===== ベース ===== */
        .wrap { background:#fff; color:#3a3a3a; padding:36px 16px 84px; }
        .is-visible { animation: fadeInUp .4s ease-out both; }
        @keyframes fadeInUp { from { opacity:0; transform: translate3d(0,8px,0); } to { opacity:1; transform: translateZ(0); } }
        .inner { max-width:1080px; margin:0 auto; }
        .ja-serif { font-family:"Yu Mincho","Hiragino Mincho ProN","Noto Serif JP",serif; }
        .title { text-align:center; font-size:36px; letter-spacing:.14em; color:#444; font-weight:600; margin:6px 0; }
        .logo  { display:flex; justify-content:center; margin:6px 0 28px; }

        .series { text-align:center; font-size:28px; letter-spacing:.08em; color:#3f3f3f; font-weight:700; margin:76px 0 8px; }
        .rule   { max-width:860px; margin:0 auto 16px; border:none; height:1px; background:#bfbfbf; }
        .desc   { text-align:center; color:#666; font-size:18px; line-height:1.9; letter-spacing:.06em; margin:0 0 18px; }
        .error  { color:#c00; text-align:center; }

        /* ===== グリッド ===== */
        .grid { display:grid; gap:36px 18px; justify-content:center; margin:12px auto 48px; }
        .grid3 { grid-template-columns: repeat(3, minmax(240px, 1fr)); max-width:980px; }
        .grid4 { grid-template-columns: repeat(4, minmax(220px, 1fr)); max-width:1080px; }

        /* ===== カード（高さを揃える） ===== */
        .card{
          display:flex;
          flex-direction:column;
          height:100%;
          text-align:center;
          color:#3a3a3a;
        }

        /* 画像枠：固定高さ（絶対配置なし） */
        .thumb{
          width:100%;
          height:300px;               /* ← これで全カード同じ高さ */
          margin:0 auto 12px;
          background:#fff;
          border:1px solid #eee;
          border-radius:10px;
          box-shadow:0 1px 2px rgba(0,0,0,.04);
          overflow:hidden;
        }
        /* 画像：等倍内フィット＋下揃え（ズレない） */
        .thumbImg{
          width:100%;
          height:100%;
          object-fit:contain;
          object-position:center bottom;
          display:block;
        }

        /* テキストのライン高さも固定して“段差”防止 */
        .name        { margin:6px 0 8px; font-size:13px; line-height:1.5; letter-spacing:.02em; color:#444; min-height:3.0em; }
        .priceLabel  { margin:0; color:#666; font-size:12.5px; letter-spacing:.06em; }
        .original    { margin:2px 0; font-size:12px; color:#888; text-decoration:line-through; min-height:1.2em; }
        .original.placeholder { text-decoration:none; color:transparent; }
        .price       { margin:0 0 12px; font-size:16px; font-weight:700; letter-spacing:.06em; color:#2f2f2f; min-height:1.4em; }

        .btn{
          margin-top:auto;
          align-self:center;
          display:inline-block;
          padding:10px 18px;
          border-radius:9999px;
          background:#ffd84d;
          color:#333;
          font-size:14px;
          letter-spacing:.06em;
          text-decoration:none;
          transition:transform .08s ease, filter .12s ease, box-shadow .12s ease;
          box-shadow:0 2px 0 rgba(0,0,0,.08);
        }
        .btn:hover { filter:brightness(.98); transform:translateY(-1px); }
        .btn:active{ transform:translateY(0); filter:brightness(.96); }

        @media (max-width:1024px){
          .grid3 { grid-template-columns: repeat(2, minmax(240px, 1fr)); }
          .grid4 { grid-template-columns: repeat(2, minmax(220px, 1fr)); }
          .thumb { height:260px; }
        }
        @media (max-width:640px){
          .desc { font-size:14px; }
          .grid3, .grid4 { grid-template-columns:1fr; gap:28px 24px; }
          .thumb { height:220px; }
        }
      `}</style>
    </>
  );
}
