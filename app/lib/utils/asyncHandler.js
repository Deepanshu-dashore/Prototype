import { NextResponse } from "next/server";

export const asyncHandler = (handler) => {
  return async (req, context) => {
    try {
      return await handler(req, context);
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        { error: error.message || "Internal Server Error" },
        { status: error.statusCode || 500 }
      );
    }
  };
};
