"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { 
  HeartPulse, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  Calendar, 
  Activity, 
  ArrowRight,
  Database
} from "lucide-react";

export default function Homepage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-linear-to-b from-sky-50/50 via-white to-transparent">
        {/* Glow effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 relative">
          <div className="space-y-6 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-100 text-primary text-xs font-semibold select-none animate-pulse">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Patient Care
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black leading-tight tracking-tight text-slate-900">
              The Secure Health Portal <span className="text-primary">of the Future</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              PatientIQ bridges the gap between doctors and patients. Securely access clinical medical records, manage appointments, upload files, and converse with our AI Health Assistant — all in a HIPAA-compliant environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/register"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition-all active:scale-98 gap-2 group cursor-pointer"
              >
                Create Free Account
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/security"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-card px-6 font-semibold text-foreground hover:bg-muted transition-all active:scale-98 gap-2 cursor-pointer"
              >
                View Security Architecture
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
              </Link>
            </div>
          </div>

          {/* Premium Hero Graphic Mockup */}
          <div className="relative mx-auto lg:ml-auto w-full max-w-md lg:max-w-full">
            <div className="bg-white rounded-2xl border border-border p-6 shadow-premium relative overflow-hidden transition-all hover:shadow-glow duration-300">
              {/* Top Bar simulating dashboard UI */}
              <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                  <span className="text-xs text-muted-foreground ml-2">patientiq.com/patient/dashboard</span>
                </div>
              </div>

              {/* Simulation Widgets */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-sky-50/40 p-4 rounded-xl border border-sky-100/50">
                  <Activity className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Latest Health Summary</h4>
                    <p className="text-sm font-semibold text-slate-800">BP: 124/80 mmHg | Heart Rate: 72 bpm</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card border border-border p-4 rounded-xl">
                    <Calendar className="h-6 w-6 text-accent mb-2" />
                    <span className="text-xs text-muted-foreground block">Upcoming Checkup</span>
                    <span className="text-xs font-semibold text-slate-800">June 25th - Dr. Jenkins</span>
                  </div>
                  <div className="bg-card border border-border p-4 rounded-xl">
                    <FileText className="h-6 w-6 text-amber-500 mb-2" />
                    <span className="text-xs text-muted-foreground block">Recent Documents</span>
                    <span className="text-xs font-semibold text-slate-800">Discharge_Summary.pdf</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
                    <span className="text-[10px] uppercase font-bold text-primary tracking-wider">AI Health Assistant</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    &quot;Your Lisinopril medication is prescribed for blood pressure control. Make sure to take it at the same time each day.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="py-12 border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="block text-3xl font-display font-extrabold text-primary">99.9%</span>
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Uptime SLA</span>
          </div>
          <div>
            <span className="block text-3xl font-display font-extrabold text-primary">100%</span>
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">HIPAA Compliant</span>
          </div>
          <div>
            <span className="block text-3xl font-display font-extrabold text-primary">AES-256</span>
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">End-to-End Encryption</span>
          </div>
          <div>
            <span className="block text-3xl font-display font-extrabold text-primary">24/7</span>
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Audit Trail Logging</span>
          </div>
        </div>
      </section>

      {/* Core Features Overview */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Everything you need, in one secure hub</h2>
            <p className="text-sm text-muted-foreground">Clinical modules carefully crafted for compliance, portability, and maximum care efficiency.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-border bg-white rounded-2xl space-y-4 shadow-sm hover:shadow-premium transition-all duration-200">
              <div className="p-3 bg-sky-100 rounded-xl w-fit">
                <HeartPulse className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg">Patient Portability</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Access your conditions, medications, allergies, and visits dynamically. Update emergency contact lists and keep primary practitioners synced.
              </p>
            </div>

            <div className="p-6 border border-border bg-white rounded-2xl space-y-4 shadow-sm hover:shadow-premium transition-all duration-200">
              <div className="p-3 bg-teal-100 rounded-xl w-fit">
                <ShieldCheck className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-lg">HIPAA Grade Security</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Strict role restrictions block unauthorized access. Access logs monitor clinical record requests, with automatic compliance logs.
              </p>
            </div>

            <div className="p-6 border border-border bg-white rounded-2xl space-y-4 shadow-sm hover:shadow-premium transition-all duration-200">
              <div className="p-3 bg-indigo-100 rounded-xl w-fit">
                <Sparkles className="h-6 w-6 text-indigo-500" />
              </div>
              <h3 className="font-display font-semibold text-lg">AI Clinical Assistant</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Explain complex medical definitions, lab measurements, or prepare lists of consultation questions. Clear disclaimers prevent diagnostic advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
