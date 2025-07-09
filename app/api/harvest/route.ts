// File: app/api/harvest/route.ts

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { harvestSchema } from "@/lib/schemas/harvest";

export async function POST(req: NextRequest) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  try {
    const body = await req.json();
    const parsed = harvestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const harvest = await prisma.harvest.create({
      data: {
        ...data,
        harvestDate: new Date(data.harvestDate), // Ensure date is a Date object
        userId: user.id, // 👈 Use the numeric ID from your DB
      },
    });

    return NextResponse.json(harvest, { status: 201 });
  } catch (error) {
    console.error("[HARVEST_POST]", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Find matching user by Clerk ID
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const harvests = await prisma.harvest.findMany({
      where: { userId: user.id },
      orderBy: { harvestDate: "desc" },
    });

    return NextResponse.json(harvests);
  } catch (error) {
    console.error("[HARVEST_GET]", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
