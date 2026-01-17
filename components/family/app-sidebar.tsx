"use client";
import { IconPlus } from "@tabler/icons-react";

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavMain } from "@/components/family/nav-main";
import { Button } from "@/components/ui/button";

import { useState, useRef, useEffect, useEffectEvent } from "react";
import { AddNewForm } from "@/components/family/add-new-form";
import { useRouter, useParams } from "next/navigation";

import { useSheet } from "@/lib/contexts/SheetContext";

type AppSideBarFamilyProps = {
  id: string;
  title: string;
  house_id: string;
  url: string;
};

export function AppSidebar() {
  const { isOpen, toggleSheet, setPayloadData, payload } = useSheet();
  const [families, setFamilies] = useState<AppSideBarFamilyProps[]>([]);
  const formRef = useRef<{ submit: () => void }>(null);

  const params = useParams();
  const router = useRouter();

  const handleOpenSheet = () => {
    setPayloadData(null);
    toggleSheet(true);
  };

  const fetchFamilies = async () => {
    if (isOpen) {
      toggleSheet(false);
    }

    const response = await fetch(`/api/house/${params.id}/families`);

    const data = await response.json();
    if (!data.success) {
      console.log("Error : " + data.message);
      return;
    }

    const mappingData = data.data.map((family: { identifier: string; id: string; house_id: string }) => {
      return {
        id: family.id,
        title: family.identifier,
        house_id: family.house_id,
        url: `/dashboard/houses/${params?.id}/editor/${family.id}`,
      };
    });

    return mappingData;
  };

  const eventFetchFamilies = useEffectEvent(async () => {
    const families = await fetchFamilies();
    setFamilies(families);
  });

  const handleFormSuccess = async (method: string, redirectUrl: string = "") => {
    if (method === "POST" || method === "DELETE") {
      router.replace(redirectUrl);
    } else {
      const families = await fetchFamilies();
      setFamilies(families);
    }
  };

  const onSubmit = () => {
    formRef.current?.submit();
  };

  useEffect(() => {
    if (!params?.id) return;
    eventFetchFamilies();
  }, [params?.id, params?.family_id]);

  return (
    <Sidebar collapsible="none" className="mx-3">
      <SidebarHeader className="px-0">
        <h2 className="font-bold">Family Editor</h2>
      </SidebarHeader>
      <SidebarContent>
        <Button className="my-1 cursor-pointer font-bold" onClick={() => handleOpenSheet()}>
          <IconPlus />
          Add Family
        </Button>
        <NavMain items={families} activeFamilyId={(params?.family_id as string) ?? ""} onSuccess={handleFormSuccess} />
      </SidebarContent>
      <SidebarRail />
      <Sheet open={isOpen} onOpenChange={toggleSheet}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{payload ? "Update Family" : "Add Family"}</SheetTitle>
            <SheetDescription>Make changes to your family here. Click save when you&apos;re done.</SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[400px]">
            <AddNewForm ref={formRef} onSuccess={handleFormSuccess} />
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
