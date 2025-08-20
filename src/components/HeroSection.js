"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // inline用のスタイル（左からの黒グラデ等）
  const styles = {
    earthOverlay: {
      background:
        "linear-gradient(90deg, rgba(0,0,0,.78) 0%, rgba(0,0,0,.55) 40%, rgba(0,0,0,0) 72%)",
    },
  };

  return (
    <>
      <section className={`first-view ${isVisible ? "is-visible" : ""}`}>
        {/* 上のパウダー帯 */}
        <div className="fv-top">
          <Image
            src="/fv-powder.png"
            alt="Confidence powder"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 920px"
            style={{ objectFit: "cover" }}
          />
          <div className="fv-top-inner">
            <h2 className="fv-confidence">
              <span className="fv-brand">Mother Vegetables</span>
              <br />
              Confidence
            </h2>
            <p className="fv-tagline">
              マザーベジタブルから生まれた完全オーガニックのシリカパウダー
            </p>
          </div>
        </div>

        {/* キャッチコピー */}
        <h1 className="fv-catch">
          その選択が
          <br />
          肌も、地球も、美しく育てる
        </h1>

        {/* 地球のビジュアル＋テキスト */}
        <div className="fv-earth">
          <Image
            src="/fv-earth.jpg"
            alt="Earth"
            fill
            sizes="(max-width: 1024px) 100vw, 920px"
            style={{ objectFit: "cover" }}
          />
          <div className="fv-earth-overlay" style={styles.earthOverlay} />
          <div className="fv-earth-text">
            <p>
              Mother Vegetables から生まれた「マザベジコンフィデンス」
              <br />
              それはあなたの肌をやさしく育てながら地球環境を整えていく
              <br />
              世界で唯一の存在です。
              <br />
              <br />
              あなたの美しさと、地球の未来を同時に育てる
              <br />
              そんな、新しいスキンケアのかたちが誕生しました。
              <br />
              <br />
              あなたの肌を包み守るやさしさが、地球へのやさしさにもなる
              <br />
              すべては、あなたの意思ある選択から始まります
            </p>
          </div>
        </div>
      </section>

      {/* styled-jsx */}
      <style jsx>{`
        /* ベース */
        .first-view {
          background: #f7f7f5;
          padding: 32px 16px 60px;
        }
        .is-visible {
          animation: fadeInUp 0.9s ease-out both;
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

        /* 上部帯（パウダー） */
        .fv-top {
          position: relative;
          height: 220px;
          max-width: 920px;
          margin: 0 auto;
          overflow: hidden;
          border-radius: 0;
          background: #fff;
        }
        .fv-top-inner {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #2a2a2a;
          padding: 12px;
        }
        .fv-confidence {
          margin: 0 0 6px;
          font-weight: 400;
          font-size: 38px;
          line-height: 1.22;
          letter-spacing: 0.06em;
          color: #3a3a3a;
        }
        .fv-brand {
          font-size: 16px;
          font-weight: 400;
          letter-spacing: 0.14em;
          color: #5a5a5a;
        }
        .fv-tagline {
          margin: 6px 0 0;
          font-size: 12px;
          letter-spacing: 0.12em;
          color: #777;
        }

        /* キャッチ */
        .fv-catch {
          margin: 64px auto 36px;
          text-align: center;
          color: #3a3a3a;
          font-size: 40px;
          line-height: 1.8;
          letter-spacing: 0.1em;
          font-weight: 500;
        }

        /* 地球ブロック */
        .fv-earth {
          position: relative;
          height: 380px;
          max-width: 920px;
          margin: 0 auto;
          border-radius: 0;
          overflow: hidden;
          background: #000;
        }
        .fv-earth-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }
        .fv-earth-text {
          position: absolute;
          z-index: 2;
          top: 50%;
          left: 40px;
          transform: translateY(-50%);
          color: #fff;
          max-width: 640px;
          padding-right: 24px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
        }
        .fv-earth-text p {
          margin: 0;
          font-size: 16px;
          line-height: 2.0;
          letter-spacing: 0.08em;
        }

        /* レスポンシブ */
        @media (max-width: 1024px) {
          .fv-top {
            height: 200px;
          }
          .fv-confidence {
            font-size: 34px;
          }
          .fv-catch {
            font-size: 34px;
            margin: 56px auto 28px;
          }
          .fv-earth {
            height: 340px;
          }
          .fv-earth-text {
            left: 28px;
            max-width: 560px;
          }
        }
        @media (max-width: 600px) {
          .first-view {
            padding: 24px 12px 44px;
          }
          .fv-top {
            height: 180px;
          }
          .fv-confidence {
            font-size: 28px;
          }
          .fv-brand {
            font-size: 14px;
          }
          .fv-tagline {
            font-size: 11px;
            letter-spacing: 0.1em;
          }
          .fv-catch {
            font-size: 26px;
            line-height: 1.7;
            margin: 40px auto 22px;
            letter-spacing: 0.08em;
          }
          .fv-earth {
            height: 300px;
          }
          .fv-earth-text {
            left: 16px;
            right: 16px;
            max-width: none;
          }
          .fv-earth-text p {
            font-size: 14px;
            line-height: 1.9;
          }
        }
      `}</style>
    </>
  );
}
