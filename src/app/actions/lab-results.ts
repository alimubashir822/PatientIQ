"use server";

import { auth } from "@/auth";
import { createLabResult, createAuditLog } from "@/lib/data-access";
import { revalidatePath } from "next/cache";

export async function uploadLabResultAction(state: any, formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    return { error: "Unauthenticated access." };
  }

  const userId = (session.user as any).id;
  const testName = formData.get("testName") as string;
  const resultValue = formData.get("resultValue") as string;
  const referenceRange = formData.get("referenceRange") as string;
  const unit = formData.get("unit") as string;
  const status = formData.get("status") as any; // NORMAL, HIGH, LOW, CRITICAL
  const notes = formData.get("notes") as string;
  const testDateStr = formData.get("testDate") as string;

  if (!testName || !resultValue) {
    return { error: "Please enter the laboratory test name and result value." };
  }

  try {
    const testDate = testDateStr ? new Date(testDateStr) : new Date();

    await createLabResult(userId, {
      testName,
      testDate,
      resultValue,
      referenceRange,
      unit,
      status: status || "NORMAL",
      notes
    });

    // Audit log
    await createAuditLog(userId, "UPLOAD_LAB_RESULT", `Added lab report: ${testName} (Status: ${status})`);

    revalidatePath("/patient/lab-results");
    revalidatePath("/patient/dashboard");

    return { success: true };
  } catch (error: any) {
    console.error("Lab upload action error:", error);
    return { error: error.message || "Failed to log laboratory result. Please try again." };
  }
}
