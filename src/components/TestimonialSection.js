/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { useI18n } from "../lib/i18n";

export default function TestimonialSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);

  useEffect(() => setIsVisible(true), []);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setShowModal1(false);
        setShowModal2(false);
        setShowModal3(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ===== i18n =====
  const { t } = useI18n();
  // ▼ 安全版トランスレーター：未定義なら "" を返す（t がキー名を返す実装に対応）
  const trv = (key) => {
    const v = t(key);
    return v && v !== key ? v : "";
  };

  // 外枠
  const title = trv("testimonials.title");
  const intro = trv("testimonials.intro");
  const note  = trv("testimonials.note");

  // セクション見出し
  const sec1Title = trv("testimonials.sections.0.title");
  const sec2Title = trv("testimonials.sections.1.title");
  const sec3Title = trv("testimonials.sections.2.title");

  // セクション本文ラベル
  const sec1Cases = [0,1].map(i => ({
    title: trv(`testimonials.sections.0.cases.${i}.title`),
    age:   trv(`testimonials.sections.0.cases.${i}.age`),
  }));
  const sec2Cases = [0,1,2,3].map(i => ({
    title: trv(`testimonials.sections.1.cases.${i}.title`),
    age:   trv(`testimonials.sections.1.cases.${i}.age`),
  }));
  const sec3Cases = [0,1].map(i => ({
    title: trv(`testimonials.sections.2.cases.${i}.title`),
    age:   trv(`testimonials.sections.2.cases.${i}.age`),
  }));

  // ボタン・バッジ
  const openBtn     = trv("testimonials.openButton") || "Before After 画像はこちらをタップ";
  const badgeBefore = trv("testimonials.badgeBefore") || "Before";
  const badgeAfter  = trv("testimonials.badgeAfter")  || "After";
  const altBefore   = trv("testimonials.alt.before")  || "before";
  const altAfter    = trv("testimonials.alt.after")   || "after";

  // ===== モーダル中身（連番で存在チェック。JSON.parseは使わない） =====
  const getModalCases = (sectionIdx) => {
    const out = [];
    for (let i = 0; i < 50; i++) { // 上限は十分大きく
      const beforeImg = trv(`testimonials.sections.${sectionIdx}.modal.${i}.beforeImg`);
      const afterImg  = trv(`testimonials.sections.${sectionIdx}.modal.${i}.afterImg`);
      // キー未定義（=空文字）なら終了
      if (!beforeImg || !afterImg) break;
      out.push({
        title: trv(`testimonials.sections.${sectionIdx}.modal.${i}.title`),
        age: trv(`testimonials.sections.${sectionIdx}.modal.${i}.age`),
        beforeImg,
        afterImg,
        beforeLabel: trv(`testimonials.sections.${sectionIdx}.modal.${i}.beforeLabel`) || "",
        afterLabel:  trv(`testimonials.sections.${sectionIdx}.modal.${i}.afterLabel`)  || "",
      });
    }
    return out;
  };

  const modal1Cases = getModalCases(0);
  const modal2Cases = getModalCases(1);
  const modal3Cases = getModalCases(2);

  // 罫線やボタン
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

  // 共通モーダル
  const Modal = ({ cases, onClose }) => (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="close">×</button>

        <div className="modal-cases">
          {cases.map((m, i) => (
            <div className="modal-case" key={i}>
              <h4 className="modal-case-title">
                {m.title}<br /><span>{m.age}</span>
              </h4>

              <div className="modal-images">
                <div className="ba">
                  <span className="badge">{badgeBefore}</span>
                  <img src={m.beforeImg} alt={altBefore} className="ba-img" />
                </div>
                <span className="arrow">▶</span>
                <div className="ba">
                  <span className="badge">{badgeAfter}</span>
                  <img src={m.afterImg} alt={altAfter} className="ba-img" />
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

      {/* モーダル内スタイル */}
      <style jsx>{`
        .modal-overlay{
          position:fixed; inset:0; background:rgba(0,0,0,.55);
          display:flex; align-items:center; justify-content:center;
          z-index:60; padding:24px;
        }
        .modal-content{
          position:relative; background:#fff; width:100%;
          max-width:980px; max-height:90vh; overflow:auto;
          padding:28px 20px 32px; box-shadow:0 8px 24px rgba(0,0,0,.25);
        }
        .modal-close{
          position:sticky; top:0; margin-left:auto;
          background:transparent; border:none; font-size:30px;
          line-height:1; cursor:pointer; color:#666;
        }
        .modal-cases{
          display:grid; grid-template-columns:1fr 1fr;
          gap:36px 28px; padding:8px 8px 18px;
        }
        .modal-case-title{ text-align:center; font-size:18px; color:#3a3a3a; letter-spacing:.06em; margin:0 0 10px; }
        .modal-case-title span{ font-size:14px; color:#777; }
        .modal-images{
          display:grid; grid-template-columns:auto 24px auto;
          align-items:center; justify-content:center; gap:10px;
        }
        .arrow{ color:#777; font-size:20px; text-align:center; }
        .ba{ position:relative; display:inline-block; }
        /* 画像拡大禁止＆比率維持。原寸超えて広げない */
        .ba-img{
          display:block;
          width:auto;
          height:auto;
          max-width:100%;
          image-rendering:auto;
        }
        .badge{
          position:absolute; left:10px; top:10px;
          background:#565656; color:#fff; font-size:14px; font-weight:400;
          padding:6px 10px; border-radius:2px; letter-spacing:.06em;
        }
        .modal-labels{
          display:grid; grid-template-columns:1fr 1fr;
          gap:10px; margin:8px auto 0; max-width:370px;
          color:#444; font-size:22px; letter-spacing:.06em;
          text-align:center;white-space: pre-wrap;
        }
        @media (max-width:860px){
          .modal-cases{ grid-template-columns:1fr; }
          .modal-images{ grid-template-columns:auto 20px auto; }
        }
      `}</style>
    </div>
  );

  return (
    <>
      {/* 外枠（元UI） */}
      <section className={`user-voice ${isVisible ? "is-visible" : ""}`}>
        <div className="container">
          <div className="uv-hr" style={styles.hr} />

          <h2 className="uv-title">{title}</h2>
          <p className="uv-intro">
            {(intro || "").split("\n").map((line, i) => (
              <span key={`intro-${i}`}>{line}<br /></span>
            ))}
            <span className="uv-note">{note}</span>
          </p>

          {/* Block 1 */}
          <div className="uv-sep"><span>{sec1Title}</span></div>
          <div className="uv-cases two">
            {sec1Cases.map((c, i) =>
              (c.title || c.age) ? (
                <div className="uv-case" key={`s1-${i}`}>
                  {c.title}<br /><span>{c.age}</span>
                </div>
              ) : null
            )}
          </div>
          <div className="uv-btn-wrap">
            <button className="btn-modal" style={styles.btn} onClick={() => setShowModal1(true)}>
              {openBtn}
            </button>
          </div>

          {/* Block 2 */}
          <div className="uv-sep"><span>{sec2Title}</span></div>
          <div className="uv-cases four">
            {sec2Cases.map((c, i) =>
              (c.title || c.age) ? (
                <div className="uv-case" key={`s2-${i}`}>
                  {c.title}<br /><span>{c.age}</span>
                </div>
              ) : null
            )}
          </div>
          <div className="uv-btn-wrap">
            <button className="btn-modal" style={styles.btn} onClick={() => setShowModal2(true)}>
              {openBtn}
            </button>
          </div>

          {/* Block 3 */}
          <div className="uv-sep"><span>{sec3Title}</span></div>
          <div className="uv-cases two">
            {sec3Cases.map((c, i) =>
              (c.title || c.age) ? (
                <div className="uv-case" key={`s3-${i}`}>
                  {c.title}<br /><span>{c.age}</span>
                </div>
              ) : null
            )}
          </div>
          <div className="uv-btn-wrap">
            <button className="btn-modal" style={styles.btn} onClick={() => setShowModal3(true)}>
              {openBtn}
            </button>
          </div>
        </div>
      </section>

      {/* ブロック別モーダル */}
      {showModal1 && <Modal cases={modal1Cases} onClose={() => setShowModal1(false)} />}
      {showModal2 && <Modal cases={modal2Cases} onClose={() => setShowModal2(false)} />}
      {showModal3 && <Modal cases={modal3Cases} onClose={() => setShowModal3(false)} />}

      {/* 外枠スタイル（元のまま） */}
      <style jsx>{`
        .user-voice { background:#fff; color:#3a3a3a; padding:48px 0 28px; }
        .is-visible { animation: fadeInUp .8s ease-out both; }
        @keyframes fadeInUp { from{opacity:0; transform:translate3d(0,10px,0);} to{opacity:1; transform:translateZ(0);} }
        .container { max-width:980px; margin:0 auto; }

        .uv-title {
          text-align:center; font-weight:700; font-size:26px;
          letter-spacing:.12em; margin:112px 0 52px; color:#444;
        }
        .uv-intro {
          text-align:center; color:#666; font-size:24px;
          line-height:1.4; letter-spacing:.04em; margin-bottom:76px;
        }
        .uv-intro span:nth-of-type(2){ font-size:16px !important; }
        .uv-note { color:#888; font-size:24px; margin-top:14px; }

        .uv-sep { display:flex; align-items:center; gap:16px; margin:42px 0 14px; }
        .uv-sep::before, .uv-sep::after { content:""; height:1px; background:#bfbfbf; flex:1; }
        .uv-sep > span { flex:none; color:#444; font-weight:600; letter-spacing:.18em; font-size:26px; }

        .uv-cases { display:grid; gap:24px 48px; justify-content:center; text-align:center; margin-bottom:18px; }
        .uv-cases.two  { grid-template-columns: repeat(2, minmax(220px,1fr)); }
        .uv-cases.four { grid-template-columns: repeat(2, minmax(220px,1fr)); }
        .uv-case { color:#3a3a3a; font-size:26px; letter-spacing:.08em; line-height:normal; }
        .uv-case span { font-size:16px; color:#777; }

        .uv-btn-wrap { display:flex; justify-content:center; margin:40px 0 110px; }
        /* ===== ▼スマホ専用オーバーライド（PCは触らない） ===== */
@media (max-width: 720px) {
  .user-voice { padding: 32px 0 18px; max-width:90%; margin:0 auto; }

  /* タイトル・導入文をスマホサイズに最適化 */
  .uv-title {
    font-size: 1.3rem;
    letter-spacing: .10em;
    margin: 60px 0 26px;
    color: #444;
  }
  .uv-intro {
    font-size: 0.8px;
    line-height: 1.9;
    letter-spacing: .03em;
    margin-bottom: 30px;
    color: #666;
  }
  .uv-intro span:nth-of-type(2) { font-size: 12px !important; } /* 2行目の小さめテキスト */
  .uv-note { display: block; margin-top: 8px; font-size: 12.5px; color:#888; }

  /* セクション見出しの線と余白を②に寄せる */
  .uv-sep { gap: 12px;
        margin: 28px auto 10px auto;
        max-width: 95%; }
  .uv-sep::before, .uv-sep::after { background: #cfcfcf; height: 1px; }
  .uv-sep > span {
    font-size: 18px;
    letter-spacing: .14em;
    color: #444;
    font-weight: 600;
  }

  /* 症例ラベルを2カラムで確実に並べる（幅を小さめに） */
  .uv-cases { gap: 14px 24px; margin-bottom: 14px; justify-items: center; }
  .uv-cases.two,
  .uv-cases.four { grid-template-columns: repeat(2, minmax(130px, 1fr)); }

  .uv-case { font-size: 16px; letter-spacing: .06em; line-height: 1.35; color:#3a3a3a; }
  .uv-case span { font-size: 12px; color: #777; }

  /* ボタンは小さめ・短めに */
  .uv-btn-wrap { margin: 16px 0 36px; }
  .btn-modal {
    font-size: 13px !important;
    padding: 10px 16px !important;
    min-width: 260px !important;
    border-radius: 4px;
    letter-spacing: .04em !important;
  }
}

/* さらに狭い端末で微調整 */
@media (max-width: 390px) {
  .uv-cases.two,
  .uv-cases.four { grid-template-columns: repeat(2, minmax(120px, 1fr)); }
  .btn-modal { min-width: 220px !important; }
}
      `}</style>
    </>
  );
}
