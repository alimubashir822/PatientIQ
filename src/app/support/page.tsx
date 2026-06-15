"use client";

import * as React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { 
  LifeBuoy, 
  Mail, 
  Phone, 
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SupportHelpdeskPage() {
  const [ticketSent, setTicketSent] = React.useState(false);

  const faqs = [
    { q: "Is PatientIQ HIPAA Compliant?", a: "Yes. PatientIQ secures all stored medical documentation, database files, and audit trails using active TLS 1.3 encryption, end-to-end user-restricted permissions, and audit tracking consoles." },
    { q: "How do I sync my clinic's Epic EHR profile?", a: "Go to Admin Dashboard > Connectors Portal, choose Epic FHIR Connector, paste your masked client client ID, and test connection handshake." },
    { q: "Can patients configure family accounts?", a: "Yes. From the Patient Dashboard's 'Household Sync' console, you can audit spouse and child appointments, immunization schedules, and clinic alerts." }
  ];

  const handleTicketSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTicketSent(true);
    setTimeout(() => {
      alert("Support ticket logged and dispatched to security desk successfully (Mock).");
    }, 100);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header Banner */}
      <section className="py-12 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Support Helpdesk
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Get help with medical portals, integration setups, clinic dashboard configurations, or billing checks.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 flex-1 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Form & Contacts (takes col-span-2) */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <LifeBuoy className="h-5 w-5 text-primary" />
              Open a Support Ticket
            </h2>

            {ticketSent ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3">
                <ShieldCheck className="h-8 w-8 text-emerald-600" />
                <h3 className="font-bold text-base text-emerald-800">Support Ticket Logged</h3>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Your ticket has been dispatched securely to our compliance support center. We typically reply within 2 hours.
                </p>
                <Button size="sm" variant="outline" className="border-emerald-300 font-semibold cursor-pointer" onClick={() => setTicketSent(false)}>
                  Log Another Ticket
                </Button>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="p-6 bg-white border border-border rounded-2xl space-y-4 shadow-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block">Your Name</label>
                    <Input required placeholder="Jane Doe" className="text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block">Email Address</label>
                    <Input required type="email" placeholder="jane@example.com" className="text-xs" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 block">Help Category</label>
                  <select className="w-full h-9 rounded-lg border border-slate-200 bg-background px-3 py-1 text-xs text-slate-800 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary">
                    <option>Patient Portal Support</option>
                    <option>Doctor SOAP Dictation Help</option>
                    <option>Admin FHIR/API Integrations</option>
                    <option>Stripe Billing & Copay Refunds</option>
                    <option>HIPAA Security Compliance Question</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 block">Detailed Description</label>
                  <textarea 
                    required 
                    placeholder="Provide details about the issue or question..." 
                    rows={4}
                    className="w-full rounded-lg border border-slate-200 bg-background p-3 text-xs text-slate-800 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary resize-y"
                  />
                </div>

                <Button type="submit" size="sm" className="font-semibold cursor-pointer">
                  Submit Support Ticket
                </Button>
              </form>
            )}

            {/* FAQs */}
            <div className="space-y-4 pt-4">
              <h3 className="font-bold text-sm uppercase text-slate-500 tracking-wider">Frequently Asked Questions</h3>
              <div className="divide-y divide-border border border-border bg-white rounded-2xl overflow-hidden shadow-xs">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 space-y-1">
                    <span className="text-xs font-bold text-slate-800 block flex items-center gap-1.5">
                      <ChevronRight className="h-3.5 w-3.5 text-primary shrink-0" />
                      {faq.q}
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-5">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Instant Contacts */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Direct Contact
            </h2>

            <div className="p-5 bg-white border border-border rounded-2xl space-y-4 shadow-xs text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-sky-50 rounded-lg flex items-center justify-center text-primary shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">General Inquiries</span>
                  <span className="text-slate-700">support@patientiq.com</span>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-border/50 pt-4">
                <div className="h-8 w-8 bg-sky-50 rounded-lg flex items-center justify-center text-primary shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">HIPAA Urgent Hotline</span>
                  <span className="text-slate-700">+1 (800) 555-0144</span>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-border/50 pt-4">
                <div className="h-8 w-8 bg-sky-50 rounded-lg flex items-center justify-center text-primary shrink-0">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Integration Desk Hours</span>
                  <span className="text-slate-700">Mon - Fri, 8 AM - 6 PM EST</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
