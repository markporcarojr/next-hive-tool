import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { invoiceSchema } from "@/lib/schemas/invoice";
import { sendInvoiceEmail } from "@/lib/sendInvoiceEmail";
import { Decimal } from "@prisma/client/runtime/library";
import {
  withAuth,
  validateSchema,
  createSuccessResponse,
  createErrorResponse,
  logApiError,
  logApiSuccess,
} from "@/lib/api-utils";

export const POST = withAuth(async (user, req: NextRequest) => {
  try {
    const body = await req.json();
    const data = validateSchema(invoiceSchema, body);

    const invoice = await prisma.invoice.create({
      data: {
        customerName: data.customerName,
        date: new Date(data.date),
        email: data.email,
        phone: data.phone,
        notes: data.notes,
        total: new Decimal(data.total),
        user: {
          connect: {
            clerkId: user.clerkId,
          },
        },
        items: {
          create: data.items.map((item) => ({
            product: item.product,
            quantity: item.quantity,
            unitPrice: new Decimal(item.unitPrice),
          })),
        },
      },
    });

    if (invoice.email) {
      await sendInvoiceEmail({
        to: invoice.email,
        customerName: invoice.customerName,
        total: invoice.total.toNumber(),
        date: invoice.date.toISOString().slice(0, 10),
        description: invoice.notes ?? undefined,
        items: data.items.map(
          (item) =>
            `${item.quantity}x ${item.product} @ $${item.unitPrice.toFixed(2)}`
        ),
      });
    }

    logApiSuccess("INVOICE_POST", invoice);
    return createSuccessResponse(invoice, 201);
  } catch (error) {
    logApiError("INVOICE_POST", error);
    return createErrorResponse("Failed to create invoice");
  }
});

export const GET = withAuth(async (user) => {
  try {
    const invoices = await prisma.invoice.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
    });

    logApiSuccess("INVOICE_GET", { count: invoices.length });
    return createSuccessResponse(invoices);
  } catch (error) {
    logApiError("INVOICE_GET", error);
    return createErrorResponse("Failed to fetch invoices");
  }
});
