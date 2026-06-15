"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ShieldCheck, Eye, Lock, Globe } from "lucide-react";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect personal and medical information necessary for your healthcare management, including name, contact details, date of birth, emergency contacts, active medical conditions, prescriptions, lab results, and secure document scans uploaded to your vault."
    },
    {
      title: "2. HIPAA Compliance & Protected Health Information (PHI)",
      content: "All health records, lab reports, and clinical notes are classified as Protected Health Information (PHI) under HIPAA regulations. We enforce strict administrative, physical, and technical safeguards. All data is encrypted in transit using TLS 1.3 and at rest using AES-256 standard encryption algorithms."
    },
    {
      title: "3. How We Use and Share Information",
      content: "We only share medical information with authorized healthcare providers linked to your account (e.g., your designated cardiology or neurology clinicians) and for necessary operational pipelines. We do NOT sell or market patient medical data to third-party advertisers."
    },
    {
      title: "4. Audit Trails & Logs",
      content: "Every request to view or edit patient medical summaries, diagnostic charts, or files is logged within our secure Compliance Audit Trail, recording the user identity, time, action type, and client IP address."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header Banner */}
      <section className="py-12 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Last updated: June 15, 2026. Review how PatientIQ handles and secures patient clinical data under HIPAA.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 flex-1 bg-white">
        <div className="max-w-3xl mx-auto px-6 space-y-10">
          
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex gap-3 text-xs leading-relaxed font-semibold text-emerald-800">
            <Lock className="h-5 w-5 text-emerald-600 shrink-0" />
            <div>
              <span>PatientIQ is built as a HIPAA-compliant healthcare platform. All credentials and clinical data are guarded under state and federal privacy mandates.</span>
            </div>
          </div>

          <div className="space-y-8 text-xs font-medium text-slate-600">
            {sections.map((sec, idx) => (
              <div key={idx} className="space-y-2.5">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">{sec.title}</h3>
                <p className="leading-relaxed">{sec.content}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-6 text-[10.5px] text-muted-foreground text-center">
            Questions regarding our privacy standards? Contact our Data Protection Officer at <span className="font-bold text-slate-700">privacy@patientiq.com</span>.
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
