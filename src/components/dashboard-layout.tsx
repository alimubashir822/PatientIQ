"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  LogOut, 
  Menu, 
  X, 
  User, 
  ChevronDown, 
  HeartPulse, 
  Activity, 
  FileText, 
  FlaskConical, 
  Calendar, 
  MessageSquareCode, 
  UserCircle,
  LayoutDashboard,
  Users,
  Stethoscope,
  MessageSquare,
  Wallet,
  CreditCard,
  Cpu,
  Share2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  };
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const patientNavItems = [
    { label: "Dashboard Overview", href: "/patient/dashboard", icon: LayoutDashboard },
    { label: "Medical History", href: "/patient/medical-history", icon: Activity },
    { label: "Lab Results", href: "/patient/lab-results", icon: FlaskConical },
    { label: "Document Vault", href: "/patient/documents", icon: FileText },
    { label: "Appointments", href: "/patient/appointments", icon: Calendar },
    { label: "AI Health Assistant", href: "/patient/ai-chat", icon: MessageSquareCode },
    { label: "Secure Messaging", href: "/patient/messaging", icon: MessageSquare },
    { label: "Medical Wallet", href: "/patient/wallet", icon: Wallet },
    { label: "Billing & Claims", href: "/patient/billing", icon: CreditCard },
    { label: "Profile & Emergency", href: "/patient/profile", icon: UserCircle },
  ];

  const doctorNavItems = [
    { label: "Overview Dashboard", href: "/doctor/dashboard", icon: LayoutDashboard },
    { label: "Patient Master List", href: "/doctor/patients", icon: Users },
    { label: "Appointments Desk", href: "/doctor/appointments", icon: Calendar },
    { label: "Secure Messaging", href: "/doctor/messaging", icon: MessageSquare },
  ];

  const adminNavItems = [
    { label: "System Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "User Accounts", href: "/admin/users", icon: Users },
    { label: "Doctors Roster", href: "/admin/doctors", icon: Stethoscope },
    { label: "Automation Engine", href: "/admin/automation", icon: Cpu },
    { label: "Connectors Portal", href: "/admin/integrations", icon: Share2 },
  ];

  const navItems = user.role === "ADMIN"
    ? adminNavItems
    : user.role === "DOCTOR"
    ? doctorNavItems
    : patientNavItems;
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = React.useState(false);
  
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card">
        <div className="flex items-center h-16 px-6 border-b border-border gap-2">
          <HeartPulse className="h-6 w-6 text-primary" />
          <span className="font-display font-bold text-lg tracking-tight text-primary">PatientIQ</span>
          <span className="text-[10px] uppercase font-semibold tracking-widest px-1.5 py-0.5 rounded bg-sky-100 text-primary-dark">
            {user.role}
          </span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all-300 gap-3 group select-none",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5 shrink-0", isActive ? "" : "text-muted-foreground group-hover:text-foreground")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-border">
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-red-500/10 transition-colors gap-3 cursor-pointer"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Mobile Navigation Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40" onClick={() => setIsMobileOpen(false)} />
          <aside className="relative flex flex-col w-72 max-w-xs bg-card h-full z-50 animate-slide-right border-r border-border">
            <div className="flex items-center justify-between h-16 px-6 border-b border-border">
              <div className="flex items-center gap-2">
                <HeartPulse className="h-6 w-6 text-primary" />
                <span className="font-display font-bold text-lg tracking-tight text-primary">PatientIQ</span>
              </div>
              <button onClick={() => setIsMobileOpen(false)} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer min-h-9 min-w-9 flex items-center justify-center">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all gap-3 select-none",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            
            <div className="p-4 border-t border-border">
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-4 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-red-500/10 transition-colors gap-3 cursor-pointer"
              >
                <LogOut className="h-5 w-5 shrink-0" />
                Log Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex items-center justify-between h-16 px-6 border-b border-border bg-card">
          <div className="flex items-center gap-3 overflow-hidden">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-1.5 rounded-md md:hidden hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer min-h-9 min-w-9 flex items-center justify-center shrink-0"
              aria-label="Open Sidebar Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-base md:text-xl font-bold tracking-tight text-foreground truncate max-w-[180px] sm:max-w-none">
              {navItems.find(item => pathname === item.href || pathname.startsWith(item.href + "/"))?.label || "Portal"}
            </h1>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer select-none"
              >
                <Avatar className="h-9 w-9 border border-border shadow-xs">
                  <AvatarFallback className="bg-sky-100 text-primary font-bold">
                    {user.name ? user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-semibold leading-none">{user.name}</span>
                  <span className="text-[10px] text-muted-foreground">{user.email}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground hidden lg:block" />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md border border-border bg-card shadow-lg z-50 py-1 origin-top-right animate-fade-in">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <Link
                    href={user.role === "DOCTOR" ? "/doctor/dashboard" : user.role === "ADMIN" ? "/admin/dashboard" : "/patient/profile"}
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted gap-2"
                  >
                    <UserCircle className="h-4 w-4" />
                    My Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-4 py-2 text-sm text-destructive hover:bg-red-500/10 border-t border-border mt-1 gap-2 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-background">
          <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
