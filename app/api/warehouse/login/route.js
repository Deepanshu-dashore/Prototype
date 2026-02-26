import { WarehouseService } from "@/app/lib/services/warehouse.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

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
    return ApiResponse(
      200,
      { warehouse, warehouseToken: token },
      "Warehouse logged in successfully",
    );
  } catch (error) {
    return ApiResponse(
      500,
      null,
      "Error logging in warehouse: " + error.message,
    );
  }
}
