import Link from "next/link";
import { HeartPulse } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-6 w-6 text-primary" />
              <span className="font-display font-extrabold text-xl tracking-tight text-primary">PatientIQ</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Empowering healthcare facilities and patients with secure, modern, and AI-assisted clinical dashboards.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="/security" className="hover:text-primary transition-colors">HIPAA & Security</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href="/docs/api" className="hover:text-primary transition-colors">API Reference</Link></li>
              <li><Link href="/support" className="hover:text-primary transition-colors">Support Helpdesk</Link></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/baa" className="hover:text-primary transition-colors">Business Associate Agreement (BAA)</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} PatientIQ Inc. All rights reserved. HIPAA Compliant. &mdash;{" "}
            Healthcare system by{" "}
            <a
              href="http://www.medclinicx.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors underline underline-offset-2"
            >
              Med Clinic X
            </a>
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Status</a>
            <span>&bull;</span>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact Sales</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
