// pages/item/[itemId]/[productSlug].js
import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { myWixClient } from "../../../src/lib/wixClient";
import Cookies from "js-cookie";

export default function ProductDetailPage() {
  const router = useRouter();
  const { isReady, query } = router;

  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState({});
  const [cartItemId, setCartItemId] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  // ---------- 既存ロジック：取得 ----------
  useEffect(() => {
    if (!isReady || !query.itemId || !query.productSlug) return;

    async function fetchData() {
      try {
        const agentId = String(query.itemId).toLowerCase();
        const slug = String(query.productSlug).toLowerCase();

        const res = await fetch(`/${agentId}_products.json`);
        if (!res.ok) throw new Error("商品JSON取得失敗");

        const data = await res.json();
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

  // ---------- 既存ロジック：数量操作 ----------
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

  // ---------- 既存ロジック：チェックアウト ----------
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

  // ---------- 既存ロジック：カートクリア（UIからは隠し気味） ----------
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

  // ---------- 表示用の派生値 ----------
  const sku = useMemo(() => {
    // 例: 'large-2025' -> 'LARGE-2025'
    const raw = (product?.slug || "").toUpperCase();
    return raw;
  }, [product]);

  const mainImg = product?.ItemPic || "/item_pic3.jpg"; // フォールバック

  if (loading) return <p className="pageLoading">読み込み中...</p>;
  if (!product) return <p className="notFound">商品が見つかりません</p>;

  return (
    <div className="page">
      <div className="grid">
        {/* 左：大きい商品画像 */}
        <div className="media">
          <img src={mainImg} alt={product.name} />
        </div>

        {/* 右：情報パネル */}
        <div className="info">
          <h1 className="title">{product.name}</h1>
          {/* サブタイトルとして itemId を表示（例画像の "2025" 位置） */}
          <div className="subTitle">{query.itemId}</div>

          <div className="sku">SKU：{sku}</div>

          <div className="priceBlock">
            {product.originalprice && (
              <div className="original">{product.originalprice}</div>
            )}
            <div className="price">{product.price}</div>
          </div>

          <p className="desc">{product.description}</p>

          {/* 数量コントロール */}
          <div className="qtyRow">
            <button className="stepBtn" onClick={() => updateQuantity(quantity - 1)}>-</button>
            <span className="qty">{quantity}</span>
            <button className="stepBtn" onClick={() => updateQuantity(quantity + 1)}>+</button>
          </div>

          {/* アクションボタン */}
          <div className="actions">
            <button
              className="btn add"
              onClick={() => updateQuantity(quantity > 0 ? quantity : 1)}
            >
              カートに追加する
            </button>
            <button className="btn buy" onClick={checkout}>
              今すぐ購入
            </button>
          </div>

          {/* アコーディオン（details/summaryで軽量に） */}
          <details className="acc" open>
            <summary>商品情報</summary>
            <div className="accBody">
              <div>商品名：{product.name}</div>
              <div>SKU：{sku}</div>
              <div>価格：{product.price}</div>
            </div>
          </details>

          <details className="acc">
            <summary>返品・返金ポリシー</summary>
            <div className="accBody">
              商品到着後7日以内の未開封品のみ承ります。詳細はご利用規約をご確認ください。
            </div>
          </details>

          <details className="acc">
            <summary>商品の配送について</summary>
            <div className="accBody">
              ご注文から2〜4営業日で発送いたします。送料・日時指定はチェックアウト時に選択できます。
            </div>
          </details>

          {/* 必要ならカート内容の簡易確認（普段は閉じる） */}
          {cart?.lineItems?.length > 0 && (
            <details className="acc">
              <summary>カート内容</summary>
              <div className="accBody">
                <ul className="cartList">
                  {cart.lineItems.map((item, idx) => (
                    <li key={idx}>
                      {item.quantity} × {item.productName?.original}
                    </li>
                  ))}
                </ul>
                <div className="total">小計：{cart.subtotal?.formattedAmount}</div>
                <button className="btn ghost" onClick={clearCart}>カートを空にする</button>
              </div>
            </details>
          )}

          {/* 一覧へ戻る */}
          <Link href={`/item/${query.itemId}`} className="backLink">
            ← 代理店の商品一覧に戻る
          </Link>
        </div>
      </div>

      <style jsx>{`
        .page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 16px 64px;
        }
        .grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 32px;
        }
        .media img {
          width: 100%;
          height: auto;
          border-radius: 12px;
          object-fit: cover;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          background: #f6f6f6;
        }
        .info {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .title {
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 0.02em;
        }
        .subTitle {
          font-size: 20px;
          font-weight: 700;
          margin-top: -6px;
        }
        .sku {
          font-size: 12px;
          letter-spacing: .08em;
          color: #6b7280;
          margin-top: -2px;
        }
        .priceBlock {
          margin-top: 6px;
        }
        .original {
          text-decoration: line-through;
          color: #9ca3af;
          font-size: 14px;
          margin-bottom: 2px;
        }
        .price {
          font-size: 28px;
          font-weight: 800;
        }
        .desc {
          color: #374151;
          line-height: 1.9;
          font-size: 14px;
          white-space: pre-wrap;
        }
        .qtyRow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-top: 8px;
        }
        .stepBtn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          background: #fff;
          font-size: 18px;
          cursor: pointer;
        }
        .qty {
          min-width: 28px;
          text-align: center;
          font-weight: 600;
        }
        .actions {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }
        .btn {
          flex: 1;
          height: 44px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-size: 14px;
        }
        .btn.add {
          background: #e5e7eb;
          color: #111827;
        }
        .btn.buy {
          background: #000;
          color: #fff;
        }
        .btn.ghost {
          background: transparent;
          border: 1px solid #e5e7eb;
          color: #111827;
        }
        .acc {
          border-top: 1px solid #e5e7eb;
          padding-top: 12px;
        }
        .acc + .acc {
          margin-top: 10px;
        }
        .acc > summary {
          cursor: pointer;
          list-style: none;
          font-weight: 600;
        }
        .acc > summary::-webkit-details-marker {
          display: none;
        }
        .accBody {
          padding: 8px 0 2px;
          color: #374151;
          font-size: 14px;
          line-height: 1.9;
        }
        .cartList {
          margin: 4px 0 8px;
          padding-left: 16px;
        }
        .total {
          font-weight: 700;
          margin-bottom: 8px;
        }
        .backLink {
          display: inline-block;
          margin-top: 18px;
          color: #374151;
          text-decoration: none;
          border-bottom: 1px solid transparent;
        }
        .backLink:hover {
          border-bottom-color: #374151;
        }

        /* レスポンシブ */
        @media (max-width: 900px) {
          .grid {
            grid-template-columns: 1fr;
          }
          .media img {
            max-height: 420px;
          }
        }
        .pageLoading, .notFound {
          padding: 48px 16px;
        }
      `}</style>
    </div>
  );
}
