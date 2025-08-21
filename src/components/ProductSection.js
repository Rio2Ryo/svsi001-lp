"use client";
import Image from "next/image";
import Link from "next/link";

// ▼そのまま貼り付けOK（必要なら外部JSON fetchに差し替え可）
const PRODUCTS = [
  {
    "name": "【ミックスパック】 マザベジシリカパウダー 1,500mg",
    "slug": "double-mvsi",
    "description": "ミックスパックです。",
    "originalprice": "3,300円",
    "price": "3,300円",
    "ItemPic": "/mix1500.png",
    "wixProductId": "dcb1eb79-e65a-02df-a8f2-a80385c56e00",
    "url": "https://www.dotpb.jp/product-page/double-mvsi"
  },
  {
    "name": "【薬用スライドケース】マザベジシリカパウダー 1,500mg",
    "slug": "case-mvsi",
    "description": "薬用スライドケ－スです。",
    "originalprice": "3,300円",
    "price": "3,300円",
    "ItemPic": "/case1500.png",
    "wixProductId": "7be06482-8fca-e20d-6a73-48bd3e914460",
    "url": "https://www.dotpb.jp/product-page/case-mvsi"
  },
  {
    "name": "【30本セット】マザベジシリカパウダー 22,500mg",
    "slug": "big-refill-mvsi",
    "description": "30本セットです。",
    "originalprice": "20,000円",
    "price": "20,000円",
    "ItemPic": "/30p22500.png",
    "wixProductId": "fb6bbce6-a63f-b4d1-b817-da05d987e163",
    "url": "https://www.dotpb.jp/product-page/big-refill-mvsi"
  },
  {
    "name": "【ミックスパック】 マザベジシリカパウダー 2,000mg（エクトイン入り）",
    "slug": "double-e-mvsi",
    "description": "ミックスパック（エクトイン入り）です。",
    "originalprice": "3,300円",
    "price": "3,300円",
    "ItemPic": "/mix2000.png",
    "wixProductId": "7ba04481-0674-5262-9325-8d62f2d25095",
    "url": "https://www.dotpb.jp/product-page/double-e-mvsi"
  },
  {
    "name": "【薬用スライドケース】マザベジシリカパウダー 2,000mg（エクトイン入り）",
    "slug": "case-e-mvsi",
    "description": "薬用スライドケ－ス（エクトイン入り）です。",
    "originalprice": "3,300円",
    "price": "3,300円",
    "ItemPic": "/case2000.png",
    "wixProductId": "48c2a407-4738-2f3f-e317-d118a4046e5c",
    "url": "https://www.dotpb.jp/product-page/case-e-mvsi"
  },
  {
    "name": "【10本セット】マザベジシリカパウダー 10,000mg（エクトイン入り）",
    "slug": "refill-e-mvsi",
    "description": "10本セット（エクトイン入り）です。",
    "originalprice": "12,000円",
    "price": "12,000円",
    "ItemPic": "/10p10000.png",
    "wixProductId": "cc620bb2-fd77-8db3-4bf1-cff751f9e55d",
    "url": "https://www.dotpb.jp/product-page/refill-e-mvsi"
  },
  {
    "name": "【30本セット】マザベジシリカパウダー 30,000mg（エクトイン入り）",
    "slug": "big-refill-e-mvsi",
    "description": "30本セット（エクトイン入り）です。",
    "originalprice": "30,000円",
    "price": "30,000円",
    "ItemPic": "/30p30000.png",
    "wixProductId": "c15bad90-8fff-b003-7792-2282202b6ccb",
    "url": "https://www.dotpb.jp/product-page/big-refill-e-mvsi"
  }
];

