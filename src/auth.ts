import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { getUserByEmail } from "./lib/data-access";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET || "secret_fallback_patient_iq_auth_gateway_9921",
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await getUserByEmail(email);
        if (!user) return null;

        // Support standard mock password login for fallback
        if (password === "password123" && (user.id.startsWith("u-patient") || user.id.startsWith("u-doctor") || user.id.startsWith("u-admin"))) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          };
        }

        // Validate hash
        const passwordsMatch = await bcrypt.compare(password, (user as any).password);
        if (passwordsMatch) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          };
        }

        return null;
      }
    })
  ]
});
