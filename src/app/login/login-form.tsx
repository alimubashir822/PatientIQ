"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HeartPulse, Loader2, AlertCircle, CheckCircle } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get("registered") === "true";

  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const demoAccounts = [
    { label: "Jane Doe (Patient)", email: "patient@patientiq.com", role: "PATIENT" },
    { label: "Dr. Jenkins (Doctor)", email: "doctor@patientiq.com", role: "DOCTOR" },
    { label: "System Admin", email: "admin@patientiq.com", role: "ADMIN" }
  ];

  const handleDemoFill = (email: string) => {
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    if (emailInput && passwordInput) {
      emailInput.value = email;
      passwordInput.value = "password123";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        setError("Invalid email address or password.");
        setPending(false);
      } else {
        router.refresh();
        router.push("/patient/dashboard");
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
      setPending(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <Card className="shadow-premium">
        <CardHeader className="space-y-4 text-center">
          <Link href="/" className="inline-flex items-center gap-2 justify-center select-none group">
            <HeartPulse className="h-6 w-6 text-primary group-hover:scale-105 transition-transform" />
            <span className="font-display font-extrabold text-xl tracking-tight text-primary">PatientIQ</span>
          </Link>
          <div>
            <CardTitle className="text-xl">Sign in to your Portal</CardTitle>
            <CardDescription className="text-xs">
              Enter your credentials or use a demo account below.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isRegistered && (
            <div className="flex items-center gap-2 p-3 bg-emerald-500/10 text-emerald-600 rounded-lg text-xs font-semibold">
              <CheckCircle className="h-4 w-4 shrink-0" />
              Account created successfully. You can now sign in.
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 text-destructive rounded-lg text-xs font-semibold">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
              <Input required id="email" name="email" type="email" placeholder="john.doe@example.com" />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Password</label>
                <a href="#" className="text-[10px] text-primary hover:underline">Forgot password?</a>
              </div>
              <Input required id="password" name="password" type="password" placeholder="••••••••" />
            </div>

            <Button disabled={pending} type="submit" className="w-full font-semibold cursor-pointer">
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline font-semibold">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>

      <Card className="border-dashed border-primary/40 bg-sky-50/20 shadow-none">
        <CardContent className="p-4 space-y-3">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary text-center">Demo Quick Select</h4>
          <div className="grid grid-cols-1 gap-2">
            {demoAccounts.map((acc) => (
              <button
                key={acc.email}
                onClick={() => handleDemoFill(acc.email)}
                className="flex items-center justify-between text-xs p-2 rounded-lg bg-card border border-border hover:bg-sky-50 hover:border-primary/30 transition-all text-left cursor-pointer"
              >
                <span className="font-medium">{acc.label}</span>
                <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-semibold">
                  {acc.role}
                </span>
              </button>
            ))}
          </div>
          <p className="text-[9px] text-muted-foreground text-center">Password for all demo accounts is <span className="font-semibold text-slate-700">password123</span></p>
        </CardContent>
      </Card>
    </div>
  );
}
