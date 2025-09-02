// app/components/SidebarNav.tsx
"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import { Box, Group, Text } from "@mantine/core";
import { Links } from "./Navlinks"; // Adjust path if needed
import classes from "./SideBarNav.module.css";

export default function SidebarNav() {
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

          <div className="flex items-center gap-4 mb-4">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
          </div>

          <Links
            linkClassName={classes.link}
            activeClassName="active" // or pass a class like classes.active if you have one
          />
        </div>

        <div className={classes.footer}>
          <span className="text-black-500 dark:text-gray-400 text-sm flex items-center gap-2">
            © {new Date().getFullYear()} Hive Tool. All rights reserved. | v1.0
          </span>
        </div>
      </nav>
    </Box>
  );
}
