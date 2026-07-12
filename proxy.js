import { NextResponse } from "next/server";

export function proxy(request) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";
  const proto = request.headers.get("x-forwarded-proto") || "https";

  let shouldRedirect = false;
  let targetHost = host;
  let targetProto = proto;

  // 1. Force non-www
  if (host.startsWith("www.")) {
    targetHost = host.slice(4); // Remove 'www.'
    shouldRedirect = true;
  }

  // 2. Force https (in production)
  const isLocalhost =
    host.includes("localhost") ||
    host.includes("127.0.0.1") ||
    host.startsWith("192.168.");
  if (proto === "http" && !isLocalhost) {
    targetProto = "https";
    shouldRedirect = true;
  }

  const path = request.nextUrl.pathname;

  // 3. Handle legacy path redirects
  if (path === "/industries/life-science") {
    const targetUrl = `${targetProto}://${targetHost}/industries/laboratory-settings`;
    return NextResponse.redirect(targetUrl, 301);
  }

  if (shouldRedirect) {
    const targetUrl = `${targetProto}://${targetHost}${url.pathname}${url.search}`;
    return NextResponse.redirect(targetUrl, 301);
  }

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
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt, and other static assets (e.g. svg, png, jpg, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
