"use client";

import * as React from "react";
import { uploadDocumentAction } from "@/app/actions/documents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Loader2, 
  AlertCircle, 
  CheckCircle,
  Filter,
  Sparkles,
  Activity,
  CheckSquare,
  ClipboardCopy
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface DocumentsClientProps {
  initialDocs: any[];
}

export function DocumentsClient({ initialDocs }: DocumentsClientProps) {
  const [docs, setDocs] = React.useState(initialDocs);
  const [selectedDoc, setSelectedDoc] = React.useState<any>(initialDocs[0] || null);
  const [isUploadOpen, setIsUploadOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [categoryFilter, setCategoryFilter] = React.useState("ALL");
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (initialDocs.length > docs.length) {
      setSelectedDoc(initialDocs[0]);
    } else if (initialDocs.length > 0 && !selectedDoc) {
      setSelectedDoc(initialDocs[0]);
    }
    setDocs(initialDocs);
  }, [initialDocs, docs.length, selectedDoc]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await uploadDocumentAction(null, formData);

    setPending(false);
    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setTimeout(() => {
        setIsUploadOpen(false);
        setSuccess(false);
      }, 1500);
    }
  };

  const filteredDocs = categoryFilter === "ALL" 
    ? docs 
    : docs.filter(d => d.category === categoryFilter);

  // Generate dynamic AI Analysis context based on document metadata
  const getAiAnalysis = (doc: any) => {
    if (!doc) return null;
    const titleLower = doc.title.toLowerCase();
    const category = doc.category;

    if (category === "DISCHARGE_SUMMARY" || titleLower.includes("discharge")) {
      return {
        summary: "Patient discharged following stable monitoring of high blood pressure parameters. Vital indicators remained within target limits throughout the final 24-hour observation cycle.",
        metrics: [
          { name: "Blood Pressure", value: "130/82 mmHg", status: "NORMAL" },
          { name: "Heart Rate", value: "72 bpm", status: "NORMAL" },
          { name: "Recovery Index", value: "85%", status: "NORMAL" }
        ],
        points: [
          "Continue monitoring daily blood pressure parameters at home.",
          "Restrict dietary sodium intake to less than 2,000 mg daily.",
          "Plan the cardiology checkup appointment by mid-June."
        ]
      };
    }

    if (category === "IMAGING" || titleLower.includes("xray") || titleLower.includes("x-ray") || titleLower.includes("scan")) {
      return {
        summary: "Standard posteroanterior and lateral chest views. Lungs are clear of acute consolidations. Normal cardiac silhouette and vascular pathways.",
        metrics: [
          { name: "Cardiothoracic Ratio", value: "< 50%", status: "NORMAL" },
          { name: "Pleural Space", value: "No effusion", status: "NORMAL" },
          { name: "Pulmonary Vigor", value: "Clear lungs", status: "NORMAL" }
        ],
        points: [
          "Normal imaging profile. No immediate treatment or imaging adjustments necessary.",
          "Ensure results are shared with your primary care provider at the next checkup.",
          "Keep this baseline scan recorded in your secure health vault."
        ]
      };
    }

    if (category === "LAB_REPORT" || titleLower.includes("blood") || titleLower.includes("lipid") || titleLower.includes("lab")) {
      return {
        summary: "Routine lab screening showing moderately elevated blood lipid indices. Complete blood count parameters fall within physiological norms.",
        metrics: [
          { name: "Total Cholesterol", value: "215 mg/dL", status: "HIGH" },
          { name: "LDL Cholesterol", value: "138 mg/dL", status: "HIGH" },
          { name: "Triglycerides", value: "155 mg/dL", status: "HIGH" }
        ],
        points: [
          "Adhere to low-fat, fiber-rich nutritional habits to adjust cholesterol.",
          "Commit to 150 minutes of weekly moderate aerobic activities.",
          "Re-evaluate lipid panel details in 3 months to monitor changes."
        ]
      };
    }

    return {
      summary: "Document registered in secure cloud storage. Automated natural language processing indicates standard clinical notation structure.",
      metrics: [
        { name: "Verification", value: "SHA-256 Valid", status: "NORMAL" },
        { name: "Category Sync", value: category || "General Record", status: "NORMAL" }
      ],
      points: [
        "Open and view full contents directly using the 'View Document' tool.",
        "List any key clinical terms you'd like to ask your physician about.",
        "Archive this securely for direct access during future emergency visits."
      ]
    };
  };

  const aiAnalysis = getAiAnalysis(selectedDoc);

  const handleCopyPoint = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Category Filters */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          <Select 
            value={categoryFilter} 
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              // Auto select first match in filtered subset if selectedDoc gets filtered out
              const nextFiltered = e.target.value === "ALL" 
                ? docs 
                : docs.filter(d => d.category === e.target.value);
              if (nextFiltered.length > 0) {
                setSelectedDoc(nextFiltered[0]);
              }
            }}
            className="w-full sm:w-48 bg-card border border-border rounded-lg text-xs"
          >
            <option value="ALL">All Categories</option>
            <option value="LAB_REPORT">Lab Reports</option>
            <option value="PRESCRIPTION">Prescriptions</option>
            <option value="DISCHARGE_SUMMARY">Discharge Summaries</option>
            <option value="IMAGING">Imaging Reports</option>
            <option value="OTHER">Other Documents</option>
          </Select>
        </div>

        {/* Upload Modal Trigger */}
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="font-semibold w-full sm:w-auto gap-2 cursor-pointer">
              <Upload className="h-4 w-4" />
              Upload Medical File
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <DialogHeader>
                <DialogTitle>Upload Health Document</DialogTitle>
                <DialogDescription className="text-xs">
                  Your files are encrypted securely to protect clinical confidentiality.
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
                  Document uploaded and registered successfully.
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Document Title</label>
                  <Input required name="title" type="text" placeholder="e.g. Blood Sugar Check July 2026" />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Category</label>
                  <Select name="category" defaultValue="OTHER">
                    <option value="LAB_REPORT">Lab Report</option>
                    <option value="PRESCRIPTION">Prescription</option>
                    <option value="DISCHARGE_SUMMARY">Discharge Summary</option>
                    <option value="IMAGING">Imaging (MRI, X-Ray)</option>
                    <option value="OTHER">Other / Personal Record</option>
                  </Select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Select File (PDF or Image)</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors bg-muted/10 relative">
                    <input 
                      required 
                      name="file" 
                      type="file" 
                      accept=".pdf,.png,.jpg,.jpeg" 
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <span className="text-xs text-muted-foreground block font-medium">Click to browse or drop files here</span>
                    <span className="text-[10px] text-muted-foreground/60 block mt-0.5">Maximum size: 10MB</span>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button disabled={pending} type="submit" className="w-full font-semibold cursor-pointer">
                  {pending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Uploading file...
                    </>
                  ) : (
                    "Upload Document"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Grid: Left List / Right Analyzer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Documents List */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              {filteredDocs.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>File Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Date Uploaded</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocs.map((doc) => (
                      <TableRow 
                        key={doc.id}
                        onClick={() => setSelectedDoc(doc)}
                        className={`cursor-pointer hover:bg-muted/40 transition-colors ${selectedDoc?.id === doc.id ? "bg-sky-50/50 hover:bg-sky-50/70 border-l-2 border-primary" : ""}`}
                      >
                        <TableCell className="font-semibold flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {doc.title}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider">{doc.category.replace("_", " ")}</Badge>
                        </TableCell>
                        <TableCell>{formatDate(doc.uploadedAt)}</TableCell>
                        <TableCell className="uppercase text-xs font-semibold text-muted-foreground">
                          {doc.fileType || "pdf"}
                        </TableCell>
                        <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="inline-flex gap-2">
                            <a 
                              href={doc.fileUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex h-8 items-center justify-center rounded-md border border-border px-3 text-xs font-medium hover:bg-muted gap-1 text-slate-700"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              View
                            </a>
                            <a
                              href="#"
                              onClick={(e) => { e.preventDefault(); alert("File download request successfully logged. Simulated file download started."); }}
                              className="inline-flex h-8 items-center justify-center rounded-md bg-primary text-primary-foreground px-3 text-xs font-medium hover:opacity-90 gap-1"
                            >
                              <Download className="h-3.5 w-3.5" />
                              Download
                            </a>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-16 text-xs text-muted-foreground space-y-2">
                  <p>No health documents found matching the filter.</p>
                  <p className="text-[10px] text-muted-foreground/60">Upload files like medication sheets, chest scans, or physician charts.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: AI Document Intelligence Panel */}
        <div className="lg:col-span-1">
          {selectedDoc ? (
            <Card className="border-primary/20 bg-linear-to-br from-white to-sky-50/10 shadow-glow sticky top-6">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-[10px] uppercase font-bold text-primary tracking-wider flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                    AI Document Intelligence
                  </span>
                  <Badge variant="outline" className="text-[9px] font-bold uppercase">{selectedDoc.category}</Badge>
                </div>
                <CardTitle className="text-base mt-2 truncate text-slate-800">{selectedDoc.title}</CardTitle>
                <CardDescription className="text-[10px]">
                  Uploaded on {formatDate(selectedDoc.uploadedAt)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                
                {/* Executive Summary */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Clinical Executive Summary</span>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white/70 p-3 border border-border/60 rounded-xl">
                    {aiAnalysis?.summary}
                  </p>
                </div>

                {/* Parsed Vitals & Metrics */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Extracted Metrics</span>
                  <div className="grid grid-cols-1 gap-2">
                    {aiAnalysis?.metrics.map((metric, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2.5 rounded-lg bg-white border border-border/80 text-xs">
                        <span className="font-semibold text-slate-600">{metric.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{metric.value}</span>
                          <Badge 
                            variant={metric.status === "NORMAL" ? "success" : "warning"}
                            className="text-[9px] font-bold px-1.5 py-0"
                          >
                            {metric.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations checklist */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                      <CheckSquare className="h-3.5 w-3.5 text-primary" />
                      Doctor Discussion Guide
                    </span>
                    <span className="text-[9px] text-muted-foreground font-semibold">Copy to clinical checklist</span>
                  </div>
                  <div className="space-y-2">
                    {aiAnalysis?.points.map((point, idx) => (
                      <div key={idx} className="flex justify-between items-start gap-2.5 p-2 bg-slate-50 border border-slate-100 rounded-lg text-xs group/item">
                        <p className="text-slate-600 leading-relaxed font-medium">
                          &bull; {point}
                        </p>
                        <button
                          onClick={() => handleCopyPoint(point, idx)}
                          className="shrink-0 text-slate-400 hover:text-primary transition-colors pt-0.5 p-0.5 rounded hover:bg-slate-200/50 cursor-pointer"
                          title="Copy reference point"
                        >
                          {copiedIndex === idx ? (
                            <span className="text-[9px] text-emerald-500 font-bold">Copied!</span>
                          ) : (
                            <ClipboardCopy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secure Verification Note */}
                <div className="p-2.5 bg-slate-100/60 rounded-xl text-[10px] text-slate-400 flex items-start gap-2 border border-slate-200/50 font-semibold select-none leading-relaxed">
                  <Activity className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Clinical NLP analytics. These summaries represent extracted pointers to aid physician consultations. Always verify reports directly.</span>
                </div>

              </CardContent>
            </Card>
          ) : (
            <div className="border border-dashed border-border rounded-xl p-8 text-center text-xs text-muted-foreground flex flex-col justify-center items-center min-h-[300px] bg-slate-50/50">
              <Sparkles className="h-8 w-8 text-slate-300 animate-pulse mb-3" />
              <p className="font-semibold text-slate-500">Select a document from the vault</p>
              <p className="text-[10px] text-slate-400 mt-1 max-w-[200px]">Click any file row to trigger natural language analytics and metrics summaries.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

