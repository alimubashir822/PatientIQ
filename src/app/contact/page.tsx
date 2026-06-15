"use client";

import * as React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <section className="py-12 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Contact Sales & Support
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Have questions about integrations or HIPAA compliance? Get in touch with our team.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-xl font-bold font-display">Get in touch</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our team is available to assist clinics with setting up electronic health record syncs and signing Business Associate Agreements.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-sky-100 rounded-xl text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-bold block text-slate-800">Email</span>
                  <span className="text-xs text-muted-foreground">support@patientiq.com</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-teal-100 rounded-xl text-accent">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-bold block text-slate-800">Phone</span>
                  <span className="text-xs text-muted-foreground">+1 (800) 555-0199</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-100 rounded-xl text-slate-800">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-bold block text-slate-800">Headquarters</span>
                  <span className="text-xs text-muted-foreground">100 Health Tech Way, San Francisco, CA 94107</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white border border-border p-8 rounded-2xl shadow-sm">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto" />
                <h3 className="font-bold text-lg font-display">Inquiry Received</h3>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  Thank you for contacting PatientIQ. A client representative will get in touch with you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">First Name</label>
                    <Input required placeholder="Jane" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Last Name</label>
                    <Input required placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                  <Input required type="email" placeholder="jane.doe@clinic.com" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Organization</label>
                  <Input required placeholder="Springfield General Clinic" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your clinic volume or general questions..."
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                  />
                </div>
                <Button type="submit" className="w-full font-semibold cursor-pointer">
                  Submit Inquiry
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
