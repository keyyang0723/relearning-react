"use client";

import { useCart } from "../cart/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return <h1 style={{ padding: 20 }}>カートは空です</h1>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>カートの中身</h1>

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
            borderRadius: 4,
          }}
        >
          <h2>{item.name}</h2>
          <p>価格: {item.price}円</p>

          {/* 数量変更 */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={() => updateQuantity(item.id, Number(item.quantity) - 1)}>
            -
          </button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, Number(item.quantity) + 1)}>
              +
            </button>
          </div>

          <p>小計：{item.price * item.quantity}円</p>

          <button
            style={{
              marginTop: 10,
              background: "#e00",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: 4,
              cursor: "pointer",
            }}
            onClick={() => removeFromCart(item.id)}
          >
            削除
          </button>
        </div>
      ))}
      {/* ▼ 合計金額 */}
      {cart.length > 0 && (
        <h2>合計: {getTotalPrice()}円</h2>
      )}
      <Link href="/checkout">
        <button className="checkout-btn">チェックアウトへ進む</button>
      </Link>
    </div>
  );
}
