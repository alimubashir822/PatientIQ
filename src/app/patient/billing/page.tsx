"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  CreditCard, 
  CheckCircle, 
  Receipt, 
  Sparkles, 
  FileText, 
  AlertCircle,
  Loader2,
  Lock,
  ArrowUpRight
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Invoice {
  id: string;
  item: string;
  provider: string;
  date: string;
  amount: number;
  status: "PAID" | "UNPAID";
}

export default function PatientBillingPage() {
  const [invoices, setInvoices] = React.useState<Invoice[]>([
    { id: "inv-1", item: "Cardiology Review Consultation", provider: "Dr. Sarah Jenkins", date: "2026-06-15", amount: 75.00, status: "UNPAID" },
    { id: "inv-2", item: "Lipid Blood Panel Diagnostics", provider: "PatientIQ Lab Group", date: "2026-05-15", amount: 120.00, status: "PAID" },
    { id: "inv-3", item: "Emergency Penicillin Rash Checkup", provider: "Mercy Urgent Care", date: "2024-02-10", amount: 45.00, status: "PAID" }
  ]);

  const [selectedInvoice, setSelectedInvoice] = React.useState<Invoice | null>(null);
  const [isPayOpen, setIsPayOpen] = React.useState(false);
  const [payPending, setPayPending] = React.useState(false);
  const [paySuccess, setPaySuccess] = React.useState(false);
  
  // Card input states
  const [cardName, setCardName] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardExpiry, setCardExpiry] = React.useState("");
  const [cardCvc, setCardCvc] = React.useState("");

  const handlePayClick = (inv: Invoice) => {
    setSelectedInvoice(inv);
    setIsPayOpen(true);
  };

  const handleStripePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;

    setPayPending(true);

    // Simulate Stripe API checkout loop
    setTimeout(() => {
      setPayPending(false);
      setPaySuccess(true);
      
      // Update local invoice list status to PAID
      setInvoices(prev => prev.map(inv => inv.id === selectedInvoice.id ? { ...inv, status: "PAID" } : inv));

      setTimeout(() => {
        setIsPayOpen(false);
        setPaySuccess(false);
        setSelectedInvoice(null);
        setCardName("");
        setCardNumber("");
        setCardExpiry("");
        setCardCvc("");
      }, 1500);

    }, 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900">Billing & Claims</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Complete secure Stripe-powered checkout payments and view healthcare insurance copays.
          </p>
        </div>
        <Badge variant="outline" className="font-bold text-[9px] uppercase tracking-wider bg-emerald-50 text-emerald-800 border-emerald-200">
          <Lock className="h-3 w-3 mr-1 text-emerald-500 inline" />
          Stripe Secure
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left: Invoices Ledger (takes lg:col-span-2) */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-base flex items-center gap-2">
                <Receipt className="h-5 w-5 text-primary" />
                Statements & Consultation Invoices
              </CardTitle>
              <CardDescription className="text-xs">Outstanding and historical invoices for clinic services.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {invoices.map((inv) => (
                  <div key={inv.id} className="p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-muted/15 transition-all text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-800 text-sm">{inv.item}</h4>
                        <Badge 
                          variant={inv.status === "PAID" ? "success" : "warning"}
                          className="text-[9px] font-bold"
                        >
                          {inv.status}
                        </Badge>
                      </div>
                      <p className="text-slate-500 font-medium">{inv.provider} &bull; Date Issued: {formatDate(inv.date)}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">Invoice Number: {inv.id.toUpperCase()}</p>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between shrink-0 gap-3">
                      <span className="text-sm font-black text-slate-800 font-display">${inv.amount.toFixed(2)}</span>
                      {inv.status === "UNPAID" ? (
                        <Button 
                          size="sm" 
                          className="text-xs font-semibold cursor-pointer py-1 px-4"
                          onClick={() => handlePayClick(inv)}
                        >
                          Pay Invoice
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs font-semibold cursor-pointer py-1 px-3 gap-1 h-7 border-slate-200 text-slate-700"
                          onClick={() => alert("Simulating receipt download. PDF logs downloaded successfully.")}
                        >
                          <FileText className="h-3 w-3 text-slate-500" />
                          Receipt
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Subscription Tier & Claims Progress */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Active Subscription Tier */}
          <Card className="border-primary/20 bg-linear-to-br from-white to-sky-50/10 shadow-glow">
            <CardHeader className="pb-3">
              <span className="text-[10px] uppercase font-bold text-primary tracking-wider flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
                SaaS Subscription Plan
              </span>
              <CardTitle className="text-base mt-1 text-slate-800">Premium Care Sync</CardTitle>
              <CardDescription className="text-xs">
                Complete health tracking, AI alerts, and direct secure messaging.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-primary">$29.00</span>
                <span className="text-xs text-muted-foreground">/ month</span>
              </div>
              <div className="space-y-1 text-[11px] text-slate-600 font-medium">
                <p className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active Membership & Billing</p>
                <p className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Free telemedicine checkups</p>
                <p className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Unlimited AI Health insights</p>
              </div>
              <Button variant="outline" className="w-full text-xs font-semibold border-slate-200 text-slate-700 cursor-pointer h-9" onClick={() => alert("Subscription tier edit panel loaded (Mock).")}>
                Manage Subscription
              </Button>
            </CardContent>
          </Card>

          {/* Insurance Deductible Tracker */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                <CreditCard className="h-4 w-4 text-primary" />
                Insurance Deductibles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-600">Individual Deductible</span>
                  <span className="text-slate-800 font-bold">$780 / $1,500</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "52%" }} />
                </div>
              </div>
              
              <div className="space-y-1.5 border-t border-border/50 pt-2.5 mt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-600">Out of Pocket Maximum</span>
                  <span className="text-slate-800 font-bold">$1,240 / $5,000</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: "24%" }} />
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>

      {/* Stripe Payment Dialog */}
      <Dialog open={isPayOpen} onOpenChange={setIsPayOpen}>
        <DialogContent>
          {selectedInvoice && (
            <form onSubmit={handleStripePay} className="space-y-4">
              <DialogHeader>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                    <Lock className="h-2.5 w-2.5 text-emerald-500" />
                    Stripe Checkout Gateway
                  </span>
                  <Badge variant="outline" className="text-[10px] uppercase font-bold">UNPAID</Badge>
                </div>
                <DialogTitle className="text-base mt-1 text-slate-800">Checkout: {selectedInvoice.item}</DialogTitle>
                <DialogDescription className="text-xs">
                  Pay secure invoice amount: <span className="font-bold text-slate-800">${selectedInvoice.amount.toFixed(2)}</span>
                </DialogDescription>
              </DialogHeader>

              {paySuccess && (
                <div className="flex items-center gap-2 p-3 bg-emerald-500/10 text-emerald-600 rounded-lg text-xs font-semibold">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  Stripe Payment authorized. Receipt sent to insurance claims logs.
                </div>
              )}

              {!paySuccess && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Cardholder Name</label>
                    <Input 
                      required 
                      type="text" 
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="e.g. Jane Doe" 
                      className="text-xs bg-slate-50/50" 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Credit Card Number</label>
                    <div className="relative">
                      <Input 
                        required 
                        type="text" 
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 4242 4242 4242" 
                        maxLength={19}
                        className="pl-9 text-xs bg-slate-50/50" 
                      />
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Expiration Date</label>
                      <Input 
                        required 
                        type="text" 
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM / YY" 
                        maxLength={5}
                        className="text-xs bg-slate-50/50" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Security Code (CVC)</label>
                      <Input 
                        required 
                        type="password" 
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="123" 
                        maxLength={3}
                        className="text-xs bg-slate-50/50" 
                      />
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button 
                  disabled={payPending || paySuccess} 
                  type="submit" 
                  className="w-full font-semibold cursor-pointer gap-1.5 h-10 text-xs"
                >
                  {payPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Connecting to Stripe API...
                    </>
                  ) : paySuccess ? (
                    "Payment Complete"
                  ) : (
                    <>
                      <Lock className="h-3.5 w-3.5" />
                      Authorize Billing Checkout
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
}
