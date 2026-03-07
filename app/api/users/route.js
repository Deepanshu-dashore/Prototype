import connect from "@/app/lib/db/connect";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { User } from "@/app/lib/models/user";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { sanitizeText, sanitizeEmail } from "@/app/lib/security/sanitizer";
import { isValidEmail } from "@/app/lib/security/validator";
import { hashPassword } from "@/app/lib/security/passwordHasher";

//Get all users
export async function GET() {
  const user = await verifyJWT();
  if (!user?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  await connect();
  const users = await User.find({ role: "admin" });
  return ApiResponse(200, users, "Fetching users");
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

    // Validate inputs
    if (!name || !email || !password) {
      return ApiResponse(400, null, "All fields are required");
    }

    // Sanitize inputs
    const sanitizedName = sanitizeText(name);
    const sanitizedEmail = sanitizeEmail(email);

    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
      return ApiResponse(400, null, "Invalid email format");
    }

    // Validate password strength (minimum 6 characters)
    if (password.length < 6) {
      return ApiResponse(
        400,
        null,
        "Password must be at least 6 characters long",
      );
    }

    const hashedPassword = await hashPassword(password);

    // Store password directly (plain text)
    const newUser = await User.create({
      name: sanitizedName,
      email: sanitizedEmail,
      password: hashedPassword,
    });
    return ApiResponse(201, newUser, "User created successfully");
  } catch (error) {
    return ApiResponse(500, null, "User creation error " + error.message);
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
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return ApiResponse(400, null, "User ID is required");
    }
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return ApiResponse(404, null, "User not found");
    }
    return ApiResponse(200, deletedUser, "User deleted successfully");
  } catch (error) {
    return ApiResponse(500, null, "User deletion error " + error.message);
  }
}
