"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

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

  // 罫線やボタンなど軽微なインライン用
  const styles = {
    hr: { background: "#bfbfbf", height: 1, width: "100%" },
    btn: {
      background: "#565656",
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

          <h2 className="uv-title">実際に利用された方の声</h2>
          <p className="uv-intro">
            本製品をご愛用いただいている方々のご協力のもと
            <br />
            （傷、アトピー、肌荒れ、シミでお困りの方々）
            <br />
            使用前後の肌印象をお写真でご紹介しています。
            <br />
            <span className="uv-note">
              ※個人の感想であり、使用感には個人差があります。
            </span>
          </p>

          {/* ====== Block 1 ====== */}
          <div className="uv-sep">
            <span>シミ・あざ</span>
          </div>
          <div className="uv-cases two">
            <div className="uv-case">
              頬のシミ・クマ
              <br />
              <span>（50代の女性）</span>
            </div>
            <div className="uv-case">
              腕のシミ・あざ
              <br />
              <span>（80代の女性）</span>
            </div>
          </div>
          <div className="uv-btn-wrap">
            <button className="btn-modal" style={styles.btn} onClick={toggleModal}>
              Before After 画像はこちらをタップ
            </button>
          </div>

          {/* ====== Block 2 ====== */}
          <div className="uv-sep">
            <span>アトピー・肌荒れ</span>
          </div>
          <div className="uv-cases four">
            <div className="uv-case">
              両手の親指
              <br />
              <span>（30代の男性）</span>
            </div>
            <div className="uv-case">
              乾癬の皮膚炎
              <br />
              <span>（40代の女性）</span>
            </div>
            <div className="uv-case">
              アトピー性皮膚炎
              <br />
              <span>（10歳の男の子）</span>
            </div>
            <div className="uv-case">
              肌荒れ
              <br />
              <span>（5歳の男の子）</span>
            </div>
          </div>
          <div className="uv-btn-wrap">
            <button className="btn-modal" style={styles.btn} onClick={toggleModal}>
              Before After 画像はこちらをタップ
            </button>
          </div>

          {/* ====== Block 3 ====== */}
          <div className="uv-sep">
            <span>傷口</span>
          </div>
          <div className="uv-cases two">
            <div className="uv-case">
              腕のやけど
              <br />
              <span>（50代の女性）</span>
            </div>
            <div className="uv-case">
              転んだ傷
              <br />
              <span>（50代の女性）</span>
            </div>
          </div>
          <div className="uv-btn-wrap">
            <button className="btn-modal" style={styles.btn} onClick={toggleModal}>
              Before After 画像はこちらをタップ
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
              {/* 1 */}
              <div className="modal-case">
                <h4 className="modal-case-title">
                  頬のシミ・クマ
                  <br />
                  <span>（50代の女性）</span>
                </h4>
                <div className="modal-images">
                  <div className="ba">
                    <span className="badge">Before</span>
                    <Image src="/case1-before.jpg" alt="before" width={260} height={170} />
                  </div>
                  <span className="arrow">▶</span>
                  <div className="ba">
                    <span className="badge">After</span>
                    <Image src="/case1-after.jpg" alt="after" width={260} height={170} />
                  </div>
                </div>
                <div className="modal-labels">
                  <span>使用前</span>
                  <span>20日後</span>
                </div>
              </div>

              {/* 2 */}
              <div className="modal-case">
                <h4 className="modal-case-title">
                  腕のシミ・あざ
                  <br />
                  <span>（80代の女性）</span>
                </h4>
                <div className="modal-images">
                  <div className="ba">
                    <span className="badge">Before</span>
                    <Image src="/case2-before.jpg" alt="before" width={260} height={170} />
                  </div>
                  <span className="arrow">▶</span>
                  <div className="ba">
                    <span className="badge">After</span>
                    <Image src="/case2-after.jpg" alt="after" width={260} height={170} />
                  </div>
                </div>
                <div className="modal-labels">
                  <span>使用前</span>
                  <span>24日後</span>
                </div>
              </div>

              {/* 3 */}
              <div className="modal-case">
                <h4 className="modal-case-title">
                  両手の親指（やけど）
                  <br />
                  <span>（50代の女性）</span>
                </h4>
                <div className="modal-images">
                  <div className="ba">
                    <span className="badge">Before</span>
                    <Image src="/case3-before.jpg" alt="before" width={260} height={170} />
                  </div>
                  <span className="arrow">▶</span>
                  <div className="ba">
                    <span className="badge">After</span>
                    <Image src="/case3-after.jpg" alt="after" width={260} height={170} />
                  </div>
                </div>
                <div className="modal-labels">
                  <span>使用前</span>
                  <span>15日後</span>
                </div>
              </div>

              {/* 4 */}
              <div className="modal-case">
                <h4 className="modal-case-title">
                  転んだ傷
                  <br />
                  <span>（50代の女性）</span>
                </h4>
                <div className="modal-images">
                  <div className="ba">
                    <span className="badge">Before</span>
                    <Image src="/case4-before.jpg" alt="before" width={260} height={170} />
                  </div>
                  <span className="arrow">▶</span>
                  <div className="ba">
                    <span className="badge">After</span>
                    <Image src="/case4-after.jpg" alt="after" width={260} height={170} />
                  </div>
                </div>
                <div className="modal-labels">
                  <span>使用前</span>
                  <span>18日後</span>
                </div>
              </div>
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
          from {
            opacity: 0;
            transform: translate3d(0, 10px, 0);
          }
          to {
            opacity: 1;
            transform: translateZ(0);
          }
        }
        .container {
          max-width: 980px;
          margin: 0 auto;
        }

        .uv-title {
          text-align: center;
          font-weight: 700;
          font-size: 22px;
          letter-spacing: 0.12em;
          margin: 22px 0 12px;
          color: #444;
        }
        .uv-intro {
          text-align: center;
          color: #666;
          font-size: 15px;
          line-height: 2;
          letter-spacing: 0.04em;
          margin-bottom: 36px;
        }
        .uv-note {
          color: #888;
          font-size: 14px;
        }

        /* セパレーター付き見出し */
        .uv-sep {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 42px 0 14px;
        }
        .uv-sep::before,
        .uv-sep::after {
          content: "";
          height: 1px;
          background: #bfbfbf;
          flex: 1;
        }
        .uv-sep > span {
          flex: none;
          color: #444;
          font-weight: 600;
          letter-spacing: 0.18em;
          font-size: 18px;
        }

        /* ケースの並び */
        .uv-cases {
          display: grid;
          gap: 24px 48px;
          justify-content: center;
          text-align: center;
          margin-bottom: 18px;
        }
        .uv-cases.two {
          grid-template-columns: repeat(2, minmax(220px, 1fr));
        }
        .uv-cases.four {
          grid-template-columns: repeat(2, minmax(220px, 1fr));
        }
        .uv-case {
          color: #3a3a3a;
          font-size: 22px;
          letter-spacing: 0.08em;
        }
        .uv-case span {
          font-size: 14px;
          color: #777;
        }

        .uv-btn-wrap {
          display: flex;
          justify-content: center;
          margin: 14px 0 40px;
        }

        /* ===== Modal ===== */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 60;
          padding: 24px;
        }
        .modal-content {
          position: relative;
          background: #fff;
          width: 100%;
          max-width: 980px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 28px 20px 32px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        }
        .modal-close {
          position: sticky;
          top: 0;
          margin-left: auto;
          display: inline-block;
          background: transparent;
          border: none;
          font-size: 30px;
          line-height: 1;
          cursor: pointer;
          color: #666;
        }
        .modal-cases {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px 28px;
          padding: 8px 8px 18px;
        }
        .modal-case-title {
          text-align: center;
          font-size: 18px;
          color: #3a3a3a;
          letter-spacing: 0.06em;
          margin: 0 0 10px;
        }
        .modal-case-title span {
          font-size: 14px;
          color: #777;
        }
        .modal-images {
          display: grid;
          grid-template-columns: auto 24px auto;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .arrow {
          color: #777;
          font-size: 20px;
          text-align: center;
        }
        .ba {
          position: relative;
        }
        .badge {
          position: absolute;
          left: 10px;
          top: 10px;
          background: #565656;
          color: #fff;
          font-size: 14px;
          padding: 6px 10px;
          border-radius: 2px;
          letter-spacing: 0.06em;
        }
        .modal-labels {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin: 8px auto 0;
          max-width: 580px;
          color: #444;
          font-size: 14px;
          letter-spacing: 0.06em;
        }

        /* ===== Responsive ===== */
        @media (max-width: 860px) {
          .uv-cases.two,
          .uv-cases.four {
            grid-template-columns: 1fr;
          }
          .modal-cases {
            grid-template-columns: 1fr;
          }
          .modal-images {
            grid-template-columns: auto 20px auto;
          }
        }
      `}</style>
    </>
  );
}
