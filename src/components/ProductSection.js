"use client";
import Image from "next/image";
import Link from "next/link";

// ▼データはそのまま
const PRODUCTS = [
  {
    name: "【ミックスパック】マザベジコンフィデンスパウダー 1,500mg",
    slug: "double-mvsi",
    description: "ミックスパックです。",
    originalprice: "3,300円",
    price: "3,300円",
    ItemPic: "/mix1500.png",
    wixProductId: "dcb1eb79-e65a-02df-a8f2-a80385c56e00",
    url: "https://www.dotpb.jp/product-page/double-mvsi",
  },
  {
    name: "【薬用スライドケース】マザベジコンフィデンスパウダー 1,500mg",
    slug: "case-mvsi",
    description: "薬用スライドケ－スです。",
    originalprice: "3,300円",
    price: "3,300円",
    ItemPic: "/case1500.png",
    wixProductId: "7be06482-8fca-e20d-6a73-48bd3e914460",
    url: "https://www.dotpb.jp/product-page/case-mvsi",
  },
  {
    name: "【30本セット】マザベジコンフィデンスパウダー 22,500mg",
    slug: "big-refill-mvsi",
    description: "30本セットです。",
    originalprice: "20,000円",
    price: "20,000円",
    ItemPic: "/30p22500.png",
    wixProductId: "fb6bbce6-a63f-b4d1-b817-da05d987e163",
    url: "https://www.dotpb.jp/product-page/big-refill-mvsi",
  },
  {
    name: "【ミックスパック】 マザベジコンフィデンスパウダー 2,000mg（エクトイン入り）",
    slug: "double-e-mvsi",
    description: "ミックスパック（エクトイン入り）です。",
    originalprice: "3,300円",
    price: "3,300円",
    ItemPic: "/mix2000.png",
    wixProductId: "7ba04481-0674-5262-9325-8d62f2d25095",
    url: "https://www.dotpb.jp/product-page/double-e-mvsi",
  },
  {
    name: "【薬用スライドケース】マザベジコンフィデンスパウダー 2,000mg（エクトイン入り）",
    slug: "case-e-mvsi",
    description: "薬用スライドケ－ス（エクトイン入り）です。",
    originalprice: "3,300円",
    price: "3,300円",
    ItemPic: "/case2000.png",
    wixProductId: "48c2a407-4738-2f3f-e317-d118a4046e5c",
    url: "https://www.dotpb.jp/product-page/case-e-mvsi",
  },
  {
    name: "【10本セット】マザベジコンフィデンスパウダー 10,000mg（エクトイン入り）",
    slug: "refill-e-mvsi",
    description: "10本セット（エクトイン入り）です。",
    originalprice: "12,000円",
    price: "12,000円",
    ItemPic: "/10p10000.png",
    wixProductId: "cc620bb2-fd77-8db3-4bf1-cff751f9e55d",
    url: "https://www.dotpb.jp/product-page/refill-e-mvsi",
  },
  {
    name: "【30本セット】マザベジコンフィデンスパウダー 30,000mg（エクトイン入り）",
    slug: "big-refill-e-mvsi",
    description: "30本セット（エクトイン入り）です。",
    originalprice: "30,000円",
    price: "30,000円",
    ItemPic: "/30p30000.png",
    wixProductId: "c15bad90-8fff-b003-7792-2282202b6ccb",
    url: "https://www.dotpb.jp/product-page/big-refill-e-mvsi",
  },
];

