import { WarehouseService } from "@/app/lib/services/warehouse.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

export async function POST(request) {
  const { name, password } = await request.json();
  if (!name || !password) {
    return ApiResponse(400, null, "All fields are required");
  }
  try {
    await WarehouseService.create(name, password);
    return ApiResponse(201, null, "Warehouse created successfully");
  } catch (error) {
    return ApiResponse(500, null, "Error creating warehouse: " + error.message);
  }
}
