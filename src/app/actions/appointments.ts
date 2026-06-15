"use server";

import { auth } from "@/auth";
import { createAppointment, updateAppointmentStatus, createAuditLog } from "@/lib/data-access";
import { revalidatePath } from "next/cache";

export async function bookAppointmentAction(state: any, formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    return { error: "Unauthenticated access." };
  }

  const userId = (session.user as any).id;
  const doctorId = formData.get("doctorId") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const reason = formData.get("reason") as string;
  const notes = formData.get("notes") as string;

  if (!doctorId || !date || !time || !reason) {
    return { error: "Please fill in all required fields (Doctor, Date, Time, and Reason)." };
  }

  try {
    const dateTime = new Date(`${date}T${time}`);

    await createAppointment(userId, {
      doctorId,
      dateTime,
      reason,
      notes
    });

    // Write audit log
    await createAuditLog(userId, "BOOK_APPOINTMENT", `Booked appointment with doctor ID: ${doctorId} for ${date} at ${time}`);

    revalidatePath("/patient/appointments");
    revalidatePath("/patient/dashboard");

    return { success: true };
  } catch (error: any) {
    console.error("Booking action error:", error);
    return { error: error.message || "Failed to book appointment. Please try again." };
  }
}

export async function changeAppointmentStatusAction(id: string, status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED") {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthenticated access.");
  }

  const userId = (session.user as any).id;

  try {
    await updateAppointmentStatus(id, status);
    
    // Log audit
    await createAuditLog(userId, "UPDATE_APPOINTMENT_STATUS", `Appointment ${id} status updated to ${status}`);

    revalidatePath("/patient/appointments");
    revalidatePath("/doctor/appointments");
    revalidatePath("/doctor/dashboard");
    revalidatePath("/patient/dashboard");

    return { success: true };
  } catch (error: any) {
    console.error("Change appointment status error:", error);
    throw new Error(error.message || "Failed to update appointment status.");
  }
}
