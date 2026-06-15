"use client";

import * as React from "react";
import { changeAppointmentStatusAction } from "@/app/actions/appointments";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Check, X, ClipboardCheck } from "lucide-react";
import { formatDate, formatTime } from "@/lib/utils";

interface DoctorDashboardClientProps {
  initialAppointments: any[];
}

export function DoctorDashboardClient({ initialAppointments }: DoctorDashboardClientProps) {
  const [appointments, setAppointments] = React.useState(initialAppointments);

  React.useEffect(() => {
    setAppointments(initialAppointments);
  }, [initialAppointments]);

  const handleStatusChange = async (id: string, status: "CONFIRMED" | "CANCELLED" | "COMPLETED") => {
    try {
      await changeAppointmentStatusAction(id, status);
      alert(`Appointment status updated to ${status}.`);
    } catch (err: any) {
      alert(err.message || "Failed to update appointment status.");
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "CONFIRMED") return <Badge variant="success">Confirmed</Badge>;
    if (status === "PENDING") return <Badge variant="warning">Pending</Badge>;
    if (status === "COMPLETED") return <Badge variant="outline">Completed</Badge>;
    return <Badge variant="destructive">Cancelled</Badge>;
  };

  // Filter today's/upcoming active appointments
  const activeAppointments = appointments.filter(
    app => app.status === "PENDING" || app.status === "CONFIRMED"
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Active Consultations Agenda</CardTitle>
        <CardDescription className="text-xs">
          Manage booking confirmations and patient checkout summaries.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 border-t border-border">
        {activeAppointments.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeAppointments.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-semibold">
                    {app.patient?.user?.name || "Patient"}
                  </TableCell>
                  <TableCell>
                    <div className="text-xs">
                      <p className="font-semibold text-slate-800">{formatDate(app.dateTime)}</p>
                      <p className="text-muted-foreground">{formatTime(app.dateTime)}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-slate-650 font-medium">
                    {app.reason}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(app.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex gap-2">
                      {app.status === "PENDING" && (
                        <Button
                          onClick={() => handleStatusChange(app.id, "CONFIRMED")}
                          size="sm"
                          className="bg-emerald-500 hover:bg-emerald-600 text-white gap-1 font-semibold text-xs h-8 cursor-pointer"
                        >
                          <Check className="h-3.5 w-3.5" />
                          Confirm
                        </Button>
                      )}
                      {app.status === "CONFIRMED" && (
                        <Button
                          onClick={() => handleStatusChange(app.id, "COMPLETED")}
                          size="sm"
                          className="bg-primary hover:opacity-90 text-white gap-1 font-semibold text-xs h-8 cursor-pointer"
                        >
                          <ClipboardCheck className="h-3.5 w-3.5" />
                          Complete
                        </Button>
                      )}
                      <Button
                        onClick={() => handleStatusChange(app.id, "CANCELLED")}
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-red-500/10 h-8 font-semibold text-xs cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                        Cancel
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-16 text-xs text-muted-foreground">
            No active or pending consultations listed.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
