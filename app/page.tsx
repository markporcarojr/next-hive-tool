// app/page.tsx (Server Component)
import { prisma } from "@/lib/prisma";
import DashboardClient from "./components/client/Dashboard";

export default async function HomePage() {
  const hiveCount = await prisma.hive.count();
  const swarmTrapCount = await prisma.swarmTrap.count();

  return (
    <DashboardClient hiveCount={hiveCount} swarmTrapCount={swarmTrapCount} />
  );
}
