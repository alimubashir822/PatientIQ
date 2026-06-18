"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { HeartPulse, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  // Close menu when pathname changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "Security & HIPAA", href: "/security" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  const getDashboardLink = () => {
    if (!session?.user) return "/login";
    const role = (session.user as any).role;
    if (role === "ADMIN") return "/admin/dashboard";
    if (role === "DOCTOR") return "/doctor/dashboard";
    return "/patient/dashboard";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 select-none group">
          <HeartPulse className="h-6 w-6 text-primary group-hover:scale-105 transition-transform" />
          <span className="font-display font-extrabold text-xl tracking-tight text-primary">PatientIQ</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary font-semibold" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <Link
              href={getDashboardLink()}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-all active:scale-98"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-xs font-semibold text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-md hover:bg-muted transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-all active:scale-98"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground focus:outline-none transition-all cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-50 bg-background/95 backdrop-blur-md flex flex-col p-6 border-b border-border animate-slide-up md:hidden overflow-y-auto">
          <nav className="flex flex-col gap-4 py-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-base font-semibold py-2 transition-colors border-b border-border/40 hover:text-primary",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col gap-3 pt-6 border-t border-border mt-auto">
            {session ? (
              <Link
                href={getDashboardLink()}
                className="flex h-11 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm hover:opacity-90 transition-all"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex h-11 items-center justify-center rounded-xl border border-border text-sm font-bold text-foreground hover:bg-muted transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="flex h-11 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm hover:opacity-90 transition-all"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
