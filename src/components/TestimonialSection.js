"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
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

  // i18n
  const { t } = useI18n();
  const tr = (key) => t(key) ?? "";

  // 見出し・導入（外枠は元のまま）
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
  const badgeBefore = tr("testimonials.badgeBefore") || "Before";
  const badgeAfter  = tr("testimonials.badgeAfter")  || "After";
  const altBefore   = tr("testimonials.alt.before")  || "before";
  const altAfter    = tr("testimonials.alt.after")   || "after";

  // ====== モーダル用データ（画像差し替えだけでOK） ======
  const modal1Cases = [
    { title: "頬のシミ・クマ", age: "50代の女性",
      beforeImg: "/case1-1-before.jpg", afterImg: "/case1-1-after.jpg",
      beforeLabel: "使用前", afterLabel: "20日後" },
    { title: "腕のシミ・あざ", age: "80代の女性",
      beforeImg: "/case1-2-before.jpg", afterImg: "/case1-2-after.jpg",
      beforeLabel: "使用前", afterLabel: "24日後" },
  ];
  const modal2Cases = [
    { title: "両手の親指", age: "30代の男性",
      beforeImg: "/case2-1-before.jpg", afterImg: "/case2-1-after.jpg",
      beforeLabel: "使用前", afterLabel: "3日後" },
    { title: "肌荒れ", age: "5才の男の子",
      beforeImg: "/case2-2-before.jpg", afterImg: "/case2-2-after.jpg",
      beforeLabel: "使用前", afterLabel: "3日後" },
    { title: "乾燥の皮膚炎", age: "40代の女性",
      beforeImg: "/case2-3-before.jpg", afterImg: "/case2-3-after.jpg",
      beforeLabel: "使用前", afterLabel: "3日後" },
    { title: "アトピー性皮膚炎", age: "10才の男の子",
      beforeImg: "/case2-4-before.jpg", afterImg: "/case2-4-after.jpg",
      beforeLabel: "使用前", afterLabel: "10日後" },
  ];
  const modal3Cases = [
    { title: "腕のやけど", age: "50代の女性",
      beforeImg: "/case3-1-before.jpg", afterImg: "/case3-1-after.jpg",
      beforeLabel: "使用前", afterLabel: "24時間後" },
    { title: "転んだ傷", age: "50代の女性",
      beforeImg: "/case3-2-before.jpg", afterImg: "/case3-2-after.jpg",
      beforeLabel: "塗布前", afterLabel: "10時間後" },
  ];

  // 罫線やボタン（元CSS）
  const styles = {
    hr: { background: "#bfbfbf", height: 1, width: "100%" },
    btn: {
      background: "#565656", fontSize: "22px", color: "#fff",
      border: "none", borderRadius: "2px", padding: "16px 24px",
      minWidth: 340, cursor: "pointer", letterSpacing: ".06em",
    },
  };

  // ===== 共通モーダルUI（JSのみ） =====
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
                  <Image src={m.beforeImg} alt={altBefore} width={260} height={170} />
                </div>
                <span className="arrow">▶</span>
                <div className="ba">
                  <span className="badge">{badgeAfter}</span>
                  <Image src={m.afterImg} alt={altAfter} width={260} height={170} />
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

      {/* モーダル用スタイル */}
      <style jsx>{`
        .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;z-index:60;padding:24px;}
        .modal-content{position:relative;background:#fff;width:100%;max-width:980px;max-height:90vh;overflow-y:auto;padding:28px 20px 32px;box-shadow:0 8px 24px rgba(0,0,0,.25);}
        .modal-close{position:sticky;top:0;margin-left:auto;display:inline-block;background:transparent;border:none;font-size:30px;line-height:1;cursor:pointer;color:#666;}
        .modal-cases{display:grid;grid-template-columns:1fr 1fr;gap:36px 28px;padding:8px 8px 18px;}
        .modal-case-title{text-align:center;font-size:18px;color:#3a3a3a;letter-spacing:.06em;margin:0 0 10px;}
        .modal-case-title span{font-size:14px;color:#777;}
        .modal-images{display:grid;grid-template-columns:auto 24px auto;align-items:center;justify-content:center;gap:10px;}
        .arrow{color:#777;font-size:20px;text-align:center;}
        .ba{position:relative;}
        .badge{position:absolute;left:10px;top:10px;background:#565656;color:#fff;font-size:14px;font-weight:400;padding:6px 10px;border-radius:2px;letter-spacing:.06em;}
        .modal-labels{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:8px auto 0;max-width:580px;color:#444;font-size:22px;letter-spacing:.06em;}
        @media (max-width:860px){.modal-cases{grid-template-columns:1fr;} .modal-images{grid-template-columns:auto 20px auto;}}
      `}</style>
    </div>
  );

  return (
    <>
      {/* ===== 外側レイアウト（元UI） ===== */}
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
            {sec1Cases.map((c, i) => (c.title || c.age) && (
              <div className="uv-case" key={`s1-${i}`}>{c.title}<br /><span>{c.age}</span></div>
            ))}
          </div>
          <div className="uv-btn-wrap">
            <button className="btn-modal" style={styles.btn} onClick={() => setShowModal1(true)}>{openBtn}</button>
          </div>

          {/* Block 2 */}
          <div className="uv-sep"><span>{sec2Title}</span></div>
          <div className="uv-cases four">
            {sec2Cases.map((c, i) => (c.title || c.age) && (
              <div className="uv-case" key={`s2-${i}`}>{c.title}<br /><span>{c.age}</span></div>
            ))}
          </div>
          <div className="uv-btn-wrap">
            <button className="btn-modal" style={styles.btn} onClick={() => setShowModal2(true)}>{openBtn}</button>
          </div>

          {/* Block 3 */}
          <div className="uv-sep"><span>{sec3Title}</span></div>
          <div className="uv-cases two">
            {sec3Cases.map((c, i) => (c.title || c.age) && (
              <div className="uv-case" key={`s3-${i}`}>{c.title}<br /><span>{c.age}</span></div>
            ))}
          </div>
          <div className="uv-btn-wrap">
            <button className="btn-modal" style={styles.btn} onClick={() => setShowModal3(true)}>{openBtn}</button>
          </div>
        </div>
      </section>

      {/* ブロック別モーダル */}
      {showModal1 && <Modal cases={modal1Cases} onClose={() => setShowModal1(false)} />}
      {showModal2 && <Modal cases={modal2Cases} onClose={() => setShowModal2(false)} />}
      {showModal3 && <Modal cases={modal3Cases} onClose={() => setShowModal3(false)} />}

      {/* 外側スタイル（元のまま） */}
      <style jsx>{`
        .user-voice{background:#fff;color:#3a3a3a;padding:48px 0 28px;}
        .is-visible{animation:fadeInUp .8s ease-out both;}
        @keyframes fadeInUp{from{opacity:0;transform:translate3d(0,10px,0);}to{opacity:1;transform:translateZ(0);}}
        .container{max-width:980px;margin:0 auto;}
        .uv-title{text-align:center;font-weight:700;font-size:26px;letter-spacing:.12em;margin:112px 0 52px;color:#444;}
        .uv-intro{text-align:center;color:#666;font-size:24px;line-height:1.4;letter-spacing:.04em;margin-bottom:76px;}
        .uv-intro span:nth-of-type(2){font-size:16px !important;}
        .uv-note{color:#888;font-size:24px;margin-top:14px;}
        .uv-sep{display:flex;align-items:center;gap:16px;margin:42px 0 14px;}
        .uv-sep::before,.uv-sep::after{content:"";height:1px;background:#bfbfbf;flex:1;}
        .uv-sep>span{flex:none;color:#444;font-weight:600;letter-spacing:.18em;font-size:26px;}
        .uv-cases{display:grid;gap:24px 48px;justify-content:center;text-align:center;margin-bottom:18px;}
        .uv-cases.two{grid-template-columns:repeat(2,minmax(220px,1fr));}
        .uv-cases.four{grid-template-columns:repeat(2,minmax(220px,1fr));}
        .uv-case{color:#3a3a3a;font-size:26px;letter-spacing:.08em;line-height:normal;}
        .uv-case span{font-size:16px;color:#777;}
        .uv-btn-wrap{display:flex;justify-content:center;margin:40px 0 110px;}
      `}</style>
    </>
  );
}
