import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // Protect all dashboard routes, exclude public routes and api/auth endpoints
  matcher: ["/((?!api/auth|_next/static|_next/image|.*\\.png$|.*\\.jpg$|favicon.ico).*)"],
};
