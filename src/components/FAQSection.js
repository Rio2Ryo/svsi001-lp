"use client";
import { useEffect, useState } from "react";
import { useI18n } from "../lib/i18n";

export default function FAQSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  const { t } = useI18n();
  const tr = (key) => t(key) ?? ""; // フォールバック無し（未登録は空に）

  const styles = { hr: { background: "#cfcfcf", height: 1, width: "100%" } };

  // 質問数：必要数に応じて増減可（辞書キーは faq.q1/faq.a1 ...）
  const qaIndexes = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const title = tr("faq.title");       // "FAQ" など
  const subtitle = tr("faq.subtitle"); // "よくあるご質問" など

  return (
    <>
      <section id="faq" className={`faq ${isVisible ? "is-visible" : ""}`}>
        <div className="container">
          <h2 className="faq-title ja-serif">{title}</h2>
          <p className="faq-sub">{subtitle}</p>
          <div className="faq-rule" style={styles.hr} />

          <div className="faq-body">
            <dl className="faq-list">
              {qaIndexes.map((i) => {
                const q = tr(`faq.q${i}`);
                const a = tr(`faq.a${i}`);
                if (!q && !a) return null; // 未定義はスキップ
                return (
                  <div className="faq-item" key={i}>
                    <dt>{q}</dt>
                    <dd>
                      {(a || "").split("\n").map((line, idx) => (
                        <span key={idx}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </dd>
                  </div>
                );
              })}
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
          max-width: 860px;
          margin: 0 auto 12px;
        }
        .faq-title {
          text-align: center;
          font-size: 32px;
          letter-spacing: 0.12em;
          color: #444;
          margin: 6px 0 4px;
          font-weight: 600;
        }
        .faq-sub {
          text-align: center;
          color: #777;
          font-size: 18px;
          letter-spacing: 0.14em;
          margin: 0 0 18px;
        }

        /* ===== Body ===== */
        .faq-body {
          max-width: 860px;
          margin: 0 auto;
        }
        .faq-list {
          margin: 0;
          padding: 0;
        }
        .faq-item {
          margin: 18px 0 26px;
        }

        /* Q */
        .faq-item dt {
          position: relative;
          margin: 0 0 8px;
          padding-left: 2.1em;
          font-size: 23.5px;
          line-height: 1.4;
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

        /* A */
        .faq-item dd {
          position: relative;
          margin: 0;
          padding-left: 2.1em;
          font-size: 23.5px;
          line-height: 1.4;
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
