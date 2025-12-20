"use client";

import { MoreVertical } from "lucide-react";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useSheet } from "@/lib/contexts/SheetContext";

export function NavMain({
  items,
  activeFamilyId,
}: {
  items: {
    id: string;
    title: string;
    house_id: string;
    url: string;
  }[];
  activeFamilyId: string;
}) {
  const { toggleSheet, setPayloadData } = useSheet();

  const handleOpenSheet = ({ id, house_id, identifier }: { id: string; house_id: string; identifier: string }) => {
    setPayloadData({
      id,
      house_id,
      identifier,
      url: `/api/house/${house_id}/family/${id}`,
    });

    toggleSheet(true);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Families</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <DropdownMenu key={item.title}>
            <SidebarMenuItem>
              <div className="flex justify-between items-center">
                <Link href={item.url}>
                  <SidebarMenuButton isActive={!!(activeFamilyId && item.id === activeFamilyId)} tooltip={item.title}>
                    {item.title}
                  </SidebarMenuButton>
                </Link>
                <DropdownMenuTrigger asChild>
                  <MoreVertical className="ml-auto size-4" />
                </DropdownMenuTrigger>
              </div>
              <DropdownMenuContent className="min-w-20 rounded-lg" side="bottom" align="start">
                <DropdownMenuItem onClick={() => handleOpenSheet({ id: item.id, house_id: item.house_id, identifier: item.title })}>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </SidebarMenuItem>
          </DropdownMenu>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
