import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const { orderId, xml } = await req.json();
    if (!orderId) {
      throw new Error("orderId が送られていません");
    }
    if (!xml) {
      throw new Error("XML データが送られていません");
    }

    if (!xml) {
      return new Response("No XML received", { status: 400 });
    }

    // 保存ディレクトリ（mini-shop/orders）
    const dirPath = path.join(process.cwd(), "orders");

    // ディレクトリがなければ作成
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    // 保存ファイルのパス
    const filePath = path.join(dirPath, `${orderId}.xml`);

    // XMLを書き込む
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
