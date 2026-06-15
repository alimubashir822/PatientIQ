import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getPatients } from "@/lib/data-access";
import { PatientsClient } from "./patients-client";

export default async function DoctorPatientsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const patientsList = await getPatients();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold font-display">Patient Registry</h2>
        <p className="text-xs text-muted-foreground">
          View patient health records, analyze uploaded lab sheets, and log clinician checkup notes.
        </p>
      </div>

      <PatientsClient patients={patientsList} />
    </div>
  );
}
