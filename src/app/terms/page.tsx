"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Scale, CheckCircle2, AlertCircle } from "lucide-react";

export default function TermsOfServicePage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By creating an account or logging into the PatientIQ portal (as a patient, physician, clinic administrator, or staff user), you agree to conform to these Terms of Service, all applicable healthcare regulations, and security policies."
    },
    {
      title: "2. Patient Portals & Clinical Advice Disclaimer",
      content: "PatientIQ provides interactive dashboards, automated health scoring, and AI Health Assistant chatbots. These tools are designed to compile medical information and prepare users for appointments. The AI chatbot is NOT a licensed medical professional and does NOT provide binding diagnostic advice or emergency interventions. For medical emergencies, dial 911 immediately."
    },
    {
      title: "3. Account Security and Roles",
      content: "Users are responsible for safeguarding credentials (passwords, session keys). Administrators must audit clinician roster licenses before provisioning access. Sharing accounts or bypassing role-based access rules constitutes a security breach under our HIPAA policy."
    },
    {
      title: "4. Permitted Use & Epic EHR Sync",
      content: "You may use our API Connectors, SOAP note dictation tools, and digital wallet lockers solely for clinical operations, appointment scheduling, and patient-practician communication. Bypassing authorization tokens or running DDoS loads on API endpoints is strictly prohibited."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header Banner */}
      <section className="py-12 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
            <Scale className="h-8 w-8 text-primary" />
            Terms of Service
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Last updated: June 15, 2026. General terms governing patient portals, doctor accounts, and API access keys.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 flex-1 bg-white">
        <div className="max-w-3xl mx-auto px-6 space-y-10">
          
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 text-xs leading-relaxed font-semibold text-amber-800">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 animate-pulse" />
            <div>
              <span>IMPORTANT: The AI Health Assistant chatbot provides explanatory terminology and scheduling aids. It does not replace professional clinical diagnosis or emergency procedures.</span>
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
            For inquiry on legal clinic agreements, reach out to our legal department at <span className="font-bold text-slate-700">legal@patientiq.com</span>.
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
