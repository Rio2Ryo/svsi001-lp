"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useI18n } from "../lib/i18n";

export default function TestimonialSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => setIsVisible(true), []);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setShowModal(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleModal = () => setShowModal((v) => !v);

  // i18n
  const { t } = useI18n();
  const tr = (key, fallback) => {
    const v = t(key);
    return v == null || v === key ? fallback : v;
  };

  // 見出し・導入
  const title = tr("testimonials.title", "実際に利用された方の声");
  const intro = tr(
    "testimonials.intro",
    "本製品をご愛用いただいている方々のご協力のもと\n（傷、アトピー、肌荒れ、シミでお困りの方々）\n使用前後の肌印象をお写真でご紹介しています。"
  );
  const note = tr(
    "testimonials.note",
    "※個人の感想であり、使用感には個人差があります。"
  );

  // セクション見出し
  const sec1Title = tr("testimonials.sections.0.title", "シミ・あざ");
  const sec2Title = tr("testimonials.sections.1.title", "アトピー・肌荒れ");
  const sec3Title = tr("testimonials.sections.2.title", "傷口");

  // 各ケース（本文リスト）
  const sec1Cases = [
    {
      title: tr("testimonials.sections.0.cases.0.title", "頬のシミ・クマ"),
      age: tr("testimonials.sections.0.cases.0.age", "（50代の女性）"),
    },
    {
      title: tr("testimonials.sections.0.cases.1.title", "腕のシミ・あざ"),
      age: tr("testimonials.sections.0.cases.1.age", "（80代の女性）"),
    },
  ];
  const sec2Cases = [
    {
      title: tr("testimonials.sections.1.cases.0.title", "両手の親指"),
      age: tr("testimonials.sections.1.cases.0.age", "（30代の男性）"),
    },
    {
      title: tr("testimonials.sections.1.cases.1.title", "乾癬の皮膚炎"),
      age: tr("testimonials.sections.1.cases.1.age", "（40代の女性）"),
    },
    {
      title: tr("testimonials.sections.1.cases.2.title", "アトピー性皮膚炎"),
      age: tr("testimonials.sections.1.cases.2.age", "（10歳の男の子）"),
    },
    {
      title: tr("testimonials.sections.1.cases.3.title", "肌荒れ"),
      age: tr("testimonials.sections.1.cases.3.age", "（5歳の男の子）"),
    },
  ];
  const sec3Cases = [
    {
      title: tr("testimonials.sections.2.cases.0.title", "腕のやけど"),
      age: tr("testimonials.sections.2.cases.0.age", "（50代の女性）"),
    },
    {
      title: tr("testimonials.sections.2.cases.1.title", "転んだ傷"),
      age: tr("testimonials.sections.2.cases.1.age", "（50代の女性）"),
    },
  ];

  // ボタン・バッジ等
  const openBtn = tr(
    "testimonials.openButton",
    "Before After 画像はこちらをタップ"
  );
  const badgeBefore = tr("testimonials.badgeBefore", "Before");
  const badgeAfter = tr("testimonials.badgeAfter", "After");

  // モーダル（タイトル・期間ラベル）
  const modalCases = [
    {
      title: tr("testimonials.modal.0.title", "頬のシミ・クマ"),
      age: tr("testimonials.modal.0.age", "（50代の女性）"),
      beforeLabel: tr("testimonials.modal.0.beforeLabel", "使用前"),
      afterLabel: tr("testimonials.modal.0.afterLabel", "20日後"),
      beforeImg: "/case1-before.jpg",
      afterImg: "/case1-after.jpg",
    },
    {
      title: tr("testimonials.modal.1.title", "腕のシミ・あざ"),
      age: tr("testimonials.modal.1.age", "（80代の女性）"),
      beforeLabel: tr("testimonials.modal.1.beforeLabel", "使用前"),
      afterLabel: tr("testimonials.modal.1.afterLabel", "24日後"),
      beforeImg: "/case2-before.jpg",
      afterImg: "/case2-after.jpg",
    },
    {
      title: tr("testimonials.modal.2.title", "両手の親指（やけど）"),
      age: tr("testimonials.modal.2.age", "（50代の女性）"),
      beforeLabel: tr("testimonials.modal.2.beforeLabel", "使用前"),
      afterLabel: tr("testimonials.modal.2.afterLabel", "15日後"),
      beforeImg: "/case3-before.jpg",
      afterImg: "/case3-after.jpg",
    },
    {
      title: tr("testimonials.modal.3.title", "転んだ傷"),
      age: tr("testimonials.modal.3.age", "（50代の女性）"),
      beforeLabel: tr("testimonials.modal.3.beforeLabel", "使用前"),
      afterLabel: tr("testimonials.modal.3.afterLabel", "18日後"),
      beforeImg: "/case4-before.jpg",
      afterImg: "/case4-after.jpg",
    },
  ];

  // 罫線やボタンなど軽微なインライン用
  const styles = {
    hr: { background: "#bfbfbf", height: 1, width: "100%" },
    btn: {
      background: "#565656",
      fontSize:"22px",
      color: "#fff",
      border: "none",
      borderRadius: "2px",
      padding: "16px 24px",
      minWidth: 340,
      cursor: "pointer",
      letterSpacing: ".06em",
    },
  };

  return (
    <>
      <section className={`user-voice ${isVisible ? "is-visible" : ""}`}>
        <div className="container">
          <div className="uv-hr" style={styles.hr} />

          <h2 className="uv-title">{title}</h2>
          <p className="uv-intro">
            {intro.split("\n").map((line, i) => (
              <span key={`intro-${i}`}>
                {line}
                <br />
              </span>
            ))}
            <span className="uv-note">{note}</span>
          </p>

          {/* ====== Block 1 ====== */}
          <div className="uv-sep">
            <span>{sec1Title}</span>
          </div>
          <div className="uv-cases two">
            {sec1Cases.map((c, i) => (
              <div className="uv-case" key={`s1-${i}`}>
                {c.title}
                <br />
                <span>{c.age}</span>
              </div>
            ))}
          </div>
          <div className="uv-btn-wrap">
            <button className="btn-modal" style={styles.btn} onClick={toggleModal}>
              {openBtn}
            </button>
          </div>

          {/* ====== Block 2 ====== */}
          <div className="uv-sep">
            <span>{sec2Title}</span>
          </div>
          <div className="uv-cases four">
            {sec2Cases.map((c, i) => (
              <div className="uv-case" key={`s2-${i}`}>
                {c.title}
                <br />
                <span>{c.age}</span>
              </div>
            ))}
          </div>
          <div className="uv-btn-wrap">
            <button className="btn-modal" style={styles.btn} onClick={toggleModal}>
              {openBtn}
            </button>
          </div>

          {/* ====== Block 3 ====== */}
          <div className="uv-sep">
            <span>{sec3Title}</span>
          </div>
          <div className="uv-cases two">
            {sec3Cases.map((c, i) => (
              <div className="uv-case" key={`s3-${i}`}>
                {c.title}
                <br />
                <span>{c.age}</span>
              </div>
            ))}
          </div>
          <div className="uv-btn-wrap">
            <button className="btn-modal" style={styles.btn} onClick={toggleModal}>
              {openBtn}
            </button>
          </div>
        </div>
      </section>

      {/* ====== Modal ====== */}
      {showModal && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={toggleModal} aria-label="close">
              ×
            </button>

            <div className="modal-cases">
              {modalCases.map((m, i) => (
                <div className="modal-case" key={`mc-${i}`}>
                  <h4 className="modal-case-title">
                    {m.title}
                    <br />
                    <span>{m.age}</span>
                  </h4>
                  <div className="modal-images">
                    <div className="ba">
                      <span className="badge">{badgeBefore}</span>
                      <Image src={m.beforeImg} alt="before" width={260} height={170} />
                    </div>
                    <span className="arrow">▶</span>
                    <div className="ba">
                      <span className="badge">{badgeAfter}</span>
                      <Image src={m.afterImg} alt="after" width={260} height={170} />
                    </div>
                  </div>
                  <div className="modal-labels">
                    <span>{m.beforeLabel}</span>
                    <span>{m.afterLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== styled-jsx ===== */}
      <style jsx>{`
        .user-voice {
          background: #ffffff;
          color: #3a3a3a;
          padding: 48px 16px 80px;
        }
        .is-visible {
          animation: fadeInUp 0.8s ease-out both;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate3d(0,10px,0); }
          to   { opacity: 1; transform: translateZ(0); }
        }
        .container { max-width: 980px; margin: 0 auto; }

        .uv-title {
          text-align: center; font-weight: 700; font-size: 26px;
          letter-spacing: 0.12em; margin: 22px 0 12px; color: #444;
        }
        .uv-intro {
          text-align: center; color: #666; font-size: 20px;
          line-height: 2; letter-spacing: 0.04em; margin-bottom: 36px;
        }
        .uv-note { color: #888; font-size: 14px; }

        .uv-sep {
          display: flex; align-items: center; gap: 16px; margin: 42px 0 14px;
        }
        .uv-sep::before, .uv-sep::after {
          content: ""; height: 1px; background: #bfbfbf; flex: 1;
        }
        .uv-sep > span {
          flex: none; color: #444; font-weight: 600;
          letter-spacing: 0.18em; font-size: 26px;
        }

        .uv-cases {
          display: grid; gap: 24px 48px;
          justify-content: center; text-align: center; margin-bottom: 18px;
        }
        .uv-cases.two  { grid-template-columns: repeat(2, minmax(220px,1fr)); }
        .uv-cases.four { grid-template-columns: repeat(2, minmax(220px,1fr)); }
        .uv-case { color: #3a3a3a; font-size: 22px; letter-spacing: 0.08em; }
        .uv-case span { font-size: 16px; color: #777; }

        .uv-btn-wrap { display: flex; justify-content: center; margin: 14px 0 40px; }

        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,.55);
          display: flex; align-items: center; justify-content: center;
          z-index: 60; padding: 24px;
        }
        .modal-content {
          position: relative; background: #fff; width: 100%;
          max-width: 980px; max-height: 90vh; overflow-y: auto;
          padding: 28px 20px 32px; box-shadow: 0 8px 24px rgba(0,0,0,.25);
        }
        .modal-close {
          position: sticky; top: 0; margin-left: auto; display: inline-block;
          background: transparent; border: none; font-size: 30px; line-height: 1;
          cursor: pointer; color: #666;
        }
        .modal-cases {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 36px 28px; padding: 8px 8px 18px;
        }
        .modal-case-title {
          text-align: center; font-size: 18px; color: #3a3a3a;
          letter-spacing: 0.06em; margin: 0 0 10px;
        }
        .modal-case-title span { font-size: 14px; color: #777; }
        .modal-images {
          display: grid; grid-template-columns: auto 24px auto;
          align-items: center; justify-content: center; gap: 10px;
        }
        .arrow { color: #777; font-size: 20px; text-align: center; }
        .ba { position: relative; }
        .badge {
          position: absolute; left: 10px; top: 10px;
          background: #565656; color: #fff; font-size: 14px;
          padding: 6px 10px; border-radius: 2px; letter-spacing: 0.06em;
        }
        .modal-labels {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 10px; margin: 8px auto 0; max-width: 580px;
          color: #444; font-size: 22px; letter-spacing: 0.06em;
        }

        @media (max-width: 860px) {
          .uv-cases.two, .uv-cases.four { grid-template-columns: 1fr; }
          .modal-cases { grid-template-columns: 1fr; }
          .modal-images { grid-template-columns: auto 20px auto; }
        }
      `}</style>
    </>
  );
}
