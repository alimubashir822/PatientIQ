"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  QrCode, 
  Activity, 
  HeartPulse, 
  Calendar, 
  Info,
  Layers,
  ArrowRightLeft,
  Lock,
  Plus
} from "lucide-react";

export default function PatientWalletPage() {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const immunizations = [
    { name: "Influenza Vaccine", date: "2025-10-15", clinic: "Springfield General Pharmacy", status: "Active", boosterDue: "October 2026" },
    { name: "COVID-19 Booster (mRNA)", date: "2025-04-10", clinic: "Mercy General Hospital", status: "Active", boosterDue: "April 2026 (Past Due)" },
    { name: "Tdap (Tetanus, Diphtheria, Pertussis)", date: "2021-08-20", clinic: "Mercy General Clinic", status: "Active", boosterDue: "August 2031" }
  ];

  const prescriptions = [
    { name: "Lisinopril 10mg", dosage: "1 tablet daily by mouth", refills: "3 remaining", rxNumber: "RX-9928131", doctor: "Dr. Sarah Jenkins" },
    { name: "Atorvastatin 20mg", dosage: "1 tablet daily at bedtime", refills: "6 remaining", rxNumber: "RX-4481920", doctor: "Dr. Sarah Jenkins" }
  ];

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900">Digital Medical Wallet</h2>
          <p className="text-xs text-muted-foreground mt-1">
            HIPAA-secure wallet for credentials, insurance memberships, prescriptions, and immunizations.
          </p>
        </div>
        <Badge variant="outline" className="font-bold text-[9px] uppercase tracking-wider bg-emerald-50 text-emerald-800 border-emerald-200">
          <Lock className="h-3 w-3 mr-1 text-emerald-500 inline" />
          HIPAA Locker
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left: Insurance Card (Interactive Flip) */}
        <div className="lg:col-span-1 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Active Health Card</span>
          
          <div className="perspective-1000 w-full min-h-[220px]">
            <div className={`relative w-full h-[220px] transition-transform duration-500 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}>
              
              {/* Front Side */}
              <div className="absolute inset-0 w-full h-full rounded-2xl bg-linear-to-br from-teal-500 via-sky-600 to-indigo-700 p-5 text-white flex flex-col justify-between shadow-xl backface-hidden border border-white/10">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-6 w-6 text-emerald-300" />
                    <div>
                      <span className="font-display font-black tracking-tight text-sm block">PatientIQ Insurance</span>
                      <span className="text-[9px] uppercase tracking-wider opacity-80 block font-semibold">Premium Health Network</span>
                    </div>
                  </div>
                  <Badge variant="success" className="bg-emerald-500 text-white border-0 text-[8px] font-extrabold px-2 py-0.5">ACTIVE</Badge>
                </div>
                
                <div className="space-y-3 mt-4">
                  <div className="text-sm font-mono tracking-widest font-semibold">
                    POLICY ID: IQ-982-192-348
                  </div>
                  <div className="flex justify-between text-[10px] opacity-90 font-medium">
                    <div>
                      <span className="block text-[8px] uppercase tracking-wider opacity-60">Member Name</span>
                      <span className="font-bold text-slate-50">Jane Doe</span>
                    </div>
                    <div>
                      <span className="block text-[8px] uppercase tracking-wider opacity-60">Group Number</span>
                      <span className="font-bold text-slate-50">GRP-4491-X</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-white/20 pt-3 text-[9px] opacity-80 font-bold">
                  <span>Network: ABC Choice Plus</span>
                  <span>Copay: $15 / $30 Spec</span>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 w-full h-full rounded-2xl bg-slate-800 p-5 text-white flex flex-col justify-between shadow-xl backface-hidden rotate-y-180 border border-slate-700">
                <div className="space-y-3">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-widest">Provider Relations Contact</span>
                  <div className="space-y-1 text-[10px] text-slate-300 font-medium">
                    <p>Customer Support: +1 (800) 555-0199</p>
                    <p>Pre-auth Hotline: +1 (800) 555-0188</p>
                    <p>Claims Submission: P.O. Box 9821, Chicago, IL</p>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-3 flex justify-between items-center text-[9px] text-slate-400 font-bold mt-2">
                  <div>
                    <span className="block text-[7px] uppercase tracking-wider opacity-60">PBM Pharmacy BIN</span>
                    <span className="text-slate-200">004336</span>
                  </div>
                  <div>
                    <span className="block text-[7px] uppercase tracking-wider opacity-60">PCN</span>
                    <span className="text-slate-200">ADV</span>
                  </div>
                  <div>
                    <span className="block text-[7px] uppercase tracking-wider opacity-60">Rx Group</span>
                    <span className="text-slate-200">RX-IQ01</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs font-semibold gap-1.5 cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <ArrowRightLeft className="h-3.5 w-3.5" />
            Flip to {isFlipped ? "Front Details" : "Back Support Info"}
          </Button>

          {/* Emergency Card details */}
          <Card className="bg-linear-to-br from-red-500/5 to-transparent border-red-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-red-700 flex items-center gap-1.5 uppercase tracking-wider">
                <QrCode className="h-4.5 w-4.5" />
                Emergency Medical ID
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-4 items-center">
                {/* Simulated QR Code image */}
                <div className="h-16 w-16 bg-white border border-slate-200 p-1 rounded-lg flex items-center justify-center shrink-0">
                  <div className="h-14 w-14 bg-slate-900 rounded-sm flex items-center justify-center text-white text-[8px] font-mono leading-none break-all select-none">
                    QR CODE MOCK
                  </div>
                </div>
                <div className="text-[10px] text-slate-600 font-medium space-y-1">
                  <p className="font-bold text-red-600">⚠️ CRITICAL: Penicillin Allergy</p>
                  <p>&bull; Blood Type: A+</p>
                  <p>&bull; Primary Contact: John Doe (Spouse)</p>
                  <p>&bull; Phone: +1 (555) 019-2835</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Rx Vault and Immunization records */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Immunization Registry Card */}
          <Card>
            <CardHeader className="pb-3 border-b border-border">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Immunization Verification Registry
                  </CardTitle>
                  <CardDescription className="text-xs">Secure registry logs verifying administered vaccines.</CardDescription>
                </div>
                <Button size="sm" variant="outline" className="text-xs font-semibold gap-1.5 cursor-pointer" onClick={() => alert("Simulating upload of vaccine receipt.")}>
                  <Plus className="h-3.5 w-3.5" /> Log Shot
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {immunizations.map((imm, idx) => (
                  <div key={idx} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-xs">
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-800 text-sm">{imm.name}</h4>
                      <p className="text-slate-500 font-medium">{imm.clinic} &bull; Administered: {imm.date}</p>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between shrink-0 gap-2 font-medium text-[10px] text-slate-400">
                      <Badge variant="success" className="text-[9px] font-bold">VERIFIED</Badge>
                      <span>Booster: {imm.boosterDue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rx Prescriptions Locker */}
          <Card>
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-base flex items-center gap-2">
                <HeartPulse className="h-5 w-5 text-red-500" />
                Active Rx Pharmacy Prescriptions
              </CardTitle>
              <CardDescription className="text-xs">Verified drug sheets active for local pharmacist pickup.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {prescriptions.map((rx, idx) => (
                  <div key={idx} className="p-4 flex flex-col sm:flex-row justify-between sm:items-start gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-800 text-sm">{rx.name}</h4>
                        <Badge variant="outline" className="text-[9px] font-bold px-1.5 py-0">Rx ACTIVE</Badge>
                      </div>
                      <p className="text-slate-600 font-medium">Directions: {rx.dosage}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">Rx Number: {rx.rxNumber} &bull; Provider: {rx.doctor}</p>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between shrink-0 gap-2 text-[10.5px]">
                      <span className="font-bold text-emerald-600">{rx.refills}</span>
                      <Button variant="outline" size="sm" className="text-[10px] font-semibold py-1 px-2.5 cursor-pointer h-7" onClick={() => alert("Refill request sent to clinician.")}>
                        Refill Rx
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}
