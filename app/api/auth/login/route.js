import { User } from "@/app/lib/models/user";
import { ApiResponse } from "@/app/lib/utlis/apiResponse";
import { ApiError } from "next/dist/server/api-utils";
import jwt from 'jsonwebtoken';
import connect from "@/app/lib/db/connect";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connect();
  try {
    const { name, email, password } = await request.json();

    let user = null;
    if (!password) {
     return ApiResponse(400, null, "Password is required");
    }
    if (!name) {
      user = await User.findOne({ email }).select("-__v -createdAt -updatedAt");
    } 
    if (!email) {
      user = await User.findOne({ name }).select("-__v -createdAt -updatedAt");
    } 
    if (!name && !email) {
      return ApiResponse(400, null, "Name or email is required");
    }

    if (!user) {
      return ApiResponse(400, null, "User not found");
    }

    if (user.password !== password) {
      return ApiResponse(401, null, "Invalid credentials");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
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
        { status: 200 }
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
    return ApiResponse(500, null, "User login error "+error.message);
  }
}