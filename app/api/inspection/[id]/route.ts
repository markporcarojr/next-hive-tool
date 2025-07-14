import { prisma } from "@/lib/prisma";
import { inspectionSchema } from "@/lib/schemas/inspection";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // const inspection = await Harvest.findById(id);
    const inspection = { id, mock: true };

    return NextResponse.json(inspection, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// DELETE: /api/inspections?id=123
export async function DELETE(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user)
    return NextResponse.json({ message: "User not found" }, { status: 404 });

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  const result = await prisma.inspection.deleteMany({
    where: {
      id: Number(id),
      userId: user.id,
    },
  });

  if (result.count === 0) {
    return NextResponse.json(
      { message: "Inspection not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Inspection deleted" });
}

// PATCH: /api/inspections?id=123
export async function PATCH(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user)
    return NextResponse.json({ message: "User not found" }, { status: 404 });

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  const body = await req.json();
  const parsed = inspectionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const updated = await prisma.inspection.updateMany({
    where: { id: Number(id), userId: user.id },
    data: {
      ...parsed.data,
      inspectionDate: new Date(parsed.data.inspectionDate),
    },
  });

  if (updated.count === 0) {
    return NextResponse.json(
      { message: "Inspection not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Inspection updated" });
}
