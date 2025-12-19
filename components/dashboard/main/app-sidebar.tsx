"use client";

import { useUser } from "@clerk/nextjs";

import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarFooter, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user: getUser } = useUser();

  const userData = {
    name: getUser?.fullName ?? "",
    email: getUser?.primaryEmailAddress?.emailAddress ?? "",
    avatar: getUser?.imageUrl ?? "",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <Image src={"/logo.png"} alt="Logo" width={30} height={30} />
                <span className="text-base font-semibold">{process.env.NEXT_PUBLIC_APP_NAME!}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator />
      </SidebarHeader>
      <SidebarContent>{/*  */}</SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
