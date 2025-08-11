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
              世界最古かつ最高品質とされる「マザーベジタブル」を贅沢に配合した、新発想のパフ型化粧品ケース。<br />
              軽量で持ち運びやすく、外出前のメイク直しやお出かけ後の肌ケア、就寝前のリラックスタイムなど、あらゆるシーンで手軽にご使用いただけます。<br />
              肌にのせるだけで自然な仕上がりと多彩な美肌効果を実感でき、日常のスキンケアから特別な日のメイクまで幅広く活躍。<br />
              機能性とデザイン性を兼ね備えた、便利で高品質な新しい化粧品ケースです。
            </p>

            {/* 価格ブロック */}
            <div className="priceBlock">
              {product.originalprice && (
                <div className="original">{product.originalprice}</div>
              )}
              <div className="price">{product.price}</div>
            </div>

            {/* 数量コントロール（見た目のみ刷新済み） */}
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
              <button
                className="btn add"
                onClick={() => updateQuantity(quantity > 0 ? quantity : 1)}
              >
                カートに追加する
              </button>
              <button className="btn buy" onClick={checkout}>
                今すぐ購入
              </button>
              {/* ← 戻るボタンも同じUI（淡い水色） */}
              <Link href={`/item/${query.itemId}`} className="btn back">
                カートの状態を維持して商品一覧に戻る
              </Link>
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

      <Footer />

      <style jsx>{`
        .page {
          max-width: 1200px;
          margin: 80px auto 10px auto;
          padding: 24px 16px 64px;
        }
        .grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 32px;
        }
        /* ▼ スマホだけ縦並び（1カラム）にする */
        @media (max-width: 640px) {
          .grid { grid-template-columns: 1fr; }
        }

        .media img {
          width: 100%;
          border-radius: 12px;
          object-fit: cover;
          background: #f6f6f6;
        }
        .info { display: flex; flex-direction: column; gap: 14px; }
        .title { font-size: 28px; font-weight: 700; }
        .lead, .desc { color: #374151; line-height: 1.9; font-size: 14px; }

        .priceBlock {
          display: flex;
          align-items: baseline;
          gap: 14px;
          margin-top: 6px;
        }
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

        .actions {
          display: flex;
          flex-direction: column;   /* すでに縦並び */
          gap: 12px;
          margin-top: 12px;
        }
        .btn {
          width: 100%;
          height: 48px;
          border-radius: 9999px;
          border: none;
          font-size: 14px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;   /* Linkにも適用 */
        }
        .btn.add { background: #e5e7eb; color: #111827; }
        .btn.buy { background: #000; color: #fff; }
        .btn.back { background: #e8f3ff; color: #0f172a; } /* ← 淡い水色 */

        .acc { border-top: 1px solid #e5e7eb; padding-top: 12px; }
        .accBody { padding: 8px 0 2px; color: #374151; font-size: 14px; line-height: 1.9; }
      `}</style>
    </>
  );
}
