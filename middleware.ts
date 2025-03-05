import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("authjs.session-token") || request.cookies.get("__Secure-authjs.session-token");


  if (request.nextUrl.pathname.startsWith("/admin") && !authCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }


  if ((request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname.startsWith("/profile")) && !authCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/profile/:path*"],
};
