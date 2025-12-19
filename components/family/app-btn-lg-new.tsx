"use client";

import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { useSheet } from "@/lib/contexts/SheetContext";
import { IconUsersGroup } from "@tabler/icons-react";

export function AppBtnLgNew() {
  const { toggleSheet } = useSheet();

  return (
    <Item variant="outline" className="hover:cursor-pointer" size="sm" onClick={() => toggleSheet(true)}>
      <ItemMedia>
        <div className="bg-primary p-2 rounded-full">
          <IconUsersGroup className="size-7 text-white" />
        </div>
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="font-bold">Create a family</ItemTitle>
        <ItemDescription className="text-xs">Create and manage family data</ItemDescription>
      </ItemContent>
    </Item>
  );
}
