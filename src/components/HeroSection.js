"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useI18n } from "../lib/i18n";
import { useRouter, usePathname, useSearchParams } from "next/navigation"; // ★追加

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const router = useRouter();                    // ★追加
  const pathname = usePathname();                // ★追加
  const searchParams = useSearchParams();        // ★追加

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

  // ★ 初回：URLの ?lang= を状態へ反映
  useEffect(() => {
    const q = searchParams.get("lang");
    if (q === "en" || q === "ja") setLang(q);
  }, [searchParams, setLang]);

  // ★ 切替時：状態とURLクエリを同期
  const switchLang = (nextLang) => {
    setLang(nextLang);
    const params = new URLSearchParams(searchParams.toString());
    if (nextLang === "ja") {
      params.delete("lang"); // 日本語はクエリ無しにする方針
    } else {
      params.set("lang", nextLang); // 例: ?lang=en
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    setOpen(false);
  };

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
                <li className="sep" aria-hidden="true" />
                <li role="menuitem">
                  <button className="lang-item" onClick={() => switchLang("ja")}>JA</button>
                </li>
                <li role="menuitem">
                  <button className="lang-item" onClick={() => switchLang("en")}>EN</button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>

      {/* ===== ファーストビュー ===== */}

      {/* ===== ファーストビュー ===== */}
      <section className={`first-view ${isVisible ? "is-visible" : ""}`}>
        {/* 左上ロゴ */}
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
                width={250}
                height={110}
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

        {/* 地球ブロック */}
        <div className="fv-earth-bg">
          <div className="fv-earth-box">
            <p className="fv-earth-copy">
              {(body || "").split("\n").map((line, i) => (
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
        .site-header { position: relative; z-index: 100; background: transparent; }
        .header-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 12px 16px 0;
          display: flex; justify-content: flex-end; align-items: center;
        }

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
        .lang-switcher.open .caret { transform: rotate(180deg); }

        .lang-menu,
        .lang-menu li {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .lang-menu li::marker { content: ""; }
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
          height: 1px;
          background: #111;
          opacity: .8;
          width: 80px;
          margin: 0 0 8px auto;
        }
        .lang-item {
          width: 100%;
          text-align: right;
          background: transparent;
          border: none;
          padding: 6px 30% 6px 0;
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

        .brand-dot{
          --dot-offset: clamp(80px, 18vw, 220px);
          position: absolute;
          top: clamp(40px, 7vw, 72px);
          left: 38%;
          transform: translateX(calc(-50% - var(--dot-offset)));
          z-index: 2;
          filter: grayscale(100%) contrast(.9) opacity(.9);
          pointer-events: none;
        }

        .fv-top {
          position: relative;
          height: 260px;
          max-width: 1100px;
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
          font-size: 17px;
          letter-spacing: .12em;
          color: #6a6a6a;
          font-family: ot-bunyu-mincho-stdn, serif !important;
        }

        .fv-catch {
          margin: 42px auto 36px;
          text-align: center;
          color: #3a3a3a;
          font-family: ot-bunyu-mincho-stdn, serif;
          font-size: 42px;
          line-height: 1.5;
          letter-spacing: .1em;
          font-weight: 600;
        }

        /* ===== 地球ブロック ===== */
        .fv-earth-bg {
          position: relative;
          background-image: url('/fv-earth.jpg');
          background-size: cover;
          background-position: center;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 60px 20px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .fv-earth-box {
          
          border-radius: 10px;
          padding: 28px 26px;
          max-width: 900px;
          width: 100%;
          box-sizing: border-box;
        }
        .fv-earth-copy {
          margin: 0;
          font-size: 22px;
          line-height: 1.85;
          letter-spacing: .04em;
          color: #fff;
          text-align: left;
        }

        /* ===== レスポンシブ ===== */
        @media (max-width: 1100px){
          .fv-top { height: 240px; max-width: 92vw; }
          .brand-dot { top: 46px; left: 24px; }
          .fv-catch { font-size: 30px; margin: 36px auto 30px; }
          .fv-earth-bg { padding: 40px 18px; }
          .fv-earth-copy { font-size: 18px; }
        }
        @media (max-width: 600px){
          .header-inner { padding: 8px 12px 0; }
          .first-view { padding: 8px 12px 42px; }
          .brand-dot { top: 34px; left: 12px; filter: opacity(.75); }
          .fv-top{ height: 184px; max-width: 94vw; }
          .fv-logo-img{ width: clamp(190px, 58vw, 280px); }
          .fv-tagline{ font-size: 14px; margin-top: 6px; white-space:pre-wrap; }
          .fv-catch{ font-size: 1rem; line-height: 1.65; margin: 22px auto 18px; }
          .fv-earth-bg{ padding: 28px 14px; }
          .fv-earth-box{ padding: 18px 16px; max-width: none; }
          .fv-earth-copy{ font-size: 0.9rem; line-height: 1.9; }
        }
        @media (max-width: 390px){
          .fv-top{ height: 170px; }
          .fv-logo-img{ width: clamp(170px, 64vw, 250px); }
          .fv-catch{ font-size: 1rem; margin: 20px auto 14px; }
          .fv-earth-bg{ padding: 20px 12px; }
          .fv-earth-copy{ font-size: 0.8rem; }
        }
      `}</style>
    </>
  );
}