export default function ProductLineupSection() {
  const isEcto = (p) => p.name.includes("エクトイン");
  const baseItems = PRODUCTS.filter((p) => !isEcto(p)); // 上段3
  const ectoItems = PRODUCTS.filter(isEcto); // 下段4

  return (
    <section className="lineup">
      {/* ーー セクションヘッダー ーー */}
      <div className="lineup-head">
        <h2 className="lineup-label">商品ラインナップ</h2>
        <div className="brand-lockup">
          <Image
            src="/MV_LOGO.png"
            alt="Mother Vegetables Confidence"
            width={480}
            height={140}
            priority
          />
        </div>
      </div>

      {/* ── 素版 ── */}
      <h3 className="title">マザベジコンフィデンス【シリカのみ版】</h3>
      <div className="divider" />
      <p className="note">成分 オーガニックシリカ純度97.1%以上</p>
      <Row items={baseItems} />

      {/* ── エクトイン配合版 ── */}
      <h3 className="title">マザベジコンフィデンス【エクトイン配合版】</h3>
      <div className="divider" />
      <p className="note">
        成分 オーガニックシリカ純度97.1%以上
        <br />
        <span className="subnote">
          保湿効果や炎症を抑える効果が期待できる／天然アミノ酸のエクトイン配合
        </span>
      </p>
      <Row items={ectoItems} />

      <style jsx>{`
        .lineup {
          max-width: 1320px;         /* ← セクションを少し広く */
          margin: 0 auto;
          padding: 40px 16px 72px;
          background: #fff;
        }

        .lineup-head { text-align: center; margin: 6px 0 40px; }
        .lineup-label {
          font-family: "ot-bunyu-mincho-stdn", serif;
          f0nt-weight:400;
          font-size: 40px;
          letter-spacing: 0.18em;
          color: #222;
          margin: 50px 0 18px;
        }
        .brand-lockup :global(img) {
          display: inline-block;
          filter: grayscale(100%) contrast(95%) opacity(0.9);
          width: auto; height: auto;
          max-width: 480px;
        }

        .title {
          text-align: center;
          
          font-size: 30px;            /* ← 少し大きく */
          font-weight: 500;
          letter-spacing: 0.12em;
          color: #2b2b2b;
          margin: 44px 0 12px;
        }

        .divider {
          height: 1px;
          background: #dcdcdc;
          margin: 10px auto 14px;
          max-width: 1024px;          /* ← 線も少し長めに */
        }

        .note {
          text-align: center;
          color: #6d6d6d;
          font-size: 15px;            /* ← 注記も少し大きく */
          letter-spacing: 0.06em;
          margin-bottom: 28px;
        }
        .note .subnote { display: inline-block; margin-top: 4px; }

        @media (max-width: 1100px) {
          .lineup { padding-bottom: 64px; }
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

/* 行：中央寄せ。カードをPCで280pxに拡大、1100px以下で240pxへ縮小。 */
function Row({ items }) {
  return (
    <>
      <div className="row" role="list">
        {items.map((p) => {
          const internalHref = `/item/mvsi/${p.slug}`;

          return (
            <article key={p.slug} className="card" role="listitem">
              <div className="thumb">
                <Image
                  src={p.ItemPic}
                  alt={p.name}
                  fill
                  sizes="(max-width: 1100px) 240px, 280px"  /* ← 画像サイズヒントも拡大 */
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>

              <h3 className="name">{p.name}</h3>
              <div className="pricewrap">
                価格(税込)
                <span className="price">{p.price}</span>
              </div>

              <Link href={internalHref} className="cta" aria-label={`${p.name} を購入`}>
                ご購入はこちら
              </Link>
            </article>
          );
        })}
      </div>

      <style jsx>{`
        .row {
          width: min(100%, 1280px);   /* ← 横幅を少し広げる */
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 24px;                  /* ← 余白も少し広め */
        }

        .card {
          width: 280px;               /* ← 240 → 280 に拡大（PC） */
          text-align: center;
          padding: 10px 12px 20px;
        }

        .thumb {
          position: relative;
          width: 280px;               /* ← 画像枠も拡大 */
          height: 200px;              /* ← 160 → 200 */
          margin: 0 auto 12px;
        }

        .name {
          font-weight: 600;
          color: #333;
          line-height: 1.7;
          font-size: 16.5px;          /* ← 商品名を拡大 */
          letter-spacing: 0.02em;
        }

        .pricewrap {
          margin-top: 10px;
          font-size: 14px;            /* ← ラベル少し大きく */
          color: #666;
        }
        .price {
          display: block;
          font-size: 20px;            /* ← 価格も拡大 */
          color: #111;
          margin-top: 2px;
        }

        :global(.cta),
        :global(.cta:link),
        :global(.cta:visited) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;           /* ← ボタンも少し大きく */
          margin-top: 14px;
          padding: 10px 22px;
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
        :global(.cta:hover) { opacity: .92; }
        :global(.cta:active) { transform: translateY(1px); box-shadow: 0 1px 0 rgba(0,0,0,.25); }
        :global(.cta:focus-visible) { outline: 2px solid #111; outline-offset: 2px; box-shadow: 0 0 0 3px rgba(17,17,17,.2); }

        /* ── 1100px以下で従来サイズへ縮小 ── */
        @media (max-width: 1100px) {
          .row { width: 100%; gap: 20px; }
          .card { width: 240px; padding: 8px 10px 18px; }
          .thumb { width: 240px; height: 160px; margin-bottom: 10px; }
          .name { font-size: 15px; line-height: 1.6; }
          .pricewrap { font-size: 13px; }
          .price { font-size: 18px; }
          :global(.cta) { min-height: 44px; padding: 8px 18px; font-size: 13px; }
        }

        /* ── 560px以下：1カラム想定 ── */
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

/* 参考：未使用なら削除可 */
function extractAmount(name) {
  const m = name.match(/([0-9,]+mg)/);
  return m ? m[1] : "";
}
