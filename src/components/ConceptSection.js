"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useI18n } from "../lib/i18n";

export default function ConceptSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  const { t } = useI18n();
  const tr = (key) => t(key) ?? ""; // 未登録キーは空文字扱い

  // 見出し
  const certTitle = tr("concept.title");

  // 画像の代替テキスト
  const altCosmos = tr("concept.alt.cosmos"); // 例: "COSMOS ORGANIC"
  const altHalal  = tr("concept.alt.halal");  // 例: "HALAL"
  const altVegan  = tr("concept.alt.vegan");  // 例: "VEGAN"
  const altBanner = tr("concept.alt.banner"); // 例: "makeup and skincare banner"

  // 表の左列／右列（国と規格・認証名と説明）
  const countryIdx = [0, 1, 2];
  const leftCertIdx = [0, 1, 2];

  // バナーの行、本文パラグラフ、箇条書き、注意書き
  const bannerIdx = [0, 1, 2];
  const descIdx = [1, 2];
  const bulletIdx = [0, 1, 2, 3, 4, 5, 6];
  const noteIdx = [0, 1, 2];

  // inline 用（バナーの白グラデ／スマホ横罫線）
  const styles = {
    bannerOverlay: {
      background:
        "linear-gradient(90deg, rgba(255,255,255,.92) 0%, rgba(255,255,255,.78) 34%, rgba(255,255,255,.40) 58%, rgba(255,255,255,0) 78%)",
    },
    hrLight: { background: "#d9d9d9", height: 1, width: "100%" },
  };

  return (
    <>
      <section
        id="ConceptSection"
        className={`concept-section ${isVisible ? "is-visible" : ""}`}
      >
        {/* ===== 認証エリア ===== */}
        <div className="container">
          <h2 className="cert-title">{certTitle}</h2>

          <div className="cert-logos">
            <Image src="/ORGANIC_1.png" alt={altCosmos} width={85} height={85} />
            <Image src="/JHCPO_1.png" alt={altHalal}  width={101} height={88} />
            <Image src="/VEGAN.png"    alt={altVegan}  width={99} height={88} />
          </div>

          <div className="cert-table">
            <div className="cert-left">
              {/* 左列：国名 */}
              {countryIdx.map((i) => {
                const c = tr(`concept.countries.${i}`);
                return c ? <p key={`c-${i}`}>{c}</p> : null;
              })}

              <div className="cert-divider-mobile" style={styles.hrLight} />

              {/* 左列：認証名 */}
              {leftCertIdx.map((i) => {
                const text = tr(`concept.leftCerts.${i}`);
                return text ? <p key={`lc-${i}`}>{text}</p> : null;
              })}
            </div>

            <div className="cert-divider" />

            <div className="cert-right">
              {/* 右列：国ごとの規格説明 */}
              {countryIdx.map((i) => {
                const g = tr(`concept.countryGrades.${i}`);
                return g ? <p key={`g-${i}`}>{g}</p> : null;
              })}

              <div className="cert-divider-mobile" style={styles.hrLight} />

              {/* 右列：認証の説明 */}
              {leftCertIdx.map((i) => {
                const d = tr(`concept.rightCertDescs.${i}`);
                return d ? <p key={`rc-${i}`}>{d}</p> : null;
              })}
            </div>
          </div>
        </div>

        {/* ===== バナー（テキスト左上） ===== */}
        <div className="container">
          <div className="ms-banner">
            <Image
              src="/ms-banner.jpg"
              alt={altBanner}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              style={{ objectFit: "cover" }}
            />
            <div className="ms-banner-overlay" style={styles.bannerOverlay} />
            <div className="ms-banner-text ja-serif">
              {bannerIdx.map((i) => {
                const line = tr(`concept.banner.${i}`);
                return line ? (
                  <span key={`bl-${i}`}>
                    {line}
                    <br />
                  </span>
                ) : null;
              })}
            </div>
          </div>

          {/* ===== 説明文 ===== */}
          <div className="ms-description">
            {descIdx.map((i) => {
              const paragraph = tr(`concept.desc.p${i}`);
              if (!paragraph) return null;
              return (
                <p key={`d-${i}`}>
                  {paragraph.split("\n").map((line, j) => (
                    <span key={`d${i}-${j}`}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              );
            })}

            <ul className="ms-list">
              {bulletIdx.map((i) => {
                const b = tr(`concept.list.${i}`);
                return b ? <li key={`b-${i}`}>{b}</li> : null;
              })}
            </ul>

            <p className="ms-note">
              {noteIdx.map((i) => {
                const n = tr(`concept.note.${i}`);
                return n ? (
                  <span key={`n-${i}`}>
                    {n}
                    <br />
                  </span>
                ) : null;
              })}
            </p>
          </div>
        </div>
      </section>

      {/* ===== styled-jsx ===== */}
      <style jsx>{`
        :global(html) { scroll-behavior: smooth; }
        .concept-section { background: #ffffff; color: #3a3a3a; padding: 32px 16px 10px; }
        .is-visible { animation: fadeInUp 0.8s ease-out both; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate3d(0, 10px, 0); }
          to   { opacity: 1; transform: translateZ(0); }
        }

        .container { max-width: 980px; margin: 0 auto; }

        /* 見出し */
        .cert-title {
          text-align: center; font-weight: 600; font-size: 26px;
          letter-spacing: 0.12em; margin: 8px 0 24px; color: #444;
        }

        /* ロゴ列 */
        .cert-logos {
          display: flex; justify-content: center; align-items: center;
          gap: 26px; margin: 8px 0 36px;
        }

        /* 表風 2カラム（左：項目、右：説明） */
        .cert-table {
          display: flex; align-items: flex-start; justify-content: center;
          gap: 28px; max-width: 880px; margin: 0 auto 68px;
        }
        .cert-left, .cert-right { display: grid; row-gap: 10px; }
        .cert-left {
          width: 240px; justify-items: end; color: #4b4b4b; letter-spacing: 0.12em;
        }
        .cert-right { flex: 1; min-width: 0; color: #555; letter-spacing: 0.02em; }
        .cert-left p, .cert-right p { margin: 0; line-height: 2; font-size: 22px; }
        .cert-divider { width: 1px; background: #d9d9d9; align-self: stretch; }
        .cert-divider-mobile { display: none; margin: 8px 0; }

        /* バナー */
        .ms-banner {
          position: relative; height: 420px; max-width: 1024px;
          margin: 56px auto 40px; overflow: hidden;
        }
        .ms-banner-text {
          position: absolute; z-index: 2; top: 56px; left: 44px;
          color: rgba(58,58,58,.9); font-size: 32px; line-height: 1.9;
          letter-spacing: 0.14em; text-shadow: 0 1px 1px rgba(255,255,255,.45);
        }
        .ja-serif {
          font-family: "Yu Mincho","Hiragino Mincho ProN","Noto Serif JP","Hiragino Kaku Gothic ProN",serif;
          font-weight: 300;
        }

        /* 説明テキスト */
        .ms-description { max-width: 880px; margin: 0 auto; color: #4a4a4a; }
        .ms-description p { margin: 22px 0; font-size: 22px; line-height: 1.6; letter-spacing: 0.06em; }
        .ms-list { list-style: none; padding: 0; margin: 28px 0 16px; }
        .ms-list li { margin: 10px 0; font-size: 20px; line-height: 1.4; letter-spacing: 0.04em; }
        .ms-note { margin-top: 18px; color: #888; font-size: 12px; line-height: 1.9; letter-spacing: 0.04em; }

        /* レスポンシブ */
        @media (max-width: 1024px) {
          .cert-table { margin-bottom: 56px; }
          .ms-banner { height: 360px; }
        }
        @media (max-width: 640px) {
          .cert-logos { gap: 32px; }
          .cert-table { display: grid; grid-template-columns: 1fr; gap: 0; }
          .cert-divider { display: none; }
          .cert-left, .cert-right { width: 100%; justify-items: start; }
          .cert-left { margin-bottom: 8px; }
          .cert-left p { text-align: left; }
          .cert-divider-mobile { display: block; }

          .ms-banner { height: 260px; margin: 44px auto 32px; }
          .ms-banner-text { top: 28px; left: 20px; font-size: 22px; letter-spacing: 0.12em; line-height: 1.8; }
          .ms-description p, .ms-list li { font-size: 15px; line-height: 1.9; }
        }
      `}</style>
    </>
  );
}
