import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getMedicalRecords } from "@/lib/data-access";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  HeartPulse, 
  AlertTriangle, 
  Calendar,
  ClipboardList,
  Sparkles,
  TrendingDown,
  TrendingUp,
  CheckCircle2,
  Clock
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function MedicalHistoryPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const userId = (session.user as any).id;
  const records = await getMedicalRecords(userId);

  const conditions = records.filter(r => r.recordType === "CONDITION");
  const allergies = records.filter(r => r.recordType === "ALLERGY");
  const medications = records.filter(r => r.recordType === "MEDICATION");
  const visits = records.filter(r => r.recordType === "VISIT");

  // Define chronological events for "Your Health Story" (2019 - 2026)
  const timelineEvents = [
    {
      date: "2026-05-15",
      year: "2026",
      title: "Lipid Panel Results Checked",
      type: "LAB",
      description: "Total Cholesterol: 215 mg/dL, LDL: 138 mg/dL. LDL is flagged as high. Initiated dietary changes & aerobic exercise routine.",
      provider: "Dr. Sarah Jenkins",
      status: "Attention Required",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      icon: TrendingUp,
      iconColor: "text-amber-500 bg-amber-50"
    },
    {
      date: "2026-03-15",
      year: "2026",
      title: "Routine Cardiology Follow-up",
      type: "VISIT",
      description: "Checked blood pressure (132/82 mmHg). Cardiovascular pacing verified as stable. Discussed dietary potassium adjustments.",
      provider: "Dr. Sarah Jenkins",
      status: "Completed",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: ClipboardList,
      iconColor: "text-emerald-500 bg-emerald-50"
    },
    {
      date: "2026-02-10",
      year: "2026",
      title: "Lisinopril 10mg Prescribed",
      type: "MEDICATION",
      description: "Initiated once-daily oral tablet for blood pressure stabilization. High adherence recommended.",
      provider: "Dr. Sarah Jenkins",
      status: "Active Therapy",
      badgeColor: "bg-sky-100 text-sky-800 border-sky-200",
      icon: HeartPulse,
      iconColor: "text-sky-500 bg-sky-50"
    },
    {
      date: "2024-02-10",
      year: "2024",
      title: "Hypertension (High Blood Pressure) Diagnosis",
      type: "CONDITION",
      description: "Diagnosed during routine annual checkup. Systolic blood pressure recorded at 150 mmHg. Non-pharmacological lifestyle changes advised first.",
      provider: "Dr. Sarah Jenkins",
      status: "Active",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
      icon: Activity,
      iconColor: "text-rose-500 bg-rose-50"
    },
    {
      date: "2021-08-15",
      year: "2021",
      title: "Penicillin Allergy Logged",
      type: "ALLERGY",
      description: "Severe urticaria (hives) and respiratory distress after administration. Contraindicated for all beta-lactam antibiotics.",
      provider: "Mercy General Hospital",
      status: "Critical Alert",
      badgeColor: "bg-red-100 text-red-800 border-red-200",
      icon: AlertTriangle,
      iconColor: "text-red-500 bg-red-50"
    },
    {
      date: "2019-06-10",
      year: "2019",
      title: "First Diagnostic Intake & Base Metabolic Profile",
      type: "VISIT",
      description: "Baseline vitals, blood panels, and patient registration complete. Overall health markers optimal, baseline LDL recorded at 110 mg/dL.",
      provider: "Mercy General Clinic",
      status: "Archived",
      badgeColor: "bg-slate-100 text-slate-800 border-slate-200",
      icon: Calendar,
      iconColor: "text-slate-500 bg-slate-50"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold font-display">Medical History</h2>
        <p className="text-xs text-muted-foreground">
          Access your comprehensive historical healthcare record, visual timeline, and active conditions.
        </p>
      </div>

      <Tabs defaultValue="story" className="w-full">
        <TabsList className="grid w-full grid-cols-5 max-w-2xl">
          <TabsTrigger value="story">Your Health Story</TabsTrigger>
          <TabsTrigger value="conditions">Conditions</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="allergies">Allergies</TabsTrigger>
          <TabsTrigger value="visits">Visits</TabsTrigger>
        </TabsList>

        {/* Your Health Story (AI Health Timeline) Tab */}
        <TabsContent value="story" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Visual Timeline Panel */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  AI Health Story Timeline
                </CardTitle>
                <CardDescription className="text-xs">
                  A comprehensive chronological visualization of your medical diagnoses, prescriptions, lab checks, and consultations.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative pl-6 sm:pl-8 pr-4 py-4 space-y-8">
                
                {/* Vertical line connector */}
                <div className="absolute left-11 sm:left-13 top-6 bottom-10 w-0.5 bg-slate-200" />

                {timelineEvents.map((event, idx) => {
                  const IconComponent = event.icon;
                  return (
                    <div key={idx} className="relative flex gap-4 sm:gap-6 items-start group">
                      
                      {/* Left: Year Marker */}
                      <span className="text-[11px] font-bold text-slate-400 w-10 text-right select-none pt-2 shrink-0">
                        {event.year}
                      </span>

                      {/* Middle: Icon badge over line */}
                      <div className={`z-10 h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center shrink-0 shadow-sm ${event.iconColor}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>

                      {/* Right: Content details */}
                      <div className="flex-1 p-4 border border-border bg-card rounded-xl shadow-xs hover:border-slate-300 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-1.5">
                          <h4 className="font-semibold text-xs text-slate-800 leading-tight">
                            {event.title}
                          </h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={`text-[9px] px-1.5 py-0.5 font-bold ${event.badgeColor}`}>
                              {event.status}
                            </Badge>
                            <span className="text-[9px] text-muted-foreground font-semibold">
                              {formatDate(event.date)}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {event.description}
                        </p>
                        <div className="mt-2 text-[9.5px] text-slate-400 font-semibold flex items-center gap-1">
                          <span>Recorded by:</span>
                          <span className="text-slate-600">{event.provider}</span>
                        </div>
                      </div>

                    </div>
                  );
                })}

              </CardContent>
            </Card>

            {/* AI Clinical Trend Analyzer Card */}
            <div className="space-y-6 lg:col-span-1">
              <Card className="border-primary/20 bg-linear-to-br from-white to-sky-50/10 shadow-glow">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Sparkles className="h-4.5 w-4.5 text-primary animate-pulse" />
                    AI Clinical Trend Analyzer
                  </CardTitle>
                  <CardDescription className="text-[11px]">
                    Automatic correlation of records and vitals timeline trends.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  
                  {/* Metric 1 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-baseline text-xs font-semibold">
                      <span className="text-slate-700">LDL Cholesterol</span>
                      <span className="text-emerald-600 flex items-center gap-0.5">
                        <TrendingDown className="h-3 w-3" /> Down 18%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: "65%" }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>168 mg/dL (Jan 26)</span>
                      <span className="font-semibold text-slate-600">138 mg/dL (May 26)</span>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-baseline text-xs font-semibold">
                      <span className="text-slate-700">Systolic Blood Pressure</span>
                      <span className="text-emerald-600 flex items-center gap-0.5">
                        <TrendingDown className="h-3 w-3" /> Down 12%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: "80%" }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>150 mmHg (Jan 26)</span>
                      <span className="font-semibold text-slate-600">132 mmHg (Mar 26)</span>
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-baseline text-xs font-semibold">
                      <span className="text-slate-700">Medication Adherence</span>
                      <span className="text-primary flex items-center gap-0.5">
                        <CheckCircle2 className="h-3 w-3" /> 98% Optimal
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "98%" }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Refills: 3 remaining</span>
                      <span className="font-semibold text-slate-600">Lisinopril 10mg</span>
                    </div>
                  </div>

                  {/* Narrative Insight */}
                  <div className="border-t border-slate-100 pt-4 mt-4 space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">AI Narrative Summary</span>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Your cardiovascular profile exhibits strong positive markers. The Lisinopril therapy has successfully reduced your baseline systolic pressure. Following dietary limits and lowering high-fat food intake after your January checkup has dropped your LDL levels by 18% in 4 months. Consistent pacing will likely restore healthy cholesterol balances by your next audit.
                    </p>
                    <div className="p-2 bg-slate-50 rounded-lg text-[10px] text-slate-500 border border-slate-100 flex items-start gap-1.5">
                      <span className="font-bold text-slate-700">Disclaimer:</span> 
                      <span>Generated by AI based on lab inputs. Review changes with Dr. Sarah Jenkins.</span>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </div>

          </div>
        </TabsContent>

        {/* Conditions Tab */}
        <TabsContent value="conditions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Diagnosed Medical Conditions
              </CardTitle>
              <CardDescription className="text-xs">
                Active and resolved medical conditions recorded on your file.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {conditions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {conditions.map((cond) => (
                    <div key={cond.id} className="p-4 border border-border rounded-xl bg-muted/20 space-y-2 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="font-semibold text-sm text-slate-800">{cond.title}</h4>
                          <Badge variant="outline">{cond.status}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{cond.description}</p>
                      </div>
                      <div className="border-t border-border/60 pt-2.5 mt-2 flex justify-between text-[10px] text-muted-foreground">
                        <span>Diagnosed: {formatDate(cond.date)}</span>
                        <span>Provider: {cond.provider}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-xs text-muted-foreground">
                  No medical conditions recorded.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medications Tab */}
        <TabsContent value="medications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <HeartPulse className="h-5 w-5 text-red-500" />
                Prescription Medications
              </CardTitle>
              <CardDescription className="text-xs">
                Current active daily and historical prescriptions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {medications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {medications.map((med) => (
                    <div key={med.id} className="p-4 border border-border rounded-xl bg-muted/20 space-y-2 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="font-semibold text-sm text-slate-800">{med.title}</h4>
                          <Badge variant="success">Active</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{med.description}</p>
                      </div>
                      <div className="border-t border-border/60 pt-2.5 mt-2 flex justify-between text-[10px] text-muted-foreground">
                        <span>Prescribed: {formatDate(med.date)}</span>
                        <span>Practitioner: {med.provider}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-xs text-muted-foreground">
                  No active prescription medications found.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Allergies Tab */}
        <TabsContent value="allergies" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Drug & Environmental Allergies
              </CardTitle>
              <CardDescription className="text-xs">
                Known clinical hypersensitivities or drug reactivities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {allergies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allergies.map((all) => (
                    <div key={all.id} className="p-4 border border-border rounded-xl bg-red-500/5 border-red-500/20 space-y-2 flex flex-col justify-between animate-fade-in">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="font-semibold text-sm text-red-700">{all.title}</h4>
                          <Badge variant="destructive">Critical Allergy</Badge>
                        </div>
                        <p className="text-xs text-red-600/80 leading-relaxed">{all.description}</p>
                      </div>
                      <div className="border-t border-red-500/10 pt-2.5 mt-2 flex justify-between text-[10px] text-red-500/70">
                        <span>Reported: {formatDate(all.date)}</span>
                        <span>Facility: {all.provider}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-xs text-muted-foreground">
                  No allergies logged.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Visits Tab */}
        <TabsContent value="visits" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-accent" />
                Previous Clinic Visits
              </CardTitle>
              <CardDescription className="text-xs">
                Archived records of clinical checkups and emergency visits.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {visits.length > 0 ? (
                <div className="space-y-4">
                  {visits.map((visit) => (
                    <div key={visit.id} className="p-4 border border-border rounded-xl bg-muted/20 flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-sm text-slate-800">{visit.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{visit.description}</p>
                      </div>
                      <div className="flex flex-row md:flex-col items-start md:items-end justify-between border-t md:border-t-0 border-border/50 pt-2 md:pt-0 text-[10px] text-muted-foreground shrink-0 gap-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(visit.date)}
                        </span>
                        <span>Clinician: {visit.provider}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-xs text-muted-foreground">
                  No previous consultation records found.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

