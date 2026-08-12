"use client";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

import { useCallback, useEffect, useState } from "react";

import { IconDashboard, IconListDetails, IconSettings } from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { DataSwitcher } from "@/components/data-switcher";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";

import Image from "next/image";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [residents, setResidents] = useState([]);
  const { user: getUser } = useUser();
  const { id } = useParams();

  const fetchResidents = useCallback(async () => {
    const response = await fetch(`/api/resident`);
    const data = await response.json();

    if (!data.success) {
      console.log("Error : " + data.message);
      return;
    }

    setResidents(data.data);
  }, []);

  const data = {
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
        title: "House Overview",
        url: `/dashboard/houses/${id}`,
        icon: IconDashboard,
      },
      {
        title: "Family Editor",
        url: `/dashboard/houses/${id}/editor`,
        icon: IconListDetails,
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: `/dashboard/houses/${id}/settings/general`,
        icon: IconSettings,
      },
    ],
  };

  const userData = {
    name: getUser?.fullName ?? "",
    email: getUser?.primaryEmailAddress?.emailAddress ?? "",
    avatar: getUser?.imageUrl ?? "",
  };

  useEffect(() => {
    fetchResidents();
  }, [fetchResidents]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/dashboard/residents">
                <Image src={"/logo.png"} alt="Logo" width={30} height={30} />
                <span className="text-base font-semibold">{process.env.NEXT_PUBLIC_APP_NAME!}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator />
        <DataSwitcher residents={residents} />
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
