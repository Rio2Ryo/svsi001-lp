"use client";
import { useEffect, useMemo, useState, memo } from "react";
import Link from "next/link";
import Image from "next/image";

/* 金額フォーマット */
function formatJPY(n) {
  const digits = String(n ?? "").replace(/[^\d.]/g, "");
  if (!digits) return n ?? "";
  try { return new Intl.NumberFormat("ja-JP").format(Number(digits)); }
  catch { return digits; }
}

/* 商品名 → 厳密に3行へ（1:【…】 2:本文 3:数値mg（＋（…）可）） */
function splitNameTo3(raw = "") {
  let name = String(raw).replace(/\s+/g, " ").trim();

  const headMatch = name.match(/【[^】]+】/);
  const l1 = headMatch ? headMatch[0].trim() : "";
  name = headMatch ? name.replace(headMatch[0], "").trim() : name;

  const mgMatch = name.match(/([0-9,]+mg(?:（[^）]*）)?)/i);
  const l3 = mgMatch ? mgMatch[1].trim() : "";
  name = mgMatch ? name.replace(mgMatch[1], "").trim() : name;

  let l2 = name.replace(/^[\-—・]/, "").replace(/[\-—・]$/, "").trim();

  const lines = [l1, l2, l3].filter(Boolean);
  if (lines.length === 3) return [l1, l2, l3];
  if (lines.length === 2) {
    const s = lines[1]; const cut = Math.ceil(s.length / 2);
    return [lines[0], s.slice(0, cut), s.slice(cut)];
  }
  if (lines.length === 1) {
    const s = lines[0]; const c1 = Math.ceil(s.length / 3);
    const c2 = Math.ceil((s.length - c1) / 2) + c1;
    return [s.slice(0, c1), s.slice(c1, c2), s.slice(c2)];
  }
  return ["", "", ""];
}

/* ------- 汎用カード ------- */
const ProductCard = memo(function ProductCard({
  imgSrc,
  imgAlt,
  name,
  price,
  originalprice,
  note,
  href,
}) {
  const isExternal = href?.startsWith("http");
  const nameLines = splitNameTo3(name);

  return (
    <div className="product-card">
      <div className="product-img">
        {/* fillを使わず、枠固定＋containで必ず収まる */}
        <Image
          src={imgSrc || "/placeholder.png"}
          alt={imgAlt || ""}
          width={800}
          height={600}
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        />
      </div>

      <p className="product-name">
        <span>{nameLines[0]}</span>
        <span>{nameLines[1]}</span>
        <span>{nameLines[2]}</span>
      </p>

      <p className="product-price-label">価格(税込)</p>
      <p className="product-price">
        {typeof price === "number" ? `${formatJPY(price)}円` : price}
      </p>
      {originalprice && <p className="product-note">通常：{originalprice}</p>}
      {note && <p className="product-note">{note}</p>}

      {href ? (
        isExternal ? (
          <a className="product-btn" href={href} target="_blank" rel="noopener noreferrer">ご購入はこちら</a>
        ) : (
          <Link href={href} legacyBehavior>
            <a className="product-btn">ご購入はこちら</a>
          </Link>
        )
      ) : (
        <button className="product-btn" type="button" disabled>ご購入はこちら</button>
      )}
    </div>
  );
});

