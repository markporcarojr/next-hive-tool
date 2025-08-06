import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { inspectionSchema } from "@/lib/schemas/inspection";
import {
  withAuth,
  validateSchema,
  createSuccessResponse,
  createErrorResponse,
  logApiError,
  logApiSuccess,
} from "@/lib/api-utils";

export const GET = withAuth(async (user) => {
  try {
    const inspections = await prisma.inspection.findMany({
      where: { userId: user.id },
      orderBy: { inspectionDate: "desc" },
      include: {
        hive: true,
      },
    });

    logApiSuccess("INSPECTION_GET", { count: inspections.length });
    return createSuccessResponse(inspections);
  } catch (error) {
    logApiError("INSPECTION_GET", error);
    return createErrorResponse("Failed to fetch inspections");
  }
});

export const POST = withAuth(async (user, req: NextRequest) => {
  try {
    const body = await req.json();
    const data = validateSchema(inspectionSchema, body);

    const inspection = await prisma.inspection.create({
      data: {
        ...data,
        inspectionDate: new Date(data.inspectionDate),
        userId: user.id,
      },
    });

    logApiSuccess("INSPECTION_POST", inspection);
    return createSuccessResponse(inspection, 201);
  } catch (error) {
    logApiError("INSPECTION_POST", error);
    return createErrorResponse("Failed to create inspection");
  }
});

export const DELETE = withAuth(async (user, req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id || isNaN(Number(id))) {
      return createErrorResponse("Invalid ID", 400);
    }

    const result = await prisma.inspection.deleteMany({
      where: {
        id: Number(id),
        userId: user.id,
      },
    });

    if (result.count === 0) {
      return createErrorResponse("Inspection not found", 404);
    }

    logApiSuccess("INSPECTION_DELETE");
    return createSuccessResponse({
      message: "Inspection deleted successfully",
    });
  } catch (error) {
    logApiError("INSPECTION_DELETE", error);
    return createErrorResponse("Failed to delete inspection");
  }
});
