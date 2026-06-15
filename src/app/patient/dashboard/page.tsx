import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { 
  getPatientByUserId, 
  getAppointments, 
  getDocuments, 
  getLabResults, 
  getMedicalRecords 
} from "@/lib/data-access";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Calendar, 
  FileText, 
  FlaskConical, 
  Sparkles, 
  Activity, 
  ArrowUpRight, 
  User, 
  HeartPulse, 
  ArrowRight,
  TrendingUp,
  Users,
  CheckCircle2,
  ShieldAlert
} from "lucide-react";
import { formatDate, formatTime } from "@/lib/utils";
import { PatientGoalsChecklist } from "@/components/patient-goals-checklist";

export default async function PatientDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const userId = (session.user as any).id;
  const patient = await getPatientByUserId(userId);

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-lg bg-card min-h-60">
        <User className="h-10 w-10 text-muted-foreground mb-4" />
        <h2 className="text-lg font-bold font-display">Profile initialization required</h2>
        <p className="text-xs text-muted-foreground mt-2 max-w-sm">
          Please contact administration to complete your medical file setup.
        </p>
      </div>
    );
  }

  const [appointments, documents, labResults, records] = await Promise.all([
    getAppointments(userId, "PATIENT"),
    getDocuments(userId),
    getLabResults(userId),
    getMedicalRecords(userId)
  ]);

  // Filter conditions & medications for medical summary widget
  const conditions = records.filter(r => r.recordType === "CONDITION");
  const medications = records.filter(r => r.recordType === "MEDICATION");
  
  // Take top items for dashboard widgets
  const nextAppointment = appointments.find(app => app.status === "CONFIRMED" || app.status === "PENDING") as any;
  const latestLab = labResults[0];
  const recentDocs = documents.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-linear-to-r from-sky-500/10 via-primary/5 to-transparent border border-sky-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900">
            Welcome back, {session.user.name}!
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Access and manage your health records in one secure portal.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/patient/appointments">
            <Button size="sm" className="font-semibold cursor-pointer">
              Book Appointment
            </Button>
          </Link>
          <Link href="/patient/ai-chat">
            <Button variant="outline" size="sm" className="font-semibold cursor-pointer gap-2">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Ask Assistant
            </Button>
          </Link>
        </div>
      </div>
      {/* AI Health Insights Command Console */}
      <div className="p-4 bg-linear-to-r from-emerald-500/10 via-primary/5 to-transparent border border-emerald-100 rounded-2xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-emerald-55 border border-emerald-200 flex items-center justify-center shrink-0">
            <Sparkles className="h-4.5 w-4.5 text-emerald-600 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-600 block tracking-wider">AI Clinical Insights Console</span>
            <p className="text-xs text-slate-800 font-semibold mt-0.5 leading-snug">
              "Your systolic blood pressure reading dropped by 12% (132 mmHg) since beginning Lisinopril therapy. Retest lipids in August to audit LDL thresholds."
            </p>
          </div>
        </div>
        <Badge variant="success" className="text-[9px] font-extrabold uppercase shrink-0 py-0.5 px-2">Vitals Improving</Badge>
      </div>

      {/* Differentiator 1: Health Score & Family Console */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Health Score Overview */}
        <Card className="bg-linear-to-br from-white to-sky-50/20">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center text-muted-foreground">
              <span className="text-[10px] uppercase font-bold tracking-wider">Health Score Hub</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>
            <CardTitle className="text-base mt-1">My Wellness Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-black text-emerald-600">92%</span>
              <span className="text-xs font-semibold text-slate-500">Optimal Wellness</span>
            </div>
            <div className="space-y-1.5 text-xs text-muted-foreground font-medium">
              <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Medication Plan: On track</p>
              <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Vitals Checkups: Satisfactory</p>
              <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Lab Results: 1 needs review</p>
            </div>
          </CardContent>
        </Card>

        {/* Preventive Care Alerts */}
        <Card className="bg-linear-to-br from-white to-amber-50/10">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center text-muted-foreground">
              <span className="text-[10px] uppercase font-bold tracking-wider">Preventive Care Engine</span>
              <ShieldAlert className="h-4 w-4 text-amber-500" />
            </div>
            <CardTitle className="text-base mt-1">Health Reminders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-2.5 bg-amber-50 border border-amber-100 rounded-lg text-[11px] text-amber-700 leading-relaxed font-semibold">
              ⚠️ Your annual dental checkout slot is due for booking.
            </div>
            <div className="space-y-1 text-[11px] text-muted-foreground font-medium">
              <p>&bull; Influenza vaccine booster: due October 2026</p>
              <p>&bull; Eye checkup: due January 2027</p>
            </div>
          </CardContent>
        </Card>

        {/* Family Hub overview */}
        <Card className="bg-linear-to-br from-white to-teal-50/10">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center text-muted-foreground">
              <span className="text-[10px] uppercase font-bold tracking-wider">Family Health Hub</span>
              <Users className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-base mt-1">Household Sync</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="space-y-2 font-medium">
              <div className="flex justify-between items-center border-b border-border/50 pb-1.5">
                <span className="font-semibold text-slate-800">John Doe (Spouse)</span>
                <Badge variant="outline" className="text-[9px]">1 Appointment</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-800">Tommy Doe (Son)</span>
                <Badge variant="warning" className="text-[9px]">Vaccination Due</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Journey & Goals Command Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Healthcare Journey (takes lg:col-span-2) */}
        <div className="lg:col-span-2">
          <Card className="bg-linear-to-br from-white to-sky-50/5 h-full">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-base">Active Healthcare Journey</CardTitle>
                  <CardDescription className="text-xs">Visual tracking of your cardiovascular management journey stages.</CardDescription>
                </div>
                <Badge variant="success" className="font-bold">Active Phase: Step 3</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Timeline Steps layout */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                <div className="p-4 border-2 border-primary bg-sky-50/20 rounded-xl relative">
                  <div className="absolute top-2 right-2 h-4 w-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">✓</div>
                  <span className="text-[9px] uppercase tracking-wider text-primary font-bold">Step 1</span>
                  <h4 className="font-semibold text-xs text-slate-800 mt-1">Diagnostic Labs</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Checked cholesterol and BP limits.</p>
                </div>

                <div className="p-4 border-2 border-primary bg-sky-50/20 rounded-xl relative">
                  <div className="absolute top-2 right-2 h-4 w-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">✓</div>
                  <span className="text-[9px] uppercase tracking-wider text-primary font-bold">Step 2</span>
                  <h4 className="font-semibold text-xs text-slate-800 mt-1">Prescription Setup</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Initiated Lisinopril medication.</p>
                </div>

                <div className="p-4 border-2 border-dashed border-primary bg-white rounded-xl relative animate-pulse shadow-xs">
                  <span className="text-[9px] uppercase tracking-wider text-primary font-bold">Step 3 (Current)</span>
                  <h4 className="font-semibold text-xs text-slate-800 mt-1">3-Month Follow-Up</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Cardiology slots scheduled (June 25).</p>
                </div>

                <div className="p-4 border border-border bg-slate-50/40 rounded-xl opacity-60">
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold">Step 4</span>
                  <h4 className="font-semibold text-xs text-slate-800 mt-1">Annual Cardiology Audit</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Evaluate long term BP stability benchmarks.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goals Checklist (takes lg:col-span-1) */}
        <div className="lg:col-span-1">
          <PatientGoalsChecklist />
        </div>
      </div>

      {/* Overview Grid widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Next Appointment widget */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Next Appointment</span>
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-base mt-2">Upcoming Consultation</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between pt-0 mt-4">
            {nextAppointment ? (
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-800">
                    {formatDate(nextAppointment.dateTime)} at {formatTime(nextAppointment.dateTime)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {nextAppointment.doctor?.user?.name} ({nextAppointment.doctor?.specialty})
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <Badge variant={nextAppointment.status === "CONFIRMED" ? "success" : "warning"}>
                    {nextAppointment.status}
                  </Badge>
                  <Link href="/patient/appointments" className="text-xs text-primary font-semibold flex items-center gap-1">
                    Details <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-muted-foreground space-y-3">
                <p>No upcoming appointments found.</p>
                <Link href="/patient/appointments">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Schedule Appointment
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Latest Lab Results widget */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Latest Lab Report</span>
              <FlaskConical className="h-4 w-4 text-accent" />
            </div>
            <CardTitle className="text-base mt-2">Recent Laboratory Panel</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between pt-0 mt-4">
            {latestLab ? (
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-800">{latestLab.testName}</p>
                  <p className="text-[10px] text-muted-foreground">Tested: {formatDate(latestLab.testDate)}</p>
                  <p className="text-xs text-slate-600 truncate mt-2">{latestLab.resultValue}</p>
                </div>
                <div className="flex justify-between items-center">
                  <Badge variant={latestLab.status === "NORMAL" ? "success" : latestLab.status === "HIGH" ? "warning" : "danger"}>
                    {latestLab.status}
                  </Badge>
                  <Link href="/patient/lab-results" className="text-xs text-primary font-semibold flex items-center gap-1">
                    View Trends <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-muted-foreground">
                No lab reports available.
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Assistant Card */}
        <Card className="border-primary/30 bg-sky-50/10 shadow-glow flex flex-col justify-between">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-bold text-primary tracking-wider">Clinical Chatbot</span>
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-base mt-2">AI Health Assistant</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between pt-0 mt-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Understand diagnostic terminology, evaluate blood count stats, and construct lists of discussion points before checking in with your doctor.
            </p>
            <Link href="/patient/ai-chat" className="mt-4">
              <Button size="sm" className="w-full font-semibold gap-2 cursor-pointer">
                Consult Assistant
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Grid for Medical Summary and Recent Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Medical Summary list */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">My Health Summary</CardTitle>
            <CardDescription className="text-xs">Summary of active clinical conditions and daily prescription medications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Conditions List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Active Conditions
                </h4>
                {conditions.length > 0 ? (
                  <ul className="space-y-2">
                    {conditions.slice(0, 3).map(c => (
                      <li key={c.id} className="p-3 bg-muted/30 rounded-lg border border-border text-xs flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-slate-800">{c.title}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">Reported: {formatDate(c.date)}</p>
                        </div>
                        <Badge variant="outline">{c.status || "Active"}</Badge>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground py-4">No active conditions recorded.</p>
                )}
              </div>

              {/* Medications List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <HeartPulse className="h-4 w-4 text-red-500" />
                  Active Medications
                </h4>
                {medications.length > 0 ? (
                  <ul className="space-y-2">
                    {medications.slice(0, 3).map(m => (
                      <li key={m.id} className="p-3 bg-muted/30 rounded-lg border border-border text-xs flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-slate-800">{m.title}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">Prescribed by {m.provider}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground py-4">No active prescriptions.</p>
                )}
              </div>
            </div>
            
            <div className="border-t border-border pt-4 flex justify-end">
              <Link href="/patient/medical-history">
                <Button variant="outline" size="sm" className="text-xs">
                  Full Medical History
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Documents Vault list */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Recent Documents</CardTitle>
            <CardDescription className="text-xs">Quick access to secure health record papers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentDocs.length > 0 ? (
              <div className="space-y-3">
                {recentDocs.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div className="overflow-hidden">
                        <span className="text-xs font-medium truncate block">{doc.title}</span>
                        <span className="text-[10px] text-muted-foreground font-semibold uppercase">{doc.category}</span>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="text-xs font-semibold text-primary hover:underline ml-2"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-muted-foreground">
                No health documents uploaded.
              </div>
            )}
            <div className="border-t border-border pt-4 flex justify-end">
              <Link href="/patient/documents" className="w-full">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Upload & Manage Vault
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
