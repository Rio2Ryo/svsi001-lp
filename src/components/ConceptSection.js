"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ConceptSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  // inline 用（バナーの白グラデ／スマホ用の横罫線）
  const styles = {
    bannerOverlay: {
      background:
        "linear-gradient(90deg, rgba(255,255,255,.92) 0%, rgba(255,255,255,.78) 34%, rgba(255,255,255,.40) 58%, rgba(255,255,255,0) 78%)",
    },
    hrLight: {
      background: "#d9d9d9",
      height: 1,
      width: "100%",
    },
  };

  return (
    <>
      <section
        id="ConceptSection"
        className={`concept-section ${isVisible ? "is-visible" : ""}`}
      >
        {/* ===== 認証エリア ===== */}
        <div className="container">
          <h2 className="cert-title">国際的な信頼と品質基準をすべてクリア</h2>

          <div className="cert-logos">
            <Image src="/ORGANIC_1.png" alt="COSMOS ORGANIC" width={88} height={88} />
            <Image src="/JHCPO_1.png" alt="HALAL" width={88} height={88} />
            <Image src="/VEGAN.png" alt="VEGAN" width={88} height={88} />
          </div>

          <div className="cert-table">
            <div className="cert-left">
              <p>日本</p>
              <p>オーストラリア</p>
              <p>アメリカ</p>

              <div className="cert-divider-mobile" style={styles.hrLight} />

              <p>国際オーガニック認証</p>
              <p>ヴィーガン認証</p>
              <p>ハラール認証</p>
            </div>

            <div className="cert-divider" />

            <div className="cert-right">
              <p>医薬部外品原料規格</p>
              <p>医薬部外品原料規格</p>
              <p>FDA基準のpremium food grade をクリア（口に入れても安心）</p>

              <div className="cert-divider-mobile" style={styles.hrLight} />

              <p>COSMOS認証取得（オーガニック化粧品の世界基準）</p>
              <p>動物性成分不使用・動物実験なし</p>
              <p>イスラム教徒も安心して使用できる認証取得</p>
            </div>
          </div>
        </div>

        {/* ===== バナー（テキスト左上） ===== */}
        <div className="container">
          <div className="ms-banner">
            <Image
              src="/ms-banner.jpg"
              alt="makeup skin banner"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 980px"
              style={{ objectFit: "cover" }}
            />
            <div className="ms-banner-overlay" style={styles.bannerOverlay} />
            <div className="ms-banner-text ja-serif">
              メイクもスキンケアも
              <br />
              たったこれだけで
              <br />
              24時間ずっときれい
            </div>
          </div>

          {/* ===== 説明文 ===== */}
          <div className="ms-description">
            <p>
              混ぜるだけであなたのコスメがデパコスクオリティーになる
              <br />
              お化粧前や、お肌の気になるところにさっと塗って
              <br />
              変化を実感してください。
            </p>
            <p>
              就寝前にも使用できるので
              <br />
              24時間、たったこれだけであなたのお肌が育ちます。
            </p>

            <ul className="ms-list">
              <li>・キメを整えて、ふんわり明るい印象に</li>
              <li>・メイクがきれいにのる肌に導き、崩れにくさもサポート</li>
              <li>・日中のテカリや皮脂汚れをおだやかにおさえ、清潔感ある肌印象へ</li>
              <li>・デリケートな肌にもやさしく、季節の変わり目の不安定な肌をすこやかに保ちます</li>
              <li>・爪や髪にも使え、つややかな質感をそっと引き出します</li>
              <li>・酸化や外的ダメージから肌を守る、シンプルで頼れるベースケア</li>
              <li>・アレルギー/アトピー体質の肌にも対応しています</li>
            </ul>

            <p className="ms-note">
              ※当商品は化粧品です。
              <br />
              ※厚生労働省医薬外品原料規格を満たしたオーガニックシリカです。
              <br />
              ※お肌に異常がある場合は使用をお控えください。
            </p>
          </div>
        </div>
      </section>

      {/* ===== styled-jsx ===== */}
      <style jsx>{`
        :global(html) {
          scroll-behavior: smooth;
        }
        .concept-section {
          background: #ffffff;
          color: #3a3a3a;
          padding: 32px 16px 72px;
        }
        .is-visible {
          animation: fadeInUp 0.8s ease-out both;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 10px, 0);
          }
          to {
            opacity: 1;
            transform: translateZ(0);
          }
        }

        .container {
          max-width: 980px;
          margin: 0 auto;
        }

        /* 見出し */
        .cert-title {
          text-align: center;
          font-weight: 600;
          font-size: 22px;
          letter-spacing: 0.12em;
          margin: 8px 0 24px;
          color: #444;
        }

        /* ロゴ列 */
        .cert-logos {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 56px;
          margin: 8px 0 36px;
        }

        /* 表風 2カラム（左：項目、右：説明） */
        .cert-table {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 28px;
          max-width: 880px;
          margin: 0 auto 68px;
        }
        .cert-left,
        .cert-right {
          display: grid;
          row-gap: 10px;
        }
        .cert-left {
          width: 240px;
          justify-items: end;
          color: #4b4b4b;
          letter-spacing: 0.12em;
        }
        .cert-right {
          flex: 1;
          min-width: 0;
          color: #555;
          letter-spacing: 0.02em;
        }
        .cert-left p,
        .cert-right p {
          margin: 0;
          line-height: 2;
          font-size: 15px;
        }
        .cert-divider {
          width: 1px;
          background: #d9d9d9;
          align-self: stretch;
        }
        .cert-divider-mobile {
          display: none;
          margin: 8px 0;
        }

        /* バナー */
        .ms-banner {
          position: relative;
          height: 420px;
          max-width: 980px;
          margin: 56px auto 40px;
          overflow: hidden;
          background: #eaeaea;
        }
        .ms-banner-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }
        .ms-banner-text {
          position: absolute;
          z-index: 2;
          top: 56px;
          left: 44px;
          color: rgba(58, 58, 58, 0.9);
          font-size: 32px;
          line-height: 1.9;
          letter-spacing: 0.14em;
          text-shadow: 0 1px 1px rgba(255, 255, 255, 0.45);
        }
        .ja-serif {
          font-family: "Yu Mincho", "Hiragino Mincho ProN", "Noto Serif JP",
            "Hiragino Kaku Gothic ProN", serif;
          font-weight: 500;
        }

        /* 説明テキスト */
        .ms-description {
          max-width: 880px;
          margin: 0 auto;
          color: #4a4a4a;
        }
        .ms-description p {
          margin: 22px 0;
          font-size: 16px;
          line-height: 2;
          letter-spacing: 0.06em;
        }
        .ms-list {
          list-style: none;
          padding: 0;
          margin: 28px 0 16px;
        }
        .ms-list li {
          margin: 10px 0;
          font-size: 16px;
          line-height: 2;
          letter-spacing: 0.04em;
        }
        .ms-note {
          margin-top: 18px;
          color: #888;
          font-size: 12px;
          line-height: 1.9;
          letter-spacing: 0.04em;
        }

        /* レスポンシブ */
        @media (max-width: 1024px) {
          .cert-table {
            margin-bottom: 56px;
          }
          .ms-banner {
            height: 360px;
          }
        }
        @media (max-width: 640px) {
          .cert-logos {
            gap: 32px;
          }
          .cert-table {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0;
          }
          .cert-divider {
            display: none;
          }
          .cert-left,
          .cert-right {
            width: 100%;
            justify-items: start;
          }
          .cert-left {
            margin-bottom: 8px;
          }
          .cert-left p {
            text-align: left;
          }
          .cert-divider-mobile {
            display: block;
          }

          .ms-banner {
            height: 260px;
            margin: 44px auto 32px;
          }
          .ms-banner-text {
            top: 28px;
            left: 20px;
            font-size: 22px;
            letter-spacing: 0.12em;
            line-height: 1.8;
          }
          .ms-description p,
          .ms-list li {
            font-size: 15px;
            line-height: 1.9;
          }
        }
      `}</style>
    </>
  );
}
