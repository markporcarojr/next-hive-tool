"use client";

import { UserButton } from "@clerk/nextjs";
import { Box, Group, Text } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./SideBarNav.module.css";

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
          </Group>
          {links.map((link) => (
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
          <UserButton />
        </div>
      </nav>
    </Box>
  );
}
