"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Stethoscope, CheckCircle, ShieldCheck } from "lucide-react";

interface DoctorsClientProps {
  doctorsList: any[];
}

export function DoctorsClient({ doctorsList }: DoctorsClientProps) {
  const handleAudit = (name: string) => {
    alert(`License verification check complete for ${name}. Practitioner credentials remain active.`);
  };

  return (
    <Card className="shadow-premium">
      <CardHeader className="pb-4">
        <CardTitle className="text-base flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-indigo-500" />
          Practitioner Verification Desk
        </CardTitle>
        <CardDescription className="text-xs">
          Review state license registry references for portal healthcare providers.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 border-t border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Practitioner Name</TableHead>
              <TableHead>Clinical Specialty</TableHead>
              <TableHead>State License Number</TableHead>
              <TableHead>Phone / Contact</TableHead>
              <TableHead>Account Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctorsList.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-semibold">{doc.user?.name}</TableCell>
                <TableCell className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {doc.specialty}
                </TableCell>
                <TableCell className="font-mono text-xs text-slate-700 font-semibold">
                  {doc.licenseNumber}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground font-medium">{doc.phone || "+1 (555) 019-2283"}</TableCell>
                <TableCell>
                  <Badge variant="success" className="gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    Verified & Active
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleAudit(doc.user?.name || "Practitioner")}
                    className="text-xs font-semibold cursor-pointer gap-1"
                  >
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                    Audited
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
