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
                  return item ? <li key={`merit-${i}`}>{item}</li> : null;
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
              <h3 className="mv-subtitle">{convTitle}</h3>
              <p className="mv-paragraph">{convP1}</p>
              <p className="mv-paragraph">
                {(convP2 || "").split("\n").map((line, i) => (
                  <span key={`conv-${i}`}>
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
          font-size: 20px;
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
      `}</style>
    </>
  );
}
