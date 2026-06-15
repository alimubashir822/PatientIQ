import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getPatientByUserId } from "@/lib/data-access";
import { updatePatientProfileAction } from "@/app/actions/profile";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ProfileFormClient } from "./profile-form-client";
import { User, ShieldAlert } from "lucide-react";

export default async function PatientProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const userId = (session.user as any).id;
  const patient = await getPatientByUserId(userId);

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-lg bg-card">
        <User className="h-10 w-10 text-muted-foreground mb-4" />
        <h2 className="text-lg font-bold font-display">Profile not found</h2>
        <p className="text-xs text-muted-foreground mt-2">
          Unable to locate patient details. Please contact support.
        </p>
      </div>
    );
  }

  // Format DOB for date input value: "YYYY-MM-DD"
  const formattedDob = patient.dateOfBirth 
    ? new Date(patient.dateOfBirth).toISOString().split("T")[0] 
    : "";

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold font-display">My Patient Profile</h2>
        <p className="text-xs text-muted-foreground">
          Keep your personal records and emergency contacts updated for clinical reviews.
        </p>
      </div>

      <ProfileFormClient patient={patient} formattedDob={formattedDob} />
    </div>
  );
}
