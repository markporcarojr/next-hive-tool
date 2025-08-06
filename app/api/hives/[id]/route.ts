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

export const GET = withAuth(
  async (user, _: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const hive = await prisma.hive.findUnique({
        where: { id: Number(params.id), userId: user.id },
      });

      if (!hive) {
        return createErrorResponse("Hive not found", 404);
      }

      logApiSuccess("HIVE_GET_BY_ID", hive);
      return createSuccessResponse(hive);
    } catch (error) {
      logApiError("HIVE_GET_BY_ID", error);
      return createErrorResponse("Failed to fetch hive");
    }
  }
);

export const PATCH = withAuth(
  async (user, req: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const body = await req.json();
      const data = validateSchema(hiveSchema, body);

      const hive = await prisma.hive.update({
        where: { id: Number(params.id), userId: user.id },
        data: {
          ...data,
          hiveDate: new Date(data.hiveDate),
        },
      });

      logApiSuccess("HIVE_PATCH", hive);
      return createSuccessResponse(hive);
    } catch (error) {
      logApiError("HIVE_PATCH", error);
      return createErrorResponse("Failed to update hive");
    }
  }
);
