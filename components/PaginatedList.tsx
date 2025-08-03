"use client";

import { useEffect, useState } from "react";
import { Pagination, Stack } from "@mantine/core";

type PaginatedListProps<T> = {
  data: T[];
  itemsPerPage?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
};

function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) return [];
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

export function PaginatedList<T>({
  data,
  itemsPerPage = 5,
  renderItem,
}: PaginatedListProps<T>) {
  const [activePage, setActivePage] = useState(1);
  const [chunkedData, setChunkedData] = useState<T[][]>([]);

  useEffect(() => {
    setChunkedData(chunk(data, itemsPerPage));
    setActivePage(1);
  }, [data, itemsPerPage]);

  const currentItems = chunkedData[activePage - 1] ?? [];

  return (
    <Stack>
      {currentItems.map((item, index) => renderItem(item, index))}

      {chunkedData.length > 1 && (
        <Pagination
          mt="xl"
          total={chunkedData.length}
          value={activePage}
          onChange={setActivePage}
          color="honey"
        />
      )}
    </Stack>
  );
}
