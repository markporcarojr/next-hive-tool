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

export const GET = withAuth(
  async (user, _: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const harvest = await prisma.harvest.findUnique({
        where: { id: Number(params.id), userId: user.id },
      });

      if (!harvest) {
        return createErrorResponse("Harvest not found", 404);
      }

      logApiSuccess("HARVEST_GET_BY_ID", harvest);
      return createSuccessResponse(harvest);
    } catch (error) {
      logApiError("HARVEST_GET_BY_ID", error);
      return createErrorResponse("Failed to fetch harvest record");
    }
  }
);

export const PATCH = withAuth(
  async (user, req: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const body = await req.json();
      const data = validateSchema(harvestSchema, body);

      const updated = await prisma.harvest.update({
        where: { id: Number(params.id), userId: user.id },
        data: {
          ...data,
          harvestDate: new Date(data.harvestDate),
        },
      });

      logApiSuccess("HARVEST_PATCH", updated);
      return createSuccessResponse(updated);
    } catch (error) {
      logApiError("HARVEST_PATCH", error);
      return createErrorResponse("Failed to update harvest record");
    }
  }
);

export const DELETE = withAuth(
  async (user, _: NextRequest, { params }: { params: { id: string } }) => {
    try {
      await prisma.harvest.delete({
        where: { id: Number(params.id), userId: user.id },
      });

      logApiSuccess("HARVEST_DELETE");
      return createSuccessResponse({ success: true });
    } catch (error) {
      logApiError("HARVEST_DELETE", error);
      return createErrorResponse("Failed to delete harvest record");
    }
  }
);
