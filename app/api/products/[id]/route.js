import { products } from "@/app/data/products";

export async function GET(request, { params }) {
  const { id } = params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return new Response("Not found", { status: 404 });
  }

  return Response.json(product);
}
