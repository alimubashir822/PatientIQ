"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { 
  HeartPulse, 
  Sparkles, 
  FileText, 
  Calendar, 
  Activity, 
  Users, 
  ShieldAlert, 
  FolderLock 
} from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <section className="py-12 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Features & Capabilities
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Explore the specialized modules built for patients, clinicians, and system administrators.
          </p>
        </div>
      </section>

      {/* Modules Breakdown */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {/* Patient Section */}
          <div className="space-y-8">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">01 / Patient Modules</span>
              <h2 className="text-2xl font-display font-bold mt-1 text-slate-800">Secure Patient Self-Management</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 bg-card border border-border rounded-xl space-y-3">
                <Activity className="h-6 w-6 text-primary" />
                <h3 className="font-semibold text-sm">Comprehensive Medical History</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Track conditions, verified allergies, active medications, and records of previous clinician visits in one central interface.
                </p>
              </div>

              <div className="p-6 bg-card border border-border rounded-xl space-y-3">
                <FileText className="h-6 w-6 text-accent" />
                <h3 className="font-semibold text-sm">Secure Document Vault</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Upload medical reports, discharge notes, or imaging papers. Categorize and retrieve them on the go with secure downloads.
                </p>
              </div>

              <div className="p-6 bg-card border border-border rounded-xl space-y-3">
                <Sparkles className="h-6 w-6 text-indigo-500" />
                <h3 className="font-semibold text-sm">AI Health Chat Assistant</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Demystify medical terminology and prepare questions for upcoming visits using an conversational clinical helper.
                </p>
              </div>
            </div>
          </div>

          {/* Doctor Section */}
          <div className="space-y-8">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">02 / Doctor Modules</span>
              <h2 className="text-2xl font-display font-bold mt-1 text-slate-800">Clinician Workspace</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 bg-card border border-border rounded-xl space-y-3">
                <Users className="h-6 w-6 text-accent" />
                <h3 className="font-semibold text-sm">Patient List & History Views</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Review complete lists of assigned patients, view their medical records, access uploaded labs, and keep records updated.
                </p>
              </div>

              <div className="p-6 bg-card border border-border rounded-xl space-y-3">
                <Calendar className="h-6 w-6 text-primary" />
                <h3 className="font-semibold text-sm">Schedule & Appointment Desk</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Approve booking queries, view scheduling slots, cancel appointments, and review visit rationale.
                </p>
              </div>

              <div className="p-6 bg-card border border-border rounded-xl space-y-3">
                <HeartPulse className="h-6 w-6 text-red-500" />
                <h3 className="font-semibold text-sm">Clinical Notes</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Annotate records with official treatment advice, diagnostic codes, or follow-up timelines directly inside a patient profile.
                </p>
              </div>
            </div>
          </div>

          {/* Admin Section */}
          <div className="space-y-8">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-900">03 / Admin Modules</span>
              <h2 className="text-2xl font-display font-bold mt-1 text-slate-800">Administrative Governance</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 bg-card border border-border rounded-xl space-y-3">
                <ShieldAlert className="h-6 w-6 text-slate-800" />
                <h3 className="font-semibold text-sm">Security Audit Trail</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Track portal events (view logs, modifications, logins) with client IP mapping to satisfy compliance mandates.
                </p>
              </div>

              <div className="p-6 bg-card border border-border rounded-xl space-y-3">
                <Users className="h-6 w-6 text-primary" />
                <h3 className="font-semibold text-sm">User Role Control</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Manage patient signups, staff credentials, and doctors specialty details in one central database view.
                </p>
              </div>

              <div className="p-6 bg-card border border-border rounded-xl space-y-3">
                <FolderLock className="h-6 w-6 text-accent" />
                <h3 className="font-semibold text-sm">Analytics Suite</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Aggregate clinical telemetry, tracking appointment fill rates and platform signup curves.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
