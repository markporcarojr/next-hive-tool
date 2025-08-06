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

export const GET = withAuth(
  async (user, _: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const inspection = await prisma.inspection.findUnique({
        where: {
          id: Number(params.id),
          userId: user.id,
        },
        include: {
          hive: true,
        },
      });

      if (!inspection) {
        return createErrorResponse("Inspection not found", 404);
      }

      logApiSuccess("INSPECTION_GET_BY_ID", inspection);
      return createSuccessResponse(inspection);
    } catch (error) {
      logApiError("INSPECTION_GET_BY_ID", error);
      return createErrorResponse("Failed to fetch inspection");
    }
  }
);

export const PATCH = withAuth(
  async (user, req: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const body = await req.json();
      const data = validateSchema(inspectionSchema, body);

      const updatedInspection = await prisma.inspection.update({
        where: {
          id: Number(params.id),
          userId: user.id,
        },
        data: {
          ...data,
          inspectionDate: new Date(data.inspectionDate),
        },
      });

      logApiSuccess("INSPECTION_PATCH", updatedInspection);
      return createSuccessResponse(updatedInspection);
    } catch (error) {
      logApiError("INSPECTION_PATCH", error);
      return createErrorResponse("Failed to update inspection");
    }
  }
);

export const DELETE = withAuth(
  async (user, _: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const deletedInspection = await prisma.inspection.delete({
        where: {
          id: Number(params.id),
          userId: user.id,
        },
      });

      logApiSuccess("INSPECTION_DELETE", deletedInspection);
      return createSuccessResponse({ success: true });
    } catch (error) {
      logApiError("INSPECTION_DELETE", error);
      return createErrorResponse("Failed to delete inspection");
    }
  }
);
