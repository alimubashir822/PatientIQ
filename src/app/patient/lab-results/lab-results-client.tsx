"use client";

import * as React from "react";
import { uploadLabResultAction } from "@/app/actions/lab-results";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  FlaskConical, 
  Plus, 
  Loader2, 
  AlertCircle, 
  CheckCircle,
  FileText,
  Calendar,
  Activity,
  AlertTriangle
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface LabResultsClientProps {
  initialLabs: any[];
}

export function LabResultsClient({ initialLabs }: LabResultsClientProps) {
  const [labs, setLabs] = React.useState(initialLabs);
  const [selectedLab, setSelectedLab] = React.useState<any>(initialLabs[0] || null);
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    setLabs(initialLabs);
    if (initialLabs.length > 0 && !selectedLab) {
      setSelectedLab(initialLabs[0]);
    }
  }, [initialLabs, selectedLab]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await uploadLabResultAction(null, formData);

    setPending(false);
    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setTimeout(() => {
        setIsAddOpen(false);
        setSuccess(false);
      }, 1500);
    }
  };

  const getBadgeVariant = (status: string) => {
    if (status === "NORMAL") return "success";
    if (status === "HIGH") return "warning";
    if (status === "LOW") return "info";
    return "destructive"; // CRITICAL
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Labs Master List */}
      <div className="col-span-1 lg:col-span-2 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-display font-semibold text-sm text-slate-800">Test Reports</h3>
          
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="font-semibold gap-1 cursor-pointer">
                <Plus className="h-4 w-4" />
                Add Lab Report
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <DialogHeader>
                  <DialogTitle>Log Laboratory Result</DialogTitle>
                  <DialogDescription className="text-xs">
                    Input laboratory values from your official clinical provider sheets.
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
                    Lab result logged successfully!
                  </div>
                )}

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Test Name</label>
                      <Input required name="testName" type="text" placeholder="e.g. Lipid Panel" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Test Date</label>
                      <Input required name="testDate" type="date" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Status / Assessment</label>
                      <Select name="status" defaultValue="NORMAL">
                        <option value="NORMAL">Normal</option>
                        <option value="HIGH">High</option>
                        <option value="LOW">Low</option>
                        <option value="CRITICAL">Critical</option>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Unit</label>
                      <Input name="unit" type="text" placeholder="e.g. mg/dL" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Result Value</label>
                      <Input required name="resultValue" type="text" placeholder="e.g. 215" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Reference Range</label>
                      <Input name="referenceRange" type="text" placeholder="e.g. < 200" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Clinical Notes</label>
                    <textarea
                      name="notes"
                      rows={3}
                      placeholder="Doctor comments or advice..."
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button disabled={pending} type="submit" className="w-full font-semibold cursor-pointer">
                    {pending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving result...
                      </>
                    ) : (
                      "Save Lab Record"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-0">
            {labs.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test Panel</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Summary</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {labs.map((lab) => (
                    <TableRow 
                      key={lab.id}
                      className={selectedLab?.id === lab.id ? "bg-muted/40 font-medium border-l-4 border-primary" : ""}
                    >
                      <TableCell className="font-semibold flex items-center gap-2">
                        <FlaskConical className="h-4 w-4 text-muted-foreground shrink-0" />
                        {lab.testName}
                      </TableCell>
                      <TableCell>{formatDate(lab.testDate)}</TableCell>
                      <TableCell className="max-w-[200px] truncate text-xs text-muted-foreground">
                        {lab.resultValue} {lab.unit}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(lab.status)}>
                          {lab.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          onClick={() => setSelectedLab(lab)}
                          variant="ghost" 
                          size="sm" 
                          className="text-xs font-semibold cursor-pointer"
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-16 text-xs text-muted-foreground">
                No laboratory reports uploaded yet.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Lab Details Side Panel */}
      <div className="col-span-1">
        {selectedLab ? (
          <Card className="shadow-premium border-primary/20 bg-linear-to-b from-white to-sky-50/10">
            <CardHeader className="border-b border-border pb-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <CardTitle className="text-base font-display">{selectedLab.testName}</CardTitle>
                  <CardDescription className="text-xs flex items-center gap-1 mt-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(selectedLab.testDate)}
                  </CardDescription>
                </div>
                <Badge variant={getBadgeVariant(selectedLab.status)}>
                  {selectedLab.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              
              {/* Range Visualization Section */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Value Analysis</span>
                <div className="p-4 rounded-xl border border-border bg-card shadow-sm space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-2xl font-black font-display text-slate-800">
                      {selectedLab.resultValue}
                    </span>
                    <span className="text-xs text-muted-foreground font-semibold">
                      Ref: {selectedLab.referenceRange} {selectedLab.unit}
                    </span>
                  </div>

                  {/* Dynamic Range Bar */}
                  <div className="space-y-1">
                    <div className="h-2 w-full rounded-full bg-linear-to-r from-sky-400 via-emerald-400 via-amber-400 to-red-400 relative">
                      {/* Indicator Pin */}
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-white bg-slate-900 shadow-sm"
                        style={{ 
                          left: selectedLab.status === "NORMAL" 
                            ? "40%" 
                            : selectedLab.status === "HIGH" 
                            ? "70%" 
                            : selectedLab.status === "CRITICAL"
                            ? "90%"
                            : "15%" // LOW
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-[8px] font-bold text-muted-foreground uppercase tracking-widest pt-1">
                      <span>Low</span>
                      <span>Normal</span>
                      <span>High</span>
                      <span>Critical</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lab notes */}
              {selectedLab.notes && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                    Clinical Interpretation
                  </span>
                  <div className="p-3.5 bg-muted/40 border border-border rounded-xl text-xs text-slate-700 leading-relaxed">
                    {selectedLab.notes}
                  </div>
                </div>
              )}

              {/* AI helper notice inside card */}
              <div className="p-3 bg-indigo-50/40 border border-indigo-100 rounded-xl space-y-2 animate-fade-in">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                  <Activity className="h-3.5 w-3.5" />
                  AI Portal Tip
                </div>
                <p className="text-[10px] text-indigo-600/80 leading-relaxed">
                  Want to learn what these measurements mean? Ask our AI assistant in the chat module.
                </p>
              </div>

            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-premium py-16 text-center text-xs text-muted-foreground">
            Select a lab report to view detailed metrics.
          </Card>
        )}
      </div>

    </div>
  );
}
