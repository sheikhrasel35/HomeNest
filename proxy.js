import { NextResponse } from "next/server";

export function proxy(request) {
  const protectedRoutes = [
    "/add-property",
    "/my-properties",
    "/my-ratings",
    "/update-property",
    "/details",
  ];

  const pathname = request.nextUrl.pathname;

  // Firebase Auth token cookie
  const token = request.cookies.get("firebaseToken")?.value;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-property/:path*",
    "/my-properties/:path*",
    "/my-ratings/:path*",
    "/details/:path*",
    "/update-property/:path*",
  ],
};