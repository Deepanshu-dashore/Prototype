import { NextResponse } from "next/server";
import { CloudneryService } from "@/app/lib/services/cloudnery.service";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";

export async function POST(req) {
  try {
    const user = await verifyJWT();
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized or session expired" },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const folder = body.folder || "default";

    const signatureData = CloudneryService.getUploadSignature(folder);
    if (!signatureData) {
      return NextResponse.json(
        { message: "Failed to generate upload signature" },
        { status: 500 }
      );
    }

    return NextResponse.json(signatureData, { status: 200 });
  } catch (error) {
    console.error("Signature generation error:", error);
    return NextResponse.json(
      { message: "Server error generating signature" },
      { status: 500 }
    );
  }
}
