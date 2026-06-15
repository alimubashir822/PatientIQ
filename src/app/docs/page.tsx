"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { 
  BookOpen, 
  ShieldCheck, 
  Key, 
  MessageSquare, 
  Activity, 
  Terminal,
  FileText
} from "lucide-react";

export default function DocumentationPage() {
  const sections = [
    {
      title: "Getting Started",
      description: "Quick setup guides to connect your clinic or log in as a patient.",
      icon: BookOpen,
      links: [
        { name: "Patient Portal Quickstart", desc: "Setting up demographics and emergency contacts." },
        { name: "Clinician Roster Onboarding", desc: "Setting up specialty registers and licenses." },
        { name: "Security MFA Setup", desc: "Activating dual-factor session tokens." }
      ]
    },
    {
      title: "HIPAA & Compliance",
      description: "How PatientIQ secures protected health information (PHI).",
      icon: ShieldCheck,
      links: [
        { name: "PHI Encryption Standards", desc: "E2EE encryption schemas and TLS policies." },
        { name: "Audit Trail Architecture", desc: "Mapping administrative and system audit logs." },
        { name: "Data Retention & Disposal", desc: "Compliance thresholds for medical documents." }
      ]
    },
    {
      title: "Core Modules",
      description: "Detailed workflows for patient care, voice dictation, and medical wallets.",
      icon: Activity,
      links: [
        { name: "AI Health Timeline", desc: "How raw clinic logs map into chronological stories." },
        { name: "SOAP Dictation Templates", desc: "Clinical dictation parameters for doctors." },
        { name: "Digital Wallet Locker", desc: "Insurance flips, Rx refilling, and immunization charts." }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header Banner */}
      <section className="py-12 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Documentation Center
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Comprehensive system guides, HIPAA verification manuals, and developer resources.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 flex-1">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div key={idx} className="p-6 bg-card border border-border rounded-2xl flex flex-col justify-between space-y-6 shadow-xs">
                <div className="space-y-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-800">{sec.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{sec.description}</p>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-4 space-y-3">
                  {sec.links.map((link, lIdx) => (
                    <div key={lIdx} className="group cursor-pointer">
                      <span className="text-xs font-semibold text-slate-700 group-hover:text-primary transition-colors block">
                        {link.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground block mt-0.5 leading-snug">
                        {link.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

        </div>
      </section>

      <Footer />
    </div>
  );
}
