import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAppointments } from "@/lib/data-access";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { formatDate, formatTime } from "@/lib/utils";
import { DoctorDashboardClient } from "../dashboard/doctor-dashboard-client";

export default async function DoctorAppointmentsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const userId = (session.user as any).id;
  const doctorAppointments = await getAppointments(userId, "DOCTOR");

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold font-display">Appointments Desk</h2>
        <p className="text-xs text-muted-foreground">
          Track clinical agendas, verify pending consultation requests, and check history.
        </p>
      </div>

      <DoctorDashboardClient initialAppointments={doctorAppointments} />
    </div>
  );
}
