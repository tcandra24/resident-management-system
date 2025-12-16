"use client";

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
  activeFamilyId,
}: {
  items: {
    id: string;
    title: string;
    url: string;
  }[];
  activeFamilyId: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Families</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <Link href={item.url}>
              <SidebarMenuButton isActive={!!(activeFamilyId && item.id === activeFamilyId)} tooltip={item.title}>
                {item.title}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
