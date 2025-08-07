import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { expenseSchema } from "@/lib/schemas/expense";
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
      const expense = await prisma.expense.findUnique({
        where: { id: Number(params.id), userId: user.id },
      });

      if (!expense) {
        return createErrorResponse("Expense not found", 404);
      }

      logApiSuccess("EXPENSE_GET_BY_ID", expense);
      return createSuccessResponse(expense);
    } catch (error) {
      logApiError("EXPENSE_GET_BY_ID", error);
      return createErrorResponse("Failed to fetch expense");
    }
  }
);

export const PATCH = withAuth(
  async (user, req: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const body = await req.json();
      const data = validateSchema(expenseSchema, body);

      const updated = await prisma.expense.update({
        where: { id: Number(params.id), userId: user.id },
        data,
      });

      logApiSuccess("EXPENSE_PATCH", updated);
      return createSuccessResponse(updated);
    } catch (error) {
      logApiError("EXPENSE_PATCH", error);
      return createErrorResponse("Failed to update expense");
    }
  }
);

export const DELETE = withAuth(
  async (user, _: NextRequest, { params }: { params: { id: string } }) => {
    try {
      await prisma.expense.delete({
        where: { id: Number(params.id), userId: user.id },
      });

      logApiSuccess("EXPENSE_DELETE");
      return createSuccessResponse({ success: true });
    } catch (error) {
      logApiError("EXPENSE_DELETE", error);
      return createErrorResponse("Failed to delete expense");
    }
  }
);
