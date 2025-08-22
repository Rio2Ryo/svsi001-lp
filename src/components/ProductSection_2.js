"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

/* ▼ フォールバック（商品名は必ずここを表示用に使う） */
const PRODUCTS = [
  { name: "【ミックスパック】 マザベジコンフィデンスパウダー 1,500mg", slug: "double-mvsi", description: "ミックスパックです。", originalprice: "3,300円", price: "3,300円", ItemPic: "/mix1500.png", wixProductId: "dcb1eb79-e65a-02df-a8f2-a80385c56e00", url: "https://www.dotpb.jp/product-page/double-mvsi" },
  { name: "【薬用スライドケース】マザベジコンフィデンスパウダー 1,500mg", slug: "case-mvsi", description: "薬用スライドケ－スです。", originalprice: "3,300円", price: "3,300円", ItemPic: "/case1500.png", wixProductId: "7be06482-8fca-e20d-6a73-48bd3e914460", url: "https://www.dotpb.jp/product-page/case-mvsi" },
  { name: "【30本セット】マザベジコンフィデンスパウダー 22,500mg", slug: "big-refill-mvsi", description: "30本セットです。", originalprice: "20,000円", price: "20,000円", ItemPic: "/30p22500.png", wixProductId: "fb6bbce6-a63f-b4d1-b817-da05d987e163", url: "https://www.dotpb.jp/product-page/big-refill-mvsi" },
  { name: "【ミックスパック】 マザベジコンフィデンスパウダー 2,000mg（エクトイン入り）", slug: "double-e-mvsi", description: "ミックスパック（エクトイン入り）です。", originalprice: "3,300円", price: "3,300円", ItemPic: "/mix2000.png", wixProductId: "7ba04481-0674-5262-9325-8d62f2d25095", url: "https://www.dotpb.jp/product-page/double-e-mvsi" },
  { name: "【薬用スライドケース】マザベジコンフィデンスパウダー 2,000mg（エクトイン入り）", slug: "case-e-mvsi", description: "薬用スライドケ－ス（エクトイン入り）です。", originalprice: "3,300円", price: "3,300円", ItemPic: "/case2000.png", wixProductId: "48c2a407-4738-2f3f-e317-d118a4046e5c", url: "https://www.dotpb.jp/product-page/case-e-mvsi" },
  { name: "【10本セット】マザベジコンフィデンスパウダー 10,000mg（エクトイン入り）", slug: "refill-e-mvsi", description: "10本セット（エクトイン入り）です。", originalprice: "12,000円", price: "12,000円", ItemPic: "/10p10000.png", wixProductId: "cc620bb2-fd77-8db3-4bf1-cff751f9e55d", url: "https://www.dotpb.jp/product-page/refill-e-mvsi" },
  { name: "【30本セット】マザベジコンフィデンスパウダー 30,000mg（エクトイン入り）", slug: "big-refill-e-mvsi", description: "30本セット（エクトイン入り）です。", originalprice: "30,000円", price: "30,000円", ItemPic: "/30p30000.png", wixProductId: "c15bad90-8fff-b003-7792-2282202b6ccb", url: "https://www.dotpb.jp/product-page/big-refill-e-mvsi" },
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

  // --- ここが修正ポイント ---
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
  // --- 修正ここまで ---

  const isEcto = (p) => (p?.name || "").includes("エクトイン");
  const baseItems = itemsForDisplay.filter((p) => !isEcto(p));
  const ectoItems = itemsForDisplay.filter(isEcto);

  return (
    <section className="lineup">
      <h2 className="title">マザベジコンフィデンス【シリカの素版】</h2>
      <div className="divider" />
      <p className="note">成分 オーガニックシリカ純度97.1%以上</p>
      <Row items={baseItems} itemId={itemId} />

      <h2 className="title">マザベジコンフィデンス【エクトイン配合版】</h2>
      <div className="divider" />
      <p className="note">
        成分 オーガニックシリカ純度97.1%以上
        <br />
        <span className="subnote">保湿効果や炎症を抑える効果が期待できる／天然アミノ酸のエクトイン配合</span>
      </p>
      <Row items={ectoItems} itemId={itemId} />

      <style jsx>{`
        .lineup { max-width: 1200px; margin: 0 auto; padding: 40px 16px 64px; background: #fff; }
        .title { text-align: center; font-family: "ot-bunyu-mincho-stdn", serif; font-size: 28px; letter-spacing: 0.1em; color: #222; margin: 28px 0 10px; }
        .divider { height: 1px; background: #d9d9d9; margin: 10px auto 14px; max-width: 100%; }
        .note { text-align: center; color: #6d6d6d; font-size: 14px; letter-spacing: 0.06em; margin-bottom: 26px; }
        .note .subnote { display: inline-block; margin-top: 4px; }
        @media (max-width: 560px) { .title { font-size: 20px; line-height: 1.6; } .note { font-size: 12px; } }
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
                <Image src={p.ItemPic || "/noimage.png"} alt={p.name} fill sizes="240px" style={{ objectFit: "contain" }} priority />
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
        .row { width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
        .card { width: 240px; text-align: center; padding: 8px 10px 18px; }
        .thumb { position: relative; width: 240px; height: 160px; margin: 0 auto 10px; }
        .name { font-weight: 600; color: #333; line-height: 1.6; font-size: 15px; }
        .amount { margin-top: 4px; font-size: 13px; color: #111; }
        .pricewrap { margin-top: 10px; font-size: 13px; color: #666; }
        .price { display: block; font-size: 18px; color: #111; margin-top: 2px; }
        .btn { display: inline-block; margin-top: 12px; padding: 10px 18px; border-radius: 30px; background: #ffe926; color: #000; font-weight: 400; letter-spacing: 0.06em; border: none; cursor: pointer; transition: transform .02s ease, opacity .2s ease; }
        .btn:hover { opacity: .9; } .btn:active { transform: translateY(1px); }
        @media (max-width: 560px) { .row { width: 100%; gap: 16px; } .card { width: 100%; max-width: 360px; } .thumb { width: 100%; max-width: 360px; height: 180px; } .name { font-size: 14px; } .price { font-size: 17px; } }
      `}</style>
    </>
  );
}

function extractAmount(name) {
  const m = (name || "").match(/([0-9,]+mg)/);
  return m ? m[1] : "";
}
