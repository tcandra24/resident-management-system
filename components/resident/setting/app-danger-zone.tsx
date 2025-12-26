"use client";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import { MessageSquareWarning } from "lucide-react";
import { useState } from "react";
import { AppInputVerifyDelete } from "./app-input-verify-delete";

type ResidentProps = {
  id: string;
  name: string;
};

export function AppDangerZone({ resident }: { resident: ResidentProps }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Alert variant="destructive" className="bg-[#d2150326]">
        <MessageSquareWarning />
        <AlertTitle className="font-bold">Deleting this resident will also remove its houses</AlertTitle>
        <AlertDescription className="flex flex-col gap-3">
          <p className="m-0">Make sure you have made a backup of your projects if you want to keep your data.</p>
          <div className="w-full">
            <Button variant={"destructive"} className="font-bold cursor-pointer" onClick={() => setIsOpen(true)}>
              Delete resident
            </Button>
          </div>
        </AlertDescription>
      </Alert>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete resident</AlertDialogTitle>
            <AlertDialogDescription>
              This action <span className="font-bold">cannot</span> be undone. This will permanently delete the <span className="font-bold">{resident.name}</span> resident and remove all of its houses.
            </AlertDialogDescription>
            <AlertDialogDescription className="my-4">
              <AppInputVerifyDelete />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button className="w-full font-bold" variant={"destructive"}>
                I understand, delete this resident
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
