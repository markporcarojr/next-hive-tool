import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { hiveSchema } from "@/lib/schemas/hive";
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
    const hives = await prisma.hive.findMany({
      where: { userId: user.id },
      orderBy: { hiveDate: "desc" },
    });

    logApiSuccess("HIVES_GET", { count: hives.length });
    return createSuccessResponse(hives);
  } catch (error) {
    logApiError("HIVES_GET", error);
    return createErrorResponse("Failed to fetch hives");
  }
});

export const POST = withAuth(async (user, req: NextRequest) => {
  try {
    const body = await req.json();
    const data = validateSchema(hiveSchema, body);

    const existingHive = await prisma.hive.findFirst({
      where: {
        hiveNumber: data.hiveNumber,
        userId: user.id,
      },
    });

    if (existingHive) {
      return createErrorResponse(
        `Hive number ${data.hiveNumber} already exists.`,
        409
      );
    }

    const hive = await prisma.hive.create({
      data: {
        ...data,
        hiveDate: new Date(data.hiveDate),
        userId: user.id,
      },
    });

    logApiSuccess("HIVES_POST", hive);
    return createSuccessResponse(hive, 201);
  } catch (error) {
    logApiError("HIVES_POST", error);
    return createErrorResponse("Failed to create hive");
  }
});

export const DELETE = withAuth(async (user, req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id || isNaN(Number(id))) {
      return createErrorResponse("Invalid hive ID", 400);
    }

    const result = await prisma.hive.deleteMany({
      where: {
        id: Number(id),
        userId: user.id,
      },
    });

    if (result.count === 0) {
      return createErrorResponse("Hive not found", 404);
    }

    logApiSuccess("HIVES_DELETE");
    return createSuccessResponse({ message: "Hive deleted successfully" });
  } catch (error) {
    logApiError("HIVES_DELETE", error);
    return createErrorResponse("Failed to delete hive");
  }
});
