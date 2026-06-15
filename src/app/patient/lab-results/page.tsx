import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getLabResults } from "@/lib/data-access";
import { LabResultsClient } from "./lab-results-client";

export default async function PatientLabResultsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const userId = (session.user as any).id;
  const labs = await getLabResults(userId);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold font-display">Laboratory Results</h2>
        <p className="text-xs text-muted-foreground">
          Monitor your metabolic metrics, blood panels, and cholesterol trends over time.
        </p>
      </div>

      <LabResultsClient initialLabs={labs} />
    </div>
  );
}
