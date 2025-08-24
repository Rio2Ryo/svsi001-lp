"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useI18n } from "../lib/i18n";

export default function ConceptSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  const { t } = useI18n();
  const tr = (key) => t(key) ?? "";

  const certTitle = tr("concept.title");

  const altCosmos = tr("concept.alt.cosmos");
  const altHalal  = tr("concept.alt.halal");
  const altVegan  = tr("concept.alt.vegan");
  const altBanner = tr("concept.alt.banner");

  const countryIdx   = [0, 1, 2];
  const leftCertIdx  = [0, 1, 2];

  const bannerIdx = [0, 1, 2];
  const descIdx   = [1, 2];
  const bulletIdx = [0, 1, 2, 3, 4, 5, 6];
  const noteIdx   = [0, 1, 2];

  const styles = {
    bannerOverlay: {
      background:
        "linear-gradient(90deg, rgba(255,255,255,.92) 0%, rgba(255,255,255,.78) 34%, rgba(255,255,255,.40) 58%, rgba(255,255,255,0) 78%)",
    },
    hrLight: { background: "#d9d9d9", height: 1, width: "100%" },
  };

  return (
    <>
      <section id="ConceptSection" className={`concept-section ${isVisible ? "is-visible" : ""}`}>
        <div className="container">
          <h2 className="cert-title">{certTitle}</h2>

          <div className="cert-logos">
            <Image src="/ORGANIC_1.png" alt={altCosmos} width={98} height={98} />
            <Image src="/JHCPO_1.png" alt={altHalal}  width={111} height={98} />
            <Image src="/VEGAN.png"    alt={altVegan}  width={109} height={98} />
          </div>

          {/* ====== 上段：国ごとの規格（縦ラインはこのブロック内だけ） ====== */}
          <div className="cert-table">
            <div className="cert-left">
              {countryIdx.map((i) => {
                const c = tr(`concept.countries.${i}`);
                return c ? <p key={`c-${i}`}>{c}</p> : null;
              })}
            </div>
            <div className="cert-divider" />
            <div className="cert-right">
              {countryIdx.map((i) => {
                const g = tr(`concept.countryGrades.${i}`);
                return g ? <p key={`g-${i}`}>{g}</p> : null;
              })}
            </div>
          </div>

          {/* ====== 下段：認証（縦ラインはこのブロック内だけ） ====== */}
          <div className="cert-table">
            <div className="cert-left">
              {leftCertIdx.map((i) => {
                const text = tr(`concept.leftCerts.${i}`);
                return text ? <p key={`lc-${i}`}>{text}</p> : null;
              })}
            </div>
            <div className="cert-divider" />
            <div className="cert-right">
              {leftCertIdx.map((i) => {
                const d = tr(`concept.rightCertDescs.${i}`);
                return d ? <p key={`rc-${i}`}>{d}</p> : null;
              })}
            </div>
          </div>
        </div>

        {/* ===== バナー ===== */}
        <div className="container">
          <div className="ms-banner">
            <Image
              src="/ms-banner.jpg"
              alt={altBanner}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
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

      <style jsx>{`
        :global(html) { scroll-behavior: smooth; }
        .concept-section { background: #ffffff; color: #3a3a3a; padding: 32px 16px 10px; }
        .is-visible { animation: fadeInUp 0.8s ease-out both; }
        @keyframes fadeInUp { from { opacity: 0; transform: translate3d(0,10px,0); } to { opacity: 1; transform: translateZ(0); } }

        /* ★ ラッパーを拡張 */
        .container { max-width: 1320px; margin: 0 auto; }

        .cert-title {
          text-align: center; font-weight: 600; font-size: 26px;
          letter-spacing: 0.12em; margin: 8px 0 24px; color: #444;
        }

        .cert-logos {
          display: flex; justify-content: center; align-items: center;
          gap: 1px; margin: 8px 0 36px;
        }

        /* ===== 表風2カラム（上下2ブロック） ===== */
        .cert-table {
          display: flex; align-items: stretch; justify-content: center;
          gap: 32px; max-width: 1320px; margin: 0 auto 36px;
        }
        .cert-left, .cert-right { display: grid; row-gap: 10px; }

        /* ★ 左列を広げ、長文が1行に収まるように。フォントも少し小さく */
        .cert-left {
          width: 420px;                      /* 240 → 420 */
          justify-items: end;
          color: #4b4b4b;
          letter-spacing: 0.06em;            /* 詰めて幅節約 */
        }
        .cert-right { flex: 1; min-width: 0; color: #555; letter-spacing: 0.01em; }

        /* ★ フォント少しだけ小さく（24 → 22） */
        .cert-left p, .cert-right p { margin: 0; line-height: 1.6; font-size: 22px; }
        /* 長文を1行で（PC時） */
        .cert-left p { white-space: nowrap; }

        .cert-divider { width: 1px; background: #d9d9d9; align-self: stretch; }
        .cert-divider-mobile { display: none; }

        /* ===== バナー ===== */
        .ms-banner {
          position: relative; height: 420px; max-width: 1024px;
          margin: 56px auto 40px; overflow: hidden;
        }
        .ms-banner-text {
          position: absolute; z-index: 2; top: 56px; left: 44px;
          color: rgba(58,58,58,.9); font-size: 32px; line-height: 1.6;
          letter-spacing: 0.14em; text-shadow: 0 1px 1px rgba(255,255,255,.45);
        }
        .ja-serif {
          font-family: "Yu Mincho","Hiragino Mincho ProN","Noto Serif JP","Hiragino Kaku Gothic ProN",serif;
          font-weight: 600;
        }

        .ms-description { max-width: 880px; margin: 0 auto; color: #4a4a4a; }
        .ms-description p { margin: 22px 0; font-size: 22px; line-height: 1.6; letter-spacing: 0.06em; }
        .ms-list { list-style: none; padding: 0; margin: 28px 0 16px; }
        .ms-list li { margin: 10px 0; font-size: 20px; line-height: 1.4; letter-spacing: 0.04em; }
        .ms-note { margin-top: 18px; color: #888; font-size: 16px!important; line-height: 1.9; letter-spacing: 0.04em; }

        /* ===== レスポンシブ ===== */
        @media (max-width: 1200px) {
          .cert-left { width: 360px; }
        }
        @media (max-width: 1024px) {
          .cert-table { margin-bottom: 28px; gap: 24px; }
          .ms-banner { height: 360px; }
        }
        @media (max-width: 760px) {
          .cert-table { display: grid; grid-template-columns: 1fr; gap: 0; }
          .cert-divider { display: none; }
          .cert-left, .cert-right { width: 100%; justify-items: start; }
          .cert-left p { white-space: normal; }   /* SPでは改行OK */
          .ms-banner { height: 260px; margin: 44px auto 32px; }
          .ms-banner-text { top: 28px; left: 20px; font-size: 22px; letter-spacing: 0.12em; line-height: 1.8; }
          .ms-description p, .ms-list li { font-size: 15px; line-height: 1.9; }
        }
        @media (max-width: 760px) {
  /* タイトルとロゴを縮小 */
  .cert-title { font-size: 18px; letter-spacing: .08em; margin: 0 0 10px; }
  .cert-logos { gap: 10px; margin: 6px 0 16px; }
  .cert-logos :global(img) { width: 62px; height: auto; }

  /* ←最重要：SPでも 〔左｜縦線｜右〕の3カラムを維持 */
  .cert-table{
    display: grid !important;
    grid-template-columns: minmax(5.6em, 7.2em) 1px 1fr !important; /* 左列は狭め固定 */
    column-gap: 12px !important;
    row-gap: 0 !important;
    align-items: start !important;
    margin: 8px 0 18px !important;
  }
  .cert-divider{ display: block !important; background:#d9d9d9; }

  /* 左右の列は“グリッドのまま”保持（行対応を崩さない） */
  .cert-left,
  .cert-right{ display: grid !important; row-gap: 8px !important; width: auto !important; }

  /* 左ラベル（PC同様に右寄せ＆1行固定） */
  .cert-left{ justify-items: end; }
  .cert-left p{
    margin: 5px 0;
    font-weight: 700;
    font-size: 10px;
    letter-spacing: .04em;
    white-space: pre-wrap !important;
    text-align: right;
    color: #333;
  }

  /* 右説明（自然折返し） */
  .cert-right{ justify-items: start; }
  .cert-right p{
    margin: 4px 0;
    font-size: 10px;
    line-height: 1.85;
    letter-spacing: .02em;
    word-break: keep-all;
    color: #444;
  }
}

/* さらに狭い端末 */
@media (max-width: 390px){
  .cert-logos :global(img){ width: 56px; }
  .cert-table{ grid-template-columns: minmax(5.1em, 6.6em) 1px 1fr !important; column-gap: 10px !important; }
  .cert-left p, .cert-right p{ font-size: 9px; line-height: 1.6; }
}
      `}</style>
    </>
  );
}
