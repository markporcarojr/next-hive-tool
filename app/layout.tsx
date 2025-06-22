// File: app/layout.tsx
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import Navbar from "../app/components/Navbar";
import "../app/globals.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hive Tool",
  description: "A beekeeping companion app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-black text-white`}>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <MantineProvider
            defaultColorScheme="dark"
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
            <div className="flex min-h-screen">
              <Navbar />
              <main className="flex-1 p-6 overflow-auto bg-[#fff8e1] text-[#3e2723] dark:bg-[#0a0a0a] dark:text-[#ededed] transition-colors duration-300 ease-in-out">
                {children}
              </main>
            </div>
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
