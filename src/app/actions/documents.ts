"use server";

import { auth } from "@/auth";
import { createDocument, createAuditLog } from "@/lib/data-access";
import { revalidatePath } from "next/cache";

export async function uploadDocumentAction(state: any, formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    return { error: "Unauthenticated access." };
  }

  const userId = (session.user as any).id;
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const file = formData.get("file") as File;

  if (!title || !category) {
    return { error: "Please enter a document title and select a category." };
  }

  try {
    // Simulating file storage url assignment
    const mockFileUrl = `/files/${title.toLowerCase().replace(/\s+/g, "_") || "document"}.pdf`;

    await createDocument(userId, {
      title,
      fileUrl: mockFileUrl,
      fileType: file?.name?.split(".").pop() || "pdf",
      category
    });

    // Create log
    await createAuditLog(userId, "UPLOAD_DOCUMENT", `Uploaded medical document: ${title} (${category})`);

    revalidatePath("/patient/documents");
    revalidatePath("/patient/dashboard");

    return { success: true };
  } catch (error: any) {
    console.error("Document upload action error:", error);
    return { error: error.message || "Failed to upload document. Please try again." };
  }
}
