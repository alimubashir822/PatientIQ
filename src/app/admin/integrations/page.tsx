"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Share2, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  Key, 
  Globe, 
  Send,
  Lock,
  Loader2
} from "lucide-react";

interface Connector {
  id: string;
  name: string;
  category: string;
  endpoint: string;
  maskedKey: string;
  status: "CONNECTED" | "WARNING" | "DISCONNECTED";
  scope: string;
}

export default function AdminIntegrationsPage() {
  const [connectors, setConnectors] = React.useState<Connector[]>([
    { id: "stripe", name: "Stripe Billing Engine", category: "Payments & Invoices", endpoint: "https://api.stripe.com/v3", maskedKey: "sk_live_••••••••••••••••3a9d", status: "CONNECTED", scope: "charges.write, customers.read" },
    { id: "twilio", name: "Twilio SMS Gateway", category: "Reminders & Alerts", endpoint: "https://api.twilio.com/2010-04-01", maskedKey: "AC_live_••••••••••••••••92b1", status: "CONNECTED", scope: "sms.send, messages.read" },
    { id: "google", name: "Google Calendar API", category: "Agendas & Agenda Sync", endpoint: "https://www.googleapis.com/calendar/v3", maskedKey: "oauth_client_••••••••••••e81b", status: "CONNECTED", scope: "calendar.events.write, calendar.read" },
    { id: "epic", name: "EPIC Systems EHR Integration", category: "FHIR Clinical Charts", endpoint: "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4", maskedKey: "client_id_••••••••••••••••f84a", status: "WARNING", scope: "patient.read, observation.read, encounter.write" }
  ]);

  const [checkingId, setCheckingId] = React.useState<string | null>(null);

  const testConnection = (id: string) => {
    setCheckingId(id);
    
    // Simulate API test ping
    setTimeout(() => {
      setCheckingId(null);
      setConnectors(prev => prev.map(conn => {
        if (conn.id === id) {
          // Resolve warnings to connected status on test!
          return { ...conn, status: "CONNECTED" };
        }
        return conn;
      }));
      alert(`API Endpoint handshake complete. HTTP 200 OK Connection Verified for: ${id.toUpperCase()}`);
    }, 1500);
  };

  const toggleStatus = (id: string) => {
    setConnectors(prev => prev.map(conn => {
      if (conn.id === id) {
        const nextStatus = conn.status === "DISCONNECTED" ? "CONNECTED" : "DISCONNECTED";
        return { ...conn, status: nextStatus };
      }
      return conn;
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900">Connectors Portal</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Monitor API connectors, mask credential keys, and verify webhooks for third-party hospital sync systems.
          </p>
        </div>
        <Badge variant="outline" className="font-bold text-[9px] uppercase tracking-wider bg-emerald-50 text-emerald-800 border-emerald-200">
          <Lock className="h-3 w-3 mr-1 text-emerald-500 inline" />
          HIPAA Encryption TLS
        </Badge>
      </div>

      {/* Main Connectors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {connectors.map((conn) => (
          <Card key={conn.id} className={cn("border transition-all shadow-xs", conn.status === "CONNECTED" ? "border-emerald-100" : conn.status === "WARNING" ? "border-amber-100 bg-amber-50/5" : "border-border opacity-70 bg-slate-50/20")}>
            <CardHeader className="pb-3 flex flex-row justify-between items-start gap-4 border-b border-border/60">
              <div className="space-y-1">
                <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider block">{conn.category}</span>
                <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Share2 className="h-4.5 w-4.5 text-primary shrink-0" />
                  {conn.name}
                </CardTitle>
              </div>
              <div className="shrink-0">
                {conn.status === "CONNECTED" && <Badge variant="success" className="text-[9px] font-bold">CONNECTED</Badge>}
                {conn.status === "WARNING" && <Badge variant="warning" className="text-[9px] font-bold animate-pulse">WARNING</Badge>}
                {conn.status === "DISCONNECTED" && <Badge variant="destructive" className="text-[9px] font-bold">DISCONNECTED</Badge>}
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4 text-xs font-medium">
              
              {/* Endpoint details */}
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">API Target Endpoint</span>
                  <div className="p-2 bg-slate-50 border border-slate-200/60 rounded-lg text-[10px] text-slate-600 font-mono flex items-center gap-2 truncate">
                    <Globe className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    {conn.endpoint}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Credential Key (Masked)</span>
                  <div className="relative">
                    <Input 
                      disabled
                      type="text" 
                      value={conn.maskedKey} 
                      className="text-[10px] font-mono pr-9 h-8 bg-slate-50/20 border-slate-200" 
                    />
                    <Key className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">OAuth Scope Restrictions</span>
                  <p className="text-[10px] text-slate-500 italic font-semibold">{conn.scope}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 border-t border-border/50 pt-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-[10px] font-semibold py-1 border-slate-200 cursor-pointer h-7 flex-1"
                  onClick={() => testConnection(conn.id)}
                  disabled={checkingId !== null || conn.status === "DISCONNECTED"}
                >
                  {checkingId === conn.id ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin mr-1" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-3 w-3 mr-1 text-slate-500" />
                      Test Connection
                    </>
                  )}
                </Button>

                <Button
                  size="sm"
                  variant={conn.status === "DISCONNECTED" ? "default" : "ghost"}
                  className={cn("text-[10px] font-semibold py-1 cursor-pointer h-7 flex-1 border-slate-200", conn.status !== "DISCONNECTED" ? "text-destructive hover:bg-red-500/10" : "")}
                  onClick={() => toggleStatus(conn.id)}
                  disabled={checkingId !== null}
                >
                  {conn.status === "DISCONNECTED" ? "Enable Link" : "Disconnect Link"}
                </Button>
              </div>

            </CardContent>
          </Card>
        ))}

      </div>

    </div>
  );
}
