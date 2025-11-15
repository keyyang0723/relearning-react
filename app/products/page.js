import Link from "next/link";
import { products } from "@/app/data/products";

export default function ProductsPage() {
  return (
    <div>
      <h1>商品一覧</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <Link href={`/products/${p.id}`}>
              {p.name} - {p.price}円
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
