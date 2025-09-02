// components/layout/ClientLayoutShell.tsx
"use client";

import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";
import HeaderNav from "../ui/HeaderNav";
import SidebarNav from "../ui/SideBarNav";

type Props = {
  pathname: string;
  children: ReactNode;
};

export default function ClientLayoutShell({ pathname, children }: Props) {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
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
        <HeaderNav
          pathname={pathname}
          opened={opened}
          toggle={toggle}
          close={close}
        />
      </AppShellHeader>

      {/* Sidebar for desktop */}
      <AppShellNavbar visibleFrom="sm">
        <SidebarNav pathname={pathname} />
      </AppShellNavbar>

      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
}
