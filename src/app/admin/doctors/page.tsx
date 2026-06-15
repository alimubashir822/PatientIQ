import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getDoctors } from "@/lib/data-access";
import { DoctorsClient } from "./doctors-client";

export default async function AdminDoctorsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const doctorsList = await getDoctors();

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold font-display">Medical Practitioner Registry</h2>
        <p className="text-xs text-muted-foreground">
          Validate medical licenses, register clinical specialties, and verify doctor credentials.
        </p>
      </div>

      {/* Render interactive Client Table */}
      <DoctorsClient doctorsList={doctorsList} />

    </div>
  );
}
