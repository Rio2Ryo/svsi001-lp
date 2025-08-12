import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { myWixClient } from "../../../src/lib/wixClient";
import Cookies from "js-cookie";
import Footer from "../../../src/components/Footer";

export default function ProductDetailPage() {
  const router = useRouter();
  const { isReady, query } = router;

  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState({});
  const [cartItemId, setCartItemId] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  // ★ サイドカート表示
  const [isSideCartOpen, setSideCartOpen] = useState(false);

  // ★ 代理店JSONを保持（ItemPic 参照用）
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
        setAgentProducts(data); // ← ここで全件保持
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
    return () => { document.body.style.overflow = ""; };
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
                quantity: 1, // 初回は1個追加
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

  // 「カートに追加」→ 追加後にサイドカートを開く
  const handleAddToCart = async () => {
    await updateQuantity(quantity > 0 ? quantity : 1);
    setSideCartOpen(true);
  };

  const checkout = async () => {
    try {
      const { checkoutId } =
        await myWixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: "WEB",
        });

      const redirect = await myWixClient.redirects.createRedirectSession({
        ecomCheckout: { checkoutId },
        callbacks: { postFlowUrl: window.location.href },
      });

      window.location = redirect.redirectSession.fullUrl;
    } catch (err) {
      console.error("チェックアウト失敗:", err);
    }
  };

  const clearCart = async () => {
    try {
      await myWixClient.currentCart.deleteCurrentCart();
      setCart({});
      setCartItemId(null);
      setQuantity(0);
    } catch (err) {
      console.error("カートクリア失敗:", err);
    }
  };

  // ★ サイドカート：数量変更
  const changeLineItemQty = async (lineItemId, newQty) => {
    try {
      if (newQty <= 0) {
        await myWixClient.currentCart.removeLineItemFromCurrentCart(lineItemId);
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

  // ★ lineItem → ItemPic を優先してサムネ決定（なければ Wix の画像、それも無ければプレースホルダー）
  const getThumbSrc = (li) => {
    const wixId = li?.catalogReference?.catalogItemId;
    const match = (agentProducts || []).find((p) => p.wixProductId === wixId);
    return match?.ItemPic || li?.image?.url || null;
  };

  const mainImg = product?.ItemPic || "/item_pic3.jpg";

  if (loading)
    return (
      <>
        <Head>
          <title>Mother Vegetables Confidence MV-Si002</title>
        </Head>
        <p className="pageLoading">読み込み中...</p>
      </>
    );

  if (!product)
    return (
      <>
        <Head>
          <title>Mother Vegetables Confidence MV-Si002</title>
        </Head>
        <p className="notFound">商品が見つかりません</p>
      </>
    );

  return (
    <>
      <Head>
        <title>{`${product.name} | Mother Vegetables Confidence MV-Si002`}</title>
      </Head>

      <div className="page">
        <div className="grid">
          {/* 左：大きい商品画像 */}
          <div className="media">
            <img src={mainImg} alt={product.name} />
          </div>

          {/* 右：情報パネル */}
          <div className="info">
            <h1 className="title">{product.name}</h1>

            <p className="lead">
              世界最古かつ最高品質とされる「マザーベジタブル」を贅沢に配合した、新発想のパフ型化粧品ケース。<br />
              軽量で持ち運びやすく、外出前のメイク直しやお出かけ後の肌ケア、就寝前のリラックスタイムなど、あらゆるシーンで手軽にご使用いただけます。<br />
              肌にのせるだけで自然な仕上がりと多彩な美肌効果を実感でき、日常のスキンケアから特別な日のメイクまで幅広く活躍。<br />
              機能性とデザイン性を兼ね備えた、便利で高品質な新しい化粧品ケースです。
            </p>

            {/* 価格 */}
            <div className="priceBlock">
              {product.originalprice && (
                <div className="original">{product.originalprice}</div>
              )}
              <div className="price">{product.price}</div>
            </div>

            {/* 数量コントロール */}
            <div className="qtyBlock">
              <div className="qtyLabel">数量</div>
              <div className="qtyBox" role="group" aria-label="数量を変更">
                <button
                  className="boxBtn minus"
                  aria-label="減らす"
                  onClick={() => updateQuantity(quantity - 1)}
                  disabled={quantity <= 0}
                >
                  −
                </button>
                <div className="boxValue" aria-live="polite">{quantity}</div>
                <button
                  className="boxBtn plus"
                  aria-label="増やす"
                  onClick={() => updateQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* アクションボタン */}
            <div className="actions">
              <button className="btn add" onClick={handleAddToCart}>
                カートに追加する
              </button>
              <button className="btn buy" onClick={checkout}>
                今すぐ購入
              </button>

              <Link href={`/item/${query.itemId}`} legacyBehavior>
                <a className="btn back">カートの状態を維持して商品一覧に戻る</a>
              </Link>
            </div>

            {/* アコーディオン */}
            <details className="acc" open>
              <summary>商品情報</summary>
              <div className="accBody">
                <div>商品名：{product.name}</div>
              </div>
            </details>

            <details className="acc">
              <summary>返品・返金ポリシー</summary>
              <div className="accBody">
                返品期限：商品到着より7日以内<br />
                返品時の送料負担：初期不良の場合は当店負担、お客様都合の場合はお客様にて送料をご負担ください。
              </div>
            </details>

            <details className="acc">
              <summary>商品の配送について</summary>
              <div className="accBody">
                配送料金：国内は基本送料無料（※沖縄への配送のみ1500円）<br />
                ※海外は別途計算<br />
                ご注文から翌日に発送致します。（土日祝日を除く）
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
          <div>カート（{cart?.lineItems?.length || 0}点のアイテム）</div>
          <button className="closeBtn" onClick={() => setSideCartOpen(false)}>×</button>
        </header>

        <div className="sideCartBody">
          {(cart?.lineItems || []).length === 0 && (
            <div className="empty">カートは空です</div>
          )}

          {(cart?.lineItems || []).map((li) => {
            const thumb = getThumbSrc(li); // ← ItemPic 優先
            return (
              <div className="lineItem" key={li._id}>
                <div className="thumb">
                  {thumb ? (
                    <img src={thumb} alt={li.productName?.original || "item"} />
                  ) : (
                    <div className="ph" />
                  )}
                </div>
                <div className="liInfo">
                  <div className="liName">{li.productName?.original}</div>
                  {/* 価格（片側に寄せたい場合はこの行を liRow に分けてください） */}
                  <div className="liPrice">{li.price?.formattedAmount || ""}</div>

                  {/* ▼ 数量UI */}
                  <div className="liQty">
                    <div className="liQtyBox" role="group" aria-label="数量を変更">
                      <button
                        className="liBtn"
                        aria-label="減らす"
                        onClick={() => changeLineItemQty(li._id, li.quantity - 1)}
                        disabled={li.quantity <= 1}
                      >
                        −
                      </button>
                      <div className="liQtyNum" aria-live="polite">{li.quantity}</div>
                      <button
                        className="liBtn"
                        aria-label="増やす"
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
          <div className="subtotal">小計：{cart?.subtotal?.formattedAmount || ""}</div>
          <button className="btn checkoutBtn" onClick={checkout}>
            ご購入手続きへ
          </button>
        </footer>
      </aside>

      <Footer />

      <style jsx>{`
        .page {
          max-width: 1200px;
          margin: 2.7rem auto 10px auto;
          padding: 24px 16px 64px;
        }
        .grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 32px;
        }
        @media (max-width: 640px) {
          .grid { grid-template-columns: 1fr; }
        }

        .media img { width: 100%; border-radius: 12px; object-fit: cover; background: #f6f6f6; }
        .info { display: flex; flex-direction: column; gap: 14px; }
        .title { font-size: 28px; font-weight: 700; }
        .lead { color: #374151; line-height: 1.9; font-size: 14px; }

        .priceBlock { display: flex; align-items: baseline; gap: 14px; margin-top: 6px; }
        .price, .original { font-size: 18px; }
        .original { text-decoration: line-through; color: #9ca3af; }
        .price { font-weight: 800; }

        .qtyBlock { margin-top: 10px; }
        .qtyLabel { font-weight: 700; margin-bottom: 8px; letter-spacing: .02em; }
        .qtyBox {
          display: grid;
          grid-template-columns: 48px 64px 48px;
          align-items: center;
          height: 44px;
          border: 1px solid #111;
          border-radius: 4px;
          overflow: hidden;
          background: #fff;
          width: 160px;
        }
        .boxBtn {
          all: unset;
          display: flex; align-items: center; justify-content: center;
          height: 100%; width: 100%;
          cursor: pointer; font-size: 20px; user-select: none;
        }
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
        .accBody { padding: 8px 0 2px; color: #374151; font-size: 14px; line-height: 1.9; }

        /* ===== サイドカート ===== */
        .sideCartBackdrop {
          position: fixed; inset: 0; background: rgba(0,0,0,.45);
          opacity: 0; pointer-events: none; transition: opacity .25s ease; z-index: 1000;
        }
        .sideCartBackdrop.open { opacity: 1; pointer-events: auto; }
        .sideCart {
          position: fixed; top: 0; right: 0; width: 380px; max-width: 90vw; height: 100vh; background: #fff;
          box-shadow: -8px 0 24px rgba(0,0,0,.1); transform: translateX(100%); transition: transform .25s ease;
          z-index: 1001; display: flex; flex-direction: column;
        }
        .sideCart.open { transform: translateX(0); }

        .sideCartHeader {
          display: flex; justify-content: space-between; align-items: center;
          padding: 16px; font-weight: 700; border-bottom: 1px solid #eee;
        }
        .closeBtn { background: transparent; border: none; font-size: 24px; cursor: pointer; line-height: 1; }

        .sideCartBody { padding: 8px 16px; overflow-y: auto; flex: 1; }
        .empty { color: #6b7280; padding: 16px 0; }

        .lineItem {
          display: grid; grid-template-columns: 72px 1fr; gap: 12px; align-items: center;
          padding: 12px 0; border-bottom: 1px solid #f1f5f9;
        }
        .thumb img, .ph {
          width: 72px; height: 72px; border-radius: 8px; object-fit: cover; background: #f3f4f6;
        }
        .liInfo { display: flex; flex-direction: column; gap: 8px; }
        .liName { font-size: 14px; font-weight: 600; }
        .liPrice { font-size: 13px; color: #374151; }

        /* ▼ 数量UI（画像②の見た目） */
        .liQty { margin-top: 2px; }
        .liQtyBox {
          display: grid;
          grid-template-columns: 40px 56px 40px;
          align-items: center;
          height: 36px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background: #fff;
          overflow: hidden;
          width: 136px;
        }
        .liBtn {
          all: unset;
          height: 100%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 18px; color: #111827;
        }
        .liBtn:disabled { color: #cbd5e1; cursor: not-allowed; }
        .liQtyNum { text-align: center; font-weight: 700; }

        .sideCartFooter { border-top: 1px solid #eee; padding: 12px 16px 16px; }
        .subtotal { font-weight: 700; margin-bottom: 10px; }
        .checkoutBtn { background: #000; color: #fff; }
      `}</style>
    </>
  );
}
