// app/layout.tsx
import { headers } from "next/headers";
// Temporarily disable checkUser for UI testing
// import { checkUser } from "@/lib/auth/checkUser";
// import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import "../app/globals.css";
import { AppLayout } from "@/components/layout/AppLayout";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Hive Tool",
  description: "A beekeeping companion app",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Temporarily disable for UI testing
  // await checkUser();

  const headersList = await headers();
  const pathname = new URL(headersList.get("x-url") || "http://localhost")
    .pathname;

  return (
    // Temporarily disable Clerk for UI testing
    // <ClerkProvider>
      <html lang="en" className="font-sans">
        <body>
          <AppLayout pathname={pathname}>
            {children}
          </AppLayout>
          <Toaster />
        </body>
      </html>
    // </ClerkProvider>
  );
}
