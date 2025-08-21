"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "../lib/i18n";

// 既存の7商品（JSONそのまま）
const PRODUCTS = [
  {
    name: "【ミックスパック】 マザベジシリカパウダー 1,500mg",
    slug: "double-mvsi",
    description: "ミックスパックです。",
    originalprice: "3,300円",
    price: "3,300円",
    ItemPic: "/mix1500.png",
    wixProductId: "dcb1eb79-e65a-02df-a8f2-a80385c56e00",
    url: "https://www.dotpb.jp/product-page/double-mvsi"
  },
  {
    name: "【薬用スライドケース】マザベジシリカパウダー 1,500mg",
    slug: "case-mvsi",
    description: "薬用スライドケ－スです。",
    originalprice: "3,300円",
    price: "3,300円",
    ItemPic: "/case1500.png",
    wixProductId: "7be06482-8fca-e20d-6a73-48bd3e914460",
    url: "https://www.dotpb.jp/product-page/case-mvsi"
  },
  {
    name: "【30本セット】マザベジシリカパウダー 22,500mg",
    slug: "big-refill-mvsi",
    description: "30本セットです。",
    originalprice: "20,000円",
    price: "20,000円",
    ItemPic: "/30p22500.png",
    wixProductId: "fb6bbce6-a63f-b4d1-b817-da05d987e163",
    url: "https://www.dotpb.jp/product-page/big-refill-mvsi"
  },
  {
    name: "【ミックスパック】 マザベジシリカパウダー 2,000mg（エクトイン入り）",
    slug: "double-e-mvsi",
    description: "ミックスパック（エクトイン入り）です。",
    originalprice: "3,300円",
    price: "3,300円",
    ItemPic: "/mix2000.png",
    wixProductId: "7ba04481-0674-5262-9325-8d62f2d25095",
    url: "https://www.dotpb.jp/product-page/double-e-mvsi"
  },
  {
    name: "【薬用スライドケース】マザベジシリカパウダー 2,000mg（エクトイン入り）",
    slug: "case-e-mvsi",
    description: "薬用スライドケ－ス（エクトイン入り）です。",
    originalprice: "3,300円",
    price: "3,300円",
    ItemPic: "/case2000.png",
    wixProductId: "48c2a407-4738-2f3f-e317-d118a4046e5c",
    url: "https://www.dotpb.jp/product-page/case-e-mvsi"
  },
  {
    name: "【10本セット】マザベジシリカパウダー 10,000mg（エクトイン入り）",
    slug: "refill-e-mvsi",
    description: "10本セット（エクトイン入り）です。",
    originalprice: "12,000円",
    price: "12,000円",
    ItemPic: "/10p10000.png",
    wixProductId: "cc620bb2-fd77-8db3-4bf1-cff751f9e55d",
    url: "https://www.dotpb.jp/product-page/refill-e-mvsi"
  },
  {
    name: "【30本セット】マザベジシリカパウダー 30,000mg（エクトイン入り）",
    slug: "big-refill-e-mvsi",
    description: "30本セット（エクトイン入り）です。",
    originalprice: "30,000円",
    price: "30,000円",
    ItemPic: "/30p30000.png",
    wixProductId: "c15bad90-8fff-b003-7792-2282202b6ccb",
    url: "https://www.dotpb.jp/product-page/big-refill-e-mvsi"
  }
];

