import { NextResponse } from "next/server";
import { CloudneryService } from "@/app/lib/services/cloudnery.service";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";

export async function POST(req) {
  try {
    const user = await verifyJWT();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { fileId, resourceType = "raw" } = await req.json().catch(() => ({}));

    if (!fileId) {
      return NextResponse.json(
        { message: "fileId is required to delete asset" },
        { status: 400 }
      );
    }

    const result = await CloudneryService.delete(fileId, resourceType);

    return NextResponse.json(
      result || { success: true, message: "Asset deletion executed" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in Cloudinary cleanup route:", error);
    return NextResponse.json(
      { message: "Failed to delete Cloudinary asset" },
      { status: 500 }
    );
  }
}
