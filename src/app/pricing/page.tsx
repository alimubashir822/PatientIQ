"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <section className="py-12 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Flexible, Compliant Pricing
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Patients always access their portals for free. Healthcare providers pay transparent, scalable rates.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Patient Card */}
          <div className="p-8 bg-white border border-border rounded-2xl flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">For Patients</span>
                <h3 className="text-xl font-bold font-display mt-2">Personal Portal</h3>
                <p className="text-xs text-muted-foreground mt-2">Access and manage your personal medical records and test reports.</p>
              </div>
              <div className="flex items-baseline">
                <span className="text-3xl font-black font-display">$0</span>
                <span className="text-xs text-muted-foreground ml-2">/ forever</span>
              </div>
              <ul className="space-y-3 text-xs text-muted-foreground">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary shrink-0" /> Full medical records tracking</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary shrink-0" /> Secure file upload & download</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary shrink-0" /> Lab result trends & charts</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary shrink-0" /> 10 free AI Chat prompts / day</li>
              </ul>
            </div>
            <Link
              href="/register"
              className="mt-8 inline-flex h-10 items-center justify-center rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-all cursor-pointer"
            >
              Sign Up Free
            </Link>
          </div>

          {/* Clinician Card */}
          <div className="p-8 bg-white border-2 border-primary rounded-2xl flex flex-col justify-between shadow-md relative md:scale-102">
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-primary text-primary-foreground text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
              Popular
            </div>
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">For Doctors</span>
                <h3 className="text-xl font-bold font-display mt-2">Professional Desk</h3>
                <p className="text-xs text-muted-foreground mt-2">Manage appointments and check history for your private clinical practice.</p>
              </div>
              <div className="flex items-baseline">
                <span className="text-3xl font-black font-display">$79</span>
                <span className="text-xs text-muted-foreground ml-2">/ practitioner / mo</span>
              </div>
              <ul className="space-y-3 text-xs text-muted-foreground">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary shrink-0" /> Access complete patient histories</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary shrink-0" /> Manage appointments & notes</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary shrink-0" /> Secure practitioner messaging</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary shrink-0" /> Standard BAA contract included</li>
              </ul>
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-flex h-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold text-xs hover:opacity-90 shadow-glow transition-all cursor-pointer"
            >
              Start 14-Day Trial
            </Link>
          </div>

          {/* Clinic Card */}
          <div className="p-8 bg-white border border-border rounded-2xl flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">For Facilities</span>
                <h3 className="text-xl font-bold font-display mt-2">Enterprise Clinic</h3>
                <p className="text-xs text-muted-foreground mt-2">Multi-practitioner clinics, imaging hubs, and hospital networks.</p>
              </div>
              <div className="flex items-baseline">
                <span className="text-3xl font-black font-display">Custom</span>
                <span className="text-xs text-muted-foreground ml-2">/ volume tier</span>
              </div>
              <ul className="space-y-3 text-xs text-muted-foreground">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary shrink-0" /> Enterprise EHR integrations</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary shrink-0" /> Custom branding & subdomain</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary shrink-0" /> Custom BAA and security audits</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary shrink-0" /> Dedicated compliance representative</li>
              </ul>
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-flex h-10 items-center justify-center rounded-lg border border-border bg-card text-foreground font-semibold text-xs hover:bg-muted transition-all cursor-pointer"
            >
              Contact Sales
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
