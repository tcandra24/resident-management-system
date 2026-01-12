"use client";

import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function AppSidebar() {
  const { id } = useParams();
  const segments = usePathname();
  const lastSegment = segments.split("/").filter(Boolean).at(-1);

  const menu = [
    {
      title: "General",
      name: "general",
      url: `/dashboard/houses/${id}/settings/general`,
    },
  ];

  return (
    <>
      <Sidebar collapsible="none">
        <SidebarHeader className="border-sidebar-border border-b text-2xl font-bold">
          <h1 className="m-3">Settings</h1>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <h1 className="w-full mx-3 mt-2 text-xl font-bold">House Setting</h1>
            {menu.map((element) => (
              <SidebarMenuItem key={element.name} className={cn(lastSegment === element.name && "bg-sidebar-accent text-sidebar-accent-foreground", "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm mx-3")}>
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
