"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function FeatureSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  // インライン用（影・グラデ）
  const styles = {
    calloutShadow: "0 2px 8px rgba(0,0,0,.06), 0 12px 28px rgba(0,0,0,.06)",
    // 左→右の灰グラ背景
    grayGradient: {
      background:
        "linear-gradient(90deg, #e6e6e6 0%, #eeeeee 40%, rgba(238,238,238,0) 82%)",
    },
  };

  return (
    <>
      <section className={`mother-veg ${isVisible ? "is-visible" : ""}`}>
        <div className="container">
          {/* ===== TOP banner ===== */}
          <div className="mv-banner">
            <Image
              src="/mv-banner.jpg"
              alt="Mother Vegetables banner"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 980px"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* ===== Title & lead ===== */}
          <h2 className="mv-title ja-serif">What is&nbsp; Mother Vegetables&nbsp;?</h2>
          <p className="mv-text">
            Mother Vegetables（マザーベジタブル、通称マザベジ）とは
            <br />
            約35億年前から姿を変えずに存在している、「生命のはじまりとなった植物」です。
            <br />
            マザーベジタブルからは世界で唯一、純度97.1%〜99.9999%のシリカを
            <br />
            オーガニックで生み出すことが可能です。
            <br />
            （国際特許「WO2023234765」にて技術を当グループが保有）
          </p>

          {/* ===== Benefits + rack ===== */}
          <div className="mv-info">
            <div className="mv-info-text">
              <h3 className="mv-subtitle">マザベジコンフィデンスを育て、使用するメリット</h3>
              <ul className="mv-list">
                <li>マザベジを育てることで、光合成によりCO2を吸収します。（天然芝の700倍）</li>
                <li>環境に配慮し、製造時には農薬や化学肥料を一切使用していません。</li>
                <li>土壌汚染をしない工場で製造しています。</li>
                <li>マザベジからシリカを抽出した残りの成分は、有機肥料等にも使用可能です。</li>
                <li>完全オーガニックの“マザベジコンフィデンス”は、世界で唯一、最高純度99.9999%を実現しました。</li>
              </ul>
            </div>
            <div className="mv-info-img">
              <Image
                src="/mv-rack.jpg"
                alt="rack"
                fill
                sizes="(max-width: 1024px) 48vw, 360px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          {/* ===== Conventional method ===== */}
          <div className="mv-info mv-info-single">
            <div className="mv-info-text">
              <h3 className="mv-subtitle">通常の高純度シリカの製造方法</h3>
              <p className="mv-paragraph">水晶 由来／米や竹 由来</p>
              <p className="mv-paragraph">
                これらの製造方法は、薬品の残留やアレルギー反応の懸念があり
                肌への使用にはリスクを伴います。
                <br />
                その他の原料由来のシリカは、医薬部外品原料規格である純度95%を下回ります。
              </p>
            </div>
          </div>

          {/* ===== Callout：左→右 灰グラ背景 + 右に silica.png ===== */}
          <div className="mv-callout">
            {/* 背景：左→右の灰グラ（最背面） */}
            <div className="mv-gradient" style={styles.grayGradient} />

            {/* 右側パウダー画像（中面） */}
            <div className="mv-powder">
              <Image
                src="/silica.png"
                alt="silica powder"
                fill
                sizes="(max-width: 1024px) 100vw, 980px"
                style={{ objectFit: "contain", objectPosition: "right center" }}
                priority
              />
            </div>

            {/* 左の説明ボックス（最前面） */}
            <div className="mv-callout-box" style={{ boxShadow: styles.calloutShadow }}>
              <p>
                マザベジコンフィデンスは、製造時に薬品を一切使わない他
                <br />
                使えば使うほどCO2削減にもつながります。
                <br />
                <br />
                あなたの肌も地球も喜ぶ
                <br />
                世界で唯一の高純度オーガニックシリカパウダーを
                <br />
                ぜひお試しください。
                <br />
                <span className="mv-note">
                  （有機物由来のマザベジコンフィデンスは、非晶質シリカのため発癌性もありません。）
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== styled-jsx ===== */}
      <style jsx>{`
        .mother-veg {
          background: #ffffff;
          color: #3a3a3a;
          padding: 36px 16px 84px;
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

        /* ===== Banner ===== */
        .mv-banner {
          position: relative;
          height: 300px;
          margin: 10px auto 28px;
          overflow: hidden;
          background: #e9efe8;
        }

        /* ===== Title & lead ===== */
        .ja-serif {
          font-family: "Yu Mincho", "Hiragino Mincho ProN", "Noto Serif JP",
            "Hiragino Kaku Gothic ProN", serif;
        }
        .mv-title {
          margin: 26px 0 14px;
          text-align: center;
          font-weight: 500;
          font-size: 34px;
          letter-spacing: 0.08em;
          color: #444;
        }
        .mv-text {
          text-align: center;
          margin: 0 auto 46px;
          max-width: 820px;
          font-size: 15.5px;
          line-height: 2.1;
          letter-spacing: 0.06em;
          color: #555;
        }

        /* ===== Info rows ===== */
        .mv-info {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 28px;
          align-items: start;
          margin: 10px 0 48px;
        }
        .mv-info-single {
          grid-template-columns: 1fr;
        }
        .mv-info-text {
          min-width: 0;
        }
        .mv-info-img {
          position: relative;
          height: 300px;
          background: #f0f0f0;
          overflow: hidden;
        }
        .mv-subtitle {
          margin: 0 0 14px;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #4a4a4a;
        }
        .mv-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .mv-list li {
          font-size: 15.5px;
          line-height: 2.1;
          letter-spacing: 0.04em;
          margin: 6px 0;
          color: #555;
        }
        .mv-paragraph {
          margin: 8px 0 10px;
          font-size: 15.5px;
          line-height: 2.1;
          letter-spacing: 0.04em;
          color: #555;
        }

        /* ===== Callout（左→右 灰グラ + 右 silica.png） ===== */
        .mv-callout {
          position: relative;
          min-height: 340px;
          margin: 38px 0 0;
          overflow: visible; /* 画像が右に少しはみ出せるように */
          background: transparent;
        }
        /* 灰色グラデ背景（最背面） */
        .mv-gradient {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        /* 右側のパウダー画像（中面） */
        .mv-powder {
          position: absolute;
          inset: 0;
          right: -6%;
          z-index: 1;
          pointer-events: none;
        }
        /* 左のテキストボックス（最前面） */
        .mv-callout-box {
          position: relative;
          z-index: 2;
          display: inline-block;
          background: rgba(238, 238, 238, 0.92);
          padding: 28px 28px 22px;
          margin: 26px 0 0 16px;
          max-width: 680px;
          color: #4a4a4a;
        }
        .mv-callout-box p {
          margin: 0;
          font-size: 16px;
          line-height: 2.1;
          letter-spacing: 0.04em;
        }
        .mv-note {
          color: #7a7a7a;
          font-size: 13px;
        }

        /* ===== Responsive ===== */
        @media (max-width: 1024px) {
          .mv-info {
            grid-template-columns: 1fr 300px;
          }
          .mv-info-img {
            height: 260px;
          }
          .mv-callout {
            min-height: 300px;
          }
          .mv-callout-box {
            max-width: 620px;
          }
        }
        @media (max-width: 720px) {
          .mv-banner {
            height: 240px;
          }
          .mv-title {
            font-size: 28px;
          }
          .mv-text {
            font-size: 15px;
            margin-bottom: 36px;
          }
          .mv-info {
            grid-template-columns: 1fr;
          }
          .mv-info-img {
            order: -1;
            height: 220px;
          }
          .mv-callout {
            min-height: 280px;
          }
          .mv-powder {
            right: -12%;
          }
          .mv-callout-box {
            margin: 18px 12px 0 12px;
            padding: 22px 18px;
            max-width: none;
          }
        }
        @media (max-width: 420px) {
          .mv-title {
            font-size: 24px;
            letter-spacing: 0.06em;
          }
          .mv-callout {
            min-height: 240px;
          }
        }
      `}</style>
    </>
  );
}
