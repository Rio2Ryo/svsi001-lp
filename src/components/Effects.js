"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useI18n } from "../lib/i18n";

export default function EffectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  const { t } = useI18n();
  const tr = (key) => t(key) ?? "";

  // インライン軽量スタイル
  const styles = { hr: { background: "#d9d9d9", height: 1, width: "100%" } };

  // タイトル
  const title   = tr("effects.title");
  const sub     = tr("effects.subtitle");

  // グレード見出し
  const gradeTitle = tr("effects.grade.title");
  const gradeRows = [0, 1, 2].map((i) => ({
    country: tr(`effects.grade.rows.${i}.country`),
    desc:    tr(`effects.grade.rows.${i}.desc`),
  }));

  // その他の認証
  const otherTitle = tr("effects.other.title");
  const otherRows = [0, 1, 2].map((i) => ({
    name: tr(`effects.other.rows.${i}.name`),
    desc: tr(`effects.other.rows.${i}.desc`),
  }));

  // 連携セクション
  const collabTitle = tr("effects.collab.title");
  const collabCountries = [0, 1, 2, 3].map((i) => ({
    name: tr(`effects.collab.countries.${i}.name`),
    body: tr(`effects.collab.countries.${i}.body`),
  }));
  const footnote = tr("effects.collab.footnote");

  // 画像 alt
  const altGmo         = tr("effects.alt.gmo");
  const altFisheries   = tr("effects.alt.fisheries");
  const altShizuoka    = tr("effects.alt.shizuoka");
  const altKawazu      = tr("effects.alt.kawazu");
  const altMalaysiaUni = tr("effects.alt.malaysiaUni");
  const altGreenhouse  = tr("effects.alt.greenhouse");

  return (
    <>
      <section className={`mv-certs ${isVisible ? "is-visible" : ""}`}>
        <div className="container">
          {/* ===== タイトル ===== */}
          <h2 className="mv-certs-title ja-serif">{title}</h2>
          <p className="mv-certs-sub">{sub}</p>

          {/* ===== グレード ===== */}
          <div className="mv-grade-block">
            <h3 className="mv-subtitle">{gradeTitle}</h3>
            <ul className="mv-grade-list">
              {gradeRows.map((r, i) =>
                r.country || r.desc ? (
                  <li key={`gr-${i}`}>
                    <span className="country">{r.country}</span>
                    <span className="desc">{r.desc}</span>
                  </li>
                ) : null
              )}
            </ul>
          </div>

          {/* ===== その他の認証（左テキスト／右ロゴ） ===== */}
          <div className="mv-other-cert">
            <div className="mv-other-left">
              <h3 className="mv-subtitle">{otherTitle}</h3>
              <ul className="mv-grade-list">
                {otherRows.map((r, i) =>
                  r.name || r.desc ? (
                    <li key={`ot-${i}`}>
                      <span className="country">{r.name}</span>
                      <span className="desc">{r.desc}</span>
                    </li>
                  ) : null
                )}
              </ul>
            </div>

            <div className="mv-cert-logos">
              <Image src="/logo-gmo.png" alt={altGmo || "GMO"} width={410} height={130} />
            </div>
          </div>
        </div>

        {/* ===== 連携（左テキスト／右ロゴ群＋画像） ===== */}
        <div className="mv-collab">
          <div className="container collab-grid">
            <div className="mv-collab-text">
              <h3 className="mv-subtitle">{collabTitle}</h3>

              {collabCountries.map((c, i) =>
                c.name || c.body ? (
                  <div className="mv-collab-country" key={`cc-${i}`}>
                    <h4>{c.name}</h4>
                    <p>
                      {(c.body || "").split("\n").map((line, j) => (
                        <span key={`c${i}-${j}`}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                ) : null
              )}

              <p className="mv-footnote">{footnote}</p>
            </div>

            <div className="mv-collab-right">
              <div className="mv-collab-logos">
                <div className="logo-row">
                  <Image src="/logo-fisheries.png" alt={altFisheries} width={180} height={88} />
                  <Image src="/logo-shizuoka.png" alt={altShizuoka} width={200} height={88} />
                </div>
                <div className="logo-row">
                  <Image src="/logo-kawazu.png" alt={altKawazu} width={208} height={88} />
                  <Image src="/logo-malaysia-univ.png" alt={altMalaysiaUni} width={186} height={88} />
                </div>
              </div>

              <div className="mv-collab-img">
                <Image
                  src="/mv-greenhouse.jpg"
                  alt={altGreenhouse}
                  fill
                  sizes="(max-width: 1024px) 50vw, 520px"
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
        h4{ font-weight:bold; }
        .is-visible { animation: fadeInUp 0.7s ease-out both; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate3d(0, 8px, 0); }
          to   { opacity: 1; transform: translateZ(0); }
        }
        .container { max-width: 1100px; margin: 0 auto; }
        .ja-serif {
          font-family: "Yu Mincho","Hiragino Mincho ProN","Noto Serif JP","Hiragino Kaku Gothic ProN",serif;
        }

        /* タイトル */
        .mv-certs-title {
          text-align: center; font-size: 38px; font-weight: 600;
          letter-spacing: 0.12em; margin: 6px 0 10px; color: #444;
        }
        .mv-certs-sub {
          text-align: center; color: #666; font-size: 24px;
          letter-spacing: 0.1em; margin-bottom: 24px;
        }

        /* サブ見出し */
        .mv-subtitle {
          font-size: 24px; font-weight: 700; letter-spacing: 0.14em;
          color: #444; margin: 36px 0 10px;
        }

        /* グレード・認証テーブル風 */
        .mv-grade-list { list-style: none; padding: 0; margin: 0; }
        .mv-grade-list li {
          display: grid; grid-template-columns: 220px 1fr;
          align-items: baseline; gap: 12px; padding: 2px 0;
          font-size: 22px; line-height: 1.5; color: #555;
        }
        .mv-grade-list .country {
          display: inline-block; letter-spacing: 0.28em; color: #4a4a4a;
          text-align: left; white-space: nowrap;
        }
        .mv-grade-list .desc { letter-spacing: 0.02em; }

        /* その他の認証：左テキスト／右ロゴ */
        .mv-other-cert {
          display: grid; grid-template-columns: 1fr 320px;
          gap: 28px; align-items: start; margin-top: 14px; margin-bottom: 24px;
        }
        .mv-cert-logos {
          display: flex; justify-content: flex-end; align-items: center;
          gap: 28px; flex-wrap: wrap; padding-top: 22px;
        }

        /* 連携ブロック */
        .mv-collab { margin-top: 24px; padding: 8px 0 0; }
        .collab-grid {
          display: grid; grid-template-columns: 1fr 420px; gap: 36px; align-items: start;
        }
        .mv-collab-text h4 {
          font-size: 22px; margin: 18px 0 6px; color: #4a4a4a; letter-spacing: 0.1em;
        }
        .mv-collab-text p {
          margin: 0 0 10px; color: #555; font-size: 22px; line-height: 1.5; letter-spacing: 0.04em;
        }
        .mv-footnote { margin-top: 18px; font-size: 12px; color: #888; letter-spacing: 0.04em; }

        /* 右のロゴ群 */
        .mv-collab-right { display: grid; grid-template-rows: auto 1fr; gap: 18px; }
        .mv-collab-logos { display: grid; gap: 14px; }
        .logo-row { display: flex; align-items: center; gap: 22px; justify-content: flex-start; flex-wrap: wrap; }

        /* 右の画像 */
        .mv-collab-img {
          position: relative; width: 100%; height: 380px; overflow: hidden; background: #f0f2f4;
        }

        /* レスポンシブ */
        @media (max-width: 980px) {
          .mv-other-cert { grid-template-columns: 1fr; }
          .mv-cert-logos { justify-content: center; padding-top: 8px; }
          .collab-grid { grid-template-columns: 1fr; }
          .mv-collab-right { grid-template-rows: auto 240px; }
          .mv-collab-img { height: 240px; }
        }
        @media (max-width: 520px) {
          .mv-certs-title { font-size: 22px; }
          .mv-subtitle { font-size: 17px; }
          .mv-grade-list li { grid-template-columns: 1fr; gap: 6px; line-height: 1.9; }
          .mv-grade-list .country { letter-spacing: 0.22em; }
          .mv-certs-sub { font-size: 14px; }
        }
      `}</style>
    </>
  );
}
