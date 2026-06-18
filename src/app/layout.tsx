import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "PatientIQ | Secure AI-Powered Patient Portal & Healthcare Platform",
  description: "A secure medical SaaS portal for patients and healthcare providers. Book appointments, manage records, analyze lab reports, and consult our AI Health Assistant.",
  metadataBase: new URL("http://localhost:3000"),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "PatientIQ - AI-Powered Patient Portal Platform",
    description: "Manage clinical appointments, access secure medical records, view lab results, upload documentation, and consult the AI Health Assistant.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
