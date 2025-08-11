import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { myWixClient } from "../../../src/lib/wixClient";
import Cookies from "js-cookie";

// スタイル定義 (CSS in JS)
// CSSファイルをインポートする代わりに、スタイルをオブジェクトとして定義します。
const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap', // スマホ表示などで折り返す
    gap: '40px',
    maxWidth: '1200px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'sans-serif',
  },
  imageColumn: {
    flex: 1,
    minWidth: '320px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  detailsColumn: {
    flex: 1,
    minWidth: '320px',
  },
  productImage: {
    maxWidth: '100%',
    borderRadius: '8px',
    border: '1px solid #eee',
  },
  productName: {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0 0 8px 0',
  },
  sku: {
    color: '#888',
    fontSize: '14px',
    marginBottom: '24px',
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '16px',
    marginBottom: '24px',
  },
  originalPrice: {
    textDecoration: 'line-through',
    color: '#888',
    fontSize: '18px',
  },
  discountedPrice: {
    color: '#111',
    fontSize: '26px',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '15px',
    lineHeight: 1.7,
    color: '#333',
    marginBottom: '32px',
  },
  quantityLabel: {
    fontSize: '14px',
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  quantitySelector: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: 'fit-content',
    marginBottom: '24px',
  },
  quantityButton: {
    background: '#f5f5f5',
    border: 'none',
    fontSize: '20px',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
  },
  quantityInput: {
    width: '50px',
    textAlign: 'center',
    fontSize: '16px',
    border: 'none',
    borderLeft: '1px solid #ccc',
    borderRight: '1px solid #ccc',
    height: '40px'
  },
  primaryButton: {
    width: '100%',
    padding: '14px',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    marginBottom: '12px',
    backgroundColor: '#333',
    color: 'white',
  },
  secondaryButton: {
    width: '100%',
    padding: '14px',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    marginBottom: '12px',
    backgroundColor: '#111',
    color: 'white',
  },
  accordionSection: {
    marginTop: '40px',
  },
  centerMessage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    fontSize: '18px',
  },
};

// アコーディオンコンポーネントを同じファイル内に定義
function Accordion({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);
    
    // アコーディオン用のスタイル
    const accordionStyles = {
        accordion: {
            borderBottom: '1px solid #e0e0e0',
        },
        header: {
            width: '100%',
            background: 'none',
            border: 'none',
            padding: '16px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
        },
        content: {
            padding: '8px 0 24px',
            fontSize: '14px',
            lineHeight: 1.6,
            color: '#555',
        }
    };

    return (
        <div style={accordionStyles.accordion}>
            <button style={accordionStyles.header} onClick={() => setIsOpen(!isOpen)}>
                <span>{title}</span>
                <span>{isOpen ? '−' : '＋'}</span>
            </button>
            {isOpen && (
                <div style={accordionStyles.content}>
                    {children}
                </div>
            )}
        </div>
    );
}


