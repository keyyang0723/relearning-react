"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function OrderCompletePage() {
  const [order, setOrder] = useState(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    console.log("id", id);
    if (!id) return;

    fetch(`/api/orders/${id}`)
      .then((res) => res.json())
      .then((data) => setOrder(data))
      .catch((err) => console.error(err));
  }, []);

  console.log("order", order);
  if (!order) return <p>読み込み中...</p>;
  const items = order.order?.items?.item;
  const itemsArray = Array.isArray(items) ? items : [items]; // 1件でも配列にする
  // 合計金額
  const totalAmount = order.order?.total?._text || "0";


  return (
    <div>
      <h1>注文完了</h1>
      <p>注文ID: {order.order?.id?._text}</p>
      <p>名前: {order.order?.customer?.name?._text}</p>
      <p>合計金額: {totalAmount}</p>

      <h2>商品一覧</h2>
      <ul>
        {itemsArray.map((i, idx) => (
          <li key={idx}>
            {i.name._text} × {i.quantity._text}
          </li>
        ))}
      </ul>
    </div>
  );
}
