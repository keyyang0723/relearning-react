"use client";

import { useEffect, useState } from "react";

export default function OrderListPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders/list")
      .then(res => res.json())
      .then(data => setOrders(data.orders || []))
      .catch(err => console.error(err));
  }, []);

  if (!orders.length) return <p>注文履歴がありません</p>;

  return (
    <div>
      <h1>注文履歴一覧</h1>

      <ul>
        {orders.map((order, idx) => (
          <li key={idx} style={{ marginBottom: 20 }}>
            <p>注文ID: {order.id._text}</p>
            <p>名前: {order.customer.name._text}</p>
            <p>合計金額: {order.total?._text}円</p>

            <a
              href={`/order-complete?id=${order.id._text}`}
              style={{ color: "blue" }}
            >
              詳細を見る
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
