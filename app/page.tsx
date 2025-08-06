// app/page.tsx (Server Component)
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import DashboardClient from "../components/client/Dashboard";
import { getFinanceSummary } from "@/lib/finance-utils";

export default async function HomePage() {
  const { userId: clerkId } = await auth();
  
  if (!clerkId) {
    return <div>Please sign in to view the dashboard.</div>;
  }

  const user = await prisma.user.findUnique({ where: { clerkId } });
  
  if (!user) {
    return <div>User not found.</div>;
  }

  // Fetch all dashboard data in parallel
  const [hiveCount, swarmTrapCount, financeSummary] = await Promise.all([
    prisma.hive.count({ where: { userId: user.id } }),
    prisma.swarmTrap.count({ where: { userId: user.id } }),
    getFinanceSummary(user.id)
  ]);

  return (
    <DashboardClient 
      hiveCount={hiveCount} 
      swarmTrapCount={swarmTrapCount}
      financeSummary={financeSummary}
    />
  );
}
