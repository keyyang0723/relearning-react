import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    // フロントから送られた XML をテキストで受け取る
    const xml = await req.text();

    // 保存先
    const filePath = path.join(process.cwd(), "orders.xml");

    // XMLをファイルとして保存
    fs.writeFileSync(filePath, xml, "utf8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
