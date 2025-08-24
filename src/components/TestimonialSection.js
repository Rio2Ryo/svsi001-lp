"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function TestimonialSection() {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);

  // ====== モーダル用データ ======
  const modal1Cases = [
    {
      title: "頬のシミ・クマ",
      age: "50代の女性",
      beforeImg: "/case1-1-before.jpg",
      afterImg: "/case1-1-after.jpg",
      beforeLabel: "使用前",
      afterLabel: "20日後",
    },
    {
      title: "腕のシミ・あざ",
      age: "80代の女性",
      beforeImg: "/case1-2-before.jpg",
      afterImg: "/case1-2-after.jpg",
      beforeLabel: "使用前",
      afterLabel: "24日後",
    },
  ];

  const modal2Cases = [
    {
      title: "両手の親指",
      age: "30代の男性",
      beforeImg: "/case2-1-before.jpg",
      afterImg: "/case2-1-after.jpg",
      beforeLabel: "使用前",
      afterLabel: "3日後",
    },
    {
      title: "肌荒れ",
      age: "5才の男の子",
      beforeImg: "/case2-2-before.jpg",
      afterImg: "/case2-2-after.jpg",
      beforeLabel: "使用前",
      afterLabel: "3日後",
    },
    {
      title: "乾燥の皮膚炎",
      age: "40代の女性",
      beforeImg: "/case2-3-before.jpg",
      afterImg: "/case2-3-after.jpg",
      beforeLabel: "使用前",
      afterLabel: "3日後",
    },
    {
      title: "アトピー性皮膚炎",
      age: "10才の男の子",
      beforeImg: "/case2-4-before.jpg",
      afterImg: "/case2-4-after.jpg",
      beforeLabel: "使用前",
      afterLabel: "10日後",
    },
  ];

  const modal3Cases = [
    {
      title: "腕のやけど",
      age: "50代の女性",
      beforeImg: "/case3-1-before.jpg",
      afterImg: "/case3-1-after.jpg",
      beforeLabel: "使用前",
      afterLabel: "24時間後",
    },
    {
      title: "転んだ傷",
      age: "50代の女性",
      beforeImg: "/case3-2-before.jpg",
      afterImg: "/case3-2-after.jpg",
      beforeLabel: "塗布前",
      afterLabel: "10時間後",
    },
  ];

  // ====== モーダルコンポーネント ======
  const Modal = ({ cases, onClose }) => (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-cases">
          {cases.map((m, i) => (
            <div className="modal-case" key={i}>
              <h4>{m.title}<br /><span>{m.age}</span></h4>
              <div className="modal-images">
                <div className="ba">
                  <span className="badge">Before</span>
                  <Image src={m.beforeImg} alt="before" width={260} height={170} />
                </div>
                <span className="arrow">▶</span>
                <div className="ba">
                  <span className="badge">After</span>
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
      <style jsx>{`
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,.55);
          display: flex; align-items: center; justify-content: center;
          z-index: 9999;
        }
        .modal-content {
          background: #fff; padding: 20px; max-width: 980px; width: 100%;
          max-height: 90vh; overflow-y: auto; position: relative;
        }
        .modal-close {
          position: absolute; right: 10px; top: 10px; font-size: 28px;
          background: none; border: none; cursor: pointer;
        }
        .modal-cases {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 36px 28px; padding: 20px;
        }
        .modal-case-title { text-align: center; }
        .modal-images { display: flex; align-items: center; gap: 10px; justify-content: center; }
        .ba { position: relative; }
        .badge {
          position: absolute; left: 10px; top: 10px;
          background: #565656; color: #fff; padding: 4px 10px;
          font-size: 14px; border-radius: 2px;
        }
        .modal-labels {
          display: flex; justify-content: space-between;
          margin-top: 6px; font-size: 14px;
        }
      `}</style>
    </div>
  );

  return (
    <section className="user-voice">
      {/* Block1 */}
      <button onClick={() => setShowModal1(true)}>Block1 モーダルを開く</button>
      {showModal1 && <Modal cases={modal1Cases} onClose={() => setShowModal1(false)} />}

      {/* Block2 */}
      <button onClick={() => setShowModal2(true)}>Block2 モーダルを開く</button>
      {showModal2 && <Modal cases={modal2Cases} onClose={() => setShowModal2(false)} />}

      {/* Block3 */}
      <button onClick={() => setShowModal3(true)}>Block3 モーダルを開く</button>
      {showModal3 && <Modal cases={modal3Cases} onClose={() => setShowModal3(false)} />}
    </section>
  );
}
