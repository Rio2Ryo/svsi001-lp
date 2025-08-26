import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import { redirects } from "@wix/redirects";
import testIds from "@/src/utils/test-ids";
import { CLIENT_ID } from "@/constants/constants";
import Link from "next/link";
import Head from "next/head";
import styles from "@/styles/app.module.css";
import { useAsyncHandler } from "@/src/hooks/async-handler";
import { useClient } from "@/internal/providers/client-provider";
import { useModal } from "@/internal/providers/modal-provider";
import HeroSection from "../src/components/HeroSection";
import ConceptSection from "../src/components/ConceptSection";
import FeatureSection from "../src/components/FeatureSection";
import TestimonialSection from "../src/components/TestimonialSection";
import ProductSection from "../src/components/ProductSection";
import Effects from "../src/components/Effects";
import GuaranteeSection from "../src/components/GuaranteeSection";
import FAQSection from "../src/components/FAQSection";
import Footer from "../src/components/Footer";

const myWixClient = createClient({
  modules: { products, currentCart, redirects },
  siteId: process.env.WIX_SITE_ID,
  auth: OAuthStrategy({
    clientId: CLIENT_ID,
    tokens: JSON.parse(Cookies.get("session") || "null"),
  }),
});

export default function Home() {
  const [productList, setProductList] = useState([]);
  const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const handleAsync = useAsyncHandler();
  const { msid } = useClient();
  const { openModal } = useModal();

  async function fetchProducts() {
    setIsLoading(true);
    try {
      await handleAsync(async () => {
        const productList = await myWixClient.products.queryProducts().find();
        setProductList(productList.items);
      });
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchCart() {
    try {
      await handleAsync(async () =>
        setCart(await myWixClient.currentCart.getCurrentCart())
      );
    } catch {}
  }

  async function addToCart(product) {
    await handleAsync(async () => {
      const options = product.productOptions.reduce(
        (selected, option) => ({
          ...selected,
          [option.name]: option.choices[0].description,
        }),
        {}
      );

      if (cart) {
        const existingProduct = cart?.lineItems?.find(
          (item) => item.catalogReference.catalogItemId === product._id
        );
        if (existingProduct) {
          return addExistingProduct(
            existingProduct._id,
            existingProduct.quantity + 1
          );
        }
      }

      const { cart: returnedCard } =
        await myWixClient.currentCart.addToCurrentCart({
          lineItems: [
            {
              catalogReference: {
                appId: "1380b703-ce81-ff05-f115-39571d94dfcd",
                catalogItemId: product._id,
                options: { options },
              },
              quantity: 1,
            },
          ],
        });
      setCart(returnedCard);
    });
  }

  async function clearCart() {
    await handleAsync(async () => {
      await myWixClient.currentCart.deleteCurrentCart();
      setCart({});
    });
  }

  async function createRedirect() {
    try {
      await handleAsync(async () => {
        const { checkoutId } =
          await myWixClient.currentCart.createCheckoutFromCurrentCart({
            channelType: currentCart.ChannelType.WEB,
          });

        const redirect = await myWixClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId },
          callbacks: { postFlowUrl: window.location.href },
        });
        window.location = redirect.redirectSession.fullUrl;
      });
    } catch (error) {
      openModal("premium", {
        primaryAction: () => {
          window.open(
            `https://manage.wix.com/premium-purchase-plan/dynamo?siteGuid=${msid || ""}`,
            "_blank"
          );
        },
      });
    }
  }

  async function addExistingProduct(lineItemId, quantity) {
    const { cart } =
      await myWixClient.currentCart.updateCurrentCartLineItemQuantity([
        { _id: lineItemId, quantity },
      ]);
    setCart(cart);
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <>
      <Head>
        <title>Mother Vegetables Confidence MV-Si001 | dotpb Co., Ltd</title>
        {/* og:title だけこのページで上書き。その他OGPは _document.js 側が単一管理 */}
        <meta key="og:title" property="og:title" content="Mother Vegetables Confidence MV-Si001" />
      </Head>

      <main
        data-testid={testIds.COMMERCE_PAGE.CONTAINER}
        className="relative min-h-screen"
      >
        <HeroSection />
        <ConceptSection />
        <TestimonialSection />
        <FeatureSection />
        <Effects />
        <ProductSection />
        <GuaranteeSection />
        <FAQSection />
        <Footer />
      </main>
    </>
  );
}
