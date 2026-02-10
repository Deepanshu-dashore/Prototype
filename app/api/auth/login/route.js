import { User } from "@/app/lib/models/user";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { ApiError } from "next/dist/server/api-utils";
import jwt from "jsonwebtoken";
import connect from "@/app/lib/db/connect";
import { NextResponse } from "next/server";
import { sanitizeEmail, sanitizeText } from "@/app/lib/security/sanitizer";
import { isValidEmail } from "@/app/lib/security/validator";

// Configure runtime for Vercel

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Handle OPTIONS request for CORS
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(request) {
  await connect();
  try {
    const { name, email, password } = await request.json();

    // Validate and sanitize inputs
    if (!password || typeof password !== "string") {
      return ApiResponse(400, null, "Password is required");
    }

    let user = null;

    if (email) {
      // Sanitize and validate email
      const sanitizedEmail = sanitizeEmail(email);
      if (!isValidEmail(sanitizedEmail)) {
        return ApiResponse(400, null, "Invalid email format");
      }
      user = await User.findOne({ email: sanitizedEmail }).select(
        "-__v -createdAt -updatedAt",
      );
    } else if (name) {
      // Sanitize name
      const sanitizedName = sanitizeText(name);
      if (!sanitizedName) {
        return ApiResponse(400, null, "Invalid name format");
      }
      user = await User.findOne({ name: sanitizedName }).select(
        "-__v -createdAt -updatedAt",
      );
    } else {
      return ApiResponse(400, null, "Email or name is required");
    }

    if (!user) {
      return ApiResponse(400, null, "User not found");
    }

    // Simple password comparison (plain text)
    if (password !== user.password) {
      return ApiResponse(401, null, "Invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 },
    );

    // 7️⃣ Set httpOnly cookie
    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return response;
  } catch (error) {
    return ApiResponse(500, null, "User login error " + error.message);
  }
}
