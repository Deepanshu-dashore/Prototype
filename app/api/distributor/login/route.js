import { comparePasswords } from "@/app/lib/security/passwordHasher";
import { DistributorService } from "@/app/lib/services/distributor.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return ApiResponse(400, null, "Email and password are required");
    }
    const distributor = await DistributorService.getDistributorByEmail(email);
    if (!distributor) {
      return ApiResponse(404, null, "Distributor not found");
    }
    if (!distributor.verification.isVerified) {
      return ApiResponse(401, null, "Distributor not verify please verify");
    }
    const isPasswordValid = await comparePasswords(
      password,
      distributor.password,
    );
    if (!isPasswordValid) {
      return ApiResponse(401, null, "Invalid Credentials");
    }

    const token = jwt.sign(
      { id: distributor._id, role: "distributor" },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    return ApiResponse(
      200,
      { distributor, token },
      "Distributor logged in successfully",
    );
  } catch (error) {
    return ApiResponse(500, null, "Distributor login failed " + error.message);
  }
}
