"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useI18n } from "../lib/i18n";

export default function GuaranteeSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  const { t } = useI18n();
  const tr = (key) => t(key) ?? "";

  const styles = { hr: { background: "#cfcfcf", height: 1, width: "100%" } };
  const title = tr("usage.title");
  const items = [
    { img: "/usage-makeup.png", alt: tr("usage.items.0.alt"), h3: tr("usage.items.0.title"), p: tr("usage.items.0.body") },
    { img: "/usage-night.png",  alt: tr("usage.items.1.alt"), h3: tr("usage.items.1.title"), p: tr("usage.items.1.body") },
    { img: "/usage-smell.png",  alt: tr("usage.items.2.alt"), h3: tr("usage.items.2.title"), p: tr("usage.items.2.body") },
    { img: "/usage-allergy.png",alt: tr("usage.items.3.alt"), h3: tr("usage.items.3.title"), p: tr("usage.items.3.body") },
    { img: "/usage-acne.png",   alt: tr("usage.items.4.alt"), h3: tr("usage.items.4.title"), p: tr("usage.items.4.body") },
    { img: "/usage-shine.png",  alt: tr("usage.items.5.alt"), h3: tr("usage.items.5.title"), p: tr("usage.items.5.body") },
    { img: "/usage-spray.png",  alt: tr("usage.items.6.alt"), h3: tr("usage.items.6.title"), p: tr("usage.items.6.body") },
  ];

  return (
    <>
      <section id="usage" className={`usage ${isVisible ? "is-visible" : ""}`}>
        <div className="container">
          <h2 className="usage-title">{title}</h2>
          <div className="usage-rule" style={styles.hr} />

          <ul className="usage-list">
            {items.map((it, i) =>
              it.h3 || it.p ? (
                <li className="usage-item" key={i}>
                  <div className="usage-img-wrap">
                    <Image
                      src={it.img}
                      alt={it.alt || "usage"}
                      fill
                      sizes="(max-width: 640px) 90px, 120px"
                      className="usage-img"
                      priority={i === 0}
                    />
                  </div>
                  <div className="usage-text">
                    <h3>{it.h3}</h3>
                    <p>
                      {(it.p || "").split("\n").map((line, j) => (
                        <span key={`${i}-${j}`}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </section>

      <style jsx>{`
        .usage { background: #fff; color: #3a3a3a; padding: 32px 16px 72px; }
        .is-visible { animation: fadeInUp 0.8s ease-out both; }
        @keyframes fadeInUp { from { opacity: 0; transform: translate3d(0,10px,0); } to { opacity: 1; transform: translateZ(0); } }
        .container { max-width: 980px; margin: 0 auto; }

        .usage-rule { margin: 0 auto 16px; }
        .usage-title { text-align: center; font-weight: 600; font-size: 32px; color: #444; letter-spacing: .12em; margin: 0 0 18px; }

        .usage-list { list-style: none; padding: 0; margin: 0 auto; max-width: 860px; }

        /* 画像はPC=120×120固定 */
        .usage-item {
          display: grid;
          grid-template-columns: 120px 1fr;  /* ← 画像列を120px固定 */
          gap: 70px;
          align-items: center;
          padding: 14px 0;
        }
        .usage-img-wrap {
          position: relative;
          width: 120px;      /* ← PC固定 */
          height: 120px;     /* ← PC固定 */
          border-radius: 50%;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,.06);
        }
        .usage-img { object-fit: cover; }

        .usage-text h3 { margin: 0 0 6px; font-size: 24px; font-weight: 700; letter-spacing: .06em; color: #3f3f3f; }
        .usage-text p { margin: 0; font-size: 24px; line-height: 1.4; letter-spacing: .04em; color: #555; }

        /* スマホは90×90固定 */
        @media (max-width: 640px) {
          .usage { padding: 28px 12px 56px; }
          .usage-rule { width: 72%; margin: 0 auto 14px; }
          .usage-list { max-width: 92%; margin: 0 auto; }

          .usage-item {
            grid-template-columns: 90px 1fr;   /* ← 画像列を90px固定 */
            gap: 16px;
            align-items: start;
            padding: 14px 0;
          }
          .usage-img-wrap {
            width: 90px;     /* ← SP固定 */
            height: 90px;    /* ← SP固定 */
            box-shadow: 0 1px 3px rgba(0,0,0,.06);
          }
          .usage-text h3 { margin: 0 0 4px; font-size: 16px; line-height: 1.35; letter-spacing: .02em; font-weight: 700; color: #3f3f3f; }
          .usage-text p { margin: 0; font-size: 13px; line-height: 1.7; letter-spacing: .02em; color: #666; }
          .usage-title { font-size: 22px; }
          .usage-text p br { display: none; } .usage-text p span { display: inline; }
        }
      `}</style>
    </>
  );
}
