"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useI18n } from "../lib/i18n";

export default function TestimonialSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // null | 0 | 1 | 2
  useEffect(() => setIsVisible(true), []);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setActiveModal(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // i18n
  const { t } = useI18n();
  const tr = (key) => t(key) ?? ""; // 未登録は空文字

  // 見出し・導入
  const title = tr("testimonials.title");
  const intro = tr("testimonials.intro");
  const note = tr("testimonials.note");

  // セクション見出し
  const sec1Title = tr("testimonials.sections.0.title");
  const sec2Title = tr("testimonials.sections.1.title");
  const sec3Title = tr("testimonials.sections.2.title");

  // 各ケース（本文リスト）
  const sec1Cases = [0, 1].map((i) => ({
    title: tr(`testimonials.sections.0.cases.${i}.title`),
    age: tr(`testimonials.sections.0.cases.${i}.age`),
  }));
  const sec2Cases = [0, 1, 2, 3].map((i) => ({
    title: tr(`testimonials.sections.1.cases.${i}.title`),
    age: tr(`testimonials.sections.1.cases.${i}.age`),
  }));
  const sec3Cases = [0, 1].map((i) => ({
    title: tr(`testimonials.sections.2.cases.${i}.title`),
    age: tr(`testimonials.sections.2.cases.${i}.age`),
  }));

  // ボタン・バッジ等
  const openBtn = tr("testimonials.openButton");
  const badgeBefore = tr("testimonials.badgeBefore");
  const badgeAfter = tr("testimonials.badgeAfter");

  // アクセシビリティ用 alt
  const altBefore = tr("testimonials.alt.before"); // 例: "before"
  const altAfter = tr("testimonials.alt.after");   // 例: "after"

  // セクションごとのモーダルデータ取得
  const getModalCases = (sectionIndex) => {
    // セクション専用キー（推奨）: testimonials.sections.{idx}.modal.{i}.*
    // 既存互換フォールバック:     testimonials.modal.{i}.*
    const indicesBySection = [ [0,1,2,3], [0,1,2,3], [0,1] ]; // 必要なら各セクションで件数を調整
    const items = indicesBySection[sectionIndex] || [];
    return items.map((i) => {
      const title =
        tr(`testimonials.sections.${sectionIndex}.modal.${i}.title`) ||
        tr(`testimonials.modal.${i}.title`);
      const age =
        tr(`testimonials.sections.${sectionIndex}.modal.${i}.age`) ||
        tr(`testimonials.modal.${i}.age`);
      const beforeLabel =
        tr(`testimonials.sections.${sectionIndex}.modal.${i}.beforeLabel`) ||
        tr(`testimonials.modal.${i}.beforeLabel`);
      const afterLabel =
        tr(`testimonials.sections.${sectionIndex}.modal.${i}.afterLabel`) ||
        tr(`testimonials.modal.${i}.afterLabel`);
      const beforeImg =
        tr(`testimonials.sections.${sectionIndex}.modal.${i}.beforeImg`) ||
        tr(`testimonials.modal.${i}.beforeImg`) ||
        `/case${i + 1}-before.jpg`;
      const afterImg =
        tr(`testimonials.sections.${sectionIndex}.modal.${i}.afterImg`) ||
        tr(`testimonials.modal.${i}.afterImg`) ||
        `/case${i + 1}-after.jpg`;
      return { title, age, beforeLabel, afterLabel, beforeImg, afterImg };
    }).filter((m) => m.title || m.age || m.beforeImg || m.afterImg);
  };

  // 罫線やボタンなど軽微なインライン用
  const styles = {
    hr: { background: "#bfbfbf", height: 1, width: "100%" },
    btn: {
      background: "#565656",
      fontSize: "22px",
      color: "#fff",
      border: "none",
      borderRadius: "2px",
      padding: "16px 24px",
      minWidth: 340,
      cursor: "pointer",
      letterSpacing: ".06em",
    },
  };

  // モーダル描画（共通見た目で中身だけ切替）
  const renderModal = (sectionIndex) => {
    const modalCases = getModalCases(sectionIndex);
    if (!modalCases.length) return null;
    return (
      <div className="modal-overlay" onClick={() => setActiveModal(null)} role="dialog" aria-modal="true">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setActiveModal(null)} aria-label="close">
            ×
          </button>
          <div className="modal-cases">
            {modalCases.map((m, i) => (
              <div className="modal-case" key={`mc-${sectionIndex}-${i}`}>
                <h4 className="modal-case-title">
                  {m.title}
                  <br />
                  <span>{m.age}</span>
                </h4>
                <div className="modal-images">
                  <div className="ba">
                    <span className="badge">{badgeBefore}</span>
                    <Image src={m.beforeImg} alt={altBefore || "before"} width={260} height={170} />
                  </div>
                  <span className="arrow">▶</span>
                  <div className="ba">
                    <span className="badge">{badgeAfter}</span>
                    <Image src={m.afterImg} alt={altAfter || "after"} width={260} height={170} />
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
    );
  };

  return (
    <>
      <section className={`user-voice ${isVisible ? "is-visible" : ""}`}>
        <div className="container">
          <div className="uv-hr" style={styles.hr} />

          <h2 className="uv-title">{title}</h2>
          <p className="uv-intro">
            {(intro || "").split("\n").map((line, i) => (
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
            {sec1Cases.map((c, i) =>
              c.title || c.age ? (
                <div className="uv-case" key={`s1-${i}`}>
                  {c.title}
                  <br />
                  <span>{c.age}</span>
                </div>
              ) : null
            )}
          </div>
          <div className="uv-btn-wrap">
            <button className="btn-modal" style={styles.btn} onClick={() => setActiveModal(0)}>
              {openBtn}
            </button>
          </div>

          {/* ====== Block 2 ====== */}
          <div className="uv-sep">
            <span>{sec2Title}</span>
          </div>
          <div className="uv-cases four">
            {sec2Cases.map((c, i) =>
              c.title || c.age ? (
                <div className="uv-case" key={`s2-${i}`}>
                  {c.title}
                  <br />
                  <span>{c.age}</span>
                </div>
              ) : null
            )}
          </div>
          <div className="uv-btn-wrap">
            <button className="btn-modal" style={styles.btn} onClick={() => setActiveModal(1)}>
              {openBtn}
            </button>
          </div>

          {/* ====== Block 3 ====== */}
          <div className="uv-sep">
            <span>{sec3Title}</span>
          </div>
          <div className="uv-cases two">
            {sec3Cases.map((c, i) =>
              c.title || c.age ? (
                <div className="uv-case" key={`s3-${i}`}>
                  {c.title}
                  <br />
                  <span>{c.age}</span>
                </div>
              ) : null
            )}
          </div>
          <div className="uv-btn-wrap">
            <button className="btn-modal" style={styles.btn} onClick={() => setActiveModal(2)}>
              {openBtn}
            </button>
          </div>
        </div>
      </section>

      {/* ====== Section別に中身が変わるモーダル ====== */}
      {activeModal !== null && renderModal(activeModal)}

      {/* ===== styled-jsx ===== */}
      <style jsx>{`
        .user-voice {
          background: #ffffff;
          color: #3a3a3a;
          padding: 48px 0px 28px 0px;
        }
        .is-visible { animation: fadeInUp 0.8s ease-out both; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate3d(0,10px,0); }
          to   { opacity: 1; transform: translateZ(0); }
        }
        .container { max-width: 980px; margin: 0 auto; }

        .uv-title {
          text-align: center; font-weight: 700; font-size: 26px;
          letter-spacing: 0.12em; margin: 112px 0 52px 0; color: #444;
        }
        .uv-intro {
          text-align: center; color: #666; font-size: 24px;
          line-height: 1.4; letter-spacing: 0.04em; margin-bottom: 76px;
        }
        .uv-intro span:nth-of-type(2) { font-size: 16px !important; }
        .uv-note { color: #888; font-size: 24px; margin-top: 14px; }

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
        .uv-case { color: #3a3a3a; font-size: 26px; letter-spacing: 0.08em; line-height: normal; }
        .uv-case span { font-size: 16px; color: #777; }

        .uv-btn-wrap { display: flex; justify-content: center; margin: 40px 0 110px; }

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
          font-weight: 400;
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
