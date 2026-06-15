import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DashboardLayout } from "@/components/dashboard-layout";

export default async function DoctorPortalLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const userRole = (session.user as any).role;
  if (userRole !== "DOCTOR" && userRole !== "ADMIN") {
    redirect("/patient/dashboard");
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
