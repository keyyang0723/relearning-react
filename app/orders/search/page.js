"use client";

import { useState } from "react";

export default function OrderSearchPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setOrder(null);

    try {
      const res = await fetch(`/api/orders/${orderId}`);
      const data = await res.json();

      if (data.error) {
        setError("注文が見つかりません");
      } else {
        setOrder(data.order);
      }
    } catch (err) {
      setError("検索中にエラーが発生しました");
    }
  };

  return (
    <div>
      <h1>注文検索</h1>
      <input
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        placeholder="注文IDを入力"
        style={{ marginRight: 10 }}
      />
      <button onClick={handleSearch}>検索</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {order && (
        <div style={{ marginTop: 20 }}>
          <h2>注文詳細</h2>
          <p>注文ID: {order.id._text}</p>
          <p>お名前: {order.customer.name._text}</p>
          <p>合計金額: {order.total?._text}円</p>
          <h3>商品</h3>
          <ul>
            {(Array.isArray(order.items.item)
              ? order.items.item
              : [order.items.item]
            ).map((i, idx) => (
              <li key={idx}>
                {i.name._text} × {i.quantity._text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
