"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

/* ▼ フォールバック（商品名は必ずここを表示用に使う） */
const PRODUCTS = [
  { name: "【ミックスパック】\nマザベジコンフィデンスパウダー\n1,500mg", slug: "double-mvsi", description: "ミックスパックです。", originalprice: "3,300円", price: "3,300円", ItemPic: "/mix1500.png", wixProductId: "dcb1eb79-e65a-02df-a8f2-a80385c56e00", url: "https://www.dotpb.jp/product-page/double-mvsi" },
  { name: "【薬用スライドケース】\nマザベジコンフィデンスパウダー\n1,500mg", slug: "case-mvsi", description: "薬用スライドケ－スです。", originalprice: "3,300円", price: "3,300円", ItemPic: "/case1500.png", wixProductId: "7be06482-8fca-e20d-6a73-48bd3e914460", url: "https://www.dotpb.jp/product-page/case-mvsi" },
  { name: "【30本セット】\nマザベジコンフィデンスパウダー\n22,500mg", slug: "big-refill-mvsi", description: "30本セットです。", originalprice: "20,000円", price: "20,000円", ItemPic: "/30p22500.png", wixProductId: "fb6bbce6-a63f-b4d1-b817-da05d987e163", url: "https://www.dotpb.jp/product-page/big-refill-mvsi" },
  { name: "【ミックスパック】\nマザベジコンフィデンスパウダー\n2,000mg（エクトイン入り）", slug: "double-e-mvsi", description: "ミックスパック（エクトイン入り）です。", originalprice: "3,300円", price: "3,300円", ItemPic: "/mix2000.png", wixProductId: "7ba04481-0674-5262-9325-8d62f2d25095", url: "https://www.dotpb.jp/product-page/double-e-mvsi" },
  { name: "【薬用スライドケース】\nマザベジコンフィデンスパウダー\n2,000mg（エクトイン入り）", slug: "case-e-mvsi", description: "薬用スライドケ－ス（エクトイン入り）です。", originalprice: "3,300円", price: "3,300円", ItemPic: "/case2000.png", wixProductId: "48c2a407-4738-2f3f-e317-d118a4046e5c", url: "https://www.dotpb.jp/product-page/case-e-mvsi" },
  { name: "【10本セット】\nマザベジコンフィデンスパウダー\n10,000mg（エクトイン入り）", slug: "refill-e-mvsi", description: "10本セット（エクトイン入り）です。", originalprice: "12,000円", price: "12,000円", ItemPic: "/10p10000.png", wixProductId: "cc620bb2-fd77-8db3-4bf1-cff751f9e55d", url: "https://www.dotpb.jp/product-page/refill-e-mvsi" },
  { name: "【30本セット】\nマザベジコンフィデンスパウダー\n30,000mg（エクトイン入り）", slug: "big-refill-e-mvsi", description: "30本セット（エクトイン入り）です。", originalprice: "30,000円", price: "30,000円", ItemPic: "/30p30000.png", wixProductId: "c15bad90-8fff-b003-7792-2282202b6ccb", url: "https://www.dotpb.jp/product-page/big-refill-e-mvsi" },
];

