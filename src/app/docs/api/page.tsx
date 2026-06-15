"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { 
  Terminal, 
  Globe, 
  Code2, 
  Send,
  Lock,
  RefreshCw,
  Cpu
} from "lucide-react";

export default function ApiReferencePage() {
  const endpoints = [
    {
      method: "GET",
      path: "/api/v1/patients/{id}",
      description: "Retrieve demographic, emergency contact, and clinical history summary for a patient.",
      response: `{
  "id": "pat_982a1",
  "name": "Jane Doe",
  "bloodType": "A+",
  "vitals": {
    "systolicBP": 132,
    "diastolicBP": 82,
    "heartRate": 72
  }
}`
    },
    {
      method: "POST",
      path: "/api/v1/clinical/soap",
      description: "Trigger the AI SOAP Clinical Note Dictator analysis engine with custom transcriptions.",
      response: `{
  "status": "PROCESSED",
  "soap": {
    "subjective": "Fatigue and evening headaches reported.",
    "objective": "BP 132/82 mmHg, HR 72 bpm.",
    "assessment": "Stage 1 Hypertension.",
    "plan": "Continue Lisinopril 10mg."
  }
}`
    },
    {
      method: "GET",
      path: "/api/v1/compliance/audit",
      description: "Fetch HIPAA compliance logs for a target security scope.",
      response: `{
  "totalLogs": 240,
  "status": "HIPAA_SECURE",
  "events": [
    { "action": "VIEW_MEDICAL_RECORD", "ip": "192.168.1.10" }
  ]
}`
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header Banner */}
      <section className="py-12 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            API Reference
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Developer tools, FHIR schemas, and secure JSON hooks to integrate with Epic EHR and custom hospital dashboards.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 flex-1 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: API parameters (takes col-span-2) */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              REST API Endpoints
            </h2>

            <div className="space-y-6">
              {endpoints.map((ep, idx) => (
                <div key={idx} className="p-6 bg-white border border-border rounded-2xl space-y-4 shadow-xs">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${ep.method === "GET" ? "bg-emerald-100 text-emerald-800" : "bg-sky-100 text-sky-800"}`}>
                      {ep.method}
                    </span>
                    <code className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-sm">
                      {ep.path}
                    </code>
                  </div>
                  
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {ep.description}
                  </p>

                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block font-mono">Response Schema (200 OK)</span>
                    <pre className="p-3 bg-slate-900 text-slate-200 rounded-lg text-[10px] font-mono overflow-x-auto leading-relaxed select-all">
                      {ep.response}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Key restrictions */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Lock className="h-5 w-5 text-emerald-600" />
              Security Gateway
            </h2>

            <div className="p-5 bg-white border border-border rounded-2xl space-y-4 shadow-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider block">HIPAA TLS Policy</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All requests must be encrypted with TLS v1.3. API requests originating from unverified IP spaces will trigger alerts in the Compliance Log.
                </p>
              </div>

              <div className="space-y-1.5 border-t border-border pt-4">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Authorization Headers</span>
                <code className="text-[10px] font-mono block p-2 bg-slate-100 border border-slate-200 rounded-md text-slate-600">
                  Authorization: Bearer sk_live_•••••••
                </code>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
