// app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import {
  AppShell,
  AppShellHeader,
  AppShellNavbar,
  AppShellMain,
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
import SidebarNav from "./components/ui/SideBarNav";
import HeaderNav from "./components/ui/HeaderNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hive Tool",
  description: "A beekeeping companion app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
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
              padding="md"
              navbar={{
                width: 250,
                breakpoint: "sm",
                collapsed: { mobile: true, desktop: false },
              }}
              withBorder={false}
            >
              {/* Desktop Header */}
              <AppShellHeader hiddenFrom="sm">
                <HeaderNav />
              </AppShellHeader>

              {/* Desktop Sidebar */}
              <AppShellNavbar visibleFrom="sm">
                <SidebarNav />
              </AppShellNavbar>

              {/* Main content with custom mobile padding */}
              <AppShellMain className="pt-24 sm:pt-5">{children}</AppShellMain>
            </AppShell>
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
