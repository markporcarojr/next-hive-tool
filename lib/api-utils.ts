import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Standardized response types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

// Standardized error responses
export const createErrorResponse = (message: string, status: number = 500) => {
  return NextResponse.json({ error: message }, { status });
};

export const createSuccessResponse = <T>(data: T, status: number = 200) => {
  return NextResponse.json({ data }, { status });
};

// Standardized authentication helper
export const authenticateUser = async () => {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// Standardized schema validation helper
export const validateSchema = <T>(schema: z.ZodSchema<T>, data: any): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `Validation failed: ${result.error.errors.map((e) => e.message).join(", ")}`
    );
  }
  return result.data;
};

// Standardized API handler wrapper
export const withAuth = <T extends any[]>(
  handler: (user: any, ...args: T) => Promise<NextResponse>
) => {
  return async (...args: T): Promise<NextResponse> => {
    try {
      const user = await authenticateUser();
      return await handler(user, ...args);
    } catch (error) {
      console.error(`[API_ERROR]`, error);
      if (error instanceof Error) {
        if (error.message === "Unauthorized") {
          return createErrorResponse("Unauthorized", 401);
        }
        if (error.message === "User not found") {
          return createErrorResponse("User not found", 404);
        }
        if (error.message.startsWith("Validation failed:")) {
          return createErrorResponse(error.message, 400);
        }
      }
      return createErrorResponse("Internal server error", 500);
    }
  };
};

// Standardized logging
export const logApiError = (operation: string, error: any) => {
  console.error(`[${operation.toUpperCase()}_ERROR]`, error);
};

// Standardized success logging
export const logApiSuccess = (operation: string, data?: any) => {
  console.log(`[${operation.toUpperCase()}_SUCCESS]`, data ? { data } : "");
};
