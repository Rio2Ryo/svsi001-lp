import React, { useState } from "react";

export default function TestimonialSection() {
  const [modalImage, setModalImage] = useState(null);

  const testimonials = [
    {
      id: 1,
      name: "東京都 A.K様 (42歳)",
      comment: "朝のメイクが本当に楽になりました。毛穴が目立たなくなり、肌が陶器のように滑らかに。夕方になってもテカリや崩れがなく、朝の仕上がりがそのまま続きます。もう手放せません！"
    },
    {
      id: 2,
      name: "大阪府 M.S様 (38歳)",
      comment: "初めて使った時の感動が忘れられません。本当に陶器のような滑らかな肌になりました。特に小鼻周りの毛穴が全く目立たなくなって、素肌に自信が持てるように。メイク直しの回数も激減しました。"
    },
    {
      id: 3,
      name: "神奈川県 Y.T様 (35歳)",
      comment: "仕事で一日中マスクをしていても化粧崩れしにくく、本当に快適です。肌への負担も感じず、むしろ使い続けるうちに肌の調子が良くなってきました。友人にも『肌がキレイになった』と褒められます。"
    }
  ];

  const surveyResults = [
    { label: "化粧崩れが減った", percentage: 98 },
    { label: "肌の調子が良くなった", percentage: 95 },
    { label: "陶器肌になれた", percentage: 97 },
    { label: "リピートしたい", percentage: 99 }
  ];

  return (
    <>
      <section className="testimonial-section">
        <div className="container">
          <div className="header">
            <p className="section-label">お客様の声</p>
            <h2 className="section-title">実際にご使用いただいた<br />お客様の喜びの声</h2>
            <div className="section-separator" />
          </div>

          <div className="card-grid">
            {testimonials.map(t => (
              <div key={t.id} className="testimonial-card">
                <h4 className="card-label">使用前</h4>
                <div className="image-box" onClick={() => setModalImage(`before${t.id}`)}>
                  <img
                    src={`/before${t.id}.jpg`}
                    alt={`Before Photo ${t.id}`}
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                      borderRadius: "1rem"
                    }}
                  />
                  <div className="badge">Before</div>
                </div>

                <h4 className="card-label">使用後</h4>
                <div className="image-box after" onClick={() => setModalImage(`after${t.id}`)}>
                  <img
                    src={`/after${t.id}.jpg`}
                    alt={`After Photo ${t.id}`}
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                      borderRadius: "1rem"
                    }}
                  />
                  <div className="badge after">After</div>
                </div>

                <p className="comment">{t.comment}</p>
                <p className="name">{t.name}</p>
              </div>
            ))}
          </div>

          <div className="survey-box">
            <h3 className="survey-title">ご愛用者様アンケート結果</h3>
            <div className="survey-grid">
              {surveyResults.map((r, i) => (
                <div key={i}>
                  <div className="survey-bar-header">
                    <span>{r.label}</span>
                    <span className="highlight">{r.percentage}%</span>
                  </div>
                  <div className="survey-bar-bg">
                    <div className="survey-bar-fill" style={{ width: `${r.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="note">※2024年10月実施 n=500</p>
          </div>
        </div>
      </section>

      {modalImage && (
        <div className="modal" onClick={() => setModalImage(null)}>
          <button className="modal-close">×</button>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={`/${modalImage}.jpg`}
              alt={`拡大画像 ${modalImage}`}
              style={{ maxWidth: "90vw", maxHeight: "80vh", borderRadius: "1rem" }}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .testimonial-section {
          padding: 5rem 1rem 6rem;
          background: #f9fafb;
        }
        .container {
          max-width: 1280px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .section-label {
          color: #b8860b;
          font-size: 0.9rem;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
        }
        .section-title {
          font-size: 2rem;
          color: #2d2d2d;
          margin-bottom: 1.5rem;
        }
        .section-separator {
          width: 80px;
          height: 4px;
          background: #b8860b;
          margin: 0 auto;
        }

        .card-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 768px) {
          .card-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .testimonial-card {
          background: white;
          border-radius: 1.5rem;
          padding: 2rem;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
       .card-label {
  color: #b8860b;
  margin-bottom: 0.5rem;
  font-weight: 300;
  text-align: left; /* 👈 追加 */
}
        .image-box {
          background: #eee;
          border-radius: 1rem;
          padding: 0;
          margin-bottom: 1.5rem;
          position: relative;
          cursor: pointer;
          overflow: hidden;
        }
        .image-box:hover {
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .image-box.after {
          background: linear-gradient(to bottom right, #f9f9f9, #f0f0f0);
        }
        .badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: rgba(255,255,255,0.9);
          padding: 0.4rem 1rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #b8860b;
        }
        .badge.after {
          background: linear-gradient(to right, #b8860b, #d4c4b0);
          color: #000;
        }

        .comment {
          font-size: 0.95rem;
          color: #333;
          margin: 1rem 0;
          line-height: 1.6;
        }
        .name {
          font-size: 0.8rem;
          color: #b8860b;
        }

        .survey-box {
          background: white;
          padding: 2rem;
          border-radius: 1.5rem;
          margin-top: 4rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
        }
        .survey-title {
          font-size: 1.5rem;
          text-align: center;
          margin-bottom: 2rem;
          color: #2d2d2d;
        }
        .survey-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .survey-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .survey-bar-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.3rem;
          font-size: 0.9rem;
          color: #444;
        }
        .highlight {
          font-weight: bold;
          color: #b8860b;
        }
        .survey-bar-bg {
          background: #ddd;
          border-radius: 999px;
          height: 12px;
          overflow: hidden;
        }
        .survey-bar-fill {
          background: linear-gradient(to right, #b8860b, #d4c4b0);
          height: 100%;
          transition: width 1s ease;
        }
        .note {
          font-size: 0.75rem;
          text-align: center;
          color: #888;
          margin-top: 1rem;
        }

        .modal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-close {
          position: absolute;
          top: 20px;
          right: 30px;
          font-size: 2rem;
          color: white;
          background: none;
          border: none;
          cursor: pointer;
        }
        .modal-content {
          background: #f0f0f0;
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-content img {
          width: 100%;
          height: auto;
          border-radius: 1rem;
        }
      `}</style>
    </>
  );
}
