import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { incomeSchema } from "@/lib/schemas/income";
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
      const income = await prisma.income.findUnique({
        where: { id: Number(params.id), userId: user.id },
      });

      if (!income) {
        return createErrorResponse("Income not found", 404);
      }

      logApiSuccess("INCOME_GET_BY_ID", income);
      return createSuccessResponse(income);
    } catch (error) {
      logApiError("INCOME_GET_BY_ID", error);
      return createErrorResponse("Failed to fetch income record");
    }
  }
);

export const PATCH = withAuth(
  async (user, req: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const body = await req.json();
      const data = validateSchema(incomeSchema.partial(), body);

      const updated = await prisma.income.update({
        where: { id: Number(params.id), userId: user.id },
        data,
      });

      logApiSuccess("INCOME_PATCH", updated);
      return createSuccessResponse(updated);
    } catch (error) {
      logApiError("INCOME_PATCH", error);
      return createErrorResponse("Failed to update income record");
    }
  }
);

export const DELETE = withAuth(
  async (user, _: NextRequest, { params }: { params: { id: string } }) => {
    try {
      await prisma.income.delete({
        where: { id: Number(params.id), userId: user.id },
      });

      logApiSuccess("INCOME_DELETE");
      return createSuccessResponse({ success: true });
    } catch (error) {
      logApiError("INCOME_DELETE", error);
      return createErrorResponse("Failed to delete income record");
    }
  }
);
