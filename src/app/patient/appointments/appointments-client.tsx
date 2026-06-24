"use client";

import * as React from "react";
import { bookAppointmentAction, changeAppointmentStatusAction } from "@/app/actions/appointments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Calendar, 
  Clock, 
  User, 
  Plus, 
  Loader2, 
  AlertCircle, 
  CheckCircle,
  FileText,
  ChevronRight,
  XCircle,
  Sparkles,
  ClipboardCopy,
  Check,
  Undo
} from "lucide-react";
import { formatDate, formatTime } from "@/lib/utils";

interface AppointmentsClientProps {
  initialAppointments: any[];
  doctors: any[];
}

export function AppointmentsClient({ initialAppointments, doctors }: AppointmentsClientProps) {
  const [appointments, setAppointments] = React.useState(initialAppointments);
  const [isBookOpen, setIsBookOpen] = React.useState(false);
  
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  // AI Prep States
  const [symptoms, setSymptoms] = React.useState("");
  const [sideEffects, setSideEffects] = React.useState("");
  const [userQuestions, setUserQuestions] = React.useState("");
  const [generatedBrief, setGeneratedBrief] = React.useState<string | null>(null);
  const [copiedBrief, setCopiedBrief] = React.useState(false);

  // Sync state with props
  React.useEffect(() => {
    setAppointments(initialAppointments);
  }, [initialAppointments]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await bookAppointmentAction(null, formData);

    setPending(false);
    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setTimeout(() => {
        setIsBookOpen(false);
        setSuccess(false);
      }, 1500);
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      await changeAppointmentStatusAction(id, "CANCELLED");
      alert("Appointment successfully cancelled.");
    } catch (err: any) {
      alert(err.message || "Failed to cancel appointment.");
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "CONFIRMED") return <Badge variant="success">Confirmed</Badge>;
    if (status === "PENDING") return <Badge variant="warning">Pending Approval</Badge>;
    if (status === "COMPLETED") return <Badge variant="outline">Completed</Badge>;
    return <Badge variant="destructive">Cancelled</Badge>;
  };

  // Group appointments into upcoming and past
  const upcoming = appointments.filter(app => app.status === "CONFIRMED" || app.status === "PENDING");
  const past = appointments.filter(app => app.status === "COMPLETED" || app.status === "CANCELLED");

  // AI Brief generator
  const handleGenerateBrief = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    
    const docQuestions = [
      userQuestions.trim() ? userQuestions.trim() : "Are my current vital statistics within the target range?",
      sideEffects.trim() ? `Should we adapt my daily routine due to: "${sideEffects.trim()}"?` : "Is my current medication dosage ideal for my chronic markers?",
      "Are there specific symptoms or indicators I should log before our next visit?"
    ];

    const briefText = `PATIENT CLINICAL CONSULTATION BRIEF
Date: ${today}
---------------------------------------------
1. DISCLOSED SYMPTOMS & RECENT CHANGES
   - ${symptoms.trim() || "No acute symptoms or changes reported."}

2. ACTIVE THERAPY CONCERNS / SIDE EFFECTS
   - ${sideEffects.trim() || "No active medication side effects reported."}

3. CLINICAL CONGRUENCE QUESTIONS
   - Question 1: ${docQuestions[0]}
   - Question 2: ${docQuestions[1]}
   - Question 3: ${docQuestions[2]}`;

    setGeneratedBrief(briefText);
  };

  const handleCopyBrief = () => {
    if (!generatedBrief) return;
    navigator.clipboard.writeText(generatedBrief);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* List Panel */}
      <div className="col-span-1 lg:col-span-2 space-y-6">
        
        {/* Upcoming appointments list */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-4 border-b border-border">
            <div>
              <CardTitle className="text-base">Upcoming Consultations</CardTitle>
              <CardDescription className="text-xs">Your scheduled calendar checkups.</CardDescription>
            </div>
            
            {/* Booking Trigger */}
            <Dialog open={isBookOpen} onOpenChange={setIsBookOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="font-semibold gap-1.5 cursor-pointer">
                  <Plus className="h-4 w-4" />
                  Book Appointment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <DialogHeader>
                    <DialogTitle>Request Appointment</DialogTitle>
                    <DialogDescription className="text-xs">
                      Select a medical specialty, practitioner, and your preferred checkup slot.
                    </DialogDescription>
                  </DialogHeader>

                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-500/10 text-destructive rounded-lg text-xs font-semibold">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="flex items-center gap-2 p-3 bg-emerald-500/10 text-emerald-600 rounded-lg text-xs font-semibold">
                      <CheckCircle className="h-4 w-4 shrink-0" />
                      Appointment requested! Doctor approval is pending.
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Select Doctor</label>
                      <Select required name="doctorId">
                        <option value="" disabled>Choose a medical professional...</option>
                        {doctors.map((doc) => (
                          <option key={doc.id} value={doc.id}>
                            {doc.user?.name} — {doc.specialty}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Preferred Date</label>
                        <Input required name="date" type="date" min={new Date().toISOString().split("T")[0]} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Preferred Time</label>
                        <Input required name="time" type="time" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Reason for Consultation</label>
                      <Input required name="reason" placeholder="e.g. Hypertension review, blood sugar review" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Additional Patient Notes (Optional)</label>
                      <textarea
                        name="notes"
                        rows={3}
                        placeholder="Mention any active symptoms, current medications, or concerns..."
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button disabled={pending} type="submit" className="w-full font-semibold cursor-pointer">
                      {pending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting booking request...
                        </>
                      ) : (
                        "Request Booking"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="p-0">
            {upcoming.length > 0 ? (
              <div className="divide-y divide-border">
                {upcoming.map((app) => (
                  <div key={app.id} className="p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-all hover:bg-muted/10">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(app.status)}
                        <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                          <Clock className="h-3.5 w-3.5" />
                          Requested: {formatDate(app.createdAt)}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-slate-800 text-sm">
                          {app.doctor?.user?.name}
                        </h4>
                        <p className="text-xs text-primary font-semibold">{app.doctor?.specialty} Department</p>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">Reason: {app.reason}</p>
                        {app.notes && <p className="text-[11px] text-muted-foreground leading-relaxed italic mt-1">&quot;{app.notes}&quot;</p>}
                      </div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-3 shrink-0">
                      <div className="text-left sm:text-right">
                        <p className="text-sm font-bold text-slate-800">{formatDate(app.dateTime)}</p>
                        <p className="text-xs text-muted-foreground font-medium">{formatTime(app.dateTime)}</p>
                      </div>
                      
                      {app.status !== "CANCELLED" && (
                        <Button
                          onClick={() => handleCancel(app.id)}
                          variant="ghost"
                          size="sm"
                          className="text-xs text-destructive hover:bg-red-500/10 cursor-pointer"
                        >
                          Cancel Booking
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-xs text-muted-foreground">
                No upcoming appointments scheduled.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Historical consultations list */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Consultation History</CardTitle>
            <CardDescription className="text-xs">Archive of completed or cancelled consultations.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 border-t border-border">
            {past.length > 0 ? (
              <div className="divide-y divide-border">
                {past.map((app) => (
                  <div key={app.id} className="p-6 flex justify-between items-center gap-4 hover:bg-muted/10 transition-all">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(app.status)}
                        <span className="text-xs text-slate-800 font-semibold">{app.doctor?.user?.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{app.doctor?.specialty} &bull; Reason: {app.reason}</p>
                    </div>
                    <div className="text-right text-xs text-muted-foreground shrink-0 font-medium">
                      <p>{formatDate(app.dateTime)}</p>
                      <p>{formatTime(app.dateTime)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-xs text-muted-foreground">
                No past consultations recorded.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Column: AI Appointment Prep & Clinician Directory */}
      <div className="col-span-1 space-y-6">
        
        {/* AI Appointment Prep Assistant Card */}
        <Card className="border-primary/20 bg-linear-to-br from-white to-sky-50/10 shadow-glow">
          <CardHeader className="pb-4">
            <span className="text-[10px] uppercase font-bold text-primary tracking-wider flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
              AI Prep Assistant
            </span>
            <CardTitle className="text-base mt-1.5 text-slate-800">Doctor Brief Generator</CardTitle>
            <CardDescription className="text-xs">
              Outline active symptoms and compliance checks to generate a copyable diagnostic card for your consult.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!generatedBrief ? (
              <form onSubmit={handleGenerateBrief} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Active Symptoms & Changes</label>
                  <textarea
                    rows={2}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="e.g. Mild headaches, afternoon fatigue, slight BP spikes..."
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all text-slate-700 font-medium"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Therapy Side Effects (Optional)</label>
                  <textarea
                    rows={2}
                    value={sideEffects}
                    onChange={(e) => setSideEffects(e.target.value)}
                    placeholder="e.g. Dry cough since starting Lisinopril, nausea..."
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all text-slate-700 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Specific Question for Doctor (Optional)</label>
                  <Input
                    type="text"
                    value={userQuestions}
                    onChange={(e) => setUserQuestions(e.target.value)}
                    placeholder="e.g. Is the cough related to Lisinopril?"
                    className="text-xs text-slate-700 font-medium bg-background border border-input focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>

                <Button type="submit" size="sm" className="w-full font-semibold gap-1.5 cursor-pointer">
                  <Sparkles className="h-3.5 w-3.5" />
                  Generate Briefing Card
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Generated Brief</span>
                  <pre className="p-3 bg-slate-900 text-[11px] text-slate-100 font-mono rounded-xl leading-relaxed whitespace-pre-wrap select-all max-h-60 overflow-y-auto border border-slate-800">
                    {generatedBrief}
                  </pre>
                  
                  <div className="flex gap-2 mt-3">
                    <Button 
                      size="sm" 
                      onClick={handleCopyBrief} 
                      className="flex-1 font-semibold gap-1.5 cursor-pointer"
                    >
                      {copiedBrief ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <ClipboardCopy className="h-3.5 w-3.5" />
                          Copy Brief Text
                        </>
                      )}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setGeneratedBrief(null)} 
                      className="font-semibold gap-1.5 cursor-pointer"
                      title="Reset brief"
                    >
                      <Undo className="h-3.5 w-3.5" />
                      Reset
                    </Button>
                  </div>
                </div>
                
                <div className="p-2.5 bg-sky-50/50 border border-sky-100 rounded-lg text-[10px] text-primary/80 font-semibold leading-relaxed flex items-start gap-1.5">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                  <span>Brief compiled. Copy this summary to present to your clinician at check-in.</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Available Doctor Directory sidebar */}
        <Card className="shadow-premium">
          <CardHeader>
            <CardTitle className="text-base">Clinician Directory</CardTitle>
            <CardDescription className="text-xs">Assigned doctors available for consultation requests.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {doctors.map((doc) => (
              <div key={doc.id} className="p-4 border border-border bg-card rounded-xl space-y-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center text-primary font-bold shrink-0">
                    {doc.user?.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-slate-800">{doc.user?.name}</h4>
                    <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">{doc.specialty}</span>
                  </div>
                </div>
                {doc.bio && <p className="text-[11px] text-muted-foreground leading-relaxed italic">&quot;{doc.bio}&quot;</p>}
                <div className="border-t border-border/50 pt-2 flex justify-between items-center text-[10px] text-muted-foreground">
                  <span>License: {doc.licenseNumber}</span>
                  <span>{doc.phone}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
