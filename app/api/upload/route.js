import { writeFile, mkdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { isAllowedMimeType, isAllowedFileExtension, isFileSizeValid } from "@/app/lib/security/validator";

const MAX_FILE_SIZE_MB = 5; // Maximum 5MB

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

    // Validate file size
    if (!isFileSizeValid(file.size, MAX_FILE_SIZE_MB)) {
      return ApiResponse(400, null, `File size must not exceed ${MAX_FILE_SIZE_MB}MB`);
    }

    // Validate MIME type
    if (!isAllowedMimeType(file.type)) {
      return ApiResponse(400, null, "Invalid file type. Only image files (JPEG, PNG, GIF, WebP, SVG) are allowed");
    }

    // Validate file extension
    if (!isAllowedFileExtension(file.name)) {
      return ApiResponse(400, null, "Invalid file extension. Only .jpg, .jpeg, .png, .gif, .webp, .svg are allowed");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename with sanitized name
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.name);
    // Remove any potentially dangerous characters from filename
    const safeName = file.name
      .replace(extension, "")
      .replace(/[^a-z0-9-_]/gi, "-")
      .slice(0, 50); // Limit name length
    const filename = `${safeName}-${uniqueSuffix}${extension}`;

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
