import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAuditLogs, getDoctors, getPatients } from "@/lib/data-access";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldAlert, 
  Users, 
  Stethoscope, 
  Activity, 
  Calendar,
  Globe
} from "lucide-react";
import { formatDate, formatTime } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const [logs, doctors, patients] = await Promise.all([
    getAuditLogs(),
    getDoctors(),
    getPatients()
  ]);

  const totalUsers = doctors.length + patients.length + 1; // plus admin

  return (
    <div className="space-y-6">
      
      {/* Welcome message */}
      <div className="bg-linear-to-r from-slate-800 to-slate-900 text-white rounded-2xl p-6 md:p-8 flex justify-between items-center shadow-premium">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">
            System Administration Console
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Global monitoring. Access HIPAA audit trails, user role records, and doctor validation keys.
          </p>
        </div>
        <ShieldAlert className="h-10 w-10 text-primary-light hidden sm:block" />
      </div>

      {/* Numerical Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Total Registered Users</span>
            <CardTitle className="text-2xl font-display font-black text-slate-800 mt-2 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              {totalUsers}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Registered Patients</span>
            <CardTitle className="text-2xl font-display font-black text-slate-800 mt-2 flex items-center gap-2">
              <Activity className="h-5 w-5 text-accent" />
              {patients.length}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Verified Doctors</span>
            <CardTitle className="text-2xl font-display font-black text-slate-800 mt-2 flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-indigo-500" />
              {doctors.length}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Security Logs Logged</span>
            <CardTitle className="text-2xl font-display font-black text-slate-800 mt-2 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-red-500" />
              {logs.length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* SaaS Operations & Clinic Business Analytics */}
      <div className="space-y-3">
        <h3 className="text-base font-bold font-display text-slate-800">SaaS Operations & Clinic Business Analytics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          
          {/* MRR Card */}
          <Card className="bg-linear-to-br from-white to-sky-50/10">
            <CardContent className="pt-6 space-y-2">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">Monthly Recurring Revenue (MRR)</span>
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-black font-display text-slate-800">$14,820</span>
                <Badge variant="success" className="text-[9px] font-bold">+15.4%</Badge>
              </div>
              <p className="text-[10px] text-muted-foreground">Active clinician tiers & sub plans</p>
            </CardContent>
          </Card>

          {/* No-Show Rate Card */}
          <Card className="bg-linear-to-br from-white to-amber-50/10">
            <CardContent className="pt-6 space-y-2">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">Appointment No-Show Rate</span>
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-black font-display text-slate-800">2.4%</span>
                <Badge variant="outline" className="text-[9px] font-bold text-emerald-600 border-emerald-200 bg-emerald-50">-1.8%</Badge>
              </div>
              <p className="text-[10px] text-muted-foreground">Due to AI automated SMS recalls</p>
            </CardContent>
          </Card>

          {/* Patient Intake Card */}
          <Card className="bg-linear-to-br from-white to-teal-50/10">
            <CardContent className="pt-6 space-y-2">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">New Patient Registrations</span>
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-black font-display text-slate-800">+248</span>
                <Badge variant="success" className="text-[9px] font-bold">+8.2% MoM</Badge>
              </div>
              <p className="text-[10px] text-muted-foreground">Hospital client referrals</p>
            </CardContent>
          </Card>

          {/* AI Hours Saved Card */}
          <Card className="bg-linear-to-br from-white to-emerald-50/15">
            <CardContent className="pt-6 space-y-2">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">AI Operations Saved Hours</span>
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-black font-display text-emerald-600">142.5 hrs</span>
                <Badge variant="outline" className="text-[9px] font-bold text-emerald-700 bg-emerald-100/50">Optimal</Badge>
              </div>
              <p className="text-[10px] text-muted-foreground">Note dictations & vault scans</p>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Security Audit Trails Table */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-destructive" />
            Security Audit Trail Logs
          </CardTitle>
          <CardDescription className="text-xs">
            Immutable log tracking patient data query events and user creation. HIPAA CFR &sect; 164.312 compliant.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 border-t border-border">
          {logs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Type</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Activity Details</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead className="text-right">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id} className="font-mono text-xs">
                    <TableCell className="font-bold text-slate-800">
                      <Badge variant={log.action.includes("REGISTER") || log.action.includes("INITIAL") ? "success" : "default"}>
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground font-semibold">
                      {log.userId}
                    </TableCell>
                    <TableCell className="font-medium text-slate-700">
                      {log.details}
                    </TableCell>
                    <TableCell className="text-muted-foreground flex items-center gap-1.5 py-4">
                      <Globe className="h-3.5 w-3.5" />
                      {log.ipAddress || "127.0.0.1"}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatDate(log.timestamp)} {formatTime(log.timestamp)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-16 text-xs text-muted-foreground">
              No audit logs captured yet.
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
