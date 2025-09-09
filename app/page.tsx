// app/page.tsx (Server Component)
// Temporary mock data for UI testing - will restore Prisma after migration
// import { prisma } from "@/lib/prisma";
import DashboardClient from "../components/client/Dashboard";

export default async function HomePage() {
  // Mock data for testing layout changes
  const hiveCount = 12;
  const swarmTrapCount = 5;

  return (
    <DashboardClient hiveCount={hiveCount} swarmTrapCount={swarmTrapCount} />
  );
}
