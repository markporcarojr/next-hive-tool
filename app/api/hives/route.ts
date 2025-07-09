import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { hiveSchema } from "@/lib/schemas/hive";

// GET: /api/hives
export async function GET(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const hives = await prisma.hive.findMany({
      where: { userId: user.id },
      orderBy: { hiveDate: "desc" },
    });

    return NextResponse.json(hives);
  } catch (error) {
    console.error("[HIVES_GET]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST: /api/hives
export async function POST(req: NextRequest) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = hiveSchema.safeParse(body);

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

    const existingHive = await prisma.hive.findFirst({
      where: {
        hiveNumber: data.hiveNumber,
        userId: user.id,
      },
    });

    if (existingHive) {
      return NextResponse.json(
        { message: `Hive number ${data.hiveNumber} already exists.` },
        { status: 409 }
      );
    }

    const hive = await prisma.hive.create({
      data: {
        ...data,
        hiveDate: new Date(data.hiveDate),
        userId: user.id,
      },
    });

    return NextResponse.json(hive, { status: 201 });
  } catch (error) {
    console.error("[HIVE_POST]", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
