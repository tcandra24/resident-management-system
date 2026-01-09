"use client";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import { useParams, usePathname } from "next/navigation";

export function AppNavbar() {
  const { id } = useParams();
  const segments = usePathname();
  const lastSegment = segments.split("/").filter(Boolean).at(-1);

  const menu = [
    {
      title: "General",
      name: "general",
      url: `/dashboard/residents/${id}/general`,
    },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-3 flex-wrap">
        {menu.map((element) => (
          <NavigationMenuItem key={element.name} className={cn(lastSegment === element.name && "border-b-3 border-b-gray-500")}>
            <NavigationMenuLink href={element.url}>{element.title}</NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
