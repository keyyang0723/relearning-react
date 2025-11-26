import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { xml2js } from "xml-js";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const filePath = path.join(process.cwd(), "orders", `${id}.xml`);

    console.log("file path", filePath);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    const xmlData = fs.readFileSync(filePath, "utf8");

    // XML → JS へ変換
    const json = xml2js(xmlData, { compact: true });

    return NextResponse.json(json);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
