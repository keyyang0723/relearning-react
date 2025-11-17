"use client"; 
import AddToCartButton from "./AddToCartButton";

export default async function ProductDetailPage({ params }) {
  const { id } = params;

  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <h1>Product not found</h1>;
  }

  const product = await res.json();

  return (
    <div style={{ padding: 20 }}>
      <h1>{product.name}</h1>
      <p>価格: {product.price}円</p>

      {/* クライアントコンポーネントへ商品データを渡す */}
      <AddToCartButton product={product} />
    </div>
  );
}
