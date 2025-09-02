// components/layout/HeaderNavWrapper.tsx
"use client";

import { useDisclosure } from "@mantine/hooks";
import HeaderNav from "../ui/HeaderNav";

export default function HeaderNavWrapper({ pathname }: { pathname: string }) {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <HeaderNav
      pathname={pathname}
      opened={opened}
      toggle={toggle}
      close={close}
    />
  );
}
