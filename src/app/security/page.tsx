"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { 
  ShieldCheck, 
  Eye, 
  Lock, 
  History, 
  Server, 
  FileCheck 
} from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <section className="py-12 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-3">
            <ShieldCheck className="h-9 w-9 text-primary" />
            Security, Compliance & HIPAA
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            PatientIQ is engineered with advanced security controls to keep patient health information protected.
          </p>
        </div>
      </section>

      {/* Standards Grid */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border border-border bg-white rounded-xl space-y-4 shadow-sm hover:shadow-premium transition-all">
              <div className="flex items-center gap-3 text-slate-900 font-semibold text-base font-display">
                <div className="p-2 bg-sky-100 rounded-lg text-primary">
                  <Lock className="h-5 w-5" />
                </div>
                Encryption at Rest & In Transit
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All Protected Health Information (PHI) is encrypted using industry-standard AES-256 at rest. Transport Layer Security (TLS 1.3) protects files and messages in transit.
              </p>
            </div>

            <div className="p-6 border border-border bg-white rounded-xl space-y-4 shadow-sm hover:shadow-premium transition-all">
              <div className="flex items-center gap-3 text-slate-900 font-semibold text-base font-display">
                <div className="p-2 bg-teal-100 rounded-lg text-accent">
                  <History className="h-5 w-5" />
                </div>
                Continuous Audit Trail Logging
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every clinical record request, profile update, or authentication event triggers an audit log. Logs track user ID, action timestamp, and client IP mappings to verify access compliance.
              </p>
            </div>

            <div className="p-6 border border-border bg-white rounded-xl space-y-4 shadow-sm hover:shadow-premium transition-all">
              <div className="flex items-center gap-3 text-slate-900 font-semibold text-base font-display">
                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                  <Eye className="h-5 w-5" />
                </div>
                Role-Based Access Control (RBAC)
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Strict software boundaries prevent cross-role traversal. Patients cannot access clinician note consoles, and clinics can only query authorized patient charts.
              </p>
            </div>

            <div className="p-6 border border-border bg-white rounded-xl space-y-4 shadow-sm hover:shadow-premium transition-all">
              <div className="flex items-center gap-3 text-slate-900 font-semibold text-base font-display">
                <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                  <FileCheck className="h-5 w-5" />
                </div>
                Business Associate Agreements (BAA)
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                PatientIQ enters into Business Associate Agreements (BAA) with medical providers and hosting companies to satisfy federal HIPAA liability directives.
              </p>
            </div>
          </div>

          {/* Infrastructure Banners */}
          <div className="bg-card border border-border p-6 rounded-xl space-y-4 shadow-premium">
            <div className="flex items-center gap-3 text-slate-800 font-bold font-display">
              <Server className="h-5 w-5 text-primary" />
              Infrastructure Hardening
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Our servers run inside isolated Virtual Private Clouds (VPC) with strict firewall boundaries. Automatic daily database backups are stored in geo-redundant storage with retention policies to prevent diagnostic record loss.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
