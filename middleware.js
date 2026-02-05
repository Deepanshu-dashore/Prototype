import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Check if it's a distributor route
  if (path.startsWith("/distributor")) {
    // Define paths that are public
    const isPublicPath =
      path === "/distributor/login" || path === "/distributor/register";

    // Get the token from the cookies
    const token = request.cookies.get("distributorToken")?.value || "";

    // If accessing a protected route without a token, redirect to login
    if (!isPublicPath && !token) {
      return NextResponse.redirect(
        new URL("/distributor/login", request.nextUrl),
      );
    }

    // If accessing a public route WITH a token, redirect to dashboard
    if (isPublicPath && token) {
      return NextResponse.redirect(
        new URL("/distributor/dashboard", request.nextUrl),
      );
    }
  }

  return NextResponse.next();
}

// Matching Paths
export const config = {
  matcher: ["/distributor/:path*"],
};
