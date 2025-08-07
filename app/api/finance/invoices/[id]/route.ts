import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  withAuth,
  createSuccessResponse,
  createErrorResponse,
  logApiError,
  logApiSuccess,
} from "@/lib/api-utils";
import { Decimal } from "@prisma/client/runtime/library";

export const GET = withAuth(
  async (user, _: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const invoice = await prisma.invoice.findFirst({
        where: { id: Number(params.id), userId: user.id },
        include: {
          items: true, // ✅ This is what you're missing
        },
      });

      if (!invoice) {
        return createErrorResponse("Invoice not found", 404);
      }

      logApiSuccess("INVOICE_GET", invoice);
      return createSuccessResponse({
        ...invoice,
        total: Number(invoice.total),
        date: invoice.date.toISOString(),
        items: invoice.items.map((item) => ({
          ...item,
          unitPrice: Number(item.unitPrice),
        })),
      });
    } catch (error) {
      logApiError("INVOICE_GET", error);
      return createErrorResponse("Failed to fetch invoice");
    }
  }
);

// export const PATCH = withAuth(
//   async (user, req: NextRequest, { params }: { params: { id: string } }) => {
//     try {
//       const body = await req.json();

//       const updated = await prisma.invoice.update({
//         where: { id: Number(params.id), userId: user.id },
//         data: body,
//       });

//       logApiSuccess("INVOICE_PATCH", updated);
//       return createSuccessResponse(updated);
//     } catch (error) {
//       logApiError("INVOICE_PATCH", error);
//       return createErrorResponse("Failed to update invoice");
//     }
//   }
// );

export const PATCH = withAuth(
  async (user, req: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const body = await req.json();

      // Extract items separately
      const { items, ...invoiceData } = body;

      // Step 1: Delete old items
      await prisma.invoiceItem.deleteMany({
        where: { invoiceId: Number(params.id) },
      });

      // Step 2: Update invoice and re-create items
      const updated = await prisma.invoice.update({
        where: { id: Number(params.id), userId: user.id },
        data: {
          ...invoiceData,
          date: new Date(invoiceData.date),
          total: new Decimal(invoiceData.total),
          items: {
            create: items.map((item: any) => ({
              product: item.product,
              quantity: item.quantity,
              unitPrice: new Decimal(item.unitPrice),
            })),
          },
        },
        include: { items: true },
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