export default function ProductLineupSection() {
  // 「エクトイン入り」有無で自動仕分け
  const isEcto = (p) => p.name.includes("エクトイン");
  const baseItems = PRODUCTS.filter((p) => !isEcto(p)); // 3件
  const ectoItems = PRODUCTS.filter(isEcto);            // 4件

  return (
    <section className="lineup">
      {/* ── 素版 ── */}
      <h2 className="title">マザベジコンフィデンス【シリカの素版】</h2>
      <div className="divider" />
      <p className="note">成分 オーガニックシリカ純度97.1%以上</p>
      <Row columns={3} items={baseItems} />

      {/* ── エクトイン配合版 ── */}
      <h2 className="title">マザベジコンフィデンス【エクトイン配合版】</h2>
      <div className="divider" />
      <p className="note">
        成分 オーガニックシリカ純度97.1%以上
        <br />
        <span className="subnote">
          保湿効果や炎症を抑える効果が期待できる／天然アミノ酸のエクトイン配合
        </span>
      </p>
      <Row columns={4} items={ectoItems} />

      <style jsx>{`
        .lineup {
          max-width: 1120px;
          margin: 0 auto;
          padding: 40px 16px 80px;
          background: #fff;
        }
        .title {
          text-align: center;
          font-family: "ot-bunyu-mincho-stdn", serif;
          font-size: 28px;
          letter-spacing: 0.1em;
          color: #222;
          margin: 28px 0 10px;
        }
        .divider {
          height: 1px;
          background: #d9d9d9;
          margin: 10px auto 14px;
          max-width: 980px;
        }
        .note {
          text-align: center;
          color: #6d6d6d;
          font-size: 14px;
          letter-spacing: 0.06em;
          margin-bottom: 26px;
        }
        .note .subnote { display: inline-block; margin-top: 4px; }

        @media (max-width: 1024px) {
          .title { font-size: 24px; }
        }
        @media (max-width: 560px) {
          .title { font-size: 20px; line-height: 1.6; }
          .note { font-size: 12px; }
        }
      `}</style>
    </section>
  );
}

/* 横並び：flexで確実に横配置。列数はpropsで指定 */
function Row({ items, columns = 3 }) {
  return (
    <>
      <div className="row" role="list">
        {items.map((p) => (
          <article key={p.slug} className="card" role="listitem">
            <div className="thumb">
              <Image
                src={p.ItemPic}
                alt={p.name}
                fill
                sizes="(max-width: 1024px) 100vw, 320px"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>

            <h3 className="name">{p.name}</h3>
            <div className="amount">{extractAmount(p.name)}</div>

            <div className="pricewrap">
              価格(税込)
              <span className="price">{p.price}</span>
            </div>

            <Link href={p.url} className="cta" aria-label={`${p.name} を購入`}>
              ご購入はこちら
            </Link>
          </article>
        ))}
      </div>

      <style jsx>{`
        .row {
          display: flex;
          flex-wrap: wrap;                 /* 折返し */
          justify-content: center;         /* 中央寄せ */
          gap: 24px 36px;                  /* 行間/列間 */
          max-width: 1000px;
          margin: 0 auto 42px;
        }
        .card {
          width: calc((100% - ${columns - 1} * 36px) / ${columns}); /* 横並び幅を固定 */
          min-width: 240px;               /* 画面が狭い時に2列/1列に落ちる */
          text-align: center;
          padding: 8px 12px 20px;
        }
        .thumb {
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 70%;
          margin: 0 auto 10px;
        }
        .name {
          font-weight: 600;
          color: #333;
          line-height: 1.6;
          font-size: 15px;
        }
        .amount {
          margin-top: 4px;
          font-size: 13px;
          color: #111;
        }
        .pricewrap {
          margin-top: 10px;
          font-size: 13px;
          color: #666;
        }
        .price {
          display: block;
          font-size: 18px;
          color: #111;
          margin-top: 2px;
        }
        .cta {
          display: inline-block;
          margin-top: 12px;
          padding: 10px 18px;
          border-radius: 9999px;
          background: #ffd400;
          text-decoration: none;
          color: #111;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        /* タブレット：2列 */
        @media (max-width: 1024px) {
          .card {
            width: calc((100% - 36px) / 2);
          }
        }
        /* スマホ：1列 */
        @media (max-width: 560px) {
          .row { gap: 20px; }
          .card { width: 100%; }
          .name { font-size: 14px; }
          .price { font-size: 17px; }
        }
      `}</style>
    </>
  );
}

/* ヘルパー：製品名から mg 数を抽出（任意） */
function extractAmount(name) {
  const m = name.match(/([0-9,]+mg)/);
  return m ? m[1] : "";
}
