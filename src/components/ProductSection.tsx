"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ProductSection() {
  const [products, setProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState("2g");
  const { query } = useRouter();

  useEffect(() => {
    if (!query.itemId) return;

    const agentId = query.itemId.toLowerCase();

    async function fetchProducts() {
      try {
        const res = await fetch(`/${agentId}_products.json`);
        if (!res.ok) throw new Error("商品データの取得に失敗しました");

        const data = await res.json();

        const formatted = data.map((item) => ({
          title: item.name || "タイトル未設定",
          description: item.description || "",
          originalPrice: item.originalprice || "",
          price: item.price || "",
          itemPic: item.ItemPic || "/default.jpg",
          slug: item.slug || "",
          size: item.size || "",
          popular: item.popular || false,
          features: item.features || [],
        }));

        setProducts(formatted.slice(-3)); // ✅ 後半3件のみ
      } catch (error) {
        console.error("商品取得エラー:", error);
      }
    }

    fetchProducts();
  }, [query.itemId]);

  return (
    <section
      id="product"
      style={{ padding: "5rem 0.01rem 1rem 0.01rem", backgroundColor: "#f9fafb" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#b8860b",
              marginBottom: "1rem",
              letterSpacing: "0.1em",
            }}
          >
            商品ラインナップ
          </p>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#2d2d2d",
              marginBottom: "2rem",
              lineHeight: "1.2",
            }}
          >
            Mother Vegetables Confidence
            <br />
            定番3商品
          </h2>
          <div
            style={{
              width: "80px",
              height: "4px",
              backgroundColor: "#b8860b",
              margin: "0 auto",
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            marginBottom: "5rem",
          }}
        >
          {products.map((product) => {
            const isSelected = selectedSize === product.size;
            const border = isSelected
              ? "3px solid #b8860b"
              : product.popular
              ? "2px solid #b8860b"
              : "2px solid #e5e7eb";

            return (
              <div
                key={product.size}
                onClick={() => setSelectedSize(product.size)}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "1rem",
                  padding: "2rem",
                  border,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  cursor: "pointer",
                  position: "relative",
                  textAlign: "center",
                }}
              >
                {product.popular && (
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "linear-gradient(to right, #b8860b, #d4c4b0)",
                      padding: "0.5rem 1.5rem",
                      borderRadius: "9999px",
                      fontWeight: "bold",
                      fontSize: "0.875rem",
                      color: "#000",
                      zIndex: 2,
                    }}
                  >
                    人気No.1
                  </div>
                )}

                <div style={{ marginBottom: "1.5rem" }}>
                  <img
                    src={product.itemPic}
                    alt={`${product.size} 商品画像`}
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                      borderRadius: "1rem",
                      backgroundColor: "#f3f4f6",
                    }}
                  />
                </div>

                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "300",
                    color: "#1f2937",
                    marginBottom: "0.5rem",
                  }}
                >
                  {product.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    marginBottom: "1rem",
                  }}
                >
                  {product.description}
                </p>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    marginBottom: "1.5rem",
                  }}
                >
                  {product.features.map((f, i) => (
                    <p
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          backgroundColor: "#b8860b",
                          borderRadius: "50%",
                        }}
                      ></span>
                      {f}
                    </p>
                  ))}
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#6b7280",
                      textDecoration: "line-through",
                      marginBottom: "0.25rem",
                    }}
                  >
                    通常価格 {product.originalPrice}
                  </p>
                  <p
                    className="price"
                    style={{
                      fontSize: "2rem",
                      fontWeight: "300",
                      marginBottom: "0.25rem",
                      color: product.popular ? "#b8860b" : "#1f2937",
                    }}
                  >
                    {product.price}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#9ca3af" }}>(税込)</p>
                </div>

                {/* ✅ 詳細ページへのLink */}
                <Link href={`/item/${query.itemId}/${product.slug}`} style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      width: "100%",
                      padding: "0.75rem 1.5rem",
                      background: product.popular
                        ? "linear-gradient(to right, #b8860b, #d4c4b0)"
                        : "#e5e7eb",
                      color: product.popular ? "#000" : "#1f2937",
                      border: "none",
                      borderRadius: "0",
                      fontSize: "0.875rem",
                      cursor: "pointer",
                    }}
                  >
                    購入する
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          h2 {
            font-size: 1.45rem !important;
          }
          .price {
            font-size: 1.4rem !important;
          }
        }
      `}</style>
    </section>
  );
}
