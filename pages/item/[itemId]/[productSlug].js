import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { myWixClient } from "../../../src/lib/wixClient";
import Cookies from "js-cookie";
import Footer from "../../src/components/Footer"; // ← Footer追加

export default function ProductDetailPage() {
  const router = useRouter();
  const { isReady, query } = router;

  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState({});
  const [cartItemId, setCartItemId] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

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

  const mainImg = product?.ItemPic || "/item_pic3.jpg";

  if (loading) return <p className="pageLoading">読み込み中...</p>;
  if (!product) return <p className="notFound">商品が見つかりません</p>;

  return (
    <>
      <div className="page">
        <div className="grid">
          {/* 左：大きい商品画像 */}
          <div className="media">
            <img src={mainImg} alt={product.name} />
          </div>

          {/* 右：情報パネル */}
          <div className="info">
            <h1 className="title">{product.name}</h1>

            {/* テスト説明 */}
            <p className="lead">
              テスト説明文：本製品の概要を示すダミーテキストです。<br />
              肌にやさしい使用感と利便性を両立した設計になっています。<br />
              毎日のケアから特別な日のメイクまで幅広く活躍します。<br />
              携帯しやすいサイズで外出先でもさっと使えます。<br />
              ご家族でもシェアしやすいスタンダードな仕様です。<br />
              詳細な成分や使用方法は下部の商品情報をご確認ください。
            </p>

            {/* 説明文と価格の位置を交換 → 説明文が上、価格が下 */}
            {product.description && (
              <p className="desc">{product.description}</p>
            )}

            {/* 価格ブロック */}
            <div className="priceBlock">
              {product.originalprice && (
                <div className="original">{product.originalprice}</div>
              )}
              <div className="price">{product.price}</div>
            </div>

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

            {/* アコーディオン */}
            <details className="acc" open>
              <summary>商品情報</summary>
              <div className="accBody">
                <div>商品名：{product.name}</div>
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

            <Link href={`/item/${query.itemId}`} className="backLink">
              ← 代理店の商品一覧に戻る
            </Link>
          </div>
        </div>
      </div>

      {/* ページ最下層にFooter */}
      <Footer />

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
          border-radius: 12px;
          object-fit: cover;
          background: #f6f6f6;
        }
        .info {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .title {
          font-size: 28px;
          font-weight: 700;
        }
        .lead {
          color: #374151;
          line-height: 1.9;
          font-size: 14px;
        }
        .desc {
          color: #374151;
          line-height: 1.9;
          font-size: 14px;
        }
        .priceBlock {
          display: flex;
          align-items: baseline;
          gap: 14px;
          margin-top: 6px;
        }
        .price, .original {
          font-size: 24px; /* 一回り小さく */
        }
        .original {
          text-decoration: line-through;
          color: #9ca3af;
        }
        .price {
          font-weight: 800;
        }
        .qtyRow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 8px;
        }
        .stepBtn {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          border: 1px solid #d1d5db;
          background: #fff;
          font-size: 18px;
          cursor: pointer;
        }
        .qty {
          min-width: 28px;
          text-align: center;
        }
        .actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 8px;
        }
        .btn {
          width: 100%;
          height: 48px;
          border-radius: 9999px;
          border: none;
          font-size: 14px;
          cursor: pointer;
        }
        .btn.add {
          background: #e5e7eb;
        }
        .btn.buy {
          background: #000;
          color: #fff;
        }
        .acc {
          border-top: 1px solid #e5e7eb;
          padding-top: 12px;
        }
        .backLink {
          margin-top: 18px;
          display: inline-block;
        }
      `}</style>
    </>
  );
}
