import connect from "@/app/lib/db/connect";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { User } from "@/app/lib/models/user";
import { ApiResponse } from "@/app/lib/utlis/apiResponse";

//Get all users
export async function GET() {
  const user = await verifyJWT();
  if (!user?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  await connect();
  const users = await User.find();
  return ApiResponse(200, users , 'Fetching users');
  }

  //Create a new user
export async function POST(request) {
  const user = await verifyJWT();
  if (!user?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  await connect();
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return ApiResponse(400, null, "All fields are required");
    }
    const user = await User.create({ name, email, password });
    return ApiResponse(201, user , 'User created successfully');
  } catch (error) {
    return ApiResponse(500, null, "User creation error "+error.message);
  }
}

//Delete a user
export async function DELETE(request) {
  const user = await verifyJWT();
  if (!user?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  await connect();
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return ApiResponse(400, null, "User ID is required");
    }
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return ApiResponse(404, null, "User not found");
    }
    return ApiResponse(200, deletedUser, 'User deleted successfully');
  } catch (error) {
    return ApiResponse(500, null, "User deletion error " + error.message);
  }
}