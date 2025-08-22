"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useI18n } from "../lib/i18n";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const { t, lang, setLang } = useI18n();
  const tr = (key) => t(key) ?? "";

  const brand   = tr("hero.brand");
  const title   = tr("hero.title");
  const tagline = tr("hero.tagline");
  const catch1  = tr("hero.catch1");
  const catch2  = tr("hero.catch2");
  const body    = tr("hero.body");

  const altPowder = tr("hero.alt.powder");
  const altLogo   = tr("hero.alt.logo");

  const labelLang = tr("ui.lang.label");
  const labelJA   = tr("ui.lang.ja");
  const labelEN   = tr("ui.lang.en");

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

  return (
    <>
      {/* ===== ヘッダー（右上 言語切替） ===== */}
      <header className="site-header" aria-label="Top navigation">
        <div className="header-inner">
          <div className={`lang-switcher ${open ? "open" : ""}`} ref={menuRef}>
            <button
              className="lang-btn"
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={open}
              aria-label="Language selector"
              title={labelLang || "Language"}
            >
              {(lang || "ja").toUpperCase()}
              <span className="caret">▾</span>
            </button>

            {open && (
              <ul className="lang-menu" role="menu" aria-label={labelLang || "Language"}>
                {/* 上に細いライン */}
                <li className="sep" aria-hidden="true" />
                <li role="menuitem">
                  <button className="lang-item" onClick={() => setLang("ja")}>
                    JA
                  </button>
                </li>
                <li role="menuitem">
                  <button className="lang-item" onClick={() => setLang("en")}>
                    EN
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>

      {/* ===== ファーストビュー ===== */}
      <section className={`first-view ${isVisible ? "is-visible" : ""}`}>
        {/* 左上ロゴ（重ね） */}
        <div className="brand-dot" aria-hidden="true">
          <Image src="/logo-dot.png" alt="" width={140} height={100} priority />
        </div>

        {/* 上のパウダー帯 */}
        <div className="fv-top">
          <Image
            src="/fv-powder.png"
            alt={altPowder}
            fill
            priority
            sizes="(max-width: 1400px) 100vw, 1400px"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div className="fv-top-inner">
            <div className="fv-logo">
              <Image
                src="/MV_LOGO.png"
                alt={altLogo}
                width={205}
                height={80}
                priority
                className="fv-logo-img"
              />
            </div>
            <p className="fv-tagline">{tagline}</p>
          </div>
        </div>

        {/* キャッチコピー（使っていればそのまま） */}
        <h1 className="fv-catch">
          {catch1}
          <br />
          {catch2}
        </h1>

        {/* （以下はそのまま。必要なければ削除可） */}
        <div className="fv-earth-bg">
          <p className="fv-earth-copy">
            {(body || "").split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* styled-jsx */}
      <style jsx>{`
        /* ========== Header ========== */
        .site-header { position: relative; z-index: 100; background: transparent; }
        .header-inner {
          max-width: 1200px;   /* 見本の余白感に合わせて広め */
          margin: 0 auto;
          padding: 12px 16px 0;
          display: flex; justify-content: flex-end; align-items: center;
        }

        /* テキスト型トグル */
        .lang-switcher { position: relative; }
        .lang-btn {
          appearance: none;
          background: transparent;
          border: none;
          padding: 4px 0;
          font-size: 14px;
          letter-spacing: 0.08em;
          color: #111;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }
        .caret { display: inline-block; transition: transform .2s ease; }
        .lang-switcher.open .caret { transform: rotate(180deg); } /* ↑ に反転 */

        /* ドロップダウンを右端に、枠なし・細ラインのみで */
        .lang-menu {
          position: absolute;
          right: 0;
          top: calc(100% + 6px);
          min-width: 72px;
          background: transparent;
          border: none;
          box-shadow: none;
          padding: 0;
          text-align: right;
        }
        .lang-menu .sep {
          list-style: none;
          height: 1px;
          background: #111;
          opacity: .8;
          width: 80px;
          margin: 0 0 8px auto; /* 右寄せの横線 */
        }
        .lang-item {
          width: 100%;
          text-align: right;
          background: transparent;
          border: none;
          padding: 6px 0;
          font-size: 13px;
          color: #111;
          cursor: pointer;
        }
        .lang-item:hover { text-decoration: underline; }

        /* ========== First View ========== */
        h2, p, span { font-family: Arial, Helvetica, sans-serif !important; }
        .first-view { position: relative; background: #fff; padding: 8px 16px 60px; }
        .is-visible { animation: fadeInUp .8s ease-out both; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate3d(0,10px,0); }
          to   { opacity: 1; transform: translateZ(0); }
        }

        /* 左上ロゴ：画面中央から少し左へ固定（レスポンシブで安定） */
.brand-dot{
  /* ずらし量：最小80px〜最大220px、基本は 18vw を採用 */
  --dot-offset: clamp(80px, 18vw, 220px);

  position: absolute;
  top: clamp(40px, 7vw, 72px);   /* 縦位置は見た目に合わせて調整 */
  left: 40%;
  transform: translateX(calc(-50% - var(--dot-offset)));
  z-index: 2;
  filter: grayscale(100%) contrast(.9) opacity(.9);
  pointer-events: none;
}

        .fv-top {
          position: relative;
          height: 260px;          /* 見本寄せで少し高め */
          max-width: 1100px;      /* 画像の横幅感を再現 */
          margin: 0 auto;
          overflow: hidden;
          background: #fff;
        }
        .fv-top-inner {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; color: #2a2a2a; padding: 12px;
        }
        .fv-logo-img { width: clamp(280px, 56vw, 520px); height: auto; display: block; }
        .fv-tagline {
          margin: 10px 0 0;
          font-size: 20px;
          letter-spacing: .12em;
          color: #6a6a6a;
          font-family: ot-bunyu-mincho-stdn, serif !important;
        }

        .fv-catch {
          margin: 42px auto 36px;
          text-align: center;
          color: #3a3a3a;
          font-family: ot-bunyu-mincho-stdn, serif;
          font-size: 40px;
          line-height: 1.5;
          letter-spacing: .1em;
          font-weight: 600;
        }

        /* ===== 地球ブロック（そのまま運用する想定） ===== */
        .fv-earth-bg {
          position: relative;
          height: 500px;
          max-width: 1200px;
          margin: 0 auto;
          border-radius: 0;
          overflow: hidden;
          background-image:
            linear-gradient(90deg, rgba(0,0,0,.88) 0%, rgba(0,0,0,.72) 38%, rgba(0,0,0,.3) 68%, rgba(0,0,0,0) 80%),
            url('/fv-earth.jpg');
          background-size: cover, cover;
          background-position: 75% center, 75% center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          padding: 0 24px 0 120px;
          color: #fff;
          text-shadow: 0 1px 2px rgba(0,0,0,.45);
        }
        .fv-earth-copy {
          margin: 0;
          max-width: 720px;
          font-size: 22px;
          line-height: 2;
          letter-spacing: .08em;
        }

        @media (max-width: 1100px){
          .fv-top { height: 240px; max-width: 92vw; }
          .brand-dot { top: 46px; left: 24px; }
          .fv-catch { font-size: 30px; margin: 36px auto 30px; }
          .fv-earth-bg{ height: 420px; max-width: 95vw; padding-left: 40px; }
          .fv-earth-copy{ max-width: 560px; font-size: 20px; }
        }
        @media (max-width: 600px){
          .header-inner { padding: 8px 12px 0; }
          .first-view { padding: 8px 12px 44px; }
          .brand-dot { top: 38px; left: 14px; }
          .fv-top { height: 200px; }
          .fv-logo-img { width: clamp(220px, 70vw, 360px); }
          .fv-tagline { font-size: 11px; letter-spacing: .1em; }
          .fv-catch { font-size: 24px; line-height: 1.7; margin: 28px auto 18px; }
          .fv-earth-bg{ height: 360px; padding: 0 16px; }
          .fv-earth-copy{ max-width: none; font-size: 15px; line-height: 1.9; }
        }
      `}</style>
    </>
  );
}
