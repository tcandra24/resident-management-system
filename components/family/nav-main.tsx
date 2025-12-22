"use client";

import { MoreVertical } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useSheet } from "@/lib/contexts/SheetContext";
import { useState } from "react";

type DeleteFamilyProp = {
  id: string;
  house_id: string;
};

export function NavMain({
  items,
  activeFamilyId,
}: {
  items: {
    id: string;
    title: string;
    house_id: string;
    url: string;
  }[];
  activeFamilyId: string;
}) {
  const { toggleSheet, setPayloadData } = useSheet();
  const [confirm, setConfirm] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<DeleteFamilyProp | null>(null);

  const handleOpenSheet = ({ id, house_id, identifier }: { id: string; house_id: string; identifier: string }) => {
    setPayloadData({
      id,
      house_id,
      identifier,
      url: `/api/house/${house_id}/family/${id}`,
    });

    toggleSheet(true);
  };

  const onDelete = (id: string, house_id: string) => {
    setSelectedId({ id, house_id });
    setConfirm(true);
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    const response = await fetch(`/api/house/${selectedId.house_id}/family/${selectedId.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    console.log(data);
  };

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Families</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <DropdownMenu key={item.title}>
              <SidebarMenuItem>
                <div className="flex justify-between items-center">
                  <Link href={item.url}>
                    <SidebarMenuButton isActive={!!(activeFamilyId && item.id === activeFamilyId)} tooltip={item.title}>
                      {item.title}
                    </SidebarMenuButton>
                  </Link>
                  <DropdownMenuTrigger asChild>
                    <MoreVertical className="ml-auto size-4" />
                  </DropdownMenuTrigger>
                </div>
                <DropdownMenuContent className="min-w-20 rounded-lg" side="bottom" align="start">
                  <DropdownMenuItem onClick={() => handleOpenSheet({ id: item.id, house_id: item.house_id, identifier: item.title })}>Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(item.id, item.house_id)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </SidebarMenuItem>
            </DropdownMenu>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      <AlertDialog open={confirm} onOpenChange={setConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete the selected family?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant={"destructive"} onClick={() => handleDelete()}>
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
