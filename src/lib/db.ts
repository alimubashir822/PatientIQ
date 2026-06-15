import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/patientiq";

let prismaInstance: PrismaClient;

try {
  const pool = new Pool({ 
    connectionString,
    // Add short connection timeouts for build safety
    connectionTimeoutMillis: 2000,
  });
  const adapter = new PrismaPg(pool);
  prismaInstance = globalForPrisma.prisma ?? new PrismaClient({ adapter });
} catch (error) {
  console.warn("⚠️ Failed to initialize PrismaClient database adapter. Creating dummy fallback client.", error);
  prismaInstance = new PrismaClient({
    adapter: {
      provider: "postgres",
      query: async () => { throw new Error("Database offline"); },
      execute: async () => { throw new Error("Database offline"); },
    } as any
  });
}

export const db = prismaInstance;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// Helper function to check if the database is reachable
export async function isDbConnected(): Promise<boolean> {
  try {
    // Attempt a quick query
    await db.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    return false;
  }
}
