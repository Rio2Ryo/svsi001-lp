"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useI18n } from "../lib/i18n";

export default function FeatureSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  const { t } = useI18n();
  const tr = (key) => t(key) ?? "";

  // 画像ALT
  const altBanner = tr("feature.alt.banner");
  const altRack   = tr("feature.alt.rack");
  const altSilica = tr("feature.alt.silica");

  // 見出し・リード
  const title   = tr("feature.title");   // e.g. "What is Mother Vegetables?"
  const lead    = tr("feature.lead");    // 改行含むテキスト

  // メリットブロック
  const meritTitle = tr("feature.merit.title");
  const meritListIdx = [0, 1, 2, 3, 4];

  // 従来製法ブロック
  const convTitle = tr("feature.conventional.title");
  const convP1    = tr("feature.conventional.p1");
  const convP2    = tr("feature.conventional.p2");

  // コールアウト
  const calloutP  = tr("feature.callout.p");
  const calloutNote = tr("feature.callout.note");

  // インライン用（グラデのみ使用）
  const styles = {
    grayGradient: {
      background:
        "linear-gradient(90deg, #e6e6e6 0%, #eeeeee 45%, rgba(238,238,238,0) 85%)",
    },
  };

  return (
    <>
      <section className={`mother-veg ${isVisible ? "is-visible" : ""}`}>
        <div className="container">
          {/* ===== TOP banner ===== */}
          <div className="mv-banner">
            <Image
              src="/mv-banner.jpg"
              alt={altBanner}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 980px"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* ===== Title & lead ===== */}
          <h2 className="mv-title ja-serif">{title}</h2>
          <p className="mv-text">
            {(lead || "").split("\n").map((line, i) => (
              <span key={`lead-${i}`}>
                {line}
                <br />
              </span>
            ))}
          </p>

          {/* ===== Benefits + rack ===== */}
          <div className="mv-info">
            <div className="mv-info-text">
              <h3 className="mv-subtitle">{meritTitle}</h3>
              <ul className="mv-list">
  {meritListIdx.map((i) => {
    const item = tr(`feature.merit.list.${i}`);
    return item ? (
      <li key={`merit-${i}`}>
        {item.split("\n").map((line, idx) => (
          <span key={idx}>
            {line}
            <br />
          </span>
        ))}
      </li>
    ) : null;
  })}
</ul>
            </div>
            <div className="mv-info-img">
              <Image
                src="/mv-rack.jpg"
                alt={altRack}
                fill
                sizes="(max-width: 1024px) 48vw, 360px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          {/* ===== Conventional method ===== */}
          <div className="mv-info mv-info-single">
  <div className="mv-info-text">
    <h3 className="mv-subtitle">
      {(convTitle || "").split("\n").map((line, i) => (
        <span key={`title-${i}`}>
          {line}
          <br />
        </span>
      ))}
    </h3>
    <p className="mv-paragraph">
      {(convP1 || "").split("\n").map((line, i) => (
        <span key={`p1-${i}`}>
          {line}
          <br />
        </span>
      ))}
    </p>
    <p className="mv-paragraph">
      {(convP2 || "").split("\n").map((line, i) => (
        <span key={`p2-${i}`}>
          {line}
          <br />
        </span>
      ))}
    </p>
  </div>
</div>

          {/* ===== Callout：左→右の灰グラ + 右に silica.png（拡大） ===== */}
          <div className="mv-callout">
            {/* 背景グラデーション（最背面） */}
            <div className="mv-gradient" style={styles.grayGradient} />

            {/* 右のパウダー画像（拡大・右寄せ） */}
            <div className="mv-powder">
              <Image
                src="/silica.png"
                alt={altSilica}
                fill
                sizes="(max-width: 1024px) 100vw, 980px"
                style={{ objectFit: "contain", objectPosition: "right center" }}
                priority
              />
            </div>

            {/* 左のテキスト */}
            <div className="mv-callout-box">
              <p>
                {(calloutP || "").split("\n").map((line, i) => (
                  <span key={`co-${i}`}>
                    {line}
                    <br />
                  </span>
                ))}
                <span className="mv-note">{calloutNote}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== styled-jsx ===== */}
      <style jsx>{`
        .mother-veg {
          background: #ffffff;
          color: #3a3a3a;
          padding: 36px 16px 84px;
        }
        .is-visible {
          animation: fadeInUp 0.7s ease-out both;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate3d(0, 8px, 0); }
          to   { opacity: 1; transform: translateZ(0); }
        }

        .container { max-width: 1124px; margin: 0 auto; }

        /* ===== Banner ===== */
        .mv-banner {
          position: relative;
          height: 400px;
          margin: 10px auto 28px;
          overflow: hidden;
          background: #e9efe8;
        }

        /* ===== Title & lead ===== */
        .ja-serif {
          font-family: "Yu Mincho", "Hiragino Mincho ProN", "Noto Serif JP",
            "Hiragino Kaku Gothic ProN", serif;
        }
        .mv-title {
          margin: 36px 0 14px;
          text-align: center;
          font-weight: 400;
          font-size: 38px;
          letter-spacing: 0.08em;
          color: #444;
        }
        .mv-text {
          text-align: center;
          margin: 0 auto 46px;
          max-width: 890px;
          font-size: 22px;
          line-height: 2.1;
          letter-spacing: 0.06em;
          color: #555;
        }

        /* ===== Info rows ===== */
        .mv-info {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 28px;
          align-items: start;
          margin: 100px 0 100px 0;
        }
        .mv-info-single { grid-template-columns: 1fr; }
        .mv-info-text { min-width: 0; }
        .mv-info-img {
          position: relative;
          height: 400px;
          background: #f0f0f0;
          overflow: hidden;
        }
        .mv-subtitle {
          margin: 0 0 14px;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #4a4a4a;
        }
        .mv-list { list-style: none; padding: 0; margin: 0; }
        .mv-list li {
          font-size: 22px;
          line-height: 1.5;
          letter-spacing: 0.04em;
          margin: 6px 0;
          color: #555;
        }
        .mv-paragraph {
          margin: 8px 0 10px;
          font-size: 22px;
          line-height: 1.5;
          letter-spacing: 0.04em;
          color: #555;
        }

        /* ===== Callout（左グラ + 右 silica.png 拡大） ===== */
        .mv-callout {
          position: relative;
          padding:30px;
          margin: 38px 0 0;
          overflow: visible;
          background: transparent;
        }
        .mv-gradient {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .mv-powder {
          position: absolute;
          inset: 0;
          right: -8%;
          z-index: 1;
          pointer-events: none;
          transform: scale(1.45);
          transform-origin: right center;
        }
        .mv-callout-box {
          position: relative;
          z-index: 2;
          display: inline-block;
          background: transparent;
          padding: 0;
          margin: 18px 0 0 16px;
          max-width: 680px;
          color: #4a4a4a;
        }
        .mv-callout-box p {
          margin: 0;
          font-weight: bold;
          font-size: 23px;
          line-height: 1.5;
          letter-spacing: 0.04em;
        }
        .mv-note { color: #7a7a7a; font-size: 13px; }

        /* ===== Responsive ===== */
        @media (max-width: 1024px) {
          .mv-info { grid-template-columns: 1fr 300px; }
          .mv-info-img { height: 260px; }
          .mv-callout { min-height: 320px; }
          .mv-powder { right: -12%; transform: scale(1.3); }
          .mv-callout-box { max-width: 620px; }
        }
        @media (max-width: 720px) {
          .mv-banner { height: 240px; }
          .mv-title { font-size: 28px; }
          .mv-text { font-size: 15px; margin-bottom: 36px; }
          .mv-info { grid-template-columns: 1fr; }
          .mv-info-img { order: -1; height: 220px; }
          .mv-callout { min-height: 280px; }
          .mv-powder { right: -16%; transform: scale(1.15); }
          .mv-callout-box { margin: 16px 12px 0 12px; max-width: none; }
        }
        @media (max-width: 420px) {
          .mv-title { font-size: 24px; letter-spacing: 0.06em; }
          .mv-callout { min-height: 240px; }
        }
        /* ===== ▼スマホ専用の見た目調整（PCは一切変更しない） ===== */
@media (max-width: 720px) {
  /* セクション全体の余白を少し詰める */
  .mother-veg { padding: 28px 14px 64px; }

  /* 見出し・リードは現状どおりでOK。本文サイズだけ少し下げる */
  .mv-text { font-size: 15px; line-height: 1.9; }

  /* ---- Calloutを「左テキスト＋右下に小さめ粉」のカード風に ---- */
  .mv-callout {
    position: relative;
    margin: 22px 0 0;
    padding: 18px 16px 18px;       /* 文字のための余白を確保 */
    background: #f3f3f3;           /* 1枚目のような薄グレー帯 */
    border-radius: 6px;
    min-height: auto;              /* 自動にして高さ暴れを防止 */
    overflow: hidden;
  }
  /* グラデ背景はスマホでは非表示（1枚目に合わせてフラット） */
  .mv-gradient { display: none; }

  /* パウダー画像は右下の小ぶりなサムネ風に固定配置 */
  .mv-powder {
    inset: auto;                   /* いったんリセット */
    position: absolute;
    right: 10px;
    bottom: 8px;
    width: 84px;                   /* 小さく見せる：端末幅に依存しない固定値 */
    height: 84px;
    transform: none;               /* スケール解除 */
    z-index: 1;
    opacity: 0.9;                  /* うっすら */
  }
  .mv-powder :global(img) {
    object-fit: contain;
    object-position: right bottom; /* 右下寄せで粉がはみ出さない */
  }

  /* テキストボックスは幅いっぱい・読みやすいサイズに */
  .mv-callout-box {
    margin: 0;
    max-width: none;
    padding-right: 0px!important;          /* 右下の粉と重ならない余白 */
    z-index: 2;
  }
  .mv-callout-box p {
    font-size: 16px;
    line-height: 1.9;
    letter-spacing: 0.03em;
    font-weight: 600;              /* 1枚目の“太め”ニュアンス */
  }
  .mv-note { display: block; margin-top: 6px; font-size: 12px; }

  /* 画像＋テキストの2カラムはスマホで縦並び（既存踏襲） */
  .mv-info { grid-template-columns: 1fr; margin: 30px 0; }
  .mv-info-img { order: -1; height: 200px; }
}

/* さらに小さい端末で微調整 */
@media (max-width: 420px) {
  .mv-title { font-size: 24px; letter-spacing: 0.06em; }
  .mv-callout { padding: 16px 14px; }
  .mv-powder { right: 8px; bottom: 6px; width: 74px; height: 74px; }
  .mv-callout-box { padding-right: 96px; }
  .mv-callout-box p { font-size: 15px; line-height: 1.85; }
}
/* ===== スマホ専用：タイトル＆本文の整列を①に合わせる ===== */
@media (max-width: 720px) {
  /* バナーの直下の余白は少しだけ */
  .mv-banner { height: 200px; margin: 8px 0 18px; }

  /* 見出し：左揃え・1行で収まるサイズ感に */
  .mv-title {
    text-align: center;
    font-size: 20px;
    line-height: 1.45;
    max-width: 90%;
    letter-spacing: .02em;
    margin: 16px auto 10px;   /* 左右16pxで本文と揃える */
    white-space: nowrap;      /* 可能なら1行に保持 */
  }

  /* 本文：左揃え＆行送りを統一。各行をblock化して“揃って見える”ように */
  .mv-text {
    text-align: left;
    font-size: 15px;
    line-height: 1.9;
    letter-spacing: .02em;
    max-width: 90%;
    margin: 0 auto 26px;      /* タイトルと同じ左位置で揃える */
  }
  .mv-text span { display: block; } /* 1行＝1ブロックにして左端をピタッと揃える */

  /* セクション全体の左右パディングも本文と一致させる */
  .mother-veg { padding: 28px 14px 64px; }
}

/* さらに狭い端末の微調整（超過回避） */
@media (max-width: 380px) {
  .mv-title { font-size: 18px; white-space: normal; } /* 溢れそうなら2行許可 */
  .mv-text  { font-size: 14px; line-height: 1.85; }
}
/* ===== スマホ専用：メリット箇条書き＆通常製法の整列 ===== */
@media (max-width: 720px) {
  /* 見出しは少し小さめ＆左寄せで詰める */
  .mv-subtitle {
    font-size: 18px;
    letter-spacing: .06em;
    margin: 0 16px 10px;
    text-align: left;
  }

  /* 箇条書き：ぶら下げインデント＋改行の強制をオフにして整列 */
  .mv-list { margin: 0 16px 8px; padding: 0; }
  .mv-list li {
    font-size: 15px;
    line-height: 1.9;
    letter-spacing: .02em;
    margin: 6px 0 10px;
    padding-left: 1.3em;   /* 2行目以降の字下げ量 */
    text-indent: -1.3em;   /* 1行目だけ左に出す（○や・が先頭に来る） */
    word-break: normal;
    line-break: strict;
  }
  .mv-list li br { display: none; }       /* i18nの改行を無効化して自然折返しに */
  .mv-list li span { display: inline; }   /* 1行を連結して扱う */

  /* 通常製法の本文も同様に“段落として自然折返し”に揃える */
  .mv-paragraph {
    font-size: 15px;
    line-height: 1.9;
    letter-spacing: .02em;
    text-align: left;
    margin: 6px 16px 10px;
  }
  .mv-paragraph br { display: none; }     /* 不要な強制改行を抑止 */

  /* セクション全体の左右の余白を合わせる（揃って見える効果） */
  .mother-veg { padding: 28px 14px 64px; }
}

/* さらに狭い端末微調整 */
@media (max-width: 390px) {
  .mv-subtitle { font-size: 17px; }
  .mv-list li, .mv-paragraph { font-size: 14.5px; line-height: 1.85; }
}



      `}</style>
    </>
  );
}