export default function ProductLineupSection() {
  const { t } = useI18n();
  const tr = (key) => t(key) ?? "";

  // 見出し・注記（辞書）
  const baseTitle = tr("lineup.baseTitle");
  const ectoTitle = tr("lineup.ectoTitle");
  const baseNote  = tr("lineup.note.base");
  const ectoNote1 = tr("lineup.note.ecto1");
  const ectoNote2 = tr("lineup.note.ecto2");

  // 振り分け（slug に "-e-" が含まれる＝エクトイン）
  const baseItems = PRODUCTS.filter((p) => !p.slug.includes("-e-"));
  const ectoItems = PRODUCTS.filter((p) =>  p.slug.includes("-e-"));

  return (
    <section className="lineup">
      {/* ── シリカの素版 ── */}
      <h2 className="title">{baseTitle}</h2>
      <div className="divider" />
      <p className="note">{baseNote}</p>
      <Row columns={3} items={baseItems} tr={tr} />

      {/* ── エクトイン配合版 ── */}
      <h2 className="title">{ectoTitle}</h2>
      <div className="divider" />
      <p className="note">
        {ectoNote1}
        <br />
        <span className="subnote">{ectoNote2}</span>
      </p>
      <Row columns={4} items={ectoItems} tr={tr} />

      <style jsx>{`
        .lineup {
          max-width: 1120px;
          margin: 0 auto;
          padding: 40px 16px 80px;
          background: #fff;
        }
        .title {
          text-align: center;
          font-family: "ot-bunyu-mincho-stdn", serif;
          font-size: 28px;
          letter-spacing: 0.1em;
          color: #222;
          margin: 28px 0 10px;
        }
        .divider {
          height: 1px;
          background: #d9d9d9;
          margin: 10px auto 14px;
          max-width: 980px;
        }
        .note {
          text-align: center;
          color: #6d6d6d;
          font-size: 14px;
          letter-spacing: 0.06em;
          margin-bottom: 26px;
        }
        .note .subnote { display: inline-block; margin-top: 4px; }

        @media (max-width: 1024px) {
          .title { font-size: 24px; }
        }
        @media (max-width: 560px) {
          .title { font-size: 20px; line-height: 1.6; }
          .note  { font-size: 12px; }
        }
      `}</style>
    </section>
  );
}

/* 横並び：PCで3列/4列、タブレット2列、スマホ1列 */
function Row({ items, columns = 3, tr }) {
  return (
    <>
      <div className="row" role="list">
        {items.map((p) => {
          // 辞書に商品名があれば上書き（なければJSONのまま）
          const name = tr(`products.${p.slug}.name`) || p.name;
          const priceTaxIn = tr("ui.shop.priceTaxIn");
          const buyNowText = tr("ui.shop.buyNow");

          return (
            <article key={p.slug} className="card" role="listitem">
              <div className="thumb">
                <Image
                  src={p.ItemPic}
                  alt={name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 320px"
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>

              <h3 className="name">{name}</h3>
              <div className="amount">{extractAmount(name)}</div>

              <div className="pricewrap">
                {priceTaxIn}
                <span className="price">{p.price}</span>
              </div>

              <Link href={p.url} className="cta" aria-label={name}>
                {buyNowText}
              </Link>
            </article>
          );
        })}
      </div>

      <style jsx>{`
        .row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 24px 36px;
          max-width: 1000px;
          margin: 0 auto 42px;
        }
        .card {
          width: calc((100% - ${columns - 1} * 36px) / ${columns});
          min-width: 240px;
          text-align: center;
          padding: 8px 12px 20px;
        }
        .thumb {
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 70%;
          margin: 0 auto 10px;
        }
        .name { font-weight: 600; color: #333; line-height: 1.6; font-size: 15px; }
        .amount { margin-top: 4px; font-size: 13px; color: #111; }
        .pricewrap { margin-top: 10px; font-size: 13px; color: #666; }
        .price { display: block; font-size: 18px; color: #111; margin-top: 2px; }
        .cta {
          display: inline-block;
          margin-top: 12px;
          padding: 10px 18px;
          border-radius: 9999px;
          background: #ffd400;
          text-decoration: none;
          color: #111;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        /* タブレット：2列 */
        @media (max-width: 1024px) {
          .card { width: calc((100% - 36px) / 2); }
        }
        /* スマホ：1列 */
        @media (max-width: 560px) {
          .row  { gap: 20px; }
          .card { width: 100%; }
          .name { font-size: 14px; }
          .price{ font-size: 17px; }
        }
      `}</style>
    </>
  );
}

function extractAmount(name) {
  const m = name.match(/([0-9,]+mg)/);
  return m ? m[1] : "";
}
