"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Shield, FileText, CheckCircle2, Lock } from "lucide-react";

export default function BusinessAssociateAgreementPage() {
  const provisions = [
    {
      title: "1. Scope and definitions",
      desc: "This Business Associate Agreement (BAA) applies to all transactions where PatientIQ (the Business Associate) stores, processes, or transmits Protected Health Information (PHI) on behalf of registered healthcare clinics, hospitals, or private practices (the Covered Entity)."
    },
    {
      title: "2. Permitted Uses and Disclosures",
      desc: "PatientIQ will only use or disclose PHI as required to perform dashboard analytics, database storage, SOAP dictation note mapping, secure messaging synchronization, and related clinical SaaS actions requested by the Covered Entity, or as required by law."
    },
    {
      title: "3. Safeguards & Security Audits",
      desc: "We agree to implement administrative, physical, and technical safeguards that reasonably protect the confidentiality, integrity, and availability of electronic PHI (ePHI). Every record check, file access, and credential verification event is registered in the Security Audit log viewer with IP tracking."
    },
    {
      title: "4. Breach Notification",
      desc: "PatientIQ will notify the Covered Entity within twenty-four (24) hours of discovering any unauthorized access, use, or disclosure of PHI (a Security Incident or Breach) to ensure federal notification thresholds are satisfied."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header Banner */}
      <section className="py-12 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
            <Shield className="h-8 w-8 text-emerald-600 animate-pulse" />
            Business Associate Agreement (BAA)
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            HIPAA-compliant BAA terms for hospital networks, clinic networks, and private clinical practices.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 flex-1 bg-white">
        <div className="max-w-3xl mx-auto px-6 space-y-10">
          
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex gap-3 text-xs leading-relaxed font-semibold text-emerald-800">
            <Lock className="h-5 w-5 text-emerald-600 shrink-0" />
            <div>
              <span>PatientIQ operates under HIPAA-compliant standards. A signed BAA is executed automatically during hospital onboarding and is integrated into our SaaS database.</span>
            </div>
          </div>

          <div className="space-y-8 text-xs font-medium text-slate-600">
            {provisions.map((prov, idx) => (
              <div key={idx} className="space-y-2.5">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
                  <CheckCircle2 className="h-4.5 w-4.5 text-primary shrink-0" />
                  {prov.title}
                </h3>
                <p className="leading-relaxed pl-6">{prov.desc}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-6 text-[10.5px] text-muted-foreground text-center">
            To request a countersigned PDF version of this BAA, please contact our HIPAA officer at <span className="font-bold text-slate-700">compliance@patientiq.com</span>.
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
