import { NextResponse } from "next/server";

export function proxy(request) {
  const path = request.nextUrl.pathname;

  // --- Distributor Protection ---
  if (path.startsWith("/distributor/")) {
    const isPublicPath =
      path === "/distributor/login" ||
      path === "/distributor/register" ||
      path === "/distributor/forget-password";
    const token = request.cookies.get("distributorToken")?.value || "";

    if (!isPublicPath && !token) {
      return NextResponse.redirect(
        new URL("/distributor/login", request.nextUrl),
      );
    }
    if (isPublicPath && token) {
      return NextResponse.redirect(
        new URL("/distributor/dashboard", request.nextUrl),
      );
    }
  }

  // --- Admin Protection ---
  if (path.startsWith("/admin") || path === "/login") {
    const isLoginPage = path === "/login";
    const token = request.cookies.get("authToken")?.value || "";

    if (!isLoginPage && !token) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    if (isLoginPage && token) {
      return NextResponse.redirect(
        new URL("/admin/blogboard", request.nextUrl),
      );
    }
  }

  return NextResponse.next();
}

// Matching Paths
export const config = {
  matcher: ["/distributor/:path*", "/admin/:path*", "/login"],
};
