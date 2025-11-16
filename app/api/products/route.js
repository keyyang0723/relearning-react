import { products } from "@/app/data/products";

export function GET() {
  return Response.json(products);
}