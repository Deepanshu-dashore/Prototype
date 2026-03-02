import { WarehouseService } from "@/app/lib/services/warehouse.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, password } = await request.json();
  if (!name || !password) {
    return ApiResponse(400, null, "All fields are required");
  }
  try {
    const { warehouse, token } = await WarehouseService.login(name, password);
    if (!warehouse) {
      return ApiResponse(404, null, "Warehouse not found");
    }
    if (!token) {
      return ApiResponse(401, null, "Invalid credentials");
    }
    const response = NextResponse.json(
      {
        success: true,
        message: "Warehouse logged in successfully",
        data: { warehouse, warehouseToken: token },
      },
      { status: 200 },
    );

    // Set HTTP-only cookie
    response.cookies.set("warehouseToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    return ApiResponse(
      500,
      null,
      "Error logging in warehouse: " + error.message,
    );
  }
}
