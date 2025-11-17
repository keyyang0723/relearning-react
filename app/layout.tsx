// app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./cart/CartContext";
import Header from "./components/Header";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
