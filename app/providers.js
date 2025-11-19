"use client";

import { CartProvider } from "./cart/CartContext";
import Header from "./components/Header";

export function AppProviders({ children }) {
  return (
    <CartProvider>
        <Header />
        {children}
    </CartProvider>
  );
    
}
