// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Extend the NodeJS global type to include `prisma`
declare global {
  // This must be `var` not `let` for declaration merging
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create a single PrismaClient instance in dev, always new in prod
export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    // optional: enable logging
    // log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
