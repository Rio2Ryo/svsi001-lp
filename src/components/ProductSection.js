"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  // 細い罫線など軽微なインライン用
  const styles = {
    hr: { background: "#bfbfbf", height: 1, width: "100%" },
  };

  return (
    <>
      <section id="products" className={`products ${isVisible ? "is-visible" : ""}`}>
        {/* ===== ヘッダー ===== */}
        <div className="container">
          <h2 className="products-title ja-serif">商品ラインナップ</h2>
          <div className="products-logo">
            <Image src="/logo-confidence.png" alt="Confidence" width={220} height={64} priority />
          </div>

         

          {/* ===== シリカのみ版 ===== */}
          <h3 className="products-series">マザベジコンフィデンス【シリカのみ版】</h3>
           {/* 上部の細い横線 */}
           <div className="series-rule" style={styles.hr} />
          <p className="products-desc">成分 オーガニックシリカ 純度97.1%以上</p>

          <div className="product-list three">
            <div className="product-card">
              <div className="product-img">
                <Image
                  src="/MV_LOGO.png"
                  alt="mix pack"
                  fill
                  sizes="(max-width: 1024px) 33vw, 300px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="product-name">
                PBスキンパウダー・【ミックスパック】
                <br />
                マザベジコンフィデンスパウダー 1,500mg
              </p>
              <p className="product-price-label">価格(税込)</p>
              <p className="product-price">3,300円</p>
              <a className="product-btn" href="#">ご購入はこちら</a>
            </div>

            <div className="product-card">
              <div className="product-img">
                <Image
                  src="/product-slide.jpg"
                  alt="slide case"
                  fill
                  sizes="(max-width: 1024px) 33vw, 300px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="product-name">
                PBスキンパウダー・【携帯スライドケース】
                <br />
                マザベジコンフィデンスパウダー 1,500mg
              </p>
              <p className="product-price-label">価格(税込)</p>
              <p className="product-price">3,300円</p>
              <a className="product-btn" href="#">ご購入はこちら</a>
            </div>

            <div className="product-card">
              <div className="product-img">
                <Image
                  src="/product-30set.jpg"
                  alt="30 set"
                  fill
                  sizes="(max-width: 1024px) 33vw, 300px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="product-name">
                PBスキンパウダー・【30本セット】
                <br />
                マザベジコンフィデンスパウダー 22,500mg
              </p>
              <p className="product-price-label">価格(税込)</p>
              <p className="product-price">19,800円</p>
              <a className="product-btn" href="#">ご購入はこちら</a>
            </div>
          </div>
        </div>

        {/* ===== エクトイン配合版 ===== */}
        <div className="container">
          

          <h3 className="products-series">マザベジコンフィデンス【エクトイン配合版】</h3>
          {/* シリーズ間の細い横線 */}
          <div className="series-rule" style={styles.hr} />
          <p className="products-desc">
            成分 オーガニックシリカ純度97.1%以上<br />＋
            <br />保湿効果や炎症を抑える効果が期待できる
            <br />
            天然アミノ酸のエクトイン配合
          </p>

          <div className="product-list four">
            <div className="product-card">
              <div className="product-img">
                <Image
                  src="/product2-mixpack.jpg"
                  alt="mix pack ectoin"
                  fill
                  sizes="(max-width: 1200px) 25vw, 240px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="product-name">
                PBスキンパウダー・【ミックスパック】
                <br />
                マザベジコンフィデンスパウダー 2,000mg
              </p>
              <p className="product-price-label">価格(税込)</p>
              <p className="product-price">3,300円</p>
              <p className="product-note">天然アミノ酸のエクトイン配合版</p>
              <a className="product-btn" href="#">ご購入はこちら</a>
            </div>

            <div className="product-card">
              <div className="product-img">
                <Image
                  src="/product2-slide.jpg"
                  alt="slide ectoin"
                  fill
                  sizes="(max-width: 1200px) 25vw, 240px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="product-name">
                PBスキンパウダー・【携帯スライドケース】
                <br />
                マザベジコンフィデンスパウダー 2,000mg
              </p>
              <p className="product-price-label">価格(税込)</p>
              <p className="product-price">3,300円</p>
              <p className="product-note">天然アミノ酸のエクトイン配合版</p>
              <a className="product-btn" href="#">ご購入はこちら</a>
            </div>

            <div className="product-card">
              <div className="product-img">
                <Image
                  src="/product2-10set.jpg"
                  alt="10 set ectoin"
                  fill
                  sizes="(max-width: 1200px) 25vw, 240px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="product-name">
                PBスキンパウダー・【10本セット】
                <br />
                マザベジコンフィデンスパウダー 10,000mg
              </p>
              <p className="product-price-label">価格(税込)</p>
              <p className="product-price">12,000円</p>
              <p className="product-note">天然アミノ酸のエクトイン配合版</p>
              <a className="product-btn" href="#">ご購入はこちら</a>
            </div>

            <div className="product-card">
              <div className="product-img">
                <Image
                  src="/product2-30set.jpg"
                  alt="30 set ectoin"
                  fill
                  sizes="(max-width: 1200px) 25vw, 240px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="product-name">
                PBスキンパウダー・【30本セット】
                <br />
                マザベジコンフィデンスパウダー 30,000mg
              </p>
              <p className="product-price-label">価格(税込)</p>
              <p className="product-price">30,000円</p>
              <p className="product-note">天然アミノ酸のエクトイン配合版</p>
              <a className="product-btn" href="#">ご購入はこちら</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== styled-jsx ===== */}
      <style jsx>{`
        .products {
          background: #ffffff;
          color: #3a3a3a;
          padding: 36px 16px 84px;
        }
        .is-visible {
          animation: fadeInUp 0.7s ease-out both;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 8px, 0);
          }
          to {
            opacity: 1;
            transform: translateZ(0);
          }
        }

        .container {
          max-width: 1080px; /* 余白多めのスクショに合わせてやや広め */
          margin: 0 auto;
        }

        .ja-serif {
          font-family: "Yu Mincho", "Hiragino Mincho ProN", "Noto Serif JP",
            "Hiragino Kaku Gothic ProN", serif;
        }

        /* 見出し */
        .products-title {
          text-align: center;
          font-size: 36px;
          letter-spacing: 0.14em;
          color: #444;
          font-weight: 600;
          margin: 6px 0 6px;
        }
        .products-logo {
          display: flex;
          justify-content: center;
          margin: 2px 0 28px;
        }
        .series-rule {
          max-width: 860px; /* 中央に細い横線 */
          margin: 0 auto 16px;
        }

        /* シリーズ見出し */
        .products-series {
          text-align: center;
          font-size: 28px;
          letter-spacing: 0.08em;
          color: #3f3f3f;
          font-weight: 700;
          margin: 80px 0 6px;
        }
        .products-desc {
          text-align: center;
          color: #666;
          font-size: 18.5px;
          line-height: 1.9;
          letter-spacing: 0.06em;
          margin: 0 0 18px;
        }

        /* 商品グリッド */
        .product-list {
          display: grid;
          gap: 36px 54px;
          justify-content: center;
          margin: 10px auto 48px;
        }
        .product-list.three {
          grid-template-columns: repeat(3, minmax(240px, 1fr));
          max-width: 980px;
        }
        .product-list.four {
          grid-template-columns: repeat(4, minmax(220px, 1fr));
          max-width: 1080px;
        }

        /* 商品カード */
        .product-card {
          text-align: center;
          color: #3a3a3a;
        }
        .product-img {
          position: relative;
          width: 100%;
          height: 220px;
          margin: 0 auto 8px;
          background: #fff;
        }
        .product-name {
          margin: 6px 0 10px;
          font-size: 15px;
          line-height: 1.9;
          letter-spacing: 0.02em;
          color: #444;
        }
        .product-price-label {
          margin: 0;
          color: #666;
          font-size: 13.5px;
          letter-spacing: 0.06em;
        }
        .product-price {
          margin: 0 0 12px;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #2f2f2f;
        }
        .product-note {
          margin: -6px 0 12px;
          color: #777;
          font-size: 13.5px;
        }

        .product-btn {
          display: inline-block;
          padding: 10px 18px;
          border-radius: 9999px;
          background: #ffd84d; /* 黄色の丸ボタン */
          color: #333;
          font-size: 14px;
          letter-spacing: 0.06em;
          text-decoration: none;
          transition: transform 0.08s ease, filter 0.12s ease;
        }
        .product-btn:hover {
          filter: brightness(0.98);
          transform: translateY(-1px);
        }
        .product-btn:active {
          transform: translateY(0);
          filter: brightness(0.96);
        }

        /* レスポンシブ */
        @media (max-width: 1024px) {
          .product-list.three {
            grid-template-columns: repeat(2, minmax(240px, 1fr));
          }
          .product-list.four {
            grid-template-columns: repeat(2, minmax(220px, 1fr));
          }
          .product-img {
            height: 210px;
          }
        }
        @media (max-width: 640px) {
          .series-rule {
            max-width: 100%;
          }
          .products-desc {
            font-size: 14px;
          }
          .product-list.three,
          .product-list.four {
            grid-template-columns: 1fr;
            gap: 28px 24px;
          }
          .product-img {
            height: 200px;
          }
        }
      `}</style>
    </>
  );
}