export default function ProductLineupSection() {
  const router = useRouter();
  const rawId = router.query?.itemId;
  const itemId = Array.isArray(rawId) ? rawId[0] : rawId;

  const [jsonItems, setJsonItems] = useState(null); // null=未読, []=読了(空)

  useEffect(() => {
    if (!itemId) return;
    let ignore = false;
    (async () => {
      try {
        const path = `/${itemId}_products.json`;
        const res = await fetch(path, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load ${path}`);
        const data = await res.json();
        if (!ignore) setJsonItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        if (!ignore) setJsonItems([]);
      }
    })();
    return () => { ignore = true; };
  }, [itemId]);

  // slug末尾の1セグメント（ID）を落とした“ベースキー”で対応付ける
  const baseKey = (slug) => (slug || "").replace(/-[^-]+$/, "");
  const itemsForDisplay = useMemo(() => {
    if (!jsonItems || !Array.isArray(jsonItems) || jsonItems.length === 0) {
      return PRODUCTS;
    }
    const fbByBase = new Map(PRODUCTS.map(p => [baseKey(p.slug), p]));

    return jsonItems.map(j => {
      const fb = fbByBase.get(baseKey(j.slug)) || {};
      return {
        ...fb,
        ...j,                 // 価格や画像などはJSONを優先
        name: fb.name || "",  // ★ 商品名は必ずPRODUCTSのnameを使用
      };
    });
  }, [jsonItems]);

  const isEcto = (p) => (p?.name || "").includes("エクトイン");
  const baseItems = itemsForDisplay.filter((p) => !isEcto(p));
  const ectoItems = itemsForDisplay.filter(isEcto);

  return (
    <section className="lineup">
      {/* ── 上部ヘッダー ── */}
      <div className="lineup-head">
        <h2 className="lineup-label">商品ラインナップ</h2>
        <div className="brand-lockup">
          <Image
            src="/MV_LOGO.png"
            alt="Mother Vegetables Confidence"
            width={480}
            height={140}
            priority
          />
        </div>
      </div>

      {/* ── 素版 ── */}
      <h3 className="title">マザベジコンフィデンス【シリカのみ版】</h3>
      <div className="divider" />
      <p className="note">成分 オーガニックシリカ純度97.1%以上</p>
      <Row items={baseItems} itemId={itemId} />

      {/* ── エクトイン配合版 ── */}
      <h3 className="title">マザベジコンフィデンス【エクトイン配合版】</h3>
      <div className="divider" />
      <p className="note">
        成分 オーガニックシリカ純度97.1%以上
        <br />
        <span className="subnote">保湿効果や炎症を抑える効果が期待できる／天然アミノ酸のエクトイン配合</span>
      </p>
      <Row items={ectoItems} itemId={itemId} />

      <style jsx>{`
        .lineup {
          max-width: 1320px;              /* セクションを広く */
          margin: 0 auto;
          padding: 40px 16px 72px;
          background: #fff;
        }
        /* 上部ヘッダー */
        .lineup-head { text-align: center; margin: 6px 0 40px; }
        .lineup-label {
          font-family: "ot-bunyu-mincho-stdn", serif;
          font-size: 40px;
          f0nt-weight:400;
          letter-spacing: 0.18em;
          color: #222;
          margin: 50px 0 18px;
        }
        .brand-lockup :global(img) {
          display: inline-block;
          filter: grayscale(100%) contrast(95%) opacity(0.9);
          width: auto; height: auto;
          max-width: 480px;
        }

        /* セクション見出し */
        .title {
          text-align: center;
          
          font-size: 30px;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: #2b2b2b;
          margin: 44px 0 12px;
        }
        /* 区切り線 */
        .divider {
          height: 1px;
          background: #dcdcdc;
          margin: 10px auto 14px;
          max-width: 1024px;
        }
        /* 注記 */
        .note {
          text-align: center;
          color: #6d6d6d;
          font-size: 15px;
          letter-spacing: 0.06em;
          margin-bottom: 28px;
        }
        .note .subnote { display: inline-block; margin-top: 4px; }

        /* 縮小ブレークポイント */
        @media (max-width: 1100px) {
          .brand-lockup :global(img) { max-width: 360px; }
          .title { font-size: 28px; }
          .divider { max-width: 92vw; }
          .note { font-size: 14px; }
        }
        @media (max-width: 560px) {
          .lineup-label { font-size: 26px; }
          .brand-lockup :global(img) { max-width: 280px; }
          .title { font-size: 21px; line-height: 1.6; margin: 32px 0 8px; }
          .note { font-size: 12px; }
        }
      `}</style>
    </section>
  );
}

function Row({ items, itemId }) {
  return (
    <>
      <div className="row" role="list">
        {items.map((p) => {
          const internalHref = itemId ? `/item/${itemId}/${p.slug}` : "#";
          return (
            <article key={p.slug} className="card" role="listitem">
              <div className="thumb">
                <Image
                  src={p.ItemPic || "/noimage.png"}
                  alt={p.name}
                  fill
                  sizes="(max-width: 1100px) 240px, 280px"   /* 画像ヒントを拡大 */
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
              <h3 className="name">{p.name}</h3>
              <div className="pricewrap">
                価格(税込)
                <span className="price">{p.price}</span>
              </div>
              <Link href={internalHref} aria-label={`${p.name} を購入`}>
                <button type="button" className="btn">ご購入はこちら</button>
              </Link>
            </article>
          );
        })}
      </div>

      <style jsx>{`
        .row {
          width: min(100%, 1280px);      /* 横幅も広げる */
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 24px;                     /* 余白も少し広め */
        }
        .card {
          width: 280px;                  /* PCで拡大 */
          text-align: center;
          padding: 10px 12px 20px;
        }
        .thumb {
          position: relative;
          width: 280px;
          height: 200px;                 /* 画像枠拡大 */
          margin: 0 auto 12px;
        }
        .name {
          font-weight: 600;
          color: #333;
          line-height: 1.7;
          font-size: 16.5px;             /* 商品名拡大 */
          letter-spacing: 0.02em;
          white-space: pre-line; /* ← \n を実際の改行として表示 */
        }
        .pricewrap {
          margin-top: 10px;
          font-size: 14px;               /* ラベル拡大 */
          color: #666;
        }
        .price {
          display: block;
          font-size: 20px;               /* 価格拡大 */
          color: #111;
          margin-top: 2px;
        }
        .btn {
          display: inline-block;
          margin-top: 14px;
          padding: 10px 22px;            /* ボタン拡大 */
          min-height: 48px;
          border-radius: 30px;
          background: #ffe926;
          color: #000;
          font-weight: 500;
          letter-spacing: 0.06em;
          border: none;
          cursor: pointer;
          transition: transform .02s ease, opacity .2s ease;
          font-size: 14px;
        }
        .btn:hover { opacity: .92; }
        .btn:active { transform: translateY(1px); }

        /* ── 1100px以下で従来サイズへ段階的に縮小 ── */
        @media (max-width: 1100px) {
          .row { width: 100%; gap: 20px; }
          .card { width: 240px; padding: 8px 10px 18px; }
          .thumb { width: 240px; height: 160px; margin-bottom: 10px; }
          .name { font-size: 15px; line-height: 1.6; }
          .pricewrap { font-size: 13px; }
          .price { font-size: 18px; }
          .btn { min-height: 44px; padding: 8px 18px; font-size: 13px; }
        }
        /* ── 560px以下：1カラム想定 ── */
        @media (max-width: 560px) {
          .row { width: 100%; gap: 16px; }
          .card { width: 100%; max-width: 360px; }
          .thumb { width: 100%; max-width: 360px; height: 180px; }
          .name { font-size: 14px; }
          .price { font-size: 17px; }
        }
      `}</style>
    </>
  );
}

function extractAmount(name) {
  const m = (name || "").match(/([0-9,]+mg)/);
  return m ? m[1] : "";
}
