"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../cart/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 注文送信
  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderId = Date.now().toString();
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // XML生成
    const xml = `
      <order>
        <id>${orderId}</id>
        <customer>
          <name>${form.name}</name>
          <email>${form.email}</email>
          <address>${form.address}</address>
        </customer>
        <items>
          ${cart
            .map(
              (item) => `
            <item>
              <id>${item.id}</id>
              <name>${item.name}</name>
              <price>${item.price}</price>
              <quantity>${item.quantity}</quantity>
            </item>
          `
            )
            .join("")}
        </items>
        <total>${totalAmount}</total>
      </order>
    `;

    // XML をサーバーへ保存依頼
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/xml" },
      body: JSON.stringify({
        orderId,   // ← これを追加
        xml        // ← XMLは文字列として送る
      }),
    });

    if (res.ok) {
      clearCart();
      router.push(`/order-complete?id=${orderId}`);
    } else {
      alert("注文の送信に失敗しました");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Checkout</h1>

      {cart.length === 0 ? (
        <p>カートが空です。</p>
      ) : (
        <>
          <h2>注文内容</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} × {item.quantity} 個（¥{item.price}）
              </li>
            ))}
          </ul>

          <h2>お客様情報</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
            <label>名前：</label>
            <input name="name" value={form.name} onChange={handleChange} required />

            <label>Email：</label>
            <input name="email" value={form.email} onChange={handleChange} required />

            <label>住所：</label>
            <textarea name="address" value={form.address} onChange={handleChange} required />

            <button type="submit" style={{ marginTop: "20px" }}>
              注文を確定する
            </button>
          </form>
        </>
      )}
    </div>
  );
}
