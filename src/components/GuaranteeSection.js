"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useI18n } from "../lib/i18n";

export default function GuaranteeSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  const { t } = useI18n();
  const tr = (key) => t(key) ?? "";

  // インライン（罫線など）
  const styles = { hr: { background: "#cfcfcf", height: 1, width: "100%" } };

  // タイトル
  const title = tr("usage.title");
  const items = [
    {
      img: "/usage-makeup.png",
      alt: tr("usage.items.0.alt"),
      h3: tr("usage.items.0.title"),
      p: tr("usage.items.0.body"),
    },
    {
      img: "/usage-night.png",
      alt: tr("usage.items.1.alt"),
      h3: tr("usage.items.1.title"),
      p: tr("usage.items.1.body"),
    },
    {
      img: "/usage-smell.png",
      alt: tr("usage.items.2.alt"),
      h3: tr("usage.items.2.title"),
      p: tr("usage.items.2.body"),
    },
    {
      img: "/usage-allergy.png",
      alt: tr("usage.items.3.alt"),
      h3: tr("usage.items.3.title"),
      p: tr("usage.items.3.body"),
    },
    {
      img: "/usage-acne.png",
      alt: tr("usage.items.4.alt"),
      h3: tr("usage.items.4.title"),
      p: tr("usage.items.4.body"),
    },
    {
      img: "/usage-shine.png",
      alt: tr("usage.items.5.alt"),
      h3: tr("usage.items.5.title"),
      p: tr("usage.items.5.body"),
    },
    {
      img: "/usage-spray.png",
      alt: tr("usage.items.6.alt"),
      h3: tr("usage.items.6.title"),
      p: tr("usage.items.6.body"),
    },
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
                  <Image
                    src={it.img}
                    alt={it.alt || "usage"}
                    width={130}
                    height={130}
                    className="usage-img"
                    priority={i === 0}
                  />
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
        .usage {
          background: #ffffff;
          color: #3a3a3a;
          padding: 32px 16px 72px;
        }
        .is-visible {
          animation: fadeInUp 0.8s ease-out both;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate3d(0, 10px, 0); }
          to   { opacity: 1; transform: translateZ(0); }
        }
        .container { max-width: 980px; margin: 0 auto; }

        /* 見出し＆罫線 */
        .usage-rule { margin: 0 auto 16px; }
        .usage-title {
          text-align: center; font-weight: 600; font-size: 32px;
          color: #444; letter-spacing: 0.12em; margin: 0 0 18px;
        }

        /* リスト */
        .usage-list { list-style: none; padding: 0; margin: 0 auto; max-width: 760px; }
        .usage-item {
          display: grid; grid-template-columns: 86px 1fr;
          gap: 70px; align-items: center; padding: 14px 0;
        }
        .usage-img {
          display: block; border-radius: 50%; object-fit: cover; background: #fff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
        }
        .usage-text h3 {
          margin: 0 0 6px; font-size: 24px; font-weight: 700;
          letter-spacing: 0.06em; color: #3f3f3f;
        }
        .usage-text p { margin: 0; font-size: 24px; line-height: 1.4; letter-spacing: 0.04em; color: #555; }

        /* レスポンシブ */
       /* ▼SP専用：②の見た目にあわせてタイポとレイアウトを最適化 */
@media (max-width: 640px) {
  .usage { padding: 28px 12px 56px; }

  /* 見出し下の細いルールは中央寄せで短めに */
  .usage-rule { width: 72%; margin: 0 auto 14px; }

  /* 横幅はやや狭くして行長を整える */
  .usage-list { max-width: 92%; margin: 0 auto; }

  /* 画像は小さめ・上揃え、本文との間隔は控えめに */
  .usage-item {
    grid-template-columns: 56px 1fr;
    gap: 16px;
    align-items: start;
    padding: 14px 0;
  }
  .usage-img {
    width: 56px;            /* ←サイズをCSSで固定 */
    height: 56px;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0,0,0,.06);
    object-fit: cover;
  }

  /* タイトルは少し大きめ、本文は小さめで読みやすく */
  .usage-text h3 {
    margin: 0 0 4px;
    font-size: 16px;
    line-height: 1.35;
    letter-spacing: .02em;
    font-weight: 700;
    color: #3f3f3f;
  }
  .usage-text p {
    margin: 0;
    font-size: 13px;
    line-height: 1.7;
    letter-spacing: .02em;
    color: #666;
  }

  /* i18nの強制改行を無効化して自然な折返しに */
  .usage-text p br { display: none; }
  .usage-text p span { display: inline; }
}

/* さらに狭い端末の微調整 */
@media (max-width: 390px) {
  .usage-item { grid-template-columns: 52px 1fr; gap: 14px; }
  .usage-img   { width: 52px; height: 52px; }
  .usage-text h3 { font-size: 15px; }
  .usage-text p  { font-size: 12.5px; }
}
/* ===== SP専用（～820px）：画像小さく・行間整え・改行無効化 ===== */
@media (max-width: 820px) {
  .usage { padding: 24px 12px 52px; }

  /* 細いルールを中央寄せで短めに */
  .usage-rule { width: 72%; margin: 0 auto 12px; }

  /* 行長を整えるためリスト幅を少し絞る */
  .usage-list { max-width: 92%; margin: 0 auto; }

  /* アイコン小さく、テキストは上揃え。左右の余白をタイトに */
  .usage-item {
    grid-template-columns: 48px 1fr !important;
    gap: 12px !important;
    align-items: flex-start !important;
    padding: 12px 0 !important;
  }

  /* next/imageのwidth/height属性より強く上書きする */
  .usage-img {
    width: 48px !important;
    height: 48px !important;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 1px 3px rgba(0,0,0,.06);
  }

  /* 見出しと本文のタイポ調整（②の密度） */
  .usage-text h3 {
    margin: 0 0 4px !important;
    font-size: 16px !important;
    line-height: 1.35 !important;
    letter-spacing: .02em !important;
    font-weight: 700;
    color: #3f3f3f;
  }
  .usage-text p {
    margin: 0 !important;
    font-size: 13px !important;
    line-height: 1.7 !important;
    letter-spacing: .02em !important;
    color: #666;
  }

  /* i18nの強制改行を無効化（styled-jsx対策で :global を使用） */
  .usage-text :global(br) { display: none !important; }
  .usage-text :global(span) { display: inline !important; }
}

/* さらに狭い端末の微調整 */
@media (max-width: 390px) {
  .usage-item { grid-template-columns: 44px 1fr !important; gap: 10px !important; }
  .usage-img   { width: 44px !important; height: 44px !important; }
  .usage-text h3 { font-size: 15px !important; }
  .usage-text p  { font-size: 12.5px !important; }
}
/* ★ 指定どおり強制適用 */
@media (max-width: 390px) {
  :global(.usage-item.jsx-28e1d467f86b2c93) {
    grid-template-columns: 30% 1fr !important;
    gap: 10px !important;
  }
}

/* ★ 画像は常に要素サイズ一杯に */
:global(img.usage-img) {
  width: 100% !important;
  height: 100% !important;
}



      `}</style>
    </>
  );
}
