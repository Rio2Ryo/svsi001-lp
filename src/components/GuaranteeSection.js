"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function GuaranteeSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  // 横罫線など軽微なインライン用
  const styles = {
    hr: { background: "#cfcfcf", height: 1, width: "100%" },
  };

  return (
    <>
      <section id="usage" className={`usage ${isVisible ? "is-visible" : ""}`}>
        <div className="container">
          <h2 className="usage-title">使用方法</h2>
          <div className="usage-rule" style={styles.hr} />

          <ul className="usage-list">
            <li className="usage-item">
              <Image
                src="/usage-makeup.png"
                alt="makeup"
                width={130}
                height={130}
                className="usage-img"
                priority
              />
              <div className="usage-text">
                <h3>お化粧前に</h3>
                <p>ファンデーションを塗る前に50mgを<br></br>パフやブラシで薄く塗布</p>
              </div>
            </li>

            <li className="usage-item">
              <Image
                src="/usage-night.png"
                alt="night care"
                width={130}
                height={130}
                className="usage-img"
              />
              <div className="usage-text">
                <h3>夜のスキンケアに</h3>
                <p>寝る前に50mgを乳液やクリームと一緒に使用</p>
              </div>
            </li>

            <li className="usage-item">
              <Image
                src="/usage-smell.png"
                alt="smell"
                width={130}
                height={130}
                className="usage-img"
              />
              <div className="usage-text">
                <h3>ニオイの気になるところに</h3>
                <p>ワキやデリケートゾーンなどには<br></br>1円玉サイズのお水に混ぜて塗り込む</p>
              </div>
            </li>

            <li className="usage-item">
              <Image
                src="/usage-allergy.png"
                alt="allergy"
                width={130}
                height={130}
                className="usage-img"
              />
              <div className="usage-text">
                <h3>アレルギーやアトピーの方に</h3>
                <p>肌の隙間に入り込むように塗り込む</p>
              </div>
            </li>

            <li className="usage-item">
              <Image
                src="/usage-acne.png"
                alt="acne"
                width={130}
                height={130}
                className="usage-img"
              />
              <div className="usage-text">
                <h3>ニキビ肌に</h3>
                <p>気になるニキビに指で馴染ませる</p>
              </div>
            </li>

            <li className="usage-item">
              <Image
                src="/usage-shine.png"
                alt="shine"
                width={130}
                height={130}
                className="usage-img"
              />
              <div className="usage-text">
                <h3>顔のテカリや化粧崩れに</h3>
                <p>お化粧の上からブラシで整える</p>
              </div>
            </li>

            <li className="usage-item">
              <Image
                src="/usage-spray.png"
                alt="spray"
                width={130}
                height={130}
                className="usage-img"
              />
              <div className="usage-text">
                <h3>スプレーとして</h3>
                <p>マザベジシリカを水と混ぜてスプレー状にして<br></br>使用もOK（防菌、抗酸化作用があります）</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <style jsx>{`
        .usage {
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

        /* 見出し＆罫線 */
        .usage-rule {
          margin: 0 auto 16px;
        }
        .usage-title {
          text-align: center;
          font-weight: 600;
          font-size: 32px;
          color: #444;
          letter-spacing: 0.12em;
          margin: 0 0 18px;
        }

        /* リスト */
        .usage-list {
          list-style: none;
          padding: 0;
          margin: 0 auto;
          max-width: 760px; /* 画像の並びと本文のバランスをスクショに合わせる */
        }
        .usage-item {
          display: grid;
          grid-template-columns: 86px 1fr; /* 左に丸画像、右にテキスト */
          gap: 70px;
          align-items: center;
          padding: 14px 0;
        }
        .usage-img {
          display: block;
          border-radius: 50%;
          object-fit: cover;
          background: #fff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
        }
        .usage-text h3 {
          margin: 0 0 6px;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #3f3f3f;
        }
        .usage-text p {
          margin: 0;
          font-size: 24px;
          line-height: 1.4;
          letter-spacing: 0.04em;
          color: #555;
        }

        /* レスポンシブ */
        @media (max-width: 640px) {
          .usage-list {
            max-width: 100%;
          }
          .usage-item {
            grid-template-columns: 72px 1fr;
            gap: 14px;
            padding: 12px 0;
          }
          .usage-text h3 {
            font-size: 15.5px;
          }
          .usage-text p {
            font-size: 14.5px;
            line-height: 1.9;
          }
        }
      `}</style>
    </>
  );
}
