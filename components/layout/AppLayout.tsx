"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/data/navLinks";
// Temporarily disable UserButton for UI testing
// import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

interface AppLayoutProps {
  children: React.ReactNode;
  pathname: string;
}

export function AppLayout({ children, pathname }: AppLayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Navigation */}
      <div className="md:hidden border-b">
        <div className="flex items-center justify-between p-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col h-full">
                <div className="px-2 py-4">
                  <h2 className="text-lg font-semibold">Hive Tool</h2>
                </div>
                <nav className="flex-1 space-y-1 px-2 py-4">
                  {navLinks.map((link) => {
                    const isActive = pathname.startsWith(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
                <div className="border-t pt-4 px-2">
                  <p className="text-xs text-muted-foreground text-center">
                    © {new Date().getFullYear()} Hive Tool. All rights reserved. | v1.0
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-bold text-primary">Hive Tool</h1>
          {/* Temporarily remove UserButton for UI testing */}
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs">
            U
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex flex-col flex-grow border-r bg-card pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h2 className="text-xl font-bold text-primary">Hive Tool</h2>
              <div className="ml-auto">
                {/* Temporarily remove UserButton for UI testing */}
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs">
                  U
                </div>
              </div>
            </div>
            <div className="mt-8 flex-grow flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="flex-shrink-0 border-t p-4">
                <p className="text-xs text-muted-foreground text-center">
                  © {new Date().getFullYear()} Hive Tool. All rights reserved. | v1.0
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}