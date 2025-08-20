"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function EffectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  // インラインで使う軽量スタイル（罫線など）
  const styles = {
    hr: { background: "#d9d9d9", height: 1, width: "100%" },
  };

  return (
    <>
      <section className={`mv-certs ${isVisible ? "is-visible" : ""}`}>
        <div className="container">
          {/* ===== タイトル ===== */}
          <h2 className="mv-certs-title ja-serif">マザベジコンフィデンスの認証一覧</h2>
          <p className="mv-certs-sub">国際的信頼性をクリアした グローバルスタンダード</p>

          {/* ===== グレード ===== */}
          <div className="mv-grade-block">
            <h3 className="mv-subtitle">マザベジコンフィデンスのグレード</h3>
            <ul className="mv-grade-list">
              <li>
                <span className="country">日本</span>
                <span className="desc">医薬部外品原料規格</span>
              </li>
              <li>
                <span className="country">オーストラリア</span>
                <span className="desc">医薬部外品原料規格</span>
              </li>
              <li>
                <span className="country">アメリカ</span>
                <span className="desc">
                  FDA基準premium food grade をクリア（口に入れても安心）
                </span>
              </li>
            </ul>
          </div>

          {/* ===== その他の認証（左テキスト／右ロゴ） ===== */}
          <div className="mv-other-cert">
            <div className="mv-other-left">
              <h3 className="mv-subtitle">その他の認証</h3>
              <ul className="mv-grade-list">
                <li>
                  <span className="country">COSMOS 認証</span>
                  <span className="desc">オーガニック化粧品国際基準に合格</span>
                </li>
                <li>
                  <span className="country">ヴィーガン認証</span>
                  <span className="desc">動物性成分不検出</span>
                </li>
                <li>
                  <span className="country">ハラール認証</span>
                  <span className="desc">信仰的制限にも配慮</span>
                </li>
              </ul>
            </div>

            <div className="mv-cert-logos">
              <Image src="/logo-gmo.png" alt="GMO" width={86} height={44} />
              <Image src="/logo-cosmos.png" alt="COSMOS" width={86} height={44} />
              <Image src="/logo-vegan.png" alt="VEGAN" width={86} height={44} />
            </div>
          </div>
        </div>

        {/* ===== 連携（左テキスト／右ロゴ群＋画像） ===== */}
        <div className="mv-collab">
          <div className="container collab-grid">
            <div className="mv-collab-text">
              <h3 className="mv-subtitle">その他 学術機関や官公庁との連携</h3>

              <div className="mv-collab-country">
                <h4>日本</h4>
                <p>
                  水産庁と連携し、静岡県・河津町にて
                  <br />
                  Mother Vegetables の養殖プロジェクトをスタート
                </p>
              </div>

              <div className="mv-collab-country">
                <h4>マレーシア</h4>
                <p>
                  マレーシア政府、並びにマレーシア1位の
                  <br />
                  マラヤ大学と Mother Vegetables の研究
                  <br />
                  東京ドーム40個分の広さで養殖
                </p>
              </div>

              <div className="mv-collab-country">
                <h4>シンガポール</h4>
                <p>
                  シンガポール政府、並びにシンガポール1位の
                  <br />
                  シンガポール大学と Mother Vegetables の研究
                </p>
              </div>

              <div className="mv-collab-country">
                <h4>イギリス</h4>
                <p>ノッティンガム大学と Mother Vegetables の研究</p>
              </div>

              <p className="mv-footnote">
                ※当グループが保有する国際特許「WO2023234767」の技術は、日本だけでなく世界の美容を支えるために活用されています。
              </p>
            </div>

            <div className="mv-collab-right">
              <div className="mv-collab-logos">
                <div className="logo-row">
                  <Image src="/logo-fisheries.png" alt="fisheries" width={130} height={48} />
                  <Image src="/logo-shizuoka.png" alt="shizuoka" width={90} height={48} />
                </div>
                <div className="logo-row">
                  <Image src="/logo-kawazu.png" alt="kawazu" width={140} height={48} />
                  <Image src="/logo-malaysia-univ.png" alt="U. of Malaya" width={166} height={48} />
                </div>
              </div>

              <div className="mv-collab-img">
                <Image
                  src="/mv-greenhouse.jpg"
                  alt="greenhouse"
                  fill
                  sizes="(max-width: 1024px) 50vw, 420px"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== styled-jsx ===== */}
      <style jsx>{`
        .mv-certs {
          background: #ffffff;
          color: #3a3a3a;
          padding: 36px 16px 80px;
        }
        .is-visible {
          animation: fadeInUp 0.7s ease-out both;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 8px, 0);
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
        .ja-serif {
          font-family: "Yu Mincho", "Hiragino Mincho ProN", "Noto Serif JP",
            "Hiragino Kaku Gothic ProN", serif;
        }

        /* タイトル */
        .mv-certs-title {
          text-align: center;
          font-size: 26px;
          font-weight: 600;
          letter-spacing: 0.12em;
          margin: 6px 0 10px;
          color: #444;
        }
        .mv-certs-sub {
          text-align: center;
          color: #666;
          font-size: 15px;
          letter-spacing: 0.1em;
          margin-bottom: 24px;
        }

        /* サブ見出し */
        .mv-subtitle {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #444;
          margin: 36px 0 10px;
        }

        /* グレード・認証テーブル風 */
        .mv-grade-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .mv-grade-list li {
          display: grid;
          grid-template-columns: 220px 1fr;
          align-items: baseline;
          gap: 12px;
          padding: 6px 0;
          font-size: 15.5px;
          line-height: 2;
          color: #555;
        }
        .mv-grade-list .country {
          display: inline-block;
          letter-spacing: 0.28em; /* 日本語を気持ち広めに */
          color: #4a4a4a;
          text-align: left;
          white-space: nowrap;
        }
        .mv-grade-list .desc {
          letter-spacing: 0.02em;
        }

        /* その他の認証：左テキスト／右ロゴ */
        .mv-other-cert {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 28px;
          align-items: start;
          margin-top: 14px;
          margin-bottom: 24px;
        }
        .mv-cert-logos {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
          padding-top: 22px;
        }

        /* 連携ブロック */
        .mv-collab {
          margin-top: 24px;
          padding: 8px 0 0;
        }
        .collab-grid {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 36px;
          align-items: start;
        }
        .mv-collab-text h4 {
          font-size: 16px;
          margin: 18px 0 6px;
          color: #4a4a4a;
          letter-spacing: 0.1em;
        }
        .mv-collab-text p {
          margin: 0 0 10px;
          color: #555;
          font-size: 15.5px;
          line-height: 2;
          letter-spacing: 0.04em;
        }
        .mv-footnote {
          margin-top: 18px;
          font-size: 12px;
          color: #888;
          letter-spacing: 0.04em;
        }

        /* 右のロゴ群 */
        .mv-collab-right {
          display: grid;
          grid-template-rows: auto 1fr;
          gap: 18px;
        }
        .mv-collab-logos {
          display: grid;
          gap: 14px;
        }
        .logo-row {
          display: flex;
          align-items: center;
          gap: 22px;
          justify-content: flex-start;
          flex-wrap: wrap;
        }

        /* 右の画像 */
        .mv-collab-img {
          position: relative;
          width: 100%;
          height: 280px;
          overflow: hidden;
          background: #f0f2f4;
        }

        /* レスポンシブ */
        @media (max-width: 980px) {
          .mv-other-cert {
            grid-template-columns: 1fr;
          }
          .mv-cert-logos {
            justify-content: center;
            padding-top: 8px;
          }
          .collab-grid {
            grid-template-columns: 1fr;
          }
          .mv-collab-right {
            grid-template-rows: auto 240px;
          }
          .mv-collab-img {
            height: 240px;
          }
        }
        @media (max-width: 520px) {
          .mv-certs-title {
            font-size: 22px;
          }
          .mv-subtitle {
            font-size: 17px;
          }
          .mv-grade-list li {
            grid-template-columns: 1fr;
            gap: 6px;
            line-height: 1.9;
          }
          .mv-grade-list .country {
            letter-spacing: 0.22em;
          }
          .mv-certs-sub {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}
