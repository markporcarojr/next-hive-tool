import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { harvestSchema } from "@/lib/schemas/harvest";
import { checkUser } from "@/lib/auth/checkUser";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // 👇 Ensure user exists in DB
  await checkUser();

  try {
    const body = await req.json();
    const parsed = harvestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { harvestType, harvestAmount, harvestDate } = parsed.data;

    const parsedDate = new Date(harvestDate);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { message: "Invalid harvestDate" },
        { status: 400 }
      );
    }

    const harvest = await prisma.harvest.create({
      data: {
        harvestType,
        harvestAmount,
        harvestDate: parsedDate,
        userId,
      },
    });

    return NextResponse.json(harvest, { status: 201 });
  } catch (error) {
    console.error("[HARVEST_POST]", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 👇 Ensure user exists in DB
  await checkUser();

  try {
    const harvests = await prisma.harvest.findMany({
      where: { userId },
      orderBy: { harvestDate: "desc" },
    });

    return NextResponse.json(harvests);
  } catch (error) {
    console.error("[HARVEST_GET]", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
