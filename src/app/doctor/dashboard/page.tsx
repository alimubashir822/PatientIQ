import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getAppointments, getDoctors, getPatientByUserId } from "@/lib/data-access";
import { changeAppointmentStatusAction } from "@/app/actions/appointments";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  Calendar, 
  Clock, 
  ClipboardList, 
  TrendingUp, 
  User, 
  ArrowRight,
  Stethoscope
} from "lucide-react";
import { formatDate, formatTime } from "@/lib/utils";
import { DoctorDashboardClient } from "./doctor-dashboard-client";

export default async function DoctorDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const userId = (session.user as any).id;
  const doctorAppointments = await getAppointments(userId, "DOCTOR");

  // Filter stats
  const pendingApps = doctorAppointments.filter(app => app.status === "PENDING");
  const confirmedApps = doctorAppointments.filter(app => app.status === "CONFIRMED");
  const completedApps = doctorAppointments.filter(app => app.status === "COMPLETED");

  // Get unique patient count
  const uniquePatientIds = new Set(doctorAppointments.map(app => app.patientId));
  const totalPatients = uniquePatientIds.size;

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-linear-to-r from-teal-500/10 via-primary/5 to-transparent border border-teal-100 rounded-2xl p-6 md:p-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900">
            Welcome, {session.user.name}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Clinician Console. Check pending patient consultations and view medical files.
          </p>
        </div>
        <Stethoscope className="h-10 w-10 text-accent hidden sm:block" />
      </div>

      {/* Numerical Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center text-muted-foreground">
              <span className="text-[10px] uppercase font-bold tracking-wider">Total Patients</span>
              <Users className="h-4 w-4 text-accent" />
            </div>
            <CardTitle className="text-3xl font-display font-black text-slate-800 mt-2">
              {totalPatients}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center text-muted-foreground">
              <span className="text-[10px] uppercase font-bold tracking-wider">Pending Bookings</span>
              <Calendar className="h-4 w-4 text-amber-500" />
            </div>
            <CardTitle className="text-3xl font-display font-black text-slate-800 mt-2">
              {pendingApps.length}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center text-muted-foreground">
              <span className="text-[10px] uppercase font-bold tracking-wider">Confirmed Slots</span>
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-3xl font-display font-black text-slate-800 mt-2">
              {confirmedApps.length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Main Appointments Table widget */}
      <DoctorDashboardClient initialAppointments={doctorAppointments} />
    </div>
  );
}
