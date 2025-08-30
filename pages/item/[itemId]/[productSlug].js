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
  Number(process.env.NEXT_PUBLIC_USD_PER_JPY) || 0.006724;
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

/* ====== 動的テキストのローカライズ ====== */
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

  const { t, lang, setLang } = useI18n();
  const tr = (key, fallback = "") => t(key) ?? fallback;
  const [openLang, setOpenLang] = useState(false);
  const menuRef = useRef(null);

  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState({});
  const [cartItemId, setCartItemId] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  const [isSideCartOpen, setSideCartOpen] = useState(false);
  const [agentProducts, setAgentProducts] = useState([]);

  /* === 商品データ取得 === */
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
          console.warn("⚠ カート取得に失敗:", err);
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

  /* === checkout: 強制 /en 付与 === */
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

      const url = new URL(redirect.redirectSession.fullUrl);

      // ★ 強制で /en を付与（既に /en/ なら重複しない）
      if (!url.pathname.startsWith("/en/")) {
        url.pathname = `/en${url.pathname}`;
      }

      console.log("Redirecting checkout URL:", url.toString());
      window.location.assign(url.toString());
    } catch (err) {
      console.error("チェックアウト失敗:", err);
    }
  };

  const clearCart = async () => { /* …省略（元のまま）… */ };
  const changeLineItemQty = async () => { /* …省略（元のまま）… */ };

  const mainImg = product?.ItemPic || "/item_pic3.jpg";

  if (loading)
    return (
      <>
        <Head><title>{tr("pdp.head.titleSuffix", "MV-Si002")}</title></Head>
        <p className="pageLoading">{tr("pdp.loading", "読み込み中...")}</p>
      </>
    );

  if (!product)
    return (
      <>
        <Head><title>{tr("pdp.head.titleSuffix", "MV-Si002")}</title></Head>
        <p className="notFound">{tr("pdp.notFound", "商品が見つかりません")}</p>
      </>
    );

  const { name: displayName, description: displayDescription } =
    pickLocalizedProductText(product, lang, t);
  const displayOriginal = product.originalprice
    ? formatPrice(product.originalprice, lang)
    : null;
  const displayPrice = formatPrice(product.price, lang);

  return (
    <>
      <Head><title>{displayName}</title></Head>
      {/* ===== ヘッダー・本文・サイドカート ===== */}
      {/* ★ あなたの元の style jsx 部分はすべて残してOK */}
      {/* checkout ボタンの onClick だけこの checkout に紐付け */}
    </>
  );
}
