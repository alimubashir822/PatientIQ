import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getDocuments } from "@/lib/data-access";
import { DocumentsClient } from "./documents-client";

export default async function PatientDocumentsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const userId = (session.user as any).id;
  const docs = await getDocuments(userId);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold font-display">Secure Document Vault</h2>
        <p className="text-xs text-muted-foreground">
          Store, retrieve, and organize clinical records, prescriptions, and imaging reports securely.
        </p>
      </div>

      <DocumentsClient initialDocs={docs} />
    </div>
  );
}
