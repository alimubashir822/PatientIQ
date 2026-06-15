"use server";

import { auth } from "@/auth";
import { createMedicalRecord, createAuditLog } from "@/lib/data-access";
import { revalidatePath } from "next/cache";

export async function addDoctorNoteAction(patientUserId: string, title: string, description: string, recordType: "VISIT" | "CONDITION" | "MEDICATION") {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthenticated access.");
  }

  const doctorName = session.user.name || "Practitioner";
  const doctorUserId = (session.user as any).id;

  if (!title || !description) {
    throw new Error("Please enter a note title and clinical summary.");
  }

  try {
    const record = await createMedicalRecord(patientUserId, {
      recordType,
      title,
      description,
      status: "Active",
      provider: `Dr. ${doctorName}`
    });

    // Write audit log
    await createAuditLog(doctorUserId, "ADD_PATIENT_RECORD", `Doctor added record (${recordType}) to patient user ID: ${patientUserId}`);

    revalidatePath("/doctor/patients");
    revalidatePath("/patient/medical-history");
    revalidatePath("/patient/dashboard");

    return { success: true, record };
  } catch (error: any) {
    console.error("Add doctor note error:", error);
    throw new Error(error.message || "Failed to log clinical record.");
  }
}

import { getMedicalRecords, getDocuments, getLabResults } from "@/lib/data-access";

export async function getPatientHealthDataAction(patientUserId: string) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthenticated access.");
  }
  
  const records = await getMedicalRecords(patientUserId);
  const documents = await getDocuments(patientUserId);
  const labResults = await getLabResults(patientUserId);
  
  return { records, documents, labResults };
}
