"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
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

  // ========== 価格表示 ==========
  const USD_OVERRIDE: Record<number, number> = { 3300: 22.37, 3100: 21.02 };
  const JPY_TO_USD_RATE = 22.37 / 3300;
  const parseJPY = (v: unknown) =>
    Number(String(v ?? "").replace(/[^\d.-]/g, "")) || 0;
  const fmtPrice = (value: number | string) => {
    if (lang === "ja") {
      const n = typeof value === "number" ? value : parseJPY(value);
      return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
      }).format(n);
    } else {
      const n = parseJPY(value);
      const usd = USD_OVERRIDE[n] ?? n * JPY_TO_USD_RATE;
      return `$${usd.toFixed(2)}`;
    }
  };

  // ========== 商品データ（JSONは読み込むが画像は固定） ==========
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
        let data: any[] | null = null;
        for (const u of urls) {
          try {
            const r = await fetch(u, { cache: "no-store" });
            if (r.ok) {
              data = await r.json();
              break;
            }
          } catch {}
        }
        if (!data) throw new Error("no data");
        if (!cancelled) setItems(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled)
          setErr(tr("products.error", "商品データを読み込めませんでした。"));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  // ========== グループ分け ==========
  const isEctoin = (p: any) =>
    /エクトイン|ectoin/i.test(p?.name || "") ||
    String(p?.slug || "").includes("-e-");
  const { pure, ect } = useMemo(
    () => ({
      pure: items.filter((p) => !isEctoin(p)),
      ect: items.filter((p) => isEctoin(p)),
    }),
    [items]
  );

  // ========== ラベル ==========
  const title = tr("products.title", "商品ラインナップ");
  const seriesSilica = tr(
    "products.series.silica",
    "マザベジコンフィデンス【シリカのみ版】"
  );
  const seriesEctoin = tr(
    "products.series.ectoin",
    "マザベジコンフィデンス【エクトイン配合版】"
  );
  const descSilica = tr(
    "products.desc.silica",
    "成分 オーガニックシリカ純度97.1%以上"
  );
  const descEctoin = tr(
    "products.desc.ectoin",
    "保湿・抗炎症が期待できる天然アミノ酸エクトイン配合"
  );
  const priceLabel = tr(
    "products.labels.price",
    lang === "en" ? "Price (incl. tax)" : "価格(税込)"
  );
  const buyLabel = tr(
    "cta.buy",
    tr("products.labels.buy", lang === "en" ? "Buy now" : "ご購入はこちら")
  );

  // ========== 画像は固定 ==========
  const FIXED_IMAGE_SRC = "/mix1500.png"; // ← public/mix1500.png を配置

  // ========== カード ==========
  const Card = ({ p, priority = false }: { p: any; priority?: boolean }) => {
    const showOriginal =
      p?.originalprice != null &&
      String(p.originalprice) !== String(p.price);

    return (
      <article className="card">
        <div className="thumb">
          {/* fill を使わず width/height 指定（absolute にならない） */}
          <Image
            src={FIXED_IMAGE_SRC}
            alt={p?.name || "product"}
            width={520}     // だいたいの元画像サイズ／比率でOK
            height={390}
            sizes="(max-width: 1024px) 50vw, 260px"
            priority={priority}
            className="thumbImg"
          />
          <span className="shadowBase" />
        </div>

        <h4 className="name">{p?.name || ""}</h4>
        <p className="priceLabel">{priceLabel}</p>
        {showOriginal && (
          <p className="original">{fmtPrice(p.originalprice)}</p>
        )}
        <p className="price">{fmtPrice(p.price)}</p>

        <a
          className="btn"
          href={p?.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
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

          {/* --- シリカのみ --- */}
          {pure.length > 0 && (
            <>
              <h3 className="series">{seriesSilica}</h3>
              <hr className="rule" />
              <p className="desc">{descSilica}</p>
              <div className="grid grid3">
                {pure.map((p, i) => (
                  <Card key={p.slug || i} p={p} priority={i === 0} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* --- エクトイン配合 --- */}
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
        .is-visible { animation: fadeInUp .6s ease-out both; }
        @keyframes fadeInUp {
          from { opacity:0; transform: translate3d(0, 8px, 0); }
          to   { opacity:1; transform: translateZ(0); }
        }
        .inner { max-width:1080px; margin:0 auto; }
        .ja-serif { font-family:"Yu Mincho","Hiragino Mincho ProN","Noto Serif JP",serif; }

        .title { text-align:center; font-size:36px; letter-spacing:.14em; color:#444; font-weight:600; margin:6px 0; }
        .logo { display:flex; justify-content:center; margin:6px 0 28px; }

        .series { text-align:center; font-size:28px; letter-spacing:.08em; color:#3f3f3f; font-weight:700; margin:76px 0 8px; }
        .rule { max-width:860px; margin:0 auto 16px; border:none; height:1px; background:#bfbfbf; }
        .desc { text-align:center; color:#666; font-size:18px; line-height:1.9; letter-spacing:.06em; margin:0 0 18px; }
        .error { color:#c00; text-align:center; }

        /* ===== グリッド ===== */
        .grid { display:grid; gap:36px 18px; justify-content:center; margin:12px auto 48px; }
        .grid3 { grid-template-columns: repeat(3, minmax(240px, 1fr)); max-width:980px; }
        .grid4 { grid-template-columns: repeat(4, minmax(220px, 1fr)); max-width:1080px; }

        /* ===== カード ===== */
        .card { text-align:center; color:#3a3a3a; }

        .thumb{
          position: relative;         /* absoluteは使わない */
          width: 100%;
          aspect-ratio: 4 / 3;        /* 見せ枠（1:1や16:9にしてもOK） */
          margin: 0 auto 14px;
          background: #fff;
          border: 1px solid #eee;
          border-radius: 10px;
          box-shadow: 0 1px 2px rgba(0,0,0,.04);
          display: flex;
          justify-content: center;
          align-items: flex-end;      /* 画像を“下揃え”に */
          overflow: hidden;
          padding: 8px 8px 10px;
        }
        .thumbImg{
          max-width: 100%;
          height: auto;               /* intrinsic: 比率維持 */
          object-fit: contain;
          display: block;
        }
        .shadowBase{
          position:absolute;
          left:12%;
          right:12%;
          bottom:10px;
          height:10px;
          border-radius:9999px;
          background: radial-gradient(closest-side, rgba(0,0,0,.12), rgba(0,0,0,0));
          pointer-events:none;
          filter: blur(2px);
        }

        .name { margin:6px 0 10px; font-size:13px; line-height:1.5; letter-spacing:.02em; color:#444; }
        .priceLabel { margin:0; color:#666; font-size:12.5px; letter-spacing:.06em; }
        .original { margin:2px 0; font-size:12px; color:#888; text-decoration:line-through; }
        .price { margin:0 0 12px; font-size:16px; font-weight:700; letter-spacing:.06em; color:#2f2f2f; }

        .btn{
          display:inline-block;
          padding:10px 18px;
          border-radius:9999px;
          background:#ffd84d;
          color:#333;
          font-size:14px;
          letter-spacing:.06em;
          text-decoration:none;
          transition:transform .08s ease, filter .12s ease, box-shadow .12s ease;
          box-shadow: 0 2px 0 rgba(0,0,0,.08);
        }
        .btn:hover { filter:brightness(.98); transform:translateY(-1px); }
        .btn:active { transform:translateY(0); filter:brightness(.96); }

        /* ===== レスポンシブ ===== */
        @media (max-width:1024px) {
          .grid3 { grid-template-columns: repeat(2, minmax(240px, 1fr)); }
          .grid4 { grid-template-columns: repeat(2, minmax(220px, 1fr)); }
        }
        @media (max-width:640px) {
          .desc { font-size:14px; }
          .grid3, .grid4 { grid-template-columns: 1fr; gap:28px 24px; }
        }
      `}</style>
    </>
  );
}
