"use server";

import { getUserByEmail, createUser, createAuditLog } from "@/lib/data-access";
import bcrypt from "bcryptjs";

export async function registerUser(state: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string; // PATIENT or DOCTOR
  
  const specialty = formData.get("specialty") as string;
  const licenseNumber = formData.get("licenseNumber") as string;

  if (!name || !email || !password) {
    return { error: "Please fill in all required fields." };
  }

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { error: "An account with this email address already exists." };
    }

    const newUser = await createUser({
      name,
      email: email.toLowerCase(),
      password,
      role: role || "PATIENT",
      specialty,
      licenseNumber
    });

    // Create security log entry
    await createAuditLog(newUser.id, "USER_REGISTER", `Registered account with role: ${newUser.role}`);

    return { success: true };
  } catch (error: any) {
    console.error("Registration action error:", error);
    return { error: error.message || "Failed to create account. Please try again." };
  }
}
