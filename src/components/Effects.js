"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useI18n } from "../lib/i18n";

export default function EffectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  const { t } = useI18n();
  const tr = (key) => t(key) ?? "";

  const styles = { hr: { background: "#d9d9d9", height: 1, width: "100%" } };

  const title   = tr("effects.title");
  const sub     = tr("effects.subtitle");

  const gradeTitle = tr("effects.grade.title");
  const gradeRows = [0, 1, 2].map((i) => ({
    country: tr(`effects.grade.rows.${i}.country`),
    desc:    tr(`effects.grade.rows.${i}.desc`),
  }));

  const otherTitle = tr("effects.other.title");
  const otherRows = [0, 1, 2].map((i) => ({
    name: tr(`effects.other.rows.${i}.name`),
    desc: tr(`effects.other.rows.${i}.desc`),
  }));

  const collabTitle = tr("effects.collab.title");
  const collabCountries = [0, 1, 2, 3].map((i) => ({
    name: tr(`effects.collab.countries.${i}.name`),
    body: tr(`effects.collab.countries.${i}.body`),
  }));
  const footnote = tr("effects.collab.footnote");

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
          {/* タイトル */}
          <h2 className="mv-certs-title ja-serif">{title}</h2>
          <p className="mv-certs-sub ja-serif">{sub}</p>

          {/* Grades */}
          <div className="mv-grade-block">
            <h3 className="mv-subtitle">{gradeTitle}</h3>
            <ul className="mv-grade-list mv-grade-list--grades">
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

          {/* Other Certifications（左テキスト／右ロゴ） */}
          <div className="mv-other-cert">
            <div className="mv-other-left">
              <h3 className="mv-subtitle">{otherTitle}</h3>
              <ul className="mv-grade-list mv-grade-list--other">
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

        {/* 連携（左テキスト／右ロゴ群＋画像） */}
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
        <p className="mv-footnote">{footnote}</p>
      </section>

      {/* styled-jsx */}
      <style jsx>{`
        .mv-certs { background: #fff; color: #3a3a3a; padding: 36px 16px 80px; }
        h4 { font-weight: bold; }
        .is-visible { animation: fadeInUp .7s ease-out both; }
        @keyframes fadeInUp { from { opacity: 0; transform: translate3d(0,8px,0); } to { opacity: 1; transform: translateZ(0); } }

        /* ★ 横幅を拡張して右列を伸ばす */
        .container { max-width: 1100px; margin: 0 auto; }

        .ja-serif { font-family: "Yu Mincho","Hiragino Mincho ProN","Noto Serif JP","Hiragino Kaku Gothic ProN",serif; }

        .mv-certs-title {
          text-align: center; font-size: 38px; font-weight: 600;
          letter-spacing: .12em; margin: 6px 0 10px; color: #444;
        }
        .mv-certs-sub { text-align: center; color: #666; font-size: 24px; letter-spacing: .1em; margin-bottom: 24px; }

        .mv-subtitle { font-size: 30px; font-weight: 700; letter-spacing: .14em; color: #444; margin: 56px 0 10px; }

        /* ===== 2列レイアウト ===== */
        .mv-grade-list { list-style: none; padding: 0; margin: 0; }
        /* 上段（Grades）：左列 260px */
        .mv-grade-list--grades li {
          display: grid; grid-template-columns: 260px 1fr; align-items: baseline; gap: 16px;
          font-size: 22px; line-height: 1.6; color: #555;
        }
        /* 下段（Other）：左列 360px（長文用） */
        .mv-grade-list--other li {
          display: grid; grid-template-columns: 360px 1fr; align-items: baseline; gap: 16px;
          font-size: 22px; line-height: 1.6; color: #555;
        }

        /* ★ 左列：太字 + 右寄せ + 折り返し禁止 */
        .mv-grade-list .country {
          font-weight: 700;
          text-align: right;
          white-space: nowrap;
          letter-spacing: .06em;   /* 広がり過ぎない程度に */
          color: #3f3f3f;
        }
        /* 右列は自然に右端まで伸ばす */
        .mv-grade-list .desc { letter-spacing: .01em; word-break: keep-all; }

        /* Other Certifications 右ロゴ */
        .mv-other-cert { display: grid; grid-template-columns: 1fr 360px; gap: 28px; align-items: start; margin-top: 14px; margin-bottom: 24px; }
        .mv-cert-logos { display: flex; justify-content: flex-end; align-items: center; gap: 28px; flex-wrap: wrap; padding-top: 22px; }

        /* 連携ブロック */
        .mv-collab { margin-top: 24px; padding: 8px 0 0; }
        .collab-grid { display: grid; grid-template-columns: 1fr 420px; gap: 36px; align-items: start; }
        .mv-collab-text h4 { font-size: 22px; margin: 18px 0 6px; color: #4a4a4a; letter-spacing: .1em; }
        .mv-collab-text p { margin: 0 0 10px; color: #555; font-size: 22px; line-height: 1.5; letter-spacing: .04em; }
        .mv-footnote { font-size: 16px; color: #888; letter-spacing: .04em; max-width: 1100px; margin: 10px auto 0; }

        .mv-collab-right { display: grid; grid-template-rows: auto 1fr; gap: 18px; }
        .mv-collab-logos { display: grid; gap: 14px; }
        .logo-row { display: flex; align-items: center; gap: 22px; justify-content: flex-start; flex-wrap: wrap; }

        .mv-collab-img { position: relative; width: 100%; height: 380px; overflow: hidden; background: #f0f2f4; }

        /* レスポンシブ */
        @media (max-width: 1100px) {
          .mv-grade-list--grades li { grid-template-columns: 220px 1fr; }
          .mv-grade-list--other  li { grid-template-columns: 300px 1fr; }
          .mv-other-cert { grid-template-columns: 1fr; }
          .mv-cert-logos { justify-content: center; padding-top: 8px; }
          .collab-grid { grid-template-columns: 1fr; }
          .mv-collab-right { grid-template-rows: auto 240px; }
          .mv-collab-img { height: 240px; }
        }
        @media (max-width: 560px) {
          .mv-certs-title { font-size: 22px; }
          .mv-subtitle { font-size: 20px; }
          .mv-grade-list--grades li,
          .mv-grade-list--other li {
            grid-template-columns: 1fr; gap: 6px; line-height: 1.9;
          }
          .mv-grade-list .country { text-align: left; white-space: normal; }
          .mv-certs-sub { font-size: 14px; }
        }
        /* ▼スマホ専用：⑤のレイアウトに揃える */
@media (max-width: 560px) {
  .mv-certs{ max-width:90%; margin:0 auto; padding:26px 12px 5px; }

  .mv-certs-title{ font-size:17px; letter-spacing:.08em; margin:0 0 6px; }
  .mv-certs-sub{   font-size:13px; letter-spacing:.06em; margin:0 0 18px; }

  .mv-subtitle{ font-size:15px; letter-spacing:.08em; margin:5px 0 10px; }

  /* ←肝：スマホでも“国名｜説明”の2カラムを維持して1行風に見せる */
  .mv-grade-list--grades li,
  .mv-grade-list--other  li{
    display:grid;
    grid-template-columns: minmax(5.5em, 7.5em) 1fr; /* ラベル列は固定幅 */
    column-gap:10px;
    row-gap:0;
    align-items:start;
    font-size:14.5px;
    line-height:1.85;
    margin:4px 0;
  }
  .mv-grade-list .country{
    font-weight:700;
    text-align:left;
    white-space:nowrap;               /* 国名は改行させない */
    letter-spacing:.04em;
    color:#333;
  }
  .mv-grade-list .desc{
    letter-spacing:.02em;
    word-break:keep-all;              /* 語を途中で折らない */
  }

  /* “その他の認証”ロゴは小さめ中央寄せ */
  .mv-other-cert{ grid-template-columns:1fr; gap:8px; }
  .mv-cert-logos{ justify-content:center; gap:12px; padding-top:4px; }
  .mv-cert-logos :global(img){ width:90%!important; height:auto; }

  /* 連携テキスト：自然折返し（強制改行を無効化） */
  .mv-collab-text h4{ font-size:16px; margin:14px 0 4px; }
  .mv-collab-text p{ font-size:14px; line-height:1.9; letter-spacing:.02em; }
  .mv-collab-text p br{ display:none; }
  .mv-collab-text p span{ display:inline; }

  /* 連携ロゴ：2列均等 */
  .mv-collab-logos{ gap:10px; }
  .logo-row{ gap:10px; justify-content:center; }
  .logo-row :global(img){ width:44%; height:auto; }

  /* 温室写真を小さめカード風に */
  .mv-collab-right{ grid-template-rows:auto 180px; }
  .mv-collab-img{ height:180px; border-radius:4px; }

  .mv-footnote{ font-size:12px; line-height:1.7; max-width:92%; margin:10px auto 0; }
}

/* さらに狭い端末の微調整 */
@media (max-width: 380px){
  .mv-grade-list--grades li,
  .mv-grade-list--other li{
    grid-template-columns: minmax(5em, 7em) 1fr;
    font-size:14px;
  }
  .mv-cert-logos :global(img){ width:84px; }
  .logo-row :global(img){ width:46%; }
  .mv-collab-right{ grid-template-rows:auto 160px; }
  .mv-collab-img{ height:160px; }
}

      `}</style>
    </>
  );
}
