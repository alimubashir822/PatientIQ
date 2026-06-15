"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Settings, 
  Cpu, 
  ArrowRight, 
  Activity, 
  MessageSquare, 
  Calendar, 
  CreditCard,
  Plus,
  Radio,
  Clock,
  Sparkles,
  Zap
} from "lucide-react";

export default function AdminAutomationPage() {
  const [workflows, setWorkflows] = React.useState([
    {
      id: "wf-1",
      name: "On Appointment Requested",
      active: true,
      executionCount: 148,
      trigger: { type: "Portal Trigger", label: "Appointment Created" },
      actions: [
        { id: "a-1", service: "Twilio SMS", label: "Send Dispatch Reminder", icon: MessageSquare, status: "Active" },
        { id: "a-2", service: "Google Calendar", label: "Insert Doctor Agenda", icon: Calendar, status: "Active" }
      ]
    },
    {
      id: "wf-2",
      name: "On Lab Results Uploaded",
      active: true,
      executionCount: 89,
      trigger: { type: "Vault Trigger", label: "PDF Document Created" },
      actions: [
        { id: "b-1", service: "AI Clinical NLP", label: "Extract Lab Metrics", icon: Cpu, status: "Active" },
        { id: "b-2", service: "System Alerts", label: "Trigger Wellness Score Update", icon: Activity, status: "Active" }
      ]
    },
    {
      id: "wf-3",
      name: "On Consult Completed",
      active: false,
      executionCount: 204,
      trigger: { type: "Doctor Trigger", label: "Record Entry Closed" },
      actions: [
        { id: "c-1", service: "Stripe Billing", label: "Generate Copay Invoice", icon: CreditCard, status: "Inactive" },
        { id: "c-2", service: "EHR Database", label: "Append Medical History", icon: Activity, status: "Inactive" }
      ]
    }
  ]);

  const [logs, setLogs] = React.useState([
    { time: "10:32 AM", name: "On Appointment Requested", id: "wf-1", status: "SUCCESS", duration: "128ms" },
    { time: "09:44 AM", name: "On Lab Results Uploaded", id: "wf-2", status: "SUCCESS", duration: "840ms" },
    { time: "Yesterday, 04:15 PM", name: "On Appointment Requested", id: "wf-1", status: "SUCCESS", duration: "115ms" },
    { time: "Yesterday, 12:05 PM", name: "On Consult Completed", id: "wf-3", status: "SUCCESS", duration: "320ms" }
  ]);

  const toggleWorkflow = (id: string) => {
    setWorkflows(prev => prev.map(wf => {
      if (wf.id === id) {
        const nextState = !wf.active;
        return {
          ...wf,
          active: nextState,
          actions: wf.actions.map(act => ({ ...act, status: nextState ? "Active" : "Inactive" }))
        };
      }
      return wf;
    }));
  };

  const triggerMockRun = (id: string) => {
    const wf = workflows.find(w => w.id === id);
    if (!wf || !wf.active) {
      alert("Cannot run workflow. Ensure the pipeline toggle is turned ON.");
      return;
    }

    // Append mock log
    const newLog = {
      time: "Just Now",
      name: wf.name,
      id: wf.id,
      status: "SUCCESS",
      duration: `${Math.floor(Math.random() * 200) + 50}ms`
    };

    setLogs(prev => [newLog, ...prev]);
    setWorkflows(prev => prev.map(w => w.id === id ? { ...w, executionCount: w.executionCount + 1 } : w));
    alert(`Workflow pipeline "${wf.name}" executed. Twilio SMS, Calendar sync, and API logs dispatched successfully.`);
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900">Automation Engine</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Configure n8n-style workflow triggers, webhook pipelines, and auto-dispatched healthcare schedules.
          </p>
        </div>
        <Button size="sm" className="font-semibold gap-1.5 cursor-pointer" onClick={() => alert("Visual canvas builder loaded (Mock).")}>
          <Plus className="h-4 w-4" /> New Workflow
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left: Interactive Workflow Canvas (takes lg:col-span-2) */}
        <div className="lg:col-span-2 space-y-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Active Pipelines Canvas</span>
          
          {workflows.map((wf) => (
            <Card key={wf.id} className={cn("border transition-colors", wf.active ? "border-primary/20 bg-linear-to-br from-white to-sky-50/5 shadow-xs" : "border-border bg-slate-50/30 opacity-70")}>
              <CardHeader className="pb-3 flex flex-row justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-sm font-bold text-slate-800">{wf.name}</CardTitle>
                    <Badge variant={wf.active ? "success" : "outline"} className="text-[9px] font-bold">
                      {wf.active ? "ACTIVE" : "INACTIVE"}
                    </Badge>
                  </div>
                  <CardDescription className="text-[10px] mt-1">Runs: {wf.executionCount} successful executions</CardDescription>
                </div>
                
                {/* Active Switch */}
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-8 text-[10px] font-semibold py-1 border-slate-200 cursor-pointer text-slate-600 hover:text-slate-900"
                    onClick={() => triggerMockRun(wf.id)}
                    disabled={!wf.active}
                  >
                    <Play className="h-3 w-3 mr-1 text-emerald-500 fill-emerald-500" /> Test Run
                  </Button>
                  
                  <button
                    onClick={() => toggleWorkflow(wf.id)}
                    className={cn(
                      "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-hidden",
                      wf.active ? "bg-primary" : "bg-slate-350"
                    )}
                  >
                    <span
                      className={cn(
                        "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
                        wf.active ? "translate-x-4" : "translate-x-0"
                      )}
                    />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                
                {/* Node Loop */}
                <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-4 border border-border/80 rounded-xl overflow-x-auto">
                  
                  {/* Trigger Node */}
                  <div className="p-3 bg-slate-900 text-white rounded-xl text-center min-w-[130px] border border-slate-800">
                    <span className="text-[8px] uppercase tracking-wider text-slate-400 block font-semibold">{wf.trigger.type}</span>
                    <span className="text-[10px] font-bold block mt-1">{wf.trigger.label}</span>
                  </div>

                  <ArrowRight className="h-4 w-4 text-slate-400 shrink-0 rotate-90 sm:rotate-0" />

                  {/* Action Nodes loop */}
                  {wf.actions.map((act, idx) => {
                    const ActIcon = act.icon;
                    return (
                      <React.Fragment key={act.id}>
                        <div className={cn("p-3 rounded-xl min-w-[150px] border flex items-center gap-2.5", act.status === "Active" ? "bg-primary/5 border-primary/20" : "bg-slate-50 border-border opacity-70")}>
                          <div className={cn("h-7 w-7 rounded-lg flex items-center justify-center shrink-0", act.status === "Active" ? "bg-primary/10 text-primary" : "bg-slate-200 text-slate-400")}>
                            <ActIcon className="h-4 w-4" />
                          </div>
                          <div className="overflow-hidden">
                            <span className="text-[8px] uppercase tracking-wider text-muted-foreground block font-bold">{act.service}</span>
                            <span className="text-[10px] font-bold text-slate-800 block truncate leading-tight mt-0.5">{act.label}</span>
                          </div>
                        </div>
                        {idx < wf.actions.length - 1 && (
                          <ArrowRight className="h-4 w-4 text-slate-400 shrink-0 rotate-90 sm:rotate-0" />
                        )}
                      </React.Fragment>
                    );
                  })}

                </div>

              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right: Automation Log & Stats */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Executive Stats */}
          <Card className="border-primary/20 bg-linear-to-br from-white to-sky-50/10 shadow-glow">
            <CardHeader className="pb-3">
              <span className="text-[10px] uppercase font-bold text-primary tracking-wider flex items-center gap-1">
                <Zap className="h-3.5 w-3.5 text-primary animate-pulse" />
                Pipeline Telemetry
              </span>
              <CardTitle className="text-base mt-1 text-slate-800">Operational Automation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black font-display text-primary">441</span>
                <span className="text-xs font-semibold text-slate-500">Automated Actions Run</span>
              </div>
              <div className="space-y-1 text-[11px] text-slate-600 font-medium border-t border-border pt-3">
                <p className="flex justify-between"><span>Active Workflows:</span> <span className="font-bold text-slate-800">2 ON / 1 OFF</span></p>
                <p className="flex justify-between"><span>Avg Response Time:</span> <span className="font-bold text-slate-800">352ms</span></p>
                <p className="flex justify-between"><span>Saved Admin Hours:</span> <span className="font-bold text-emerald-600 font-bold">142.5 Hours</span></p>
              </div>
            </CardContent>
          </Card>

          {/* Execution History logs */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                <Clock className="h-4 w-4 text-slate-500" />
                Execution Log Logs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 border-t border-border">
              <div className="divide-y divide-border text-[11px]">
                {logs.map((log, idx) => (
                  <div key={idx} className="p-3.5 flex justify-between items-center gap-3">
                    <div className="space-y-0.5 overflow-hidden">
                      <span className="font-bold text-slate-800 block truncate leading-tight">{log.name}</span>
                      <span className="text-[9px] text-muted-foreground block">{log.time} &bull; Pipeline ID: {log.id}</span>
                    </div>
                    <div className="text-right shrink-0 font-medium">
                      <Badge variant="success" className="text-[8px] font-bold px-1.5 py-0">SUCCESS</Badge>
                      <span className="text-[9px] text-slate-400 block mt-0.5">{log.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}
