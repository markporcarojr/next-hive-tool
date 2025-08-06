import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  withAuth,
  createSuccessResponse,
  createErrorResponse,
  logApiError,
  logApiSuccess,
} from "@/lib/api-utils";

export const GET = withAuth(async (user) => {
  try {
    const settings = await prisma.settings.findUnique({
      where: { userId: user.id },
    });

    logApiSuccess("SETTINGS_GET", settings);
    return createSuccessResponse(settings);
  } catch (error) {
    logApiError("SETTINGS_GET", error);
    return createErrorResponse("Failed to fetch settings");
  }
});

export const POST = withAuth(async (user, req: NextRequest) => {
  try {
    const existing = await prisma.settings.findUnique({
      where: { userId: user.id },
    });

    if (existing) {
      return createErrorResponse("Settings already exist", 409);
    }

    const data = await req.json();
    const newSettings = await prisma.settings.create({
      data: {
        ...data,
        userId: user.id,
      },
    });

    logApiSuccess("SETTINGS_POST", newSettings);
    return createSuccessResponse(newSettings, 201);
  } catch (error) {
    logApiError("SETTINGS_POST", error);
    return createErrorResponse("Failed to create settings");
  }
});

export const PATCH = withAuth(async (user, req: NextRequest) => {
  try {
    const body = await req.json();

    const updated = await prisma.settings.update({
      where: { userId: user.id },
      data: body,
    });

    logApiSuccess("SETTINGS_PATCH", updated);
    return createSuccessResponse(updated);
  } catch (error) {
    logApiError("SETTINGS_PATCH", error);
    return createErrorResponse("Failed to update settings");
  }
});
