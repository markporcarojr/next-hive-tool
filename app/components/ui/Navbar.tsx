"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Group } from "@mantine/core";
import {
  IconArchive,
  IconLayoutDashboard,
  IconListCheck,
  IconSeedling,
  IconSettings,
  IconTool,
  IconWind,
} from "@tabler/icons-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./Navbar.module.css";
import { navLinks } from "../../data/navLinks";

const data = [
  { link: "/", label: "Dashboard", icon: IconLayoutDashboard },
  { link: "/hives", label: "Hives", icon: IconArchive },
  { link: "/harvest", label: "Harvest", icon: IconSeedling },
  { link: "/inspection", label: "Inspections", icon: IconListCheck },
  { link: "/swarm", label: "Swarms", icon: IconWind },
  { link: "/inventory", label: "Inventory", icon: IconTool },
  { link: "/settings", label: "Settings", icon: IconSettings },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <h1>Hive Tool</h1>

          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </Group>

        {navLinks.map((item) => (
          <Link
            href={item.link}
            key={item.label}
            className={classes.link}
            data-active={pathname === item.link || undefined}
          >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <div className={classes.footer}>
        <div className={classes.copywright}>
          <span className="text-black-500 dark:text-gray-400 text-sm flex items-center gap-2">
            © {new Date().getFullYear()} Hive Tool. All rights reserved. | v1.0
          </span>
        </div>
      </div>
    </nav>
  );
}
