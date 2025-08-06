import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  withAuth,
  createSuccessResponse,
  createErrorResponse,
  logApiError,
  logApiSuccess,
} from "@/lib/api-utils";

export const PATCH = withAuth(
  async (user, req: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const body = await req.json();

      const updated = await prisma.invoice.update({
        where: { id: Number(params.id), userId: user.id },
        data: body,
      });

      logApiSuccess("INVOICE_PATCH", updated);
      return createSuccessResponse(updated);
    } catch (error) {
      logApiError("INVOICE_PATCH", error);
      return createErrorResponse("Failed to update invoice");
    }
  }
);

export const DELETE = withAuth(
  async (user, _: NextRequest, { params }: { params: { id: string } }) => {
    try {
      await prisma.invoice.delete({
        where: { id: Number(params.id), userId: user.id },
      });

      logApiSuccess("INVOICE_DELETE");
      return createSuccessResponse({ success: true });
    } catch (error) {
      logApiError("INVOICE_DELETE", error);
      return createErrorResponse("Failed to delete invoice");
    }
  }
);
