// app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { ReactNode } from "react";
import "../app/globals.css";
import { checkUser } from "@/lib/auth/checkUser";
import ClientLayoutShell from "@/components/layout/ClientLayoutShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hive Tool",
  description: "A beekeeping companion app",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  await checkUser();
  const pathname = (await headers()).get("x-pathname") || "/";

  return (
    <ClerkProvider>
      <html lang="en" {...mantineHtmlProps} className={inter.className}>
        <head>
          <ColorSchemeScript />
        </head>
        <body>
          <MantineProvider
            defaultColorScheme="auto"
            theme={{
              colors: {
                honey: [
                  "#fffbea",
                  "#fff3c4",
                  "#fce588",
                  "#fadb5f",
                  "#f7c948",
                  "#f0b429",
                  "#de911d",
                  "#cb6e17",
                  "#b44d12",
                  "#8d2b0b",
                ],
              },
              primaryColor: "honey",
              fontFamily: inter.style.fontFamily,
            }}
          >
            <Notifications position="top-right" />
            <ClientLayoutShell pathname={pathname}>
              {children}
            </ClientLayoutShell>
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
