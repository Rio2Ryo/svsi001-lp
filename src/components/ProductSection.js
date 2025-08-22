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
      {/* ーー セクションヘッダー（見本どおり） ーー */}
      <div className="lineup-head">
        <h2 className="lineup-label">商品ラインナップ</h2>
        <div className="brand-lockup">
          <Image
            src="/MV_LOGO.png"        // 別ロゴがあればここを差し替え
            alt="Mother Vegetables Confidence"
            width={420}
            height={120}
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
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 16px 64px;
          background: #fff;
        }

        /* 見本の上部構成 */
        .lineup-head { text-align: center; margin: 10px 0 36px; }
        .lineup-label {
          font-family: "ot-bunyu-mincho-stdn", serif;
          font-size: 40px;
          letter-spacing: 0.18em;
          color: #222;
          margin: 60px 0 18px;
        }
        .brand-lockup :global(img) {
          display: inline-block;
          filter: grayscale(100%) contrast(95%) opacity(0.9);
          width: auto; height: auto;
          max-width: 420px;
        }

        /* セクション見出し（太め・やや大きく） */
        .title {
          text-align: center;
          
          font-size: 30px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #2b2b2b;
          margin: 42px 0 10px;
        }

        /* 下線は細く長め（見本の雰囲気） */
        .divider {
          height: 1px;
          background: #dcdcdc;
          margin: 8px auto 12px;
          max-width: 960px; /* ライン幅を少し絞る */
        }

        .note {
          text-align: center;
          color: #6d6d6d;
          font-size: 14px;
          letter-spacing: 0.06em;
          margin-bottom: 26px;
        }
        .note .subnote {
          display: inline-block;
          margin-top: 4px;
        }

        @media (max-width: 560px) {
          .lineup-label { font-size: 24px; }
          .brand-lockup :global(img) { max-width: 280px; }
          .title {
            font-size: 21px;
            line-height: 1.6;
            margin: 32px 0 8px;
          }
          .divider { max-width: 88vw; }
          .note { font-size: 12px; }
        }
      `}</style>
    </section>
  );
}

/* 行：中央寄せ。カード幅は固定240px。 */
function Row({ items }) {
  return (
    <>
      <div className="row" role="list">
        {items.map((p) => {
          const internalHref = `/item/mvsi/${p.slug}`; // ★ 固定化（itemId = mvsi）

          return (
            <article key={p.slug} className="card" role="listitem">
              <div className="thumb">
                <Image
                  src={p.ItemPic}
                  alt={p.name}
                  fill
                  sizes="240px"
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>

              <h3 className="name">{p.name}</h3>
              <div className="pricewrap">
                価格(税込)
                <span className="price">{p.price}</span>
              </div>

              {/* 内部ページへリンク */}
              <Link href={internalHref} className="cta" aria-label={`${p.name} を購入`}>
                ご購入はこちら
              </Link>
            </article>
          );
        })}
      </div>

      <style jsx>{`
        .row {
          width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }

        .card {
          width: 240px;
          text-align: center;
          padding: 8px 10px 18px;
        }

        .thumb {
          position: relative;
          width: 240px;
          height: 160px;
          margin: 0 auto 10px;
        }

        .name {
          font-weight: 600;
          color: #333;
          line-height: 1.6;
          font-size: 15px;
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

        :global(.cta),
        :global(.cta:link),
        :global(.cta:visited) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          margin-top: 12px;
          padding: 7px 17px;
          border-radius: 30px;
          background: #ffe926;
          color: #000;
          text-decoration: none !important;
          font-weight: 400;
          letter-spacing: 0.06em;
          border: none;
          cursor: pointer;
          font-size: 13px;
        }
        :global(.cta:hover) { opacity: .92; }
        :global(.cta:active) { transform: translateY(1px); box-shadow: 0 1px 0 rgba(0,0,0,.25); }
        :global(.cta:focus-visible) { outline: 2px solid #111; outline-offset: 2px; box-shadow: 0 0 0 3px rgba(17,17,17,.2); }

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

/* ヘルパー（未使用なら削除可） */
function extractAmount(name) {
  const m = name.match(/([0-9,]+mg)/);
  return m ? m[1] : "";
}
