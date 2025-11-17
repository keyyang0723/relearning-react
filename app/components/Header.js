"use client";

import { useCart } from "../cart/CartContext";

export default function Header() {
  const { cart } = useCart() || { cart: [] };
  console.log("hoge", useCart());

  return (
    <header style={{ padding: 10, background: "#eee" }}>
      <span>🛒 カート {cart.length} 件</span>
    </header>
  );
}
