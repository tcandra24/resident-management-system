"use client";

import { useUser } from "@clerk/nextjs";

import { IconBrandGoogleHome, IconInnerShadowTop, IconSettings } from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { DataSwitcher } from "@/components/data-switcher";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user: getUser } = useUser();
  const { id } = useParams();

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Houses",
        url: `/dashboard/residents/${id}`,
        icon: IconBrandGoogleHome,
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: IconSettings,
      },
    ],
  };

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
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator />
        <DataSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
