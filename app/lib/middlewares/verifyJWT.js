import jwt from "jsonwebtoken";
import { headers, cookies } from "next/headers";

export const verifyJWT = async () => {
  try {
    let token = null;

    // Check Authorization header first
    const authHeader = (await headers()).get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // If no token in header, check cookies
    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get("authToken")?.value;
    }

    // If still no token, return null
    if (!token) {
      return null;
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // Return user object with id, name, email, etc.
  } catch (err) {
    // Token is invalid or expired
    return null;
  }
};
