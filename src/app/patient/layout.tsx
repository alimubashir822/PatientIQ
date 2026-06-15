import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DashboardLayout } from "@/components/dashboard-layout";

export default async function PatientPortalLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const userRole = (session.user as any).role;
  if (userRole !== "PATIENT" && userRole !== "ADMIN") {
    redirect("/doctor/dashboard");
  }

  const simplifiedUser = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
    role: userRole
  };

  return (
    <DashboardLayout user={simplifiedUser}>
      {children}
    </DashboardLayout>
  );
}