export default function ProductDetailPage() {
  const router = useRouter();
  const { isReady, query } = router;

  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState({});
  const [cartItemId, setCartItemId] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  // データ取得ロジック (useEffect) は変更ありません
  useEffect(() => {
    if (!isReady || !query.itemId || !query.productSlug) return;
    async function fetchData() {
      try {
        const agentId = query.itemId.toLowerCase();
        const slug = query.productSlug.toLowerCase();
        const res = await fetch(`/${agentId}_products.json`);
        if (!res.ok) throw new Error("商品JSON取得失敗");
        const data = await res.json();
        const found = data.find((item) => item.slug?.toLowerCase() === slug);
        setProduct(found || null);
        try {
          const cartData = await myWixClient.currentCart.getCurrentCart();
          setCart(cartData);
          if (found) {
            const foundItem = cartData.lineItems?.find(
              (item) => item.catalogReference.catalogItemId === found.wixProductId
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
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [isReady, query.itemId, query.productSlug]);

  // カートのロジック (updateQuantity, checkout) は変更ありません
  const updateQuantity = async (newQty) => {
    if (!product || !product.wixProductId || newQty < 0) return;
    try {
        if (newQty === 0 && cartItemId) {
            await myWixClient.currentCart.removeLineItemFromCurrentCart(cartItemId);
            setQuantity(0);
            setCartItemId(null);
            const updatedCart = await myWixClient.currentCart.getCurrentCart();
            setCart(updatedCart);
        } else if (cartItemId) {
            const { cart: updatedCart } = await myWixClient.currentCart.updateCurrentCartLineItemQuantity([{ _id: cartItemId, quantity: newQty }]);
            setQuantity(newQty);
            setCart(updatedCart);
        } else if (newQty > 0) {
            const { cart: updatedCart } = await myWixClient.currentCart.addToCurrentCart({
                lineItems: [{ catalogReference: { appId: "1380b703-ce81-ff05-f115-39571d94dfcd", catalogItemId: product.wixProductId }, quantity: newQty }],
            });
            const addedItem = updatedCart.lineItems.find(item => item.catalogReference.catalogItemId === product.wixProductId);
            setCart(updatedCart);
            setQuantity(newQty);
            setCartItemId(addedItem?._id);
        }
    } catch (err) {
        console.error("数量変更失敗:", err);
    }
  };

  const checkout = async () => {
    try {
      const { checkoutId } = await myWixClient.currentCart.createCheckoutFromCurrentCart({ channelType: "WEB" });
      const redirect = await myWixClient.redirects.createRedirectSession({
        ecomCheckout: { checkoutId },
        callbacks: { postFlowUrl: window.location.href },
      });
      window.location = redirect.redirectSession.fullUrl;
    } catch (err) {
      console.error("チェックアウト失敗:", err);
    }
  };

  const handleBuyNow = async () => {
    try {
        if (quantity === 0) {
            await updateQuantity(1);
        }
        await checkout();
    } catch (err) {
        console.error("今すぐ購入処理に失敗:", err);
    }
  };

  if (loading) return <div style={styles.centerMessage}><p>読み込み中...</p></div>;
  if (!product) return <div style={styles.centerMessage}><p>商品が見つかりません</p></div>;

  const handleAddToCart = async () => {
      if(quantity === 0){
          await updateQuantity(1);
      }
  }
  
  // ボタンが無効化される条件を定義
  const isPrimaryButtonDisabled = quantity > 0;

  return (
    <div style={styles.container}>
      {/* 左カラム: 画像 */}
      <div style={styles.imageColumn}>
        <img src={product.imageUrl} alt={product.name} style={styles.productImage} />
      </div>

      {/* 右カラム: 商品詳細 */}
      <div style={styles.detailsColumn}>
        <h1 style={styles.productName}>{product.name}</h1>
        <p style={styles.sku}>SKU: {product.sku}</p>
        
        <div style={styles.priceContainer}>
          <span style={styles.originalPrice}>¥{product.price.original.toLocaleString()}</span>
          <span style={styles.discountedPrice}>¥{product.price.discounted.toLocaleString()}</span>
        </div>
        
        <p style={styles.description}>{product.description}</p>
        
        <div style={styles.quantityLabel}>数量</div>
        <div style={styles.quantitySelector}>
          <button style={styles.quantityButton} onClick={() => updateQuantity(quantity - 1)} disabled={quantity <= 0}>−</button>
          <div style={styles.quantityInput}>{quantity}</div>
          <button style={styles.quantityButton} onClick={() => updateQuantity(quantity + 1)}>+</button>
        </div>
        
        <button 
          style={{ ...styles.primaryButton, ...(isPrimaryButtonDisabled && { backgroundColor: '#ccc', cursor: 'not-allowed' }) }}
          onClick={handleAddToCart}
          disabled={isPrimaryButtonDisabled}
        >
          {isPrimaryButtonDisabled ? "カートに追加済み" : "カートに追加する"}
        </button>
        <button style={styles.secondaryButton} onClick={handleBuyNow}>
          今すぐ購入
        </button>
        
        <div style={styles.accordionSection}>
          <Accordion title="商品情報">
            <p>商品名: {product.name}</p>
          </Accordion>
          <Accordion title="返品・返金ポリシー">
            <p>ここに返品・返金ポリシーに関するテキストを記載します。</p>
          </Accordion>
          <Accordion title="商品の配送について">
            <p>ここに商品の配送に関するテキストを記載します。</p>
          </Accordion>
        </div>
      </div>
    </div>
  );
}