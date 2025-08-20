"use client";
import { useEffect, useState } from "react";

export default function FAQSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  // 上部の細い罫線など軽微なインライン用
  const styles = {
    hr: { background: "#cfcfcf", height: 1, width: "100%" },
  };

  return (
    <>
      <section id="faq" className={`faq ${isVisible ? "is-visible" : ""}`}>
        <div className="container">
          <div className="faq-rule" style={styles.hr} />

          <h2 className="faq-title ja-serif">FAQ</h2>
          <p className="faq-sub">よくあるご質問</p>

          <div className="faq-body">
            <dl className="faq-list">
              <div className="faq-item">
                <dt>どんな肌質でも使えますか？</dt>
                <dd>
                  乾燥肌や敏感肌を含め、さまざまな肌タイプの方にご使用いただけます。<br />
                  ※すべての方に皮膚刺激が起きないわけではありません。<br />
                  ご使用前には目立たない部位で試すことをおすすめします。
                </dd>
              </div>

              <div className="faq-item">
                <dt>赤ちゃんにも使えますか？</dt>
                <dd>
                  シリカ（ケイ素）は赤ちゃんが最も保持するものであり、成長と共に減少していくことが確認されています。<br />
                  そのため、赤ちゃんへの使用も可能ですが、赤ちゃんは肌が特に敏感なため、<br />
                  ご使用前に小さな範囲で試すことをおすすめします。
                </dd>
              </div>

              <div className="faq-item">
                <dt>食用としても可能ですか？</dt>
                <dd>
                  FDAの基準に準じた検査では「Premium Food Grade」と評価を得ていますが、食品ではありません。<br />
                  お口に入ってもリスクはございませんが、化粧品としてお使いください。
                </dd>
              </div>

              <div className="faq-item">
                <dt>使用期限はありますか？</dt>
                <dd>
                  本製品は安定性が高く、未開封の場合は長期保存が可能です。<br />
                  開封後は、品質保持のためなるべく早めにご使用ください。
                </dd>
              </div>

              <div className="faq-item">
                <dt>妊娠中・授乳中でも使えますか？</dt>
                <dd>
                  特に制限はありません。ご不安な点があれば医師にご相談ください。
                </dd>
              </div>

              <div className="faq-item">
                <dt>他のスキンケアと併用できますか？</dt>
                <dd>
                  はい。化粧水や美容液、乳液の後などにご使用いただけます。
                </dd>
              </div>

              <div className="faq-item">
                <dt>頭皮についても問題はありませんか？</dt>
                <dd>
                  はい。べたつきを抑え、頭皮の皮脂汚れの改善にも期待できます。
                </dd>
              </div>

              <div className="faq-item">
                <dt>香りはありますか？</dt>
                <dd>香りはございません。</dd>
              </div>

              <div className="faq-item">
                <dt>保管方法に注意点はありますか？</dt>
                <dd>
                  高温多湿や直射日光を避け、冷暗所で保管してください。
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* ===== Base ===== */
        .faq {
          background: #ffffff;
          color: #3a3a3a;
          padding: 32px 16px 80px;
        }
        .is-visible {
          animation: fadeInUp 0.8s ease-out both;
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
          max-width: 980px;
          margin: 0 auto;
        }
        .ja-serif {
          font-family: "Yu Mincho", "Hiragino Mincho ProN", "Noto Serif JP",
            "Hiragino Kaku Gothic ProN", serif;
        }

        /* ===== Header ===== */
        .faq-rule {
          max-width: 860px; /* スクショのようにやや狭めの直線 */
          margin: 0 auto 12px;
        }
        .faq-title {
          text-align: center;
          font-size: 30px;
          letter-spacing: 0.12em;
          color: #444;
          margin: 6px 0 4px;
          font-weight: 600;
        }
        .faq-sub {
          text-align: center;
          color: #777;
          font-size: 16px;
          letter-spacing: 0.14em;
          margin: 0 0 18px;
        }

        /* ===== Body ===== */
        .faq-body {
          max-width: 760px; /* 本文は細めのカラム */
          margin: 0 auto;
        }
        .faq-list {
          margin: 0;
          padding: 0;
        }
        .faq-item {
          margin: 18px 0 26px;
        }

        /* 質問（Q） */
        .faq-item dt {
          position: relative;
          margin: 0 0 8px;
          padding-left: 2.1em; /* Q. の分だけ字下げ */
          font-size: 20.5px;
          line-height: 2;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #3f3f3f;
        }
        .faq-item dt::before {
          content: "Q.";
          position: absolute;
          left: 0;
          top: 0;
          color: #333;
          font-weight: 700;
          letter-spacing: 0.06em;
        }

        /* 回答（A） */
        .faq-item dd {
          position: relative;
          margin: 0;
          padding-left: 2.1em; /* A. の分だけ字下げ */
          font-size: 21.5px;
          line-height: 2;
          letter-spacing: 0.04em;
          color: #555;
        }
        .faq-item dd::before {
          content: "A.";
          position: absolute;
          left: 0;
          top: 0;
          color: #333;
          font-weight: 700;
          letter-spacing: 0.06em;
        }

        /* ===== Responsive ===== */
        @media (max-width: 640px) {
          .faq-rule {
            max-width: 100%;
            margin-bottom: 10px;
          }
          .faq-title {
            font-size: 20px;
            margin-bottom: 2px;
          }
          .faq-sub {
            font-size: 12px;
            margin-bottom: 16px;
          }
          .faq-body {
            max-width: 100%;
          }
          .faq-item dt {
            font-size: 15px;
            line-height: 1.9;
          }
          .faq-item dd {
            font-size: 14.5px;
            line-height: 1.9;
          }
        }
      `}</style>
    </>
  );
}
