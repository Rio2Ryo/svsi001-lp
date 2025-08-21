"use client";
import { useEffect, useState, memo } from "react";
import Link from "next/link";
import Image from "next/image";

function formatJPY(n) {
  const digits = String(n).replace(/[^\d.]/g, "");
  if (!digits) return n;
  try { return new Intl.NumberFormat("ja-JP").format(Number(digits)); }
  catch { return digits; }
}

// 汎用カード
const ProductCard = memo(function ProductCard({
  imgSrc, imgAlt, nameLines = [],
  price, originalprice, note,
  href, // 内部/外部いずれもOK
}) {
  const isExternal = href?.startsWith("http");
  const Button = isExternal ? "a" : Link;

  return (
    <div className="product-card">
      <div className="product-img">
        <Image
          src={imgSrc}
          alt={imgAlt}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 45vw, 260px"
          style={{ objectFit: "contain" }}
          priority={false}
        />
      </div>

      <p className="product-name">
        {nameLines.map((line, i) => (
          <span key={i}>
            {line}
            {i !== nameLines.length - 1 && <br />}
          </span>
        ))}
      </p>

      <p className="product-price-label">価格(税込)</p>
      <p className="product-price">
        {typeof price === "number" ? `${formatJPY(price)}円` : price}
      </p>
      {originalprice && <p className="product-note">通常：{originalprice}</p>}
      {note && <p className="product-note">{note}</p>}

      {href && isExternal ? (
        <a className="product-btn" href={href} target="_blank" rel="noopener noreferrer">
          ご購入はこちら
        </a>
      ) : href ? (
        <Link className="product-btn" href={href}>
          ご購入はこちら
        </Link>
      ) : (
        <button className="product-btn" type="button" disabled>準備中</button>
      )}
    </div>
  );
});

export default function ProductSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [items, setItems] = useState([]);     // ← JSON 全件
  const [loading, setLoading] = useState(true);
  useEffect(() => setIsVisible(true), []);

  // JSON取得
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
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // グルーピング（slugに -e- を含む → エクトイン配合）
  const ectoinPredicate = (p) =>
    /-e-/.test(p?.slug || "") || /エクトイン/.test(p?.name || "");

  const silicaOnly = items.filter((p) => !ectoinPredicate(p));
  const ectoin = items.filter(ectoinPredicate);

  // 表示順（必要に応じて調整）
  const orderSilica = ["double-mvsi", "case-mvsi", "big-refill-mvsi"];
  const orderEctoin = ["double-e-mvsi", "case-e-mvsi", "refill-e-mvsi", "big-refill-e-mvsi"];
  const byOrder = (order) => (a, b) =>
    order.indexOf(a.slug) - order.indexOf(b.slug);

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
            {(silicaOnly.sort(byOrder(orderSilica))).map((p) => (
              <ProductCard
                key={p.slug}
                imgSrc={p.ItemPic || "/placeholder.png"}
                imgAlt={p.name}
                nameLines={[p.name]}
                price={p.price}
                originalprice={p.originalprice}
                // 内部遷移にする場合：
                href={`/item/mvsi/${p.slug}`}
                // 外部に飛ばすなら：href={p.url}
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
            {(ectoin.sort(byOrder(orderEctoin))).map((p) => (
              <ProductCard
                key={p.slug}
                imgSrc={p.ItemPic || "/placeholder.png"}
                imgAlt={p.name}
                nameLines={[p.name]}
                price={p.price}
                originalprice={p.originalprice}
                note="天然アミノ酸のエクトイン配合版"
                href={`/item/mvsi/${p.slug}`}
                // または外部URL: href={p.url}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 既存 styled‑jsx（レイアウトはそのまま） */}
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
        .product-list.three { grid-template-columns: repeat(3, minmax(240px, 1fr)); max-width:980px; }
        .product-list.four  { grid-template-columns: repeat(4, minmax(220px, 1fr)); max-width:1080px; }
        .product-card { text-align:center; color:#3a3a3a; }
        .product-img { position:relative; width:100%; height:220px; margin:0 auto 8px; background:#fff; }
        .product-name { margin:6px 0 10px; font-size:13px; line-height:1.5; letter-spacing:.02em; color:#444; }
        .product-price-label { margin:0; color:#666; font-size:12.5px; letter-spacing:.06em; }
        .product-price { margin:0 0 12px; font-size:16px; font-weight:700; letter-spacing:.06em; color:#2f2f2f; }
        .product-note { margin:-6px 0 12px; color:#777; font-size:12.5px; }
        .product-btn { display:inline-block; padding:10px 18px; border-radius:9999px; background:#ffd84d; color:#333; font-size:14px; letter-spacing:.06em; text-decoration:none; transition: transform .08s ease, filter .12s ease; }
        .product-btn:hover { filter:brightness(.98); transform: translateY(-1px); }
        .product-btn:active { transform: translateY(0); filter:brightness(.96); }
        @media (max-width:1024px){
          .product-list.three{ grid-template-columns: repeat(2, minmax(240px,1fr)); }
          .product-list.four { grid-template-columns: repeat(2, minmax(220px,1fr)); }
          .product-img{ height:210px; }
        }
        @media (max-width:640px){
          .series-rule{ max-width:100%; }
          .products-desc{ font-size:14px; }
          .product-list.three,.product-list.four{ grid-template-columns:1fr; gap:28px 24px; }
          .product-img{ height:200px; }
        }
      `}</style>
    </>
  );
}
