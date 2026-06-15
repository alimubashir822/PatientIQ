"use client";

import * as React from "react";
import { updatePatientProfileAction } from "@/app/actions/profile";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";

interface ProfileFormClientProps {
  patient: any;
  formattedDob: string;
}

export function ProfileFormClient({ patient, formattedDob }: ProfileFormClientProps) {
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await updatePatientProfileAction(null, formData);

    setPending(false);
    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      // Automatically clear success banner after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 text-destructive rounded-lg text-xs font-semibold">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-3 bg-emerald-500/10 text-emerald-600 rounded-lg text-xs font-semibold">
          <CheckCircle className="h-4 w-4 shrink-0" />
          Profile updated successfully!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Personal Details */}
        <Card className="shadow-premium">
          <CardHeader>
            <CardTitle className="text-base">Personal Information</CardTitle>
            <CardDescription className="text-xs">Clinical demographic records.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Phone Number</label>
              <Input name="phone" type="tel" defaultValue={patient.phone || ""} placeholder="+1 (555) 012-3456" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Date of Birth</label>
                <Input name="dateOfBirth" type="date" defaultValue={formattedDob} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Gender</label>
                <Select name="gender" defaultValue={patient.gender || "Male"}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Blood Type</label>
                <Select name="bloodType" defaultValue={patient.bloodType || "O+"}>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Home Address</label>
              <textarea
                name="address"
                rows={3}
                defaultValue={patient.address || ""}
                placeholder="Street Address, City, State, ZIP"
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
              />
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="shadow-premium flex flex-col justify-between">
          <div>
            <CardHeader>
              <CardTitle className="text-base">Emergency Contact</CardTitle>
              <CardDescription className="text-xs">Primary contact details in case of critical medical situations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Contact Full Name</label>
                <Input name="emergencyContactName" type="text" defaultValue={patient.emergencyContactName || ""} placeholder="John Doe" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Phone Number</label>
                <Input name="emergencyContactPhone" type="tel" defaultValue={patient.emergencyContactPhone || ""} placeholder="+1 (555) 012-3456" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Relation to Patient</label>
                <Select name="emergencyContactRelation" defaultValue={patient.emergencyContactRelation || "Spouse"}>
                  <option value="Spouse">Spouse</option>
                  <option value="Parent">Parent</option>
                  <option value="Child">Child</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Guardian">Guardian</option>
                  <option value="Other">Other</option>
                </Select>
              </div>
            </CardContent>
          </div>
          <div className="p-6 pt-0 border-t border-border mt-6 flex justify-end">
            <Button disabled={pending} type="submit" className="w-full md:w-auto font-semibold mt-4 cursor-pointer">
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Profile Updates"
              )}
            </Button>
          </div>
        </Card>
      </div>
    </form>
  );
}
