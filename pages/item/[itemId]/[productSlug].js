import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { myWixClient } from "../../../src/lib/wixClient";
import Cookies from "js-cookie";
import Footer from "../../../src/components/Footer";
import { useI18n } from "@/lib/i18n";

/* ====== 価格表示：円⇄ドル 切替 ====== */
const USD_PER_JPY =
  Number(process.env.NEXT_PUBLIC_USD_PER_JPY) || 0.006724; // 3300 -> $22.19
const fmtJPY = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  maximumFractionDigits: 0,
});
const fmtUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const parseJPY = (v) =>
  typeof v === "number" ? v : Number(String(v ?? "").replace(/[^\d]/g, "")) || 0;
const formatPrice = (v, lang) =>
  lang === "en" ? fmtUSD.format(parseJPY(v) * USD_PER_JPY) : fmtJPY.format(parseJPY(v));

/* ====== 動的テキスト（名前・説明）のローカライズ ====== */
function pickLocalizedProductText(product, lang, t) {
  const slug = String(product?.slug || "").toLowerCase();
  const name_ja = product?.name_ja || product?.name || "";
  const name_en = product?.name_en || product?.i18n?.en?.name || "";
  const desc_ja = product?.description_ja || product?.description || "";
  const desc_en = product?.description_en || product?.i18n?.en?.description || "";

  if (lang === "en") {
    const nameFromDict = t?.(`pdp.products.${slug}.name`);
    const descFromDict = t?.(`pdp.products.${slug}.description`);
    return {
      name: name_en || nameFromDict || name_ja,
      description: desc_en || descFromDict || desc_ja,
    };
  } else {
    const nameFromDictJA = t?.(`pdp.products.${slug}.name_ja`);
    const descFromDictJA = t?.(`pdp.products.${slug}.description_ja`);
    return {
      name: name_ja || nameFromDictJA || "",
      description: desc_ja || descFromDictJA || "",
    };
  }
}

