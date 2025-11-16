import Link from "next/link";
// import { products } from "@/app/data/products";

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();
  console.log("console", products);

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
