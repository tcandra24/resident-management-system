"use client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import { MessageSquareWarning } from "lucide-react";
import { useRef, useState } from "react";
import { AppInputVerifyDelete } from "./app-input-verify-delete";

type ResidentProps = {
  id: string;
  name: string;
};

export function AppDangerZone({ resident }: { resident: ResidentProps }) {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<{ submit: () => void }>(null);

  const onSubmit = () => {
    formRef.current?.submit();
  };

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
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete resident</DialogTitle>
            <DialogDescription>
              This action <span className="font-bold">cannot</span> be undone. This will permanently delete the <span className="font-bold">{resident.name}</span> resident and remove all of its houses.
            </DialogDescription>
          </DialogHeader>
          <div className="my-2">
            <AppInputVerifyDelete ref={formRef} name={resident.name.toLowerCase().replaceAll(" ", "-")} />
          </div>
          <DialogFooter>
            <Button className="w-full font-bold my-2" variant={"destructive"} onClick={() => onSubmit()}>
              I understand, delete this resident
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
