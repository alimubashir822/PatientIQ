import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  secret: process.env.AUTH_SECRET || "secret_fallback_patient_iq_auth_gateway_9921",
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = (auth?.user as any)?.role;
      
      const isOnPatient = nextUrl.pathname.startsWith("/patient");
      const isOnDoctor = nextUrl.pathname.startsWith("/doctor");
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      
      if (isOnPatient) {
        if (!isLoggedIn) return false;
        if (role === "PATIENT" || role === "ADMIN") return true;
        // Redirect doctors to their dashboard
        return Response.redirect(new URL("/doctor/dashboard", nextUrl));
      }
      
      if (isOnDoctor) {
        if (!isLoggedIn) return false;
        if (role === "DOCTOR" || role === "ADMIN") return true;
        // Redirect patients to their dashboard
        return Response.redirect(new URL("/patient/dashboard", nextUrl));
      }
      
      if (isOnAdmin) {
        if (!isLoggedIn) return false;
        if (role === "ADMIN") return true;
        // Redirect non-admins to their respective dashboard
        if (role === "DOCTOR") {
          return Response.redirect(new URL("/doctor/dashboard", nextUrl));
        }
        return Response.redirect(new URL("/patient/dashboard", nextUrl));
      }
      
      if (isLoggedIn && (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")) {
        if (role === "ADMIN") {
          return Response.redirect(new URL("/admin/dashboard", nextUrl));
        } else if (role === "DOCTOR") {
          return Response.redirect(new URL("/doctor/dashboard", nextUrl));
        } else {
          return Response.redirect(new URL("/patient/dashboard", nextUrl));
        }
      }
      
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  providers: [], // Configured in auth.ts
} satisfies NextAuthConfig;
