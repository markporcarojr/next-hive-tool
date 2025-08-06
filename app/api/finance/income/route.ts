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

export const GET = withAuth(async (user) => {
  try {
    const incomes = await prisma.income.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
    });

    logApiSuccess("INCOME_GET", { count: incomes.length });
    return createSuccessResponse(incomes);
  } catch (error) {
    logApiError("INCOME_GET", error);
    return createErrorResponse("Failed to fetch income records");
  }
});

export const POST = withAuth(async (user, req: NextRequest) => {
  try {
    const body = await req.json();
    const data = validateSchema(incomeSchema, body);

    const income = await prisma.income.create({
      data: {
        ...data,
        userId: user.id,
      },
    });

    logApiSuccess("INCOME_POST", income);
    return createSuccessResponse(income, 201);
  } catch (error) {
    logApiError("INCOME_POST", error);
    return createErrorResponse("Failed to create income record");
  }
});
