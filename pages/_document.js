// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mv-si001.dotpb.jp";
const OGP      = `${SITE_URL}/ogp.jpg`;
// LINE などの強いキャッシュ対策。Vercel で NEXT_PUBLIC_OGP_VERSION を設定しておくと ?v=xxx が付く
const OGP_QS   = process.env.NEXT_PUBLIC_OGP_VERSION ? `?v=${process.env.NEXT_PUBLIC_OGP_VERSION}` : "";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          {/* 説明は “空” を明示（本文の自動要約を抑止） */}
          <meta key="description" name="description" content=" " />

          {/* --- Open Graph（全ページ共通の既定値。タイトルは各ページで上書き可能） --- */}
          <meta key="og:type" content="website" property="og:type" />
          <meta key="og:url" content={`${SITE_URL}/`} property="og:url" />
          <meta key="og:site_name" content="Mother Vegetables" property="og:site_name" />
          <meta key="og:title" content="Mother Vegetables" property="og:title" />
          <meta key="og:description" content=" " property="og:description" />

          {/* OGP 画像：絶対 URL＋サイズ＋MIME＋バージョン（キャッシュ破り） */}
          <meta key="og:image" content={`${OGP}${OGP_QS}`} property="og:image" />
          <meta key="og:image:secure_url" content={`${OGP}${OGP_QS}`} property="og:image:secure_url" />
          <meta key="og:image:type" content="image/jpeg" property="og:image:type" />
          <meta key="og:image:width" content="1200" property="og:image:width" />
          <meta key="og:image:height" content="630" property="og:image:height" />
          <meta key="og:image:alt" content="Mother Vegetables" property="og:image:alt" />

          {/* --- Twitter --- */}
          <meta key="tw:card" name="twitter:card" content="summary_large_image" />
          <meta key="tw:description" name="twitter:description" content=" " />
          <meta key="tw:image" name="twitter:image" content={`${OGP}${OGP_QS}`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
