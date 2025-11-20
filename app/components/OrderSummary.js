// components/OrderSummary.jsx
"use client";

export default function OrderSummary({ cart = [], total = 0 }) {
  if (!cart.length) return <div>カートは空です</div>;
  return (
    <div>
      <h3>ご注文の内容</h3>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} × {item.quantity} — ¥{item.price * item.quantity}
          </li>
        ))}
      </ul>
      <hr />
      <div style={{ fontWeight: "bold" }}>合計：¥{total}</div>
    </div>
  );
}
