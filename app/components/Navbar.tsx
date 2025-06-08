"use client";

import { Group } from "@mantine/core";
import {
  IconArchive,
  IconDatabaseImport,
  IconWind,
  IconLayoutDashboard,
  IconListCheck,
  IconLogout,
  IconSeedling,
  IconSettings,
  IconTool,
} from "@tabler/icons-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./Navbar.module.css";

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
          {/* <Code fw={700}>v2.0.1</Code> */}
        </Group>

        {data.map((item) => (
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
        <a
          href="/logout"
          className={classes.link}
          onClick={(e) => {
            console.log(e);
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
