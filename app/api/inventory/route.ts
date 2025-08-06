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

export const GET = withAuth(async (user) => {
  try {
    const items = await prisma.inventory.findMany({
      where: { userId: user.id },
      orderBy: { name: "asc" },
    });

    logApiSuccess("INVENTORY_GET", { count: items.length });
    return createSuccessResponse(items);
  } catch (error) {
    logApiError("INVENTORY_GET", error);
    return createErrorResponse("Failed to fetch inventory items");
  }
});

export const POST = withAuth(async (user, req: NextRequest) => {
  try {
    const body = await req.json();
    const data = validateSchema(inventorySchema, body);

    const item = await prisma.inventory.create({
      data: {
        ...data,
        userId: user.id,
      },
    });

    logApiSuccess("INVENTORY_POST", item);
    return createSuccessResponse(item, 201);
  } catch (error) {
    logApiError("INVENTORY_POST", error);
    return createErrorResponse("Failed to create inventory item");
  }
});

export const DELETE = withAuth(async (user, req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id || isNaN(Number(id))) {
      return createErrorResponse("Invalid ID", 400);
    }

    const result = await prisma.inventory.deleteMany({
      where: {
        id: Number(id),
        userId: user.id,
      },
    });

    if (result.count === 0) {
      return createErrorResponse("Inventory item not found", 404);
    }

    logApiSuccess("INVENTORY_DELETE");
    return createSuccessResponse({
      message: "Inventory item deleted successfully",
    });
  } catch (error) {
    logApiError("INVENTORY_DELETE", error);
    return createErrorResponse("Failed to delete inventory item");
  }
});
