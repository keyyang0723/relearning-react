"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // 初回マウント時に localStorage から復元する
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart");
      console.log("loaded value", JSON.parse(saved))
      if (!saved) return; // 保存がなければ何もしない
      const parsed = JSON.parse(saved);
      if (Array.isArray(saved)) {
        setCart(saved);
      } else {
        // 期待する形でなければ空配列にする or 無視
        console.warn("localStorage cart is not an array, resetting:", parsed);
        setCart([]);
      }
    } catch (err) {
      console.error("Failed to parse cart from localStorage:", err);
      setCart([]); // パースエラーならクリアして安全側に
    }
  }, []);

  // ▼ cart 変更時に保存
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));  // ← 正しく配列を保存
  }, [cart]);

// カートに追加
const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Number(item.quantity) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) => {
      // 数量が 1 → 0 になる場合は商品削除
      if (quantity <= 0) {
        return prevCart.filter((item) => item.id !== id);
      }
  
      // それ以外は通常の数量更新
      return prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };  
  // カートの合計金額を計算する関数
  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const clearCart = () => setCart([]); // ← ここが必要

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotalPrice, clearCart}}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
