"use client";

import { useCart } from "../../cart/CartContext";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      style={{
        padding: "10px 20px",
        background: "#0070f3",
        color: "white",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
        marginTop: 20,
      }}
    >
      カートに追加
    </button>
  );
}
