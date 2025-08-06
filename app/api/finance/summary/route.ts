import { NextRequest } from "next/server";
import { 
  withAuth, 
  createSuccessResponse, 
  createErrorResponse,
  logApiError,
  logApiSuccess
} from "@/lib/api-utils";
import { getFinanceSummary } from "@/lib/finance-utils";

export const GET = withAuth(async (user) => {
  try {
    const summary = await getFinanceSummary(user.id);

    logApiSuccess("FINANCE_SUMMARY_GET", summary);
    return createSuccessResponse(summary);
  } catch (error) {
    logApiError("FINANCE_SUMMARY_GET", error);
    return createErrorResponse("Failed to fetch finance summary");
  }
}); 