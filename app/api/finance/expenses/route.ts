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

export const GET = withAuth(async (user) => {
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
    });

    logApiSuccess("EXPENSES_GET", { count: expenses.length });
    return createSuccessResponse(expenses);
  } catch (error) {
    logApiError("EXPENSES_GET", error);
    return createErrorResponse("Failed to fetch expenses");
  }
});

export const POST = withAuth(async (user, req: NextRequest) => {
  try {
    const body = await req.json();
    const data = validateSchema(expenseSchema, body);

    const expense = await prisma.expense.create({
      data: {
        ...data,
        userId: user.id,
      },
    });

    logApiSuccess("EXPENSES_POST", expense);
    return createSuccessResponse(expense, 201);
  } catch (error) {
    logApiError("EXPENSES_POST", error);
    return createErrorResponse("Failed to create expense");
  }
});
