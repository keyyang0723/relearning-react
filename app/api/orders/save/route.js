import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();
    const { orderId, xml } = body;

    const ordersDir = path.join(process.cwd(), "orders");
    await fs.mkdir(ordersDir, { recursive: true });

    const filePath = path.join(ordersDir, `${orderId}.xml`);

    await fs.writeFile(filePath, xml, "utf-8");

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to save XML" }), { status: 500 });
  }
}
