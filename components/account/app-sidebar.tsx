"use client";

import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

import { IconArrowLeft } from "@tabler/icons-react";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const segments = usePathname();
  const lastSegment = segments.split("/").filter(Boolean).at(-1);

  const menu = [
    {
      title: "Preferences",
      name: "me",
      url: `/dashboard/account/me`,
    },
  ];

  return (
    <>
      <Sidebar collapsible="none">
        <SidebarHeader className="border-sidebar-border border-b text-sm px-8">
          <Link href="/dashboard/residents" className="flex items-center gap-2 hover:text-white">
            <IconArrowLeft className="size-4" />
            <span className="m-1">Back to Dashboard</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <h1 className="w-full my-2 text-sm font-mono-heading uppercase px-8">Account Settings</h1>
            {menu.map((element) => (
              <SidebarMenuItem key={element.name} className={cn(lastSegment === element.name && "bg-sidebar-accent text-sidebar-accent-foreground", "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm mx-6 rounded-md text-white")}>
                <Link href={element.url}>
                  <SidebarMenuButton>{element.title}</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <SidebarSeparator className="mx-0" />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
