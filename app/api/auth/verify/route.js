import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { ApiResponse } from "@/app/lib/utlis/apiResponse";

export async function GET() {
  const user = await verifyJWT();
  
  if (!user?.id) {
    return ApiResponse(401, null, "Unauthorized");
  }
  
  return ApiResponse(200, { 
    authenticated: true, 
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }, "Authenticated");
}

