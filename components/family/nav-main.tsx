"use client";
import { IconSearch } from "@tabler/icons-react";
import { MoreVertical } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { useSheet } from "@/lib/contexts/SheetContext";
import { useMemo, useState } from "react";

type DeleteFamilyProp = {
  id: string;
  house_id: string;
};

export function NavMain({
  items,
  activeFamilyId,
  onSuccess,
}: {
  items: {
    id: string;
    title: string;
    house_id: string;
    url: string;
  }[];
  activeFamilyId: string;
  onSuccess: (method: string, redirectUrl?: string) => void;
}) {
  const { toggleSheet, setPayloadData } = useSheet();
  const [confirm, setConfirm] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<DeleteFamilyProp | null>(null);
  const [searchParam, setSearchParam] = useState("");

  const handleOpenSheet = ({ id, house_id, identifier }: { id: string; house_id: string; identifier: string }) => {
    setPayloadData({
      id,
      house_id,
      identifier,
      url: `/api/house/${house_id}/family/${id}`,
    });

    toggleSheet(true);
  };

  const filteredFamilies = useMemo(() => {
    if (!searchParam) return items;

    return items.filter((item) => item.title.toLowerCase().includes(searchParam.toLowerCase()));
  }, [searchParam, items]);

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

    if (!data.success) {
      console.log("Error : " + data.message);
      return;
    }

    setSelectedId(null);

    onSuccess?.("DELETE", `/dashboard/houses/${selectedId.house_id}/editor`);
  };

  return (
    <>
      <InputGroup className="my-1 w-fit">
        <InputGroupInput placeholder="Search for family..." value={searchParam} onChange={(e) => setSearchParam(e.target.value)} />
        <InputGroupAddon>
          <IconSearch />
        </InputGroupAddon>
      </InputGroup>
      <SidebarGroup className="p-0">
        <SidebarGroupLabel>Families</SidebarGroupLabel>
        <SidebarMenu>
          {filteredFamilies.length > 0 ? (
            filteredFamilies.map((item) => (
              <DropdownMenu key={item.title}>
                <SidebarMenuItem>
                  <div className="flex justify-between items-center">
                    <SidebarMenuButton isActive={!!(activeFamilyId && item.id === activeFamilyId)} tooltip={item.title}>
                      <Link href={item.url}>{item.title}</Link>
                      <DropdownMenuTrigger asChild>
                        <MoreVertical className="ml-auto size-4" />
                      </DropdownMenuTrigger>
                    </SidebarMenuButton>
                  </div>
                  <DropdownMenuContent className="min-w-20 rounded-lg" side="bottom" align="start">
                    <DropdownMenuItem onClick={() => handleOpenSheet({ id: item.id, house_id: item.house_id, identifier: item.title })}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(item.id, item.house_id)}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </SidebarMenuItem>
              </DropdownMenu>
            ))
          ) : (
            <Alert className="text-center">
              {searchParam ? (
                <>
                  <AlertTitle className="font-bold text-xs">No results found</AlertTitle>
                  <AlertDescription className="text-xs">You search for &quot;{searchParam}&quot; did not return any results</AlertDescription>
                </>
              ) : (
                <>
                  <AlertTitle className="font-bold text-xs">No families</AlertTitle>
                  <AlertDescription className="text-xs">Any family you create will be listed here.</AlertDescription>
                </>
              )}
            </Alert>
          )}
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
