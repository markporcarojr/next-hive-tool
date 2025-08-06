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

export const GET = withAuth(
  async (user, _: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const swarm = await prisma.swarmTrap.findUnique({
        where: { id: Number(params.id), userId: user.id },
      });

      if (!swarm) {
        return createErrorResponse("Swarm trap not found", 404);
      }

      logApiSuccess("SWARM_GET_BY_ID", swarm);
      return createSuccessResponse(swarm);
    } catch (error) {
      logApiError("SWARM_GET_BY_ID", error);
      return createErrorResponse("Failed to fetch swarm trap");
    }
  }
);

export const PATCH = withAuth(
  async (user, req: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const body = await req.json();
      const data = validateSchema(swarmTrapSchema, body);

      const updatedSwarm = await prisma.swarmTrap.update({
        where: { id: Number(params.id), userId: user.id },
        data,
      });

      logApiSuccess("SWARM_PATCH", updatedSwarm);
      return createSuccessResponse(updatedSwarm);
    } catch (error) {
      logApiError("SWARM_PATCH", error);
      return createErrorResponse("Failed to update swarm trap");
    }
  }
);
