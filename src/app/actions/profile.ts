"use server";

import { auth } from "@/auth";
import { updatePatientProfile, createAuditLog } from "@/lib/data-access";
import { revalidatePath } from "next/cache";

export async function updatePatientProfileAction(state: any, formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    return { error: "Unauthenticated access." };
  }

  const userId = (session.user as any).id;

  const phone = formData.get("phone") as string;
  const dateOfBirthStr = formData.get("dateOfBirth") as string;
  const gender = formData.get("gender") as string;
  const bloodType = formData.get("bloodType") as string;
  const address = formData.get("address") as string;
  
  const emergencyContactName = formData.get("emergencyContactName") as string;
  const emergencyContactPhone = formData.get("emergencyContactPhone") as string;
  const emergencyContactRelation = formData.get("emergencyContactRelation") as string;

  try {
    const dob = dateOfBirthStr ? new Date(dateOfBirthStr) : null;

    await updatePatientProfile(userId, {
      phone,
      dateOfBirth: dob,
      gender,
      bloodType,
      address,
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactRelation
    });

    // Write audit log
    await createAuditLog(userId, "UPDATE_PROFILE", "Patient profile details updated.");

    revalidatePath("/patient/profile");
    revalidatePath("/patient/dashboard");

    return { success: true };
  } catch (error: any) {
    console.error("Profile update action error:", error);
    return { error: error.message || "Failed to update profile details. Please try again." };
  }
}
