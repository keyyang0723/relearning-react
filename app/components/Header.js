"use client";

import Link from "next/link";
import { useCart } from "../cart/CartContext";

export default function Header() {
  const { cart } = useCart();

  return (
    <header
      style={{
        padding: "10px 20px",
        background: "#f5f5f5",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* 左側：ロゴやトップへのリンク */}
      <div>
        <Link href="/" style={{ fontSize: 20, fontWeight: "bold" }}>
          Mini Shop
        </Link>
      </div>

      {/* 右側：ナビゲーションリンク */}
      <nav style={{ display: "flex", gap: "20px", fontSize: 16 }}>
        {/* 商品一覧へのリンク */}
        <Link href="/products">商品一覧</Link>

        {/* カートページへのリンク */}
        <Link href="/cart">
          カート ({cart.length})
        </Link>
      </nav>
    </header>
  );
}
