// app/api/harvest/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { harvestSchema } from "@/lib/schemas/harvest";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = harvestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { harvestType, harvestAmount, harvestDate, userId } = parsed.data;

    const harvest = await prisma.harvest.create({
      data: {
        harvestType,
        harvestAmount,
        harvestDate: new Date(harvestDate),
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
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    // const harvests = await Harvest.find({ userId });
    const harvests = []; // mock for now

    return NextResponse.json(harvests, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
