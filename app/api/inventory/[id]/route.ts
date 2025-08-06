import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { inventorySchema } from "@/lib/schemas/inventory";
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
      const item = await prisma.inventory.findUnique({
        where: { id: parseInt(params.id), userId: user.id },
      });

      if (!item) {
        return createErrorResponse("Item not found", 404);
      }

      logApiSuccess("INVENTORY_GET_BY_ID", item);
      return createSuccessResponse(item);
    } catch (error) {
      logApiError("INVENTORY_GET_BY_ID", error);
      return createErrorResponse("Failed to fetch inventory item");
    }
  }
);

export const DELETE = withAuth(
  async (user, _: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const item = await prisma.inventory.findUnique({
        where: { id: parseInt(params.id), userId: user.id },
      });

      if (!item) {
        return createErrorResponse("Item not found", 404);
      }

      await prisma.inventory.delete({
        where: { id: item.id },
      });

      logApiSuccess("INVENTORY_DELETE");
      return createSuccessResponse({ message: "Item deleted successfully" });
    } catch (error) {
      logApiError("INVENTORY_DELETE", error);
      return createErrorResponse("Failed to delete inventory item");
    }
  }
);

export const PUT = withAuth(
  async (user, req: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const body = await req.json();
      const data = validateSchema(inventorySchema, body);

      const item = await prisma.inventory.update({
        where: { id: parseInt(params.id), userId: user.id },
        data,
      });

      logApiSuccess("INVENTORY_PUT", item);
      return createSuccessResponse(item);
    } catch (error) {
      logApiError("INVENTORY_PUT", error);
      return createErrorResponse("Failed to update inventory item");
    }
  }
);

export const PATCH = withAuth(
  async (user, req: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const body = await req.json();
      const data = validateSchema(inventorySchema.partial(), body);

      const item = await prisma.inventory.update({
        where: { id: parseInt(params.id), userId: user.id },
        data,
      });

      logApiSuccess("INVENTORY_PATCH", item);
      return createSuccessResponse(item);
    } catch (error) {
      logApiError("INVENTORY_PATCH", error);
      return createErrorResponse("Failed to update inventory item");
    }
  }
);
