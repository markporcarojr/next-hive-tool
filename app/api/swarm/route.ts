import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { swarmTrapSchema } from "@/lib/schemas/swarmTrap";

// GET: /api/swarm
export async function GET(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const swarms = await prisma.swarmTrap.findMany({
      where: { userId: user.id },
      orderBy: { installedAt: "desc" },
    });

    return NextResponse.json(swarms);
  } catch (error) {
    console.error("[SWARMS_GET]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST: /api/swarm
export async function POST(req: NextRequest) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = swarmTrapSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const swarmTrap = await prisma.swarmTrap.create({
      data: {
        ...data,
        installedAt: new Date(data.installedAt),
        removedAt: data.removedAt ? new Date(data.removedAt) : null,
        userId: user.id,
      },
    });

    return NextResponse.json(swarmTrap, { status: 201 });
  } catch (error) {
    console.error("[SWARM_POST]", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// DELETE: /api/swarm?id=123
