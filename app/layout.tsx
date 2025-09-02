// app/layout.tsx
import { headers } from "next/headers";
import { checkUser } from "@/lib/auth/checkUser";
import { ClerkProvider } from "@clerk/nextjs";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "../app/globals.css";
import HeaderNavWrapper from "@/components/layout/HeaderNavWrapper";
import SidebarNav from "@/components/ui/SideBarNav";

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

  const headersList = await headers();
  const pathname = new URL(headersList.get("x-url") || "http://localhost")
    .pathname;

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
            <AppShell
              padding={{ base: 16, sm: 24, md: 32 }}
              navbar={{
                width: 250,
                breakpoint: "sm",
                collapsed: { mobile: true, desktop: false },
              }}
              withBorder={false}
              header={{
                height: { base: 64, sm: 0 },
                collapsed: false,
              }}
            >
              {/* Mobile Header */}
              <AppShellHeader hiddenFrom="sm">
                <HeaderNavWrapper pathname={pathname} />
              </AppShellHeader>

              {/* Desktop Sidebar */}
              <AppShellNavbar visibleFrom="sm">
                <SidebarNav pathname={pathname} />
              </AppShellNavbar>

              <AppShellMain>{children}</AppShellMain>
            </AppShell>
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
