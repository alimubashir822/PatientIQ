"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HeartPulse, Loader2, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = React.useState("PATIENT");
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await registerUser(null, formData);

    if (result?.error) {
      setError(result.error);
      setPending(false);
    } else {
      router.push("/login?registered=true");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md shadow-premium">
        <CardHeader className="space-y-4 text-center">
          <Link href="/" className="inline-flex items-center gap-2 justify-center select-none group">
            <HeartPulse className="h-6 w-6 text-primary group-hover:scale-105 transition-transform" />
            <span className="font-display font-extrabold text-xl tracking-tight text-primary">PatientIQ</span>
          </Link>
          <div>
            <CardTitle className="text-xl">Create your Account</CardTitle>
            <CardDescription className="text-xs">
              Enter your credentials to access the secure health portal.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 text-destructive rounded-lg text-xs font-semibold">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">I am registering as a</label>
              <Select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="PATIENT">Patient</option>
                <option value="DOCTOR">Healthcare Doctor</option>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
              <Input required name="name" type="text" placeholder="John Doe" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
              <Input required name="email" type="email" placeholder="john.doe@example.com" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Password</label>
              <Input required name="password" type="password" placeholder="••••••••" />
            </div>

            {role === "DOCTOR" && (
              <div className="grid grid-cols-2 gap-4 animate-slide-up">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Specialty</label>
                  <Select name="specialty" defaultValue="General Medicine">
                    <option value="General Medicine">General Medicine</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Pediatrics">Pediatrics</option>
                  </Select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">License Number</label>
                  <Input required name="licenseNumber" type="text" placeholder="MD-12345" />
                </div>
              </div>
            )}

            <Button disabled={pending} type="submit" className="w-full font-semibold cursor-pointer">
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-semibold">
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
