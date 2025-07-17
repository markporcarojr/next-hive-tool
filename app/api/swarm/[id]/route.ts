import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { swarmTrapSchema } from "@/lib/schemas/swarmTrap";

// GET: /api/swarm/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId: clerkId } = await auth();
  if (!clerkId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const swarm = await prisma.swarmTrap.findUnique({
      where: { id: Number(params.id), userId: user.id },
    });

    if (!swarm) {
      return NextResponse.json({ error: "Swarm not found" }, { status: 404 });
    }

    return NextResponse.json(swarm);
  } catch (error) {
    console.error("[SWARM_GET]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PATCH: /api/swarm?id=123
export async function PATCH(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const body = await req.json();
    const parsed = swarmTrapSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const updated = await prisma.swarmTrap.updateMany({
      where: { id: Number(id), userId: user.id },
      data: {
        ...parsed.data,
        installedAt: new Date(parsed.data.installedAt),
      },
    });

    if (updated.count === 0) {
      return NextResponse.json({ message: "Swarm not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Swarm updated" });
  } catch (error) {
    console.error("SWARM_PATCH]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