/* ================== 本体 ================== */
export default function ProductSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => setIsVisible(true), []);

  // /public/mvsi_products.json を読む
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/mvsi_products.json", { cache: "no-store" });
        if (!res.ok) throw new Error("mvsi_products.json の取得に失敗");
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setItems([]);
      }
    })();
  }, []);

  // グルーピングと表示順
  const ectoinPredicate = (p) =>
    (p?.slug || "").includes("-e-") || (p?.name || "").includes("エクトイン");
  const orderSilica = ["double-mvsi", "case-mvsi", "big-refill-mvsi"];
  const orderEctoin = ["double-e-mvsi", "case-e-mvsi", "refill-e-mvsi", "big-refill-e-mvsi"];
  const byOrder = (order) => (a, b) =>
    (order.indexOf(a.slug) === -1 ? 999 : order.indexOf(a.slug)) -
    (order.indexOf(b.slug) === -1 ? 999 : order.indexOf(b.slug));

  const silicaOnly = useMemo(
    () => items.filter((p) => !ectoinPredicate(p)).sort(byOrder(orderSilica)),
    [items]
  );
  const ectoin = useMemo(
    () => items.filter(ectoinPredicate).sort(byOrder(orderEctoin)),
    [items]
  );

  const styles = { hr: { background: "#bfbfbf", height: 1, width: "100%" } };

  return (
    <>
      <section id="products" className={`products ${isVisible ? "is-visible" : ""}`} aria-label="商品ラインナップ">
        <div className="container">
          <h2 className="products-title ja-serif">商品ラインナップ</h2>
          <div className="products-logo" aria-hidden="true">
            <Image src="/MV_LOGO.png" alt="Confidence ロゴ" width={200} height={90} priority />
          </div>

          {/* ===== シリカのみ版 ===== */}
          <h3 className="products-series" id="series-silica">マザベジコンフィデンス【シリカのみ版】</h3>
          <div className="series-rule" style={styles.hr} />
          <p className="products-desc">成分 オーガニックシリカ 純度97.1%以上</p>

          <div className="product-list three" role="list" aria-labelledby="series-silica">
            {silicaOnly.map((p) => (
              <ProductCard
                key={p.slug}
                imgSrc={p.ItemPic}
                imgAlt={p.name}
                name={p.name}
                price={p.price}
                originalprice={p.originalprice}
                href={`/item/mvsi/${p.slug}`}  /* 外部に飛ばすなら href={p.url} */
              />
            ))}
          </div>
        </div>

        {/* ===== エクトイン配合版 ===== */}
        <div className="container">
          <h3 className="products-series" id="series-ectoin">マザベジコンフィデンス【エクトイン配合版】</h3>
          <div className="series-rule" style={styles.hr} />
          <p className="products-desc">
            成分 オーガニックシリカ純度97.1%以上
            <br />＋
            <br />保湿効果や炎症を抑える効果が期待できる
            <br />
            天然アミノ酸のエクトイン配合
          </p>

          <div className="product-list four" role="list" aria-labelledby="series-ectoin">
            {ectoin.map((p) => (
              <ProductCard
                key={p.slug}
                imgSrc={p.ItemPic}
                imgAlt={p.name}
                name={p.name}
                price={p.price}
                originalprice={p.originalprice}
                note="天然アミノ酸のエクトイン配合版"
                href={`/item/mvsi/${p.slug}`}  /* または外部URL: p.url */
              />
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .products { background:#fff; color:#3a3a3a; padding:36px 16px 84px; }
        .is-visible { animation: fadeInUp .7s ease-out both; }
        @keyframes fadeInUp { from{opacity:0; transform:translate3d(0,8px,0);} to{opacity:1; transform:translateZ(0);} }
        .container { max-width:1080px; margin:0 auto; }
        .ja-serif { font-family:"Yu Mincho","Hiragino Mincho ProN","Noto Serif JP","Hiragino Kaku Gothic ProN",serif; }

        .products-title { text-align:center; font-size:36px; letter-spacing:.14em; color:#444; font-weight:600; margin:6px 0; }
        .products-logo { display:flex; justify-content:center; margin:2px 0 28px; }
        .series-rule { max-width:860px; margin:0 auto 16px; }

        .products-series { text-align:center; font-size:28px; letter-spacing:.08em; color:#3f3f3f; font-weight:700; margin:80px 0 6px; }
        .products-desc { text-align:center; color:#666; font-size:18.5px; line-height:1.9; letter-spacing:.06em; margin:0 0 18px; }

        .product-list { display:grid; gap:36px 17px; justify-content:center; margin:10px auto 48px; }
        .product-list.three { grid-template-columns: repeat(3, minmax(240px, 1fr)); max-width:1080px; }
        .product-list.four  { grid-template-columns: repeat(4, minmax(220px, 1fr)); max-width:1080px; }

        .product-card {
          text-align:center; color:#1f2937;
          display:flex; flex-direction:column; align-items:center;
        }

        /* 画像は必ず枠内 */
        .product-img {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          max-width: 320px;              /* カード内の上限（必要なら調整） */
          margin: 0 auto 12px;
          background: #fff;
          overflow: hidden;
          border-radius: 8px;
        }
        .product-img :global(img){
          width: 100% !important;
          height: 100% !important;
          object-fit: contain !important;
          display: block !important;
        }

        /* ---- 中央寄せ＋3行固定 ---- */
        .product-name {
          margin: 6px 0 10px;
          text-align:center !important;
          letter-spacing:.02em; line-height:1.7; font-size:14px; font-weight:700;
        }
        .product-name > span { display:block; }  /* 強制3行 */

        .product-price-label { margin:0; color:#666; font-size:12.5px; letter-spacing:.06em; text-align:center !important; }
        .product-price { margin:8px 0 12px; font-size:18px; font-weight:800; letter-spacing:.06em; color:#111827; text-align:center !important; }
        .product-note { margin:-6px 0 12px; color:#777; font-size:12.5px; text-align:center !important; }

        /* ---- ご購入はこちら（黄色の丸ボタン） ---- */
        .product-btn {
          display:inline-flex; align-items:center; justify-content:center;
          height: 44px; padding: 0 26px; margin-top: 6px;
          border-radius: 9999px;
          background: linear-gradient(180deg, #FFE173 0%, #FFD84D 100%);
          color:#1f2937 !important; font-size:14px; font-weight:700; letter-spacing:.06em;
          text-decoration:none !important;
          box-shadow:
            0 8px 20px rgba(255, 216, 77, .35),
            inset 0 -2px 0 rgba(0,0,0,.08),
            inset 0 1px 0 rgba(255,255,255,.6);
          transition: transform .08s ease, filter .12s ease, box-shadow .12s ease;
        }
        .product-btn:visited { color:#1f2937 !important; }
        .product-btn:hover {
          filter: brightness(.98);
          transform: translateY(-1px);
          box-shadow:
            0 10px 22px rgba(255, 216, 77, .42),
            inset 0 -2px 0 rgba(0,0,0,.1),
            inset 0 1px 0 rgba(255,255,255,.65);
        }
        .product-btn:active {
          transform: translateY(0);
          filter: brightness(.96);
          box-shadow:
            0 6px 14px rgba(255, 216, 77, .28),
            inset 0 -1px 0 rgba(0,0,0,.08),
            inset 0 1px 0 rgba(255,255,255,.5);
        }

        @media (max-width:1024px){
          .product-list.three{ grid-template-columns: repeat(2, minmax(240px,1fr)); }
          .product-list.four { grid-template-columns: repeat(2, minmax(220px,1fr)); }
        }
        @media (max-width:640px){
          .series-rule{ max-width:100%; }
          .products-desc{ font-size:14px; }
          .product-list.three,.product-list.four{ grid-template-columns:1fr; gap:28px 24px; }
          .product-img{ aspect-ratio: 3 / 2; }
        }
      `}</style>
    </>
  );
}
