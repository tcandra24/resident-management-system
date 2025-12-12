"use client";
import { IconPlus } from "@tabler/icons-react";

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavMain } from "@/components/family/nav-main";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { AddNewForm } from "@/components/family/add-new-form";

const sidebarData = [
  {
    title: "Playground",
    url: "#",
  },
  {
    title: "Models",
    url: "#",
  },
  {
    title: "Documentation",
    url: "#",
  },
  {
    title: "Settings",
    url: "#",
  },
];

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenSheet = () => {
    // console.log("Open Sheet");
    setIsOpen(true);
  };

  return (
    <Sidebar collapsible="none">
      <SidebarHeader>
        <h2 className="font-bold">Family Editor</h2>
      </SidebarHeader>
      <SidebarContent>
        <Button className="mx-5 my-2 cursor-pointer" onClick={() => handleOpenSheet()}>
          <IconPlus />
          Add Family
        </Button>
        <NavMain items={sidebarData} />
      </SidebarContent>
      <SidebarRail />
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add family</SheetTitle>
            <SheetDescription>Make changes to your profile here. Click save when you&apos;re done.</SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[600px]">
            <AddNewForm />
          </ScrollArea>
          <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </Sidebar>
  );
}
