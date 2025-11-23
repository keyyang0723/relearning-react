import { promises as fs } from "fs";
import path from "path";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  try {
    const filePath = path.join(process.cwd(), "orders", `${orderId}.xml`);
    const xml = await fs.readFile(filePath, "utf-8");

    return new Response(JSON.stringify({ xml }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Order not found" }), {
      status: 404,
    });
  }
}
