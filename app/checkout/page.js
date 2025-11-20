"use client";

import { useCart } from "../cart/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const router = useRouter();

  // フォームのstate
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");

  const handleOrder = () => {
    if (!name || !address || !email) {
      alert("必要な項目を入力してください");
      return;
    }

    // 注文完了処理
    clearCart();
    router.push("/order-complete");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>チェックアウト</h1>

      {/* カート一覧 */}
      <h2>ご注文内容</h2>
      {cart.map(item => (
        <div key={item.id}>
          {item.name} x {item.quantity} = {item.price * item.quantity}円
        </div>
      ))}

      <h3>合計: {getTotalPrice()}円</h3>

      {/* フォーム */}
      <h2>お客様情報</h2>

      <input
        placeholder="お名前"
        value={name}
        onChange={e => setName(e.target.value)}
      /><br />

      <input
        placeholder="住所"
        value={address}
        onChange={e => setAddress(e.target.value)}
      /><br />

      <input
        placeholder="メールアドレス"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br />

      <input
        placeholder="電話番号"
        value={tel}
        onChange={e => setTel(e.target.value)}
      /><br />

      <button onClick={handleOrder}>
        注文する
      </button>
    </div>
  );
}
