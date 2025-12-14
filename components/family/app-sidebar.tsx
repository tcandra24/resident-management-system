"use client";
import { IconPlus } from "@tabler/icons-react";

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavMain } from "@/components/family/nav-main";
import { Button } from "@/components/ui/button";

import { useState, useRef, useEffect, useCallback } from "react";
import { AddNewForm } from "@/components/family/add-new-form";
import { useParams } from "next/navigation";

type AppSideBarFamilyProps = {
  title: string;
  url: string;
};

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [families, setFamilies] = useState<AppSideBarFamilyProps[]>([]);
  const formRef = useRef<{ submit: () => void }>(null);

  const params = useParams();

  const handleOpenSheet = () => {
    setIsOpen(true);
  };

  const onSubmit = () => {
    formRef.current?.submit();
  };

  useEffect(() => {
    if (!params?.id) return;

    const fetchFamilies = async () => {
      const response = await fetch(`/api/family/${params.id}`);

      const data = await response.json();
      if (!data.success) {
        console.log("Error : " + data.message);
        return;
      }

      const mappingData = data.data.map((family: { identifier: string; id: string }) => {
        return {
          title: family.identifier,
          url: `/family/${family.id}`,
        };
      });

      setFamilies(mappingData);
    };

    fetchFamilies();
  }, [params?.id]);

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
        <NavMain items={families} />
      </SidebarContent>
      <SidebarRail />
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add family</SheetTitle>
            <SheetDescription>Make changes to your profile here. Click save when you&apos;re done.</SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[400px]">
            <AddNewForm ref={formRef} />
          </ScrollArea>
          <SheetFooter>
            <div className="flex justify-between">
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>

              <Button className="cursor-pointer" type="button" onClick={() => onSubmit()}>
                Save changes
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </Sidebar>
  );
}
