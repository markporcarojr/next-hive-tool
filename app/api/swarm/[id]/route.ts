import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { swarmTrapSchema } from "@/lib/schemas/swarmTrap";

export async function DELETE(req: NextRequest) {
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

    const result = await prisma.swarmTrap.deleteMany({
      where: {
        id: Number(id),
        userId: user.id,
      },
    });

    if (result.count === 0) {
      return NextResponse.json({ message: "Swarm not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Swarm deleted" });
  } catch (error) {
    console.error("[HIVES_DELETE]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PATCH: /api/hives?id=123
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
        hiveDate: new Date(parsed.data.hiveDate),
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
