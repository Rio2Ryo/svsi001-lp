"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useI18n } from "../lib/i18n";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // i18n
  const { t, lang, setLang } = useI18n();
  const tr = (key, fallback) => {
    const v = t(key);
    return v == null || v === key ? fallback : v;
  };

  // 表示テキスト（辞書になければ日本語デフォルト）
  const brand   = tr("hero.brand", "Mother Vegetables");
  const title   = tr("hero.title", "Confidence");
  const tagline = tr(
    "hero.tagline",
    "マザーベジタブルから生まれた完全オーガニックのシリカパウダー"
  );
  const catch1  = tr("hero.catch1", "その選択が");
  const catch2  = tr("hero.catch2", "肌も、地球も、美しく育てる");
  const body = tr(
    "hero.body",
    [
      "Mother Vegetables から生まれた「マザベジコンフィデンス」",
      "それはあなたの肌をやさしく育てながら地球環境を整えていく",
      "世界で唯一の存在です。",
      "",
      "あなたの美しさと、地球の未来を同時に育てる",
      "そんな、新しいスキンケアのかたちが誕生しました。",
      "",
      "あなたの肌を包み守るやさしさが、地球へのやさしさにもなる",
      "すべては、あなたの意思ある選択から始まります"
    ].join("\n")
  );

  useEffect(() => setIsVisible(true), []);
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  // 地球画像の左→右黒グラ
  const styles = {
    earthOverlay: {
      background:
        "linear-gradient(90deg, rgba(0,0,0,.78) 0%, rgba(0,0,0,.55) 40%, rgba(0,0,0,0) 72%)",
    },
  };

  return (
    <>
      {/* ===== ヘッダー（右上 言語切替） ===== */}
      <header className="site-header" aria-label="Top navigation">
        <div className="header-inner">
          <div className="lang-switcher" ref={menuRef}>
            <button
              className="lang-btn"
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={open}
              aria-label="Language selector"
            >
              {lang?.toUpperCase() || "JA"} <span className="caret">▾</span>
            </button>

            {open && (
              <ul className="lang-menu" role="menu">
                <li role="menuitem">
                  <button className="lang-item" onClick={() => setLang("ja")}>
                    日本語 <span className="code">JA</span>
                  </button>
                </li>
                <li role="menuitem">
                  <button className="lang-item" onClick={() => setLang("en")}>
                    English <span className="code">EN</span>
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>

      {/* ===== ファーストビュー ===== */}
      <section className={`first-view ${isVisible ? "is-visible" : ""}`}>
        {/* 上のパウダー帯 */}
        <div className="fv-top">
          <Image
            src="/fv-powder.png"
            alt="Confidence powder"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 900px"
            style={{ objectFit: "cover" }}
          />
          <div className="fv-top-inner">
            {/* ▼ テキスト見出し → ロゴ画像に置き換え */}
            <div className="fv-logo">
              <Image
                src="/MV_LOGO.png"
                alt={`${brand} ${title}`}
                width={205}
                height={80}
                priority
                className="fv-logo-img"
              />
            </div>
            <p className="fv-tagline">{tagline}</p>
          </div>
        </div>

        {/* キャッチコピー */}
        <h1 className="fv-catch">
          {catch1}
          <br />
          {catch2}
        </h1>

        {/* 地球のビジュアル＋本文 */}
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
              {body.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* styled-jsx */}
      <style jsx>{`
        /* ========== Header ========== */
        .site-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: transparent;
        }
        .header-inner {
          max-width: 1000px;
          margin: 0 auto;
          padding: 10px 16px 0;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
        .lang-switcher { position: relative; }
        .lang-btn {
          appearance: none;
          background: rgba(255, 255, 255, 0.86);
          backdrop-filter: blur(6px);
          border: 1px solid #e3e3e3;
          border-radius: 9999px;
          padding: 6px 12px;
          font-size: 12px;
          letter-spacing: 0.12em;
          color: #333;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease;
        }
        .lang-btn:hover { background: #fff; border-color: #d6d6d6; }
        .caret { font-size: 11px; line-height: 1; }
        .lang-menu {
          position: absolute; right: 0; top: calc(100% + 8px);
          min-width: 180px; background: #fff; border: 1px solid #e5e5e5;
          border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,.12); padding: 6px;
        }
        .lang-item {
          width: 100%; text-align: left; background: transparent; border: none;
          padding: 10px; border-radius: 6px; font-size: 13px; color: #333;
          display: flex; justify-content: space-between; align-items: center; cursor: pointer;
        }
        .lang-item:hover { background: #f5f5f5; }
        .code { color: #888; font-size: 12px; }

        /* ========== First View ========== */
        h2, p, span { font-family: Arial, Helvetica, sans-serif !important; }

        .first-view { background: #fff; padding: 8px 16px 60px; }
        .is-visible { animation: fadeInUp 0.9s ease-out both; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate3d(0,10px,0); }
          to   { opacity: 1; transform: translateZ(0); }
        }

        .fv-top {
          position: relative; height: 220px; max-width: 1000px;
          margin: 0 auto; overflow: hidden; background: #fff;
        }
        .fv-top-inner {
          position: absolute; inset: 0; display: flex; flex-direction: column;
          align-items: center; justify-content: center; text-align: center; color: #2a2a2a; padding: 12px;
        }

        /* ▼ ロゴ画像サイズ（レスポンシブ） */
        .fv-logo-img {
          width: clamp(260px, 60vw, 540px);
          height: auto;
          display: block;
        }

        .fv-tagline {
          margin: 8px 0 0; font-size: 12px; letter-spacing: 0.12em; color: #777;
        }

        .fv-catch {
          margin: 64px auto 36px; text-align: center; color: #3a3a3a;
          font-family: ot-bunyu-mincho-stdn, serif;
          font-size: 40px; line-height: 1.8; letter-spacing: 0.1em; font-weight: 500;
        }

        .fv-earth {
          position: relative; height: 380px; max-width: 990px;
          margin: 0 auto; overflow: hidden; background: #000;
        }
        .fv-earth-overlay { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
        .fv-earth-text {
          position: absolute; font-size:24px; z-index: 2; top: 50%; padding:20px 100px; transform: translateY(-50%);
          color: #fff; max-width: 640px; padding-right: 24px; text-shadow: 0 1px 2px rgba(0,0,0,.45);
        }
        .fv-earth-text p { margin: 0; font-size: 16px; line-height: 2; letter-spacing: 0.08em; }

        @media (max-width: 1024px) {
          .fv-top { height: 200px; }
          .fv-catch { font-size: 34px; margin: 56px auto 28px; }
          .fv-earth { height: 340px; }
          .fv-earth-text { left: 28px; max-width: 560px; }
        }
        @media (max-width: 600px) {
          .header-inner { padding: 8px 12px 0; }
          .first-view { padding: 8px 12px 44px; }
          .fv-top { height: 180px; }
          .fv-tagline { font-size: 11px; letter-spacing: 0.1em; }
          .fv-catch { font-size: 26px; line-height: 1.7; margin: 40px auto 22px; }
          .fv-earth { height: 300px; }
          .fv-earth-text { left: 16px; right: 16px; max-width: none; }
          .fv-earth-text p { font-size: 14px; line-height: 1.9; }
        }
      `}</style>
    </>
  );
}
