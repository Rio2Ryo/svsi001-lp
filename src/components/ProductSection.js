"use client";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "../lib/i18n"; // i18nフック

/* 既存のPRODUCTSはそのまま（price は "3,300円" などの文字列でもOK） */
const PRODUCTS = [/* ...省略（そのまま）... */];

/* ▼ 為替レート設定
   3300 JPY -> 22.19 USD に合わせた係数（0.006724）。環境変数化も可。 */
const USD_PER_JPY =
  Number(process.env.NEXT_PUBLIC_USD_PER_JPY) || 0.006724;

/* ▼ フォーマッタ／パーサ */
const fmtJPY = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  maximumFractionDigits: 0,
});
const fmtUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const parseJPY = (v) =>
  typeof v === "number" ? v : Number(String(v ?? "").replace(/[^\d]/g, ""));
const displayPrice = (v, lang) => {
  const jpy = parseJPY(v);
  return lang === "en" ? fmtUSD.format(jpy * USD_PER_JPY) : fmtJPY.format(jpy);
};

export default function ProductLineupSection() {
  const { t, lang } = useI18n();
  const tr = (k, fb = "") => t(k) ?? fb;

  const isEcto = (p) => p.name.includes("エクトイン");
  const baseItems = PRODUCTS.filter((p) => !isEcto(p));
  const ectoItems = PRODUCTS.filter(isEcto);

  return (
    <section className="lineup">
      {/* セクションヘッダー */}
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

      {/* 素版 */}
      <h3 className="title">{tr("lineup.baseTitle", "マザベジコンフィデンス【シリカのみ版】")}</h3>
      <div className="divider" />
      <p className="note">{tr("lineup.note.base", "成分 オーガニックシリカ純度97.1%以上")}</p>
      <Row items={baseItems} tr={tr} lang={lang} />

      {/* エクトイン配合版 */}
      <h3 className="title">{tr("lineup.ectoTitle", "マザベジコンフィデンス【エクトイン配合版】")}</h3>
      <div className="divider" />
      <p className="note">
        {tr(
          "lineup.note.ecto",
          "成分 オーガニックシリカ純度97.1%以上\n＋\n保湿効果や炎症を抑える効果が期待できる\n天然アミノ酸のエクトイン配合"
        )}
      </p>
      <Row items={ectoItems} tr={tr} lang={lang} />

      <style jsx>{`
        .lineup { max-width: 1320px; margin: 0 auto; padding: 40px 16px 72px; background: #fff; }
        .lineup-head { text-align: center; margin: 6px 0 40px; }
        .lineup-label { font-family: "ot-bunyu-mincho-stdn", serif; font-weight: 400; font-size: 40px; letter-spacing: .18em; color: #222; margin: 50px 0 18px; }
        .brand-lockup :global(img){ display:inline-block; filter:grayscale(100%) contrast(95%) opacity(.9); max-width:480px; }
        .title { text-align:center; font-size:30px; font-weight:500; letter-spacing:.12em; color:#2b2b2b; margin:44px 0 12px; }
        .divider { height:1px; background:#dcdcdc; margin:10px auto 14px; max-width:1024px; }
        .note { text-align:center; color:#6d6d6d; font-size:15px; letter-spacing:.06em; margin-bottom:28px; white-space:pre-line; }
      `}</style>
    </section>
  );
}

function Row({ items, tr, lang }) {
  return (
    <>
      <div className="row" role="list">
        {items.map((p) => {
          const internalHref = `/item/mvsi/${p.slug}`;
          const price = displayPrice(p.price, lang);
          const original = p.originalprice ? displayPrice(p.originalprice, lang) : null;

          return (
            <article key={p.slug} className="card" role="listitem">
              <div className="thumb">
                <Image
                  src={p.ItemPic}
                  alt={p.name}
                  fill
                  sizes="(max-width: 1100px) 240px, 280px"
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>

              <h3 className="name">{p.name}</h3>

              <div className="pricewrap">
                <span className="priceLabel">
                  {tr("lineup.priceLabel", lang === "en" ? "Price (tax incl.)" : "価格(税込)")}
                </span>
                {original && <span className="original">{original}</span>}
                <span className="price">{price}</span>
              </div>

              <Link href={internalHref} className="cta" aria-label={`${p.name} ${tr("lineup.ctaAria","を購入")}`}>
                {tr("lineup.cta", lang === "en" ? "Buy now" : "ご購入はこちら")}
              </Link>
            </article>
          );
        })}
      </div>

      <style jsx>{`
        .row { width:min(100%,1280px); margin:0 auto; display:flex; flex-wrap:wrap; justify-content:center; gap:24px; }
        .card { width:280px; text-align:center; padding:10px 12px 20px; }
        .thumb { position:relative; width:280px; height:200px; margin:0 auto 12px; }
        .name { font-weight:400; color:#333; line-height:1.7; font-size:15px; letter-spacing:.02em; white-space:pre-line; }
        .pricewrap { margin-top:10px; font-size:16px; color:#666; }
        .original { display:block; text-decoration:line-through; color:#9ca3af; margin-top:2px; }
        .price { display:block; font-size:18px; color:#111; margin-top:2px; font-weight:700; }
        :global(.cta), :global(.cta:link), :global(.cta:visited) { display:inline-flex; align-items:center; justify-content:center; min-height:48px; margin-top:14px; padding:10px 22px; border-radius:30px; background:#ffe926; color:#000; text-decoration:none!important; font-weight:500; letter-spacing:.06em; border:none; cursor:pointer; font-size:14px; }
      `}</style>
    </>
  );
}
