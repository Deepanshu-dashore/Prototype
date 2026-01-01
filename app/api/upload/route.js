import { writeFile, mkdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

export async function POST(request) {
  try {
    const user = await verifyJWT();
    if (!user?.id) {
      return ApiResponse(401, null, "Unauthorized request");
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return ApiResponse(400, null, "No file uploaded");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.name);
    const filename = `${file.name.replace(
      extension,
      ""
    )}-${uniqueSuffix}${extension}`;

    // Ensure directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads", "blogs");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // Ignore if directory already exists
    }

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const relativeUrl = `/uploads/blogs/${filename}`;

    return ApiResponse(201, { url: relativeUrl }, "File uploaded successfully");
  } catch (error) {
    console.error("Upload error:", error);
    return ApiResponse(500, null, "Upload failed: " + error.message);
  }
}
