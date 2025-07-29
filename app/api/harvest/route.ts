// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { prisma } from "@/lib/prisma";
// import { harvestSchema } from "@/lib/schemas/harvest";

// export async function POST(req: NextRequest) {
//   const { userId: clerkId } = await auth();

//   if (!clerkId) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const user = await prisma.user.findUnique({
//     where: { clerkId },
//   });

//   if (!user) {
//     return NextResponse.json({ message: "User not found" }, { status: 404 });
//   }

//   try {
//     const body = await req.json();
//     const parsed = harvestSchema.safeParse(body);

//     if (!parsed.success) {
//       return NextResponse.json(
//         { errors: parsed.error.flatten().fieldErrors },
//         { status: 400 }
//       );
//     }

//     const data = parsed.data;

//     const harvest = await prisma.harvest.create({
//       data: {
//         ...data,
//         harvestDate: new Date(data.harvestDate), // Ensure date is a Date object
//         userId: user.id, // 👈 Use the numeric ID from your DB
//       },
//     });

//     return NextResponse.json(harvest, { status: 201 });
//   } catch (error) {
//     console.error("[HARVEST_POST]", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

// export async function GET(req: NextRequest) {
//   const { userId: clerkId } = await auth();

//   if (!clerkId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     // Find matching user by Clerk ID
//     const user = await prisma.user.findUnique({
//       where: { clerkId },
//     });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const harvests = await prisma.harvest.findMany({
//       where: { userId: user.id },
//       orderBy: { harvestDate: "desc" },
//     });

//     return NextResponse.json(harvests);
//   } catch (error) {
//     console.error("[HARVEST_GET]", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

// export async function DELETE(req: NextRequest) {
//   const { userId: clerkId } = await auth();

//   if (!clerkId) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const user = await prisma.user.findUnique({
//       where: { clerkId },
//     });

//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     const url = new URL(req.url);
//     const id = url.searchParams.get("id");

//     if (!id || isNaN(Number(id))) {
//       return NextResponse.json(
//         { message: "Missing or invalid harvest ID" },
//         { status: 400 }
//       );
//     }

//     const harvest = await prisma.harvest.deleteMany({
//       where: {
//         id: Number(id), // <-- convert here
//         userId: user.id,
//       },
//     });

//     if (harvest.count === 0) {
//       return NextResponse.json(
//         { message: "Harvest not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ message: "Harvest deleted successfully" });
//   } catch (error) {
//     console.error("[HARVEST_DELETE]", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

// // PATCH /api/harvest?id=123
// export async function PATCH(req: NextRequest) {
//   const { userId: clerkId } = await auth();
//   if (!clerkId) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const user = await prisma.user.findUnique({ where: { clerkId } });
//   if (!user) {
//     return NextResponse.json({ message: "User not found" }, { status: 404 });
//   }

//   const url = new URL(req.url);
//   const id = url.searchParams.get("id");
//   if (!id) {
//     return NextResponse.json(
//       { message: "Missing harvest ID" },
//       { status: 400 }
//     );
//   }

//   const body = await req.json();
//   const parsed = harvestSchema.safeParse(body);
//   if (!parsed.success) {
//     return NextResponse.json(
//       { errors: parsed.error.flatten().fieldErrors },
//       { status: 400 }
//     );
//   }

//   const { harvestType, harvestAmount, harvestDate } = parsed.data;

//   try {
//     const updated = await prisma.harvest.updateMany({
//       where: { id: Number(id), userId: user.id },
//       data: {
//         harvestType,
//         harvestAmount,
//         harvestDate: new Date(harvestDate),
//       },
//     });

//     if (updated.count === 0) {
//       return NextResponse.json(
//         { message: "Harvest not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ message: "Harvest updated" });
//   } catch (error) {
//     console.error("[HARVEST_PATCH]", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { harvestSchema } from "@/lib/schemas/harvest";

type ErrorResponse = { error: string | object };

function errorResponse(error: string | object, status: number = 400) {
  return NextResponse.json({ error }, { status });
}

export async function POST(req: NextRequest) {
  const { userId: clerkId } = await auth();

  if (!clerkId) return errorResponse("Unauthorized", 401);

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return errorResponse("User not found", 404);

  try {
    const body = await req.json();
    const parsed = harvestSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.flatten().fieldErrors, 400);
    }

    const data = parsed.data;

    const harvest = await prisma.harvest.create({
      data: {
        ...data,
        harvestDate: new Date(data.harvestDate),
        userId: user.id,
      },
    });

    return NextResponse.json(harvest, { status: 201 });
  } catch (error) {
    console.error("[HARVEST_POST]", error);
    return errorResponse("Server error", 500);
  }
}

export async function GET(req: NextRequest) {
  const { userId: clerkId } = await auth();

  if (!clerkId) return errorResponse("Unauthorized", 401);

  try {
    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) return errorResponse("User not found", 404);

    const harvests = await prisma.harvest.findMany({
      where: { userId: user.id },
      orderBy: { harvestDate: "desc" },
    });

    return NextResponse.json(harvests);
  } catch (error) {
    console.error("[HARVEST_GET]", error);
    return errorResponse("Server error", 500);
  }
}

export async function DELETE(req: NextRequest) {
  const { userId: clerkId } = await auth();

  if (!clerkId) return errorResponse("Unauthorized", 401);

  try {
    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) return errorResponse("User not found", 404);

    const url = "nextUrl" in req ? (req as any).nextUrl : new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id || isNaN(Number(id))) {
      return errorResponse("Missing or invalid harvest ID", 400);
    }

    try {
      const deleted = await prisma.harvest.delete({
        where: { id: Number(id), userId: user.id },
      });
      return NextResponse.json({ message: "Harvest deleted successfully" });
    } catch {
      return errorResponse("Harvest not found", 404);
    }
  } catch (error) {
    console.error("[HARVEST_DELETE]", error);
    return errorResponse("Server error", 500);
  }
}

// PATCH /api/harvest?id=123
export async function PATCH(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return errorResponse("Unauthorized", 401);

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return errorResponse("User not found", 404);

  const url = "nextUrl" in req ? (req as any).nextUrl : new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id || isNaN(Number(id))) {
    return errorResponse("Missing or invalid harvest ID", 400);
  }

  const body = await req.json();
  const parsed = harvestSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.flatten().fieldErrors, 400);
  }

  const { harvestType, harvestAmount, harvestDate } = parsed.data;

  try {
    const updated = await prisma.harvest.update({
      where: { id: Number(id), userId: user.id },
      data: {
        harvestType,
        harvestAmount,
        harvestDate: new Date(harvestDate),
      },
    });
    return NextResponse.json({ message: "Harvest updated" });
  } catch {
    return errorResponse("Harvest not found", 404);
  }
}
