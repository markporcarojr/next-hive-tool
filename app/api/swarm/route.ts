import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { swarmTrapSchema } from "@/lib/schemas/swarmTrap";
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
    const swarms = await prisma.swarmTrap.findMany({
      where: { userId: user.id },
      orderBy: { installedAt: "desc" },
    });

    logApiSuccess("SWARM_GET", { count: swarms.length });
    return createSuccessResponse(swarms);
  } catch (error) {
    logApiError("SWARM_GET", error);
    return createErrorResponse("Failed to fetch swarm traps");
  }
});

export const POST = withAuth(async (user, req: NextRequest) => {
  try {
    const body = await req.json();
    const data = validateSchema(swarmTrapSchema, body);

    const swarmTrap = await prisma.swarmTrap.create({
      data: {
        ...data,
        installedAt: new Date(data.installedAt),
        removedAt: data.removedAt ? new Date(data.removedAt) : null,
        userId: user.id,
      },
    });

    logApiSuccess("SWARM_POST", swarmTrap);
    return createSuccessResponse(swarmTrap, 201);
  } catch (error) {
    logApiError("SWARM_POST", error);
    return createErrorResponse("Failed to create swarm trap");
  }
});

export const DELETE = withAuth(async (user, req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id || isNaN(Number(id))) {
      return createErrorResponse("Invalid ID", 400);
    }

    const result = await prisma.swarmTrap.deleteMany({
      where: {
        id: Number(id),
        userId: user.id,
      },
    });

    if (result.count === 0) {
      return createErrorResponse("Swarm trap not found", 404);
    }

    logApiSuccess("SWARM_DELETE");
    return createSuccessResponse({
      message: "Swarm trap deleted successfully",
    });
  } catch (error) {
    logApiError("SWARM_DELETE", error);
    return createErrorResponse("Failed to delete swarm trap");
  }
});