export default function ProductDetailPage() {
  const router = useRouter();
  const { isReady, query } = router;

  // ★ 言語切替（HeroSectionと同じUI）
  const { t, lang, setLang } = useI18n();
  const tr = (key, fallback = "") => t(key) ?? fallback;
  const [openLang, setOpenLang] = useState(false);
  const menuRef = useRef(null);
  const labelLang = tr("ui.lang.label", "Language");

  useEffect(() => {
    if (!openLang) return;
    const onDown = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpenLang(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [openLang]);

  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState({});
  const [cartItemId, setCartItemId] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  // ★ サイドカート表示
  const [isSideCartOpen, setSideCartOpen] = useState(false);

  // ★ 代理店JSONを保持（ItemPic・英名・JPY価格参照用）
  const [agentProducts, setAgentProducts] = useState([]);

  useEffect(() => {
    if (!isReady || !query.itemId || !query.productSlug) return;

    async function fetchData() {
      try {
        const agentId = String(query.itemId).toLowerCase();
        const slug = String(query.productSlug).toLowerCase();

        const res = await fetch(`/${agentId}_products.json`);
        if (!res.ok) throw new Error("商品JSON取得失敗");

        const data = await res.json();
        setAgentProducts(data);
        const found = data.find((item) => item.slug?.toLowerCase() === slug);
        setProduct(found || null);

        console.log("session cookie:", Cookies.get("session"));

        try {
          const cartData = await myWixClient.currentCart.getCurrentCart();
          setCart(cartData);

          if (found) {
            const foundItem = cartData.lineItems?.find(
              (item) =>
                item.catalogReference.catalogItemId === found.wixProductId
            );
            if (foundItem) {
              setQuantity(foundItem.quantity);
              setCartItemId(foundItem._id);
            }
          }
        } catch (err) {
          console.warn("⚠ カート取得に失敗（未ログインの可能性）:", err);
          setCart({ lineItems: [] });
        }
      } catch (error) {
        console.error("データ取得エラー:", error);
        setProduct(null);
        setCart({});
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [isReady, query.itemId, query.productSlug]);

  // サイドカート中は背景スクロールを止める
  useEffect(() => {
    document.body.style.overflow = isSideCartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSideCartOpen]);

  const updateQuantity = async (newQty) => {
    if (!product || !product.wixProductId) return;
    if (newQty < 0) return;

    try {
      if (newQty === 0 && cartItemId) {
        await myWixClient.currentCart.removeLineItemFromCurrentCart(cartItemId);
        setQuantity(0);
        setCartItemId(null);
        const updatedCart = await myWixClient.currentCart.getCurrentCart();
        setCart(updatedCart);
        return;
      }

      if (cartItemId) {
        const { cart: updatedCart } =
          await myWixClient.currentCart.updateCurrentCartLineItemQuantity([
            { _id: cartItemId, quantity: newQty },
          ]);
        setQuantity(newQty);
        setCart(updatedCart);
      } else {
        const { cart: updatedCart } =
          await myWixClient.currentCart.addToCurrentCart({
            lineItems: [
              {
                catalogReference: {
                  appId: "1380b703-ce81-ff05-f115-39571d94dfcd",
                  catalogItemId: product.wixProductId,
                },
                quantity: 1,
              },
            ],
          });
        const addedItem = updatedCart.lineItems.find(
          (item) =>
            item.catalogReference.catalogItemId === product.wixProductId
        );
        setCart(updatedCart);
        setQuantity(1);
        setCartItemId(addedItem?._id);
      }
    } catch (err) {
      console.error("数量変更失敗:", err);
    }
  };

  const handleAddToCart = async () => {
    await updateQuantity(quantity > 0 ? quantity : 1);
    setSideCartOpen(true);
  };

  // 英語カートに直送して追加 → 自動でチェックアウト
const checkout = () => {
  if (!product?.wixProductId) return;
  const qty = Math.max(1, Number(quantity || 1));

  const BASE = 'https://dotpb.jp';        // ★ドメイン統一（www混在NG）
  const CART_PATH = '/en/cart-page';      // ★左下に出た英語カートURL

  const u = new URL(CART_PATH, BASE);
  // 1件: add=PRODUCTID:QTY（複数は PID1:2,PID2:1 みたいにカンマ区切り）
  u.searchParams.set('add', `${product.wixProductId}:${qty}`);
  // すぐ決済へ進めるフラグ（カートに留めたい時は付けない）
  u.searchParams.set('auto', '1');

  window.location.assign(u.toString());
};


  const clearCart = async () => {
    try {
      await myWixClient.currentCart.deleteCurrentCart();
    } catch (err) {
      console.error("カートクリア失敗:", err);
    } finally {
      setCart({});
      setCartItemId(null);
      setQuantity(0);
    }
  };

  const changeLineItemQty = async (lineItemId, newQty) => {
    try {
      if (newQty <= 0) {
        await myWixClient.currentCart.removeLineItemFromCurrentCart(
          lineItemId
        );
        const updated = await myWixClient.currentCart.getCurrentCart();
        setCart(updated);
        if (lineItemId === cartItemId) {
          setCartItemId(null);
          setQuantity(0);
        }
      } else {
        const { cart: updatedCart } =
          await myWixClient.currentCart.updateCurrentCartLineItemQuantity([
            { _id: lineItemId, quantity: newQty },
          ]);
        setCart(updatedCart);
        if (lineItemId === cartItemId) setQuantity(newQty);
      }
    } catch (err) {
      console.error("サイドカート数量変更失敗:", err);
    }
  };

  // ★ agentProducts から wixProductId で一致する商品を取得
  const findAgentProductByWixId = (wixId) =>
    (agentProducts || []).find((p) => p.wixProductId === wixId);

  const mainImg = product?.ItemPic || "/item_pic3.jpg";

  if (loading)
    return (
      <>
        <Head>
          <title>
            {tr("pdp.head.titleSuffix", "Mother Vegetables Confidence MV-Si002")}
          </title>
        </Head>
        <p className="pageLoading">{tr("pdp.loading", "読み込み中...")}</p>
      </>
    );

  if (!product)
    return (
      <>
        <Head>
          <title>
            {tr("pdp.head.titleSuffix", "Mother Vegetables Confidence MV-Si002")}
          </title>
        </Head>
        <p className="notFound">{tr("pdp.notFound", "商品が見つかりません")}</p>
      </>
    );

  // ★ ここで名前・説明をローカライズ（JSON英語 → en.json → 日本語）
  const { name: displayName, description: displayDescription } =
    pickLocalizedProductText(product, lang, t);

  // ★ 価格を言語に応じてフォーマット
  const displayOriginal = product.originalprice
    ? formatPrice(product.originalprice, lang)
    : null;
  const displayPrice = formatPrice(product.price, lang);

  // ★ サイドカート表示用：行アイテムのローカライズ（名前・金額・小計）
  const localizedLine = (li) => {
    const wixId = li?.catalogReference?.catalogItemId;
    const ap = findAgentProductByWixId(wixId);
    const nameJA = ap?.name || li?.productName?.original || "";
    const nameEN = ap?.name_en || nameJA;
    const unitJPY =
      ap?.price ? parseJPY(ap.price) : parseJPY(li?.price?.formattedAmount);
    const unitDisp = formatPrice(unitJPY, lang);
    const nameDisp = lang === "en" ? nameEN : nameJA;
    return { nameDisp, unitDisp, unitJPY };
  };

  const subtotalJPY = (cart?.lineItems || []).reduce((s, li) => {
    const { unitJPY } = localizedLine(li);
    return s + unitJPY * (li?.quantity || 1);
  }, 0);
  const displaySubtotal =
    lang === "en" ? fmtUSD.format(subtotalJPY * USD_PER_JPY) : fmtJPY.format(subtotalJPY);

  return (
    <>
      <Head>
        <title>{`${displayName} | ${tr(
          "pdp.head.titleSuffix",
          "Mother Vegetables Confidence MV-Si002"
        )}`}</title>
      </Head>

      {/* ===== 言語切替（HeroSectionと同じ） ===== */}
      <header className="site-header" aria-label="Top navigation">
        <div className="header-inner">
          <div className={`lang-switcher ${openLang ? "open" : ""}`} ref={menuRef}>
            <button
              className="lang-btn"
              onClick={() => setOpenLang((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={openLang}
              aria-label="Language selector"
              title={labelLang || "Language"}
            >
              {(lang || "ja").toUpperCase()}
              <span className="caret">▾</span>
            </button>

            {openLang && (
              <ul className="lang-menu" role="menu" aria-label={labelLang || "Language"}>
                <li className="sep" aria-hidden="true" />
                <li role="menuitem">
                  <button className="lang-item" onClick={() => setLang("ja")}>JA</button>
                </li>
                <li role="menuitem">
                  <button className="lang-item" onClick={() => setLang("en")}>EN</button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>

      <div className="page">
        <div className="grid">
          {/* 左：大きい商品画像（next/image） */}
          <div className="media">
            <div className="mediaImg">
              <Image
                src={mainImg}
                alt={displayName}
                fill
                sizes="(max-width: 1200px) 60vw, 720px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>

          {/* 右：情報パネル */}
          <div className="info">
            <h1 className="title">{displayName}</h1>

            {/* リード文（\n 改行対応） */}
            <p className="lead">{displayDescription || ""}</p>

            {/* 価格（言語依存で円/ドル） */}
            <div className="priceBlock">
              {displayOriginal && <div className="original">{displayOriginal}</div>}
              <div className="price">{displayPrice}</div>
            </div>

            {/* 数量コントロール */}
            <div className="qtyBlock">
              <div className="qtyLabel">{tr("pdp.quantity.label", "数量")}</div>
              <div className="qtyBox" role="group" aria-label={tr("pdp.quantity.ariaChange", "数量を変更")}>
                <button
                  className="boxBtn minus"
                  aria-label={tr("pdp.quantity.ariaDecrease", "減らす")}
                  onClick={() => updateQuantity(quantity - 1)}
                  disabled={quantity <= 0}
                >
                  −
                </button>
                <div className="boxValue" aria-live="polite">{quantity}</div>
                <button
                  className="boxBtn plus"
                  aria-label={tr("pdp.quantity.ariaIncrease", "増やす")}
                  onClick={() => updateQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* アクションボタン */}
            <div className="actions">
              <button className="btn add" onClick={handleAddToCart}>
                {tr("pdp.buttons.addToCart", "カートに追加する")}
              </button>
              <button className="btn buy" onClick={checkout}>
                {tr("pdp.buttons.buyNow", "今すぐ購入")}
              </button>

              <Link href={`/item/${query.itemId}`} legacyBehavior>
                <a className="btn back">
                  {tr("pdp.buttons.backToList", "カートの状態を維持して商品一覧に戻る")}
                </a>
              </Link>
            </div>

            {/* アコーディオン */}
            <details className="acc" open>
              <summary>{tr("pdp.details.productInfo", "商品情報")}</summary>
              <div className="accBody">
                <div>
                  {tr("pdp.title.productNameLabel", "商品名：")}
                  {displayName}
                </div>
              </div>
            </details>

            <details className="acc">
              <summary>{tr("pdp.details.returns", "返品・返金ポリシー")}</summary>
              <div className="accBody">
                {tr(
                  "pdp.details.returnsBody",
                  "返品期限：商品到着より7日以内。\n返品時の送料負担：初期不良の場合は当店負担／お客様都合の場合はお客様ご負担。"
                )}
              </div>
            </details>

            <details className="acc">
              <summary>{tr("pdp.details.shipping", "商品の配送について")}</summary>
              <div className="accBody">
                {tr(
                  "pdp.details.shippingBody",
                  "配送料金：国内は基本送料無料（※沖縄への配送のみ1,500円）。\n※海外は別途計算。\nご注文から翌日に発送いたします。（土日祝日を除く）"
                )}
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* ★ サイドカート（右ドロワー） */}
      <div
        className={`sideCartBackdrop ${isSideCartOpen ? "open" : ""}`}
        onClick={() => setSideCartOpen(false)}
      />
      <aside
        className={`sideCart ${isSideCartOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="sideCartHeader">
          <div>
            {tr("pdp.sidecart.header", "カート（{count}点のアイテム）").replace(
              "{count}",
              String(cart?.lineItems?.length || 0)
            )}
          </div>
          <button className="closeBtn" onClick={() => setSideCartOpen(false)}>×</button>
        </header>

        <div className="sideCartBody">
          {(cart?.lineItems || []).length === 0 && (
            <div className="empty">{tr("pdp.sidecart.empty", "カートは空です")}</div>
          )}

          {(cart?.lineItems || []).map((li) => {
            const wixId = li?.catalogReference?.catalogItemId;
            const ap = findAgentProductByWixId(wixId);
            const lineName = lang === "en"
              ? (ap?.name_en || li?.productName?.original || "")
              : (ap?.name || li?.productName?.original || "");
            const unitJPY = ap?.price
              ? parseJPY(ap.price)
              : parseJPY(li?.price?.formattedAmount);
            const unitDisp = formatPrice(unitJPY, lang);

            return (
              <div className="lineItem" key={li._id}>
                <div className="thumb">
                  {ap?.ItemPic ? (
                    <img src={ap.ItemPic} alt={lineName} />
                  ) : (
                    <img src={li?.image?.url || "/noimage.png"} alt={lineName} />
                  )}
                </div>
                <div className="liInfo">
                  <div className="liName">{lineName}</div>
                  <div className="liPrice">{unitDisp}</div>

                  {/* ▼ 数量UI */}
                  <div className="liQty">
                    <div
                      className="liQtyBox"
                      role="group"
                      aria-label={tr("pdp.quantity.ariaChange", "数量を変更")}
                    >
                      <button
                        className="liBtn"
                        aria-label={tr("pdp.quantity.ariaDecrease", "減らす")}
                        onClick={() => changeLineItemQty(li._id, li.quantity - 1)}
                        disabled={li.quantity <= 1}
                      >
                        −
                      </button>
                      <div className="liQtyNum" aria-live="polite">
                        {li.quantity}
                      </div>
                      <button
                        className="liBtn"
                        aria-label={tr("pdp.quantity.ariaIncrease", "増やす")}
                        onClick={() => changeLineItemQty(li._id, li.quantity + 1)}
                      >
                        ＋
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <footer className="sideCartFooter">
          <div className="subtotal">
            {tr("pdp.sidecart.subtotalLabel", lang === "en" ? "Subtotal: " : "小計：")}
            {/* Wixのsubtotal（JPY文字列）ではなく、agentProductsベースで再計算して言語別表示 */}
            {displaySubtotal}
          </div>
          <button className="btn checkoutBtn" onClick={checkout}>
            {tr("pdp.sidecart.checkout", "ご購入手続きへ")}
          </button>
        </footer>
      </aside>

      <Footer />

      <style jsx>{`
        /* ===== 言語切替ヘッダー（HeroSectionと同じ見た目） ===== */
        .site-header { position: relative; z-index: 100; background: transparent; }
        .header-inner {
          max-width: 1200px; margin: 0 auto; padding: 12px 16px 0;
          display: flex; justify-content: flex-end; align-items: center;
        }
        .lang-switcher { position: relative; }
        .lang-btn {
          appearance: none; background: transparent; border: none; padding: 4px 0;
          font-size: 14px; letter-spacing: .08em; color: #111;
          display: inline-flex; align-items: center; gap: 8px; cursor: pointer;
        }
        .caret { display: inline-block; transition: transform .2s ease; }
        .lang-switcher.open .caret { transform: rotate(180deg); }
        .lang-menu {
          position: absolute; right: 0; top: calc(100% + 6px); min-width: 72px;
          background: transparent; border: none; box-shadow: none; padding: 0; text-align: right;
        }
        .lang-menu .sep {
          list-style: none; height: 1px; background: #111; opacity: .8;
          width: 80px; margin: 0 0 8px auto;
        }
        .lang-item {
          width: 100%; text-align: right; background: transparent; border: none;
          padding: 6px 0; font-size: 13px; color: #111; cursor: pointer;
        }
        .lang-item:hover { text-decoration: underline; }

        /* ===== 本文 ===== */
        .page { max-width: 1200px; margin: 2.7rem auto 10px auto; padding: 24px 16px 64px; }
        .grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 32px; }
        @media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }

        .media { width: 100%; }
        .mediaImg {
          position: relative; width: 100%; height: 520px;
          border-radius: 12px; overflow: hidden; background: #f6f6f6;
        }

        .info { display: flex; flex-direction: column; gap: 14px; }
        .title { font-size: 28px; font-weight: 700; }
        .lead { color: #374151; line-height: 1.9; font-size: 14px; white-space: pre-line; }

        .priceBlock { display: flex; align-items: baseline; gap: 14px; margin-top: 6px; }
        .price, .original { font-size: 18px; }
        .original { text-decoration: line-through; color: #9ca3af; }
        .price { font-weight: 800; }

        .qtyBlock { margin-top: 10px; }
        .qtyLabel { font-weight: 700; margin-bottom: 8px; letter-spacing: .02em; }
        .qtyBox {
          display: grid; grid-template-columns: 48px 64px 48px; align-items: center; height: 44px;
          border: 1px solid #111; border-radius: 4px; overflow: hidden; background: #fff; width: 160px;
        }
        .boxBtn { all: unset; display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; cursor: pointer; font-size: 20px; user-select: none; }
        .boxBtn:active { transform: translateY(0.5px); }
        .boxBtn:disabled { color: #cbd5e1; cursor: not-allowed; }
        .boxValue { text-align: center; font-size: 16px; font-weight: 600; }

        .actions { display: flex; flex-direction: column; gap: 12px; margin-top: 12px; }
        .btn { width: 100%; height: 48px; border-radius: 9999px; border: none; font-size: 14px; cursor: pointer;
               display: inline-flex; align-items: center; justify-content: center; text-decoration: none; }
        .btn.add { background: #e5e7eb; color: #111827; }
        .btn.buy { background: #000; color: #fff; }
        .btn.back { background: #e8f3ff; color: #0f172a; border: 1px solid #cfe0ff; }

        .acc { border-top: 1px solid #e5e7eb; padding-top: 12px; }
        .accBody { padding: 8px 0 2px; color: #374151; font-size: 14px; line-height: 1.9; white-space: pre-line; }

        /* ===== サイドカート ===== */
        .sideCartBackdrop { position: fixed; inset: 0; background: rgba(0,0,0,.45); opacity: 0; pointer-events: none; transition: opacity .25s ease; z-index: 1000; }
        .sideCartBackdrop.open { opacity: 1; pointer-events: auto; }
        .sideCart { position: fixed; top: 0; right: 0; width: 380px; max-width: 90vw; height: 100vh; background: #fff;
          box-shadow: -8px 0 24px rgba(0,0,0,.1); transform: translateX(100%); transition: transform .25s ease;
          z-index: 1001; display: flex; flex-direction: column; }
        .sideCart.open { transform: translateX(0); }
        .sideCartHeader { display: flex; justify-content: space-between; align-items: center; padding: 16px; font-weight: 700; border-bottom: 1px solid #eee; }
        .closeBtn { background: transparent; border: none; font-size: 24px; cursor: pointer; line-height: 1; }

        .sideCartBody { padding: 8px 16px; overflow-y: auto; flex: 1; }
        .empty { color: #6b7280; padding: 16px 0; }

        .lineItem { display: grid; grid-template-columns: 72px 1fr; gap: 12px; align-items: center; padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
        .thumb img, .ph { width: 72px; height: 72px; border-radius: 8px; object-fit: cover; background: #f3f4f6; }
        .liInfo { display: flex; flex-direction: column; gap: 8px; }
        .liName { font-size: 14px; font-weight: 600; }
        .liPrice { font-size: 13px; color: #374151; }

        .liQty { margin-top: 2px; }
        .liQtyBox { display: grid; grid-template-columns: 40px 56px 40px; align-items: center; height: 36px; border: 1px solid #d1d5db; border-radius: 6px; background: #fff; overflow: hidden; width: 136px; }
        .liBtn { all: unset; height: 100%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 18px; color: #111827; }
        .liBtn:disabled { color: #cbd5e1; cursor: not-allowed; }
        .liQtyNum { text-align: center; font-weight: 700; }

        .sideCartFooter { border-top: 1px solid #eee; padding: 12px 16px 16px; }
        .subtotal { font-weight: 700; margin-bottom: 10px; }
        .checkoutBtn { background: #000; color: #fff; }
      `}</style>
    </>
  );
}
