import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { harvestSchema } from "@/lib/schemas/harvest";
import {
  withAuth,
  validateSchema,
  createSuccessResponse,
  createErrorResponse,
  logApiError,
  logApiSuccess,
} from "@/lib/api-utils";

export const POST = withAuth(async (user, req: NextRequest) => {
  try {
    const body = await req.json();
    const data = validateSchema(harvestSchema, body);

    const harvest = await prisma.harvest.create({
      data: {
        ...data,
        harvestDate: new Date(data.harvestDate),
        userId: user.id,
      },
    });

    logApiSuccess("HARVEST_POST", harvest);
    return createSuccessResponse(harvest, 201);
  } catch (error) {
    logApiError("HARVEST_POST", error);
    return createErrorResponse("Failed to create harvest record");
  }
});

export const GET = withAuth(async (user) => {
  try {
    const harvests = await prisma.harvest.findMany({
      where: { userId: user.id },
      orderBy: { harvestDate: "desc" },
    });

    logApiSuccess("HARVEST_GET", { count: harvests.length });
    return createSuccessResponse(harvests);
  } catch (error) {
    logApiError("HARVEST_GET", error);
    return createErrorResponse("Failed to fetch harvest records");
  }
});

export const DELETE = withAuth(async (user, req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id || isNaN(Number(id))) {
      return createErrorResponse("Missing or invalid harvest ID", 400);
    }

    const result = await prisma.harvest.deleteMany({
      where: {
        id: Number(id),
        userId: user.id,
      },
    });

    if (result.count === 0) {
      return createErrorResponse("Harvest not found", 404);
    }

    logApiSuccess("HARVEST_DELETE");
    return createSuccessResponse({ message: "Harvest deleted successfully" });
  } catch (error) {
    logApiError("HARVEST_DELETE", error);
    return createErrorResponse("Failed to delete harvest record");
  }
});

export const PATCH = withAuth(async (user, req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return createErrorResponse("Missing harvest ID", 400);
    }

    const body = await req.json();
    const data = validateSchema(harvestSchema, body);

    const updated = await prisma.harvest.updateMany({
      where: { id: Number(id), userId: user.id },
      data: {
        harvestType: data.harvestType,
        harvestAmount: data.harvestAmount,
        harvestDate: new Date(data.harvestDate),
      },
    });

    if (updated.count === 0) {
      return createErrorResponse("Harvest not found", 404);
    }

    logApiSuccess("HARVEST_PATCH");
    return createSuccessResponse({ message: "Harvest updated successfully" });
  } catch (error) {
    logApiError("HARVEST_PATCH", error);
    return createErrorResponse("Failed to update harvest record");
  }
});
