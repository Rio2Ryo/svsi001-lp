"use client";
import Image from "next/image";
import Link from "next/link";

export default function ProductLineupSection() {
  // ====== 商品データ（画像srcとurlは貴社の実物に差し替えてください） ======
  const silica = {
    title: "マザベジコンフィデンス【シリカの素版】",
    note: "成分 オーガニックシリカ純度97.1%以上",
    items: [
      {
        img: "/images/products/mixpack_1500.png",
        name: "PBスキンパウダー -【ミックスパック】",
        subtitle: "マザベジコンフィデンスパウダー",
        amount: "1,500mg",
        price: "3,300円",
        url: "/product/silica-mixpack-1500",
        imgW: 420,
        imgH: 300,
      },
      {
        img: "/images/products/slidecase_1500.png",
        name: "PBスキンパウダー -【薬用スライドケース】",
        subtitle: "マザベジコンフィデンスパウダー",
        amount: "1,500mg",
        price: "3,300円",
        url: "/product/silica-slidecase-1500",
        imgW: 420,
        imgH: 300,
      },
      {
        img: "/images/products/30set_22500.png",
        name: "PBスキンパウダー -【30本セット】",
        subtitle: "マザベジコンフィデンスパウダー",
        amount: "22,500mg",
        price: "19,800円",
        url: "/product/silica-30set-22500",
        imgW: 420,
        imgH: 300,
      },
    ],
  };

  const ectoine = {
    title: "マザベジコンフィデンス【エクトイン配合版】",
    noteTop: "成分 オーガニックシリカ純度97.1%以上",
    noteBottom: "保湿効果や炎症を抑える効果が期待できる\n天然アミノ酸のエクトイン配合",
    items: [
      {
        img: "/images/products/mixpack_2000_ect.png",
        name: "PBスキンパウダー -【ミックスパック】",
        subtitle: "マザベジコンフィデンスパウダー",
        amount: "2,000mg",
        price: "3,300円",
        url: "/product/ectoine-mixpack-2000",
        imgW: 420,
        imgH: 300,
        foot: "天然アミノ酸のエクトイン配合版",
      },
      {
        img: "/images/products/slidecase_2000_ect.png",
        name: "PBスキンパウダー -【薬用スライドケース】",
        subtitle: "マザベジコンフィデンスパウダー",
        amount: "2,000mg",
        price: "3,300円",
        url: "/product/ectoine-slidecase-2000",
        imgW: 420,
        imgH: 300,
        foot: "天然アミノ酸のエクトイン配合版",
      },
      {
        img: "/images/products/10set_10000_ect.png",
        name: "PBスキンパウダー -【10本セット】",
        subtitle: "マザベジコンフィデンスパウダー",
        amount: "10,000mg",
        price: "12,000円",
        url: "/product/ectoine-10set-10000",
        imgW: 420,
        imgH: 300,
        foot: "天然アミノ酸のエクトイン配合版",
      },
      {
        img: "/images/products/30set_30000_ect.png",
        name: "PBスキンパウダー -【30本セット】",
        subtitle: "マザベジコンフィデンスパウダー",
        amount: "30,000mg",
        price: "30,000円",
        url: "/product/ectoine-30set-30000",
        imgW: 420,
        imgH: 300,
        foot: "天然アミノ酸のエクトイン配合版",
      },
    ],
  };

  return (
    <section className="lineup">
      {/* ===== ヘッダー（ブランドロゴ）任意 ===== */}
      <div className="brand">
        <p className="brand-top">商品ラインナップ</p>
        <div className="brand-mark">
          <Image
            src="/MV_LOGO.png"
            alt="Mother Vegetables Confidence"
            width={220}
            height={80}
            priority
          />
        </div>
      </div>

      {/* ====== シリカの素版 ====== */}
      <Block title={silica.title} note={silica.note}>
        <Cards items={silica.items} />
      </Block>

      {/* ====== エクトイン配合版 ====== */}
      <Block
        title={ectoine.title}
        note={
          <>
            <span>{ectoine.noteTop}</span>
            <br />
            <span className="subnote">
              {ectoine.noteBottom.split("\n").map((l, i) => (
                <span key={i}>
                  {l}
                  {i === 0 ? <br /> : null}
                </span>
              ))}
            </span>
          </>
        }
      >
        <Cards items={ectoine.items} four />
      </Block>

      <style jsx>{`
        .lineup {
          max-width: 1120px;
          margin: 0 auto;
          padding: 48px 16px 80px;
          background: #fff;
        }
        .brand-top {
          text-align: center;
          letter-spacing: 0.3em;
          color: #222;
          margin: 0 0 6px;
        }
        .brand-mark {
          display: flex;
          justify-content: center;
          margin-bottom: 18px;
          opacity: 0.9;
        }

        /* セクション見出し */
        .block {
          margin-top: 42px;
        }
        .title {
          font-family: "ot-bunyu-mincho-stdn", serif;
          text-align: center;
          font-size: 28px;
          letter-spacing: 0.12em;
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
        .note .subnote {
          display: inline-block;
          margin-top: 4px;
        }

        /* 商品カード */
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px 36px;
          max-width: 1000px;
          margin: 0 auto;
        }
        .grid.four {
          grid-template-columns: repeat(4, 1fr);
          gap: 24px 24px;
        }
        .card {
          text-align: center;
          padding: 8px 12px 20px;
        }
        .thumb {
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 70%;
          margin: 0 auto 6px;
        }
        .name {
          font-weight: 600;
          color: #333;
          line-height: 1.6;
        }
        .subtitle {
          color: #666;
          font-size: 13px;
          line-height: 1.6;
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
        .foot {
          margin-top: 10px;
          color: #666;
          font-size: 12px;
        }

        /* RWD */
        @media (max-width: 1024px) {
          .grid,
          .grid.four {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .title {
            font-size: 24px;
          }
        }
        @media (max-width: 560px) {
          .grid,
          .grid.four {
            grid-template-columns: 1fr;
          }
          .title {
            font-size: 20px;
            line-height: 1.6;
          }
          .note {
            font-size: 12px;
          }
        }
      `}</style>
    </section>
  );
}

/* ============ sub components ============ */
function Block({ title, note, children }) {
  return (
    <div className="block">
      <h2 className="title">{title}</h2>
      <div className="divider" />
      <p className="note">{note}</p>
      {children}
      <style jsx>{`
        .block {
          margin-bottom: 48px;
        }
      `}</style>
    </div>
  );
}

function Cards({ items, four = false }) {
  return (
    <div className={`grid ${four ? "four" : ""}`}>
      {items.map((p, i) => (
        <article key={i} className="card">
          <div className="thumb">
            <Image
              src={p.img}
              alt={p.name}
              fill
              sizes="(max-width: 1024px) 100vw, 320px"
              style={{ objectFit: "contain" }}
              priority={i < 2}
            />
          </div>
          <h3 className="name">{p.name}</h3>
          <div className="subtitle">{p.subtitle}</div>
          <div className="amount">{p.amount}</div>
          <div className="pricewrap">
            価格(税込)
            <span className="price">{p.price}</span>
          </div>
          <Link href={p.url} className="cta" aria-label={`${p.name} を購入`}>
            ご購入はこちら
          </Link>
          {p.foot ? <div className="foot">{p.foot}</div> : null}
        </article>
      ))}
    </div>
  );
}
