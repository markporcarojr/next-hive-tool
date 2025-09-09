// app/components/DashboardClient.tsx
"use client";

import FinanceWidget from "../widgets/FinanceWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import QuickActionsWidget from "../widgets/QuickActionsWidget";

const TrapMapWidget = dynamic(() => import("../widgets/TrapMapWidget"), {
  ssr: false,
});

const chartData = [
  { name: "Hive 1", harvest: 30 },
  { name: "Hive 2", harvest: 22 },
  { name: "Hive 3", harvest: 17 },
  { name: "Hive 4", harvest: 40 },
];

export default function DashboardClient({
  hiveCount,
  swarmTrapCount,
}: {
  hiveCount: number;
  swarmTrapCount: number;
}) {
  return (
    <main>
      <h2 className="text-2xl font-bold mb-6">Welcome back, Mark 🐝</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>To-Do List</CardTitle>
          </CardHeader>
          <CardContent>
            <Separator className="mb-4" />
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox defaultChecked />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Organize file structure
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Refactor all Widgets
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Build a reuseable form
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Separate all client and server logic
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Make all forms and ui follow the same design
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Paganate all pages the same way
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Make button components reusable
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Update the color palette
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        <FinanceWidget />

        <Card>
          <CardHeader>
            <CardTitle>Harvest Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="harvest" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-muted-foreground">Total Hives</p>
                <h3 className="text-2xl font-bold">{hiveCount}</h3>
              </div>

              <div>
                <p className="font-medium text-muted-foreground">Swarms Traps Set</p>
                <h3 className="text-2xl font-bold">{swarmTrapCount}</h3>
              </div>

              <div>
                <p className="font-medium text-muted-foreground">Some Other Stat Test</p>
                <h3 className="text-2xl font-bold">XXXX</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <TrapMapWidget />
        <QuickActionsWidget />
      </div>
    </main>
  );
}
