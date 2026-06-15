import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getDoctors, getAppointments } from "@/lib/data-access";
import { AppointmentsClient } from "./appointments-client";

export default async function PatientAppointmentsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const userId = (session.user as any).id;
  const [doctors, appointments] = await Promise.all([
    getDoctors(),
    getAppointments(userId, "PATIENT")
  ]);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold font-display">Manage Appointments</h2>
        <p className="text-xs text-muted-foreground">
          Schedule checkups, view upcoming consultations, or review cancellation states.
        </p>
      </div>

      <AppointmentsClient initialAppointments={appointments} doctors={doctors} />
    </div>
  );
}
