import { products } from "@/app/data/products";

// Server Component
export default function ProductDetailPage({ params }) {
  console.log("params:", params); // ここで { id: "2" } のはず
  const id = Number(params.id); // string -> number

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>価格: {product.price}円</p>
      <p>{product.description}</p>
    </div>
  );
}
