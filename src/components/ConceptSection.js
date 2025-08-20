"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useI18n } from "../lib/i18n";

export default function ConceptSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  const { t } = useI18n();
  const tr = (key, fallback) => {
    const v = t(key);
    return v == null || v === key ? fallback : v;
  };

  // ====== 文言（辞書→無ければ日本語） ======
  const certTitle = tr(
    "concept.title",
    "国際的な信頼と品質基準をすべてクリア"
  );

  const countries = [
    tr("concept.countries.0", "日本"),
    tr("concept.countries.1", "オーストラリア"),
    tr("concept.countries.2", "アメリカ"),
  ];
  const countryGrades = [
    tr("concept.countryGrades.0", "医薬部外品原料規格"),
    tr("concept.countryGrades.1", "医薬部外品原料規格"),
    tr(
      "concept.countryGrades.2",
      "FDA基準のpremium food grade をクリア（口に入れても安心）"
    ),
  ];

  const leftCerts = [
    tr("concept.leftCerts.0", "国際オーガニック認証"),
    tr("concept.leftCerts.1", "ヴィーガン認証"),
    tr("concept.leftCerts.2", "ハラール認証"),
  ];
  const rightCertDescs = [
    tr("concept.rightCertDescs.0", "COSMOS認証取得（オーガニック化粧品の世界基準）"),
    tr("concept.rightCertDescs.1", "動物性成分不使用・動物実験なし"),
    tr("concept.rightCertDescs.2", "イスラム教徒も安心して使用できる認証取得"),
  ];

  const bannerLines = [
    tr("concept.banner.0", "メイクもスキンケアも"),
    tr("concept.banner.1", "たったこれだけで"),
    tr("concept.banner.2", "24時間ずっときれい"),
  ];

  const desc1 = tr(
    "concept.desc.p1",
    "混ぜるだけであなたのコスメがデパコスクオリティーになる\nお化粧前や、お肌の気になるところにさっと塗って\n変化を実感してください。"
  );
  const desc2 = tr(
    "concept.desc.p2",
    "就寝前にも使用できるので\n24時間、たったこれだけであなたのお肌が育ちます。"
  );

  const bullets = [
    tr("concept.list.0", "・キメを整えて、ふんわり明るい印象に"),
    tr("concept.list.1", "・メイクがきれいにのる肌に導き、崩れにくさもサポート"),
    tr("concept.list.2", "・日中のテカリや皮脂汚れをおだやかにおさえ、清潔感ある肌印象へ"),
    tr("concept.list.3", "・デリケートな肌にもやさしく、季節の変わり目の不安定な肌をすこやかに保ちます"),
    tr("concept.list.4", "・爪や髪にも使え、つややかな質感をそっと引き出します"),
    tr("concept.list.5", "・酸化や外的ダメージから肌を守る、シンプルで頼れるベースケア"),
    tr("concept.list.6", "・アレルギー/アトピー体質の肌にも対応しています"),
  ];

  const noteLines = [
    tr("concept.note.0", "※当商品は化粧品です。"),
    tr("concept.note.1", "※厚生労働省医薬外品原料規格を満たしたオーガニックシリカです。"),
    tr("concept.note.2", "※お肌に異常がある場合は使用をお控えください。"),
  ];

  // inline 用（バナーの白グラデ／スマホ用の横罫線）
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
            <Image src="/ORGANIC_1.png" alt="COSMOS ORGANIC" width={85} height={85} />
            <Image src="/JHCPO_1.png" alt="HALAL" width={101} height={88} />
            <Image src="/VEGAN.png" alt="VEGAN" width={99} height={88} />
          </div>

          <div className="cert-table">
            <div className="cert-left">
              {countries.map((c, i) => (
                <p key={`c-${i}`}>{c}</p>
              ))}

              <div className="cert-divider-mobile" style={styles.hrLight} />

              {leftCerts.map((c, i) => (
                <p key={`lc-${i}`}>{c}</p>
              ))}
            </div>

            <div className="cert-divider" />

            <div className="cert-right">
              {countryGrades.map((g, i) => (
                <p key={`g-${i}`}>{g}</p>
              ))}

              <div className="cert-divider-mobile" style={styles.hrLight} />

              {rightCertDescs.map((d, i) => (
                <p key={`rc-${i}`}>{d}</p>
              ))}
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
              sizes="(max-width: 1024px) 100vw, 1024px"
              style={{ objectFit: "cover" }}
            />
            <div className="ms-banner-overlay" style={styles.bannerOverlay} />
            <div className="ms-banner-text ja-serif">
              {bannerLines.map((line, i) => (
                <span key={`bl-${i}`}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
          </div>

          {/* ===== 説明文 ===== */}
          <div className="ms-description">
            <p>
              {desc1.split("\n").map((line, i) => (
                <span key={`d1-${i}`}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            <p>
              {desc2.split("\n").map((line, i) => (
                <span key={`d2-${i}`}>
                  {line}
                  <br />
                </span>
              ))}
            </p>

            <ul className="ms-list">
              {bullets.map((b, i) => (
                <li key={`b-${i}`}>{b}</li>
              ))}
            </ul>

            <p className="ms-note">
              {noteLines.map((n, i) => (
                <span key={`n-${i}`}>
                  {n}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* ===== styled-jsx ===== */}
      <style jsx>{`
        :global(html) { scroll-behavior: smooth; }
        .concept-section { background: #ffffff; color: #3a3a3a; padding: 32px 16px 72px; }
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
          position: relative; height: 420px; max-width: 980px;
          margin: 56px auto 40px; overflow: hidden;
        }
        .ms-banner-overlay { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
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
        .ms-description p { margin: 22px 0; font-size: 22px; line-height: 2; letter-spacing: 0.06em; }
        .ms-list { list-style: none; padding: 0; margin: 28px 0 16px; }
        .ms-list li { margin: 10px 0; font-size: 20px; line-height: 2; letter-spacing: 0.04em; }
        .ms-note { margin-top: 18px; color: #888; font-size: 16px; line-height: 1.9; letter-spacing: 0.04em; }

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
