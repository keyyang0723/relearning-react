import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { xml2js } from "xml-js";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const filePath = path.join(process.cwd(), "orders.xml");
    const xml = fs.readFileSync(filePath, "utf8");

    const json = xml2js(xml, { compact: true });

    // ▼ ケース1： <order> が直接ルート
    if (json.order && json.order.id?._text === id) {
      return NextResponse.json(json);
    }

    // ▼ ケース2： <orders><order>...</order></orders> の形式
    if (json.orders?.order) {
      const list = Array.isArray(json.orders.order)
        ? json.orders.order
        : [json.orders.order];

      const match = list.find(o => o.id?._text === id);

      if (match) {
        return NextResponse.json({ order: match });
      }
    }

    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
