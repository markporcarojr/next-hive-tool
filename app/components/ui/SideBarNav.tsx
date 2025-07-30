"use client";

import {
  SignedOut,
  SignedIn,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Box, Group, Text } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./SideBarNav.module.css";
import { navLinks } from "../../data/navLinks"; // Assuming you have a separate file for links

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/hives", label: "Hives" },
  { href: "/harvest", label: "Harvest" },
  { href: "/inspection", label: "Inspections" },
  { href: "/swarm", label: "Swarms" },
  { href: "/inventory", label: "Inventory" },
  { href: "/finance", label: "Finance" },
  { href: "/settings", label: "Settings" },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <Box visibleFrom="sm">
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="space-between">
            <Text fw={700}>Hive Tool</Text>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Group>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
          </div>
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.label}
              className={classes.link}
              data-active={pathname === link.href || undefined}
            >
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
        <div className={classes.footer}>
          <div className={classes.copywright}>
            <span className="text-black-500 dark:text-gray-400 text-sm flex items-center gap-2">
              © {new Date().getFullYear()} Hive Tool. All rights reserved. |
              v1.0
            </span>
          </div>
        </div>
      </nav>
    </Box>
  );
}
