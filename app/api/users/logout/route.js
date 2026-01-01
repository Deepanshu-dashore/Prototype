import { cookies } from "next/headers";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("authToken");
    return ApiResponse(200, null, "Logged out successfully");
  } catch (error) {
    return ApiResponse(500, null, "Error logging out");
  }
}
