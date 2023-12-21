import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const fileName = req.nextUrl.searchParams.get("file");

  if (!fileName) {
    return new NextResponse("Bad Request: Missing file name", { status: 400 });
  }

  const filePath = path.join(process.cwd(), fileName);
  if (!fs.existsSync(filePath)) {
    return new NextResponse("Not Found: File does not exist", { status: 404 });
  }

  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
