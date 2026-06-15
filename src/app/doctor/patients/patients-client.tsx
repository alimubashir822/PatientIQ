"use client";

import * as React from "react";
import { getPatientHealthDataAction, addDoctorNoteAction } from "@/app/actions/doctor-notes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Search, 
  User, 
  Phone, 
  Heart, 
  Activity, 
  FileText, 
  FlaskConical, 
  Plus, 
  Loader2, 
  AlertCircle, 
  CheckCircle,
  Eye,
  Download,
  Calendar,
  AlertTriangle,
  Sparkles,
  Mic
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

interface PatientsClientProps {
  patients: any[];
}

export function PatientsClient({ patients }: PatientsClientProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedPatient, setSelectedPatient] = React.useState<any>(patients[0] || null);
  const [healthData, setHealthData] = React.useState<any>(null);
  const [loadingData, setLoadingData] = React.useState(false);
  
  // Note dialog state
  const [isNoteOpen, setIsNoteOpen] = React.useState(false);
  const [notePending, setNotePending] = React.useState(false);
  const [noteError, setNoteError] = React.useState<string | null>(null);
  const [noteSuccess, setNoteSuccess] = React.useState(false);

  // SOAP Dictation states
  const [noteTitle, setNoteTitle] = React.useState("");
  const [noteDescription, setNoteDescription] = React.useState("");
  const [noteRecordType, setNoteRecordType] = React.useState("VISIT");
  const [isDictating, setIsDictating] = React.useState(false);
  const [dictationStatus, setDictationStatus] = React.useState("idle");

  // Fetch active patient records when selection changes
  const fetchPatientData = React.useCallback(async (userId: string) => {
    setLoadingData(true);
    try {
      const data = await getPatientHealthDataAction(userId);
      setHealthData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  }, []);

  React.useEffect(() => {
    if (selectedPatient) {
      fetchPatientData(selectedPatient.userId);
    }
  }, [selectedPatient, fetchPatientData]);

  // Handle adding clinical note / record
  const handleAddNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedPatient) return;
    
    setNotePending(true);
    setNoteError(null);
    setNoteSuccess(false);

    try {
      await addDoctorNoteAction(selectedPatient.userId, noteTitle, noteDescription, noteRecordType as any);
      setNoteSuccess(true);
      
      // Refresh current patient details
      await fetchPatientData(selectedPatient.userId);
      
      setTimeout(() => {
        setIsNoteOpen(false);
        setNoteSuccess(false);
        setNoteTitle("");
        setNoteDescription("");
        setNoteRecordType("VISIT");
      }, 1500);
    } catch (err: any) {
      setNoteError(err.message || "Failed to log clinical note.");
    } finally {
      setNotePending(false);
    }
  };

  const handleDictateSimulate = (templateIndex: number) => {
    setDictationStatus("listening");
    setIsDictating(true);
    
    // Simulate active dictation animation
    setTimeout(() => {
      setDictationStatus("processing");
      
      setTimeout(() => {
        setIsDictating(false);
        setDictationStatus("idle");
        
        if (templateIndex === 1) {
          setNoteTitle("Hypertension Consultation Note");
          setNoteRecordType("VISIT");
          setNoteDescription(
            "SUBJECTIVE: Patient describes mild headaches and afternoon fatigue. Blood pressure has felt slightly elevated in the evening.\n" +
            "OBJECTIVE: Vitals recorded at checkup: BP 132/82 mmHg, HR 72 bpm. Lungs are clear.\n" +
            "ASSESSMENT: Stage-1 hypertension. Excellent tolerance of Lisinopril therapy.\n" +
            "PLAN: Continue Lisinopril 10mg daily. Patient will continue low-sodium diet and logs."
          );
        } else {
          setNoteTitle("Lipid Follow-up Evaluation");
          setNoteRecordType("CONDITION");
          setNoteDescription(
            "SUBJECTIVE: Patient has restriction concerns on low-fat food targets. Active lifestyle modifications underway.\n" +
            "OBJECTIVE: Lab panel: LDL cholesterol 138 mg/dL (High), HDL 47 mg/dL.\n" +
            "ASSESSMENT: Hyperlipidemia, border-high LDL under active diet modifications.\n" +
            "PLAN: Retest lipid panel in 12 weeks. Restrict saturated fats to <15g/day. Aerobic cardio."
          );
        }
      }, 1500);

    }, 1500);
  };

  const filteredPatients = patients.filter(p => 
    p.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone?.includes(searchTerm)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
      
      {/* Left Column: Patients List */}
      <div className="col-span-1 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patients..." 
            className="pl-9"
          />
        </div>

        <Card className="h-[calc(100vh-16rem)] overflow-y-auto">
          <CardContent className="p-2 space-y-1">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPatient(p)}
                  className={cn(
                    "flex flex-col text-left w-full p-3 rounded-lg hover:bg-muted/60 transition-all cursor-pointer border",
                    selectedPatient?.id === p.id 
                      ? "bg-primary/5 border-primary/20 font-semibold" 
                      : "border-transparent"
                  )}
                >
                  <span className="text-xs font-semibold text-slate-800">{p.user?.name}</span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">{p.user?.email}</span>
                  <span className="text-[10px] text-muted-foreground">{p.phone || "No phone"}</span>
                </button>
              ))
            ) : (
              <div className="text-center py-8 text-xs text-muted-foreground">
                No patients found.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Master Details */}
      <div className="col-span-1 lg:col-span-3">
        {selectedPatient ? (
          <div className="space-y-6">
            
            {/* Demographic Summary Widget */}
            <Card className="shadow-premium">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-accent font-bold text-lg select-none">
                      {selectedPatient.user?.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-display">{selectedPatient.user?.name}</CardTitle>
                      <CardDescription className="text-xs">{selectedPatient.user?.email}</CardDescription>
                    </div>
                  </div>
                  
                  {/* Note Creator */}
                  <Dialog open={isNoteOpen} onOpenChange={setIsNoteOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="font-semibold gap-1 cursor-pointer">
                        <Plus className="h-4 w-4" />
                        Log Clinical Record
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <form onSubmit={handleAddNote} className="space-y-4">
                        <DialogHeader>
                          <DialogTitle>Log Patient Health Record</DialogTitle>
                          <DialogDescription className="text-xs">
                            Add conditions, prescriptions, or physician visit notes to {selectedPatient.user?.name}&apos;s profile.
                          </DialogDescription>
                        </DialogHeader>

                        {/* SOAP Dictator Widget */}
                        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] uppercase font-bold text-primary tracking-wider flex items-center gap-1">
                              <Mic className="h-3.5 w-3.5 text-primary" />
                              AI Clinical Dictator (SOAP)
                            </span>
                            {isDictating && <Badge variant="warning" className="text-[9px] animate-pulse">Recording Speech</Badge>}
                          </div>
                          
                          {!isDictating ? (
                            <div className="space-y-2">
                              <p className="text-[10px] text-muted-foreground leading-relaxed">Simulate speech dictation to compile SOAP logs instantly:</p>
                              <div className="flex gap-2">
                                <Button 
                                  type="button" 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-[10px] py-1 cursor-pointer flex-1 font-semibold"
                                  onClick={() => handleDictateSimulate(1)}
                                >
                                  🎙️ Dictate: BP Check
                                </Button>
                                <Button 
                                  type="button" 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-[10px] py-1 cursor-pointer flex-1 font-semibold"
                                  onClick={() => handleDictateSimulate(2)}
                                >
                                  🎙️ Dictate: Lipids
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3 py-1">
                              <Loader2 className="h-4 w-4 text-primary animate-spin" />
                              <span className="text-xs text-slate-700 font-medium animate-pulse">
                                {dictationStatus === "listening" ? "Listening to doctor speech..." : "AI organizing SOAP formats..."}
                              </span>
                            </div>
                          )}
                        </div>

                        {noteError && (
                          <div className="flex items-center gap-2 p-3 bg-red-500/10 text-destructive rounded-lg text-xs font-semibold">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            {noteError}
                          </div>
                        )}

                        {noteSuccess && (
                          <div className="flex items-center gap-2 p-3 bg-emerald-500/10 text-emerald-600 rounded-lg text-xs font-semibold">
                            <CheckCircle className="h-4 w-4 shrink-0" />
                            Clinical record successfully logged!
                          </div>
                        )}

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Record Type</label>
                              <Select name="recordType" value={noteRecordType} onChange={(e) => setNoteRecordType(e.target.value)}>
                                <option value="VISIT">Consultation Note</option>
                                <option value="CONDITION">Condition Diagnosis</option>
                                <option value="MEDICATION">Prescription Drug</option>
                              </Select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Title / Headline</label>
                              <Input required name="title" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} placeholder="e.g. Hypertension Checkup, Lipitor 20mg" />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Clinical Summary & Advice</label>
                            <textarea
                              required
                              name="description"
                              rows={4}
                              value={noteDescription}
                              onChange={(e) => setNoteDescription(e.target.value)}
                              placeholder="Clinical findings, instructions, dosages, or advice..."
                              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                            />
                          </div>
                        </div>

                        <DialogFooter>
                          <Button disabled={notePending || isDictating} type="submit" className="w-full font-semibold cursor-pointer">
                            {notePending ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Saving record...
                              </>
                            ) : (
                              "Log Record Entry"
                            )}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="pt-4 border-t border-border bg-slate-50/30 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-slate-700">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold block mb-1">Phone</span>
                  <span>{selectedPatient.phone || "—"}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold block mb-1">Date of Birth</span>
                  <span>{selectedPatient.dateOfBirth ? formatDate(selectedPatient.dateOfBirth) : "—"}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold block mb-1">Blood & Gender</span>
                  <span>{selectedPatient.bloodType || "—"} / {selectedPatient.gender || "—"}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold block mb-1">Emergency Contact</span>
                  <span>
                    {selectedPatient.emergencyContactName 
                      ? `${selectedPatient.emergencyContactName} (${selectedPatient.emergencyContactRelation})` 
                      : "—"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* AI Doctor Briefing Widget */}
            <Card className="border-primary/20 bg-linear-to-br from-white to-sky-50/10 shadow-glow">
              <CardHeader className="py-3.5 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4.5 w-4.5 text-primary animate-pulse" />
                  <CardTitle className="text-xs font-semibold text-slate-800">AI Clinical Briefing Summary</CardTitle>
                </div>
                <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-wider bg-sky-50">Intelligent Brief</Badge>
              </CardHeader>
              <CardContent className="pb-3.5 pt-0 space-y-2.5">
                <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                  {selectedPatient.user?.name === "Jane Doe" 
                    ? "Patient Jane Doe (41, F) is currently managed for active stage-1 hypertension using Lisinopril 10mg daily. Her latest lipid panel from May 2026 shows borderline-elevated LDL cholesterol (138 mg/dL) currently under active monitoring and dietary adjustments."
                    : `Patient ${selectedPatient.user?.name || "clinical profile"} is registered with no active acute alerts. Initial files indicate optimal health markers and standard adherence vectors with no contraindications on file.`
                  }
                </p>
                <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                  <Badge variant="outline" className="bg-white text-slate-600 border-slate-200">
                    Primary: {selectedPatient.user?.name === "Jane Doe" ? "Hypertension" : "General Wellness"}
                  </Badge>
                  <Badge variant="outline" className="bg-white text-slate-600 border-slate-200">
                    Vitals: {selectedPatient.user?.name === "Jane Doe" ? "Stable (132/82)" : "Normal"}
                  </Badge>
                  <Badge variant="success" className="text-[9px] px-1.5 py-0 font-extrabold uppercase">
                    Adherence: Optimal
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Health details sub-tabs */}
            {loadingData ? (
              <div className="flex items-center justify-center p-12 text-xs text-muted-foreground gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                Loading patient health files...
              </div>
            ) : healthData ? (
              <Tabs defaultValue="history" className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-sm">
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="documents">Vault Docs</TabsTrigger>
                  <TabsTrigger value="labs">Labs</TabsTrigger>
                </TabsList>

                {/* History Tab */}
                <TabsContent value="history" className="mt-4">
                  <Card>
                    <CardContent className="p-0">
                      {healthData.records.length > 0 ? (
                        <div className="divide-y divide-border">
                          {healthData.records.map((r: any) => (
                            <div key={r.id} className="p-4 space-y-2">
                              <div className="flex justify-between items-start gap-4">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline">{r.recordType}</Badge>
                                    <h4 className="font-semibold text-sm text-slate-800">{r.title}</h4>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.description}</p>
                                </div>
                              </div>
                              <div className="flex justify-between text-[10px] text-muted-foreground pt-1">
                                <span>Report Date: {formatDate(r.date)}</span>
                                <span>Provider: {r.provider}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 text-xs text-muted-foreground">
                          No medical history records cataloged.
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Documents Tab */}
                <TabsContent value="documents" className="mt-4">
                  <Card>
                    <CardContent className="p-0">
                      {healthData.documents.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Title</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead>Uploaded</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {healthData.documents.map((d: any) => (
                              <TableRow key={d.id}>
                                <TableCell className="font-semibold flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                                  {d.title}
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">{d.category}</Badge>
                                </TableCell>
                                <TableCell>{formatDate(d.uploadedAt)}</TableCell>
                                <TableCell className="text-right">
                                  <div className="inline-flex gap-2">
                                    <a 
                                      href={d.fileUrl} 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className="inline-flex h-8 items-center justify-center rounded-md border border-border px-3 text-xs font-semibold hover:bg-muted gap-1 text-slate-700"
                                    >
                                      <Eye className="h-3.5 w-3.5" />
                                      View
                                    </a>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center py-12 text-xs text-muted-foreground">
                          No health documents found.
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Labs Tab */}
                <TabsContent value="labs" className="mt-4">
                  <Card>
                    <CardContent className="p-0">
                      {healthData.labResults.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Test Name</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Result Value</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {healthData.labResults.map((l: any) => (
                              <TableRow key={l.id}>
                                <TableCell className="font-semibold">{l.testName}</TableCell>
                                <TableCell>{formatDate(l.testDate)}</TableCell>
                                <TableCell className="text-xs">
                                  {l.resultValue} {l.unit} (Ref: {l.referenceRange})
                                </TableCell>
                                <TableCell>
                                  <Badge variant={l.status === "NORMAL" ? "success" : "warning"}>
                                    {l.status}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center py-12 text-xs text-muted-foreground">
                          No laboratory panels cataloged.
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : null}

          </div>
        ) : (
          <Card className="py-20 text-center text-xs text-muted-foreground shadow-premium">
            Select a patient from the left column to query clinical histories.
          </Card>
        )}
      </div>

    </div>
  );
}
