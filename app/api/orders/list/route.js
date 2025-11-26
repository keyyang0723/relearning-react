import fs from "fs";
import path from "path";
import { xml2js } from "xml-js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dirPath = path.join(process.cwd(), "orders");
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith(".xml"));

    const orders = files.map((file) => {
      const xml = fs.readFileSync(path.join(dirPath, file), "utf8");
      const json = xml2js(xml, { compact: true });
      return json.order;
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("API list error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
