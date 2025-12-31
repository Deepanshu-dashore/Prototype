import { NextResponse } from "next/server";

export function ApiResponse(statusCode, data = null, message = "Success") {
  return NextResponse.json(
    {
      success: statusCode < 400,
      message,
      data,
    },
    { status: statusCode }
  );
}

