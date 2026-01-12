"use client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import { MessageSquareWarning } from "lucide-react";
import { useRef, useState } from "react";
import { AppInputVerifyDelete } from "@/components/house/setting/app-input-verify-delete";

type HouseProps = {
  id: string;
  resident_id: string;
  number: string;
};

export function AppDangerZone({ house }: { house: HouseProps }) {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<{ submit: () => void }>(null);

  const onSubmit = () => {
    formRef.current?.submit();
  };

  return (
    <>
      <Alert variant="destructive" className="bg-[#d2150326]">
        <MessageSquareWarning />
        <AlertTitle className="font-bold">Deleting this house will also remove its families</AlertTitle>
        <AlertDescription className="flex flex-col gap-3">
          <p className="m-0">Make sure you have made a backup of your projects if you want to keep your data.</p>
          <div className="w-full">
            <Button variant={"destructive"} className="font-bold cursor-pointer" onClick={() => setIsOpen(true)}>
              Delete house
            </Button>
          </div>
        </AlertDescription>
      </Alert>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete house</DialogTitle>
            <DialogDescription>
              This action <span className="font-bold">cannot</span> be undone. This will permanently delete the <span className="font-bold">{house.number}</span> house and remove all of its families.
            </DialogDescription>
          </DialogHeader>
          <div className="my-2">
            <AppInputVerifyDelete ref={formRef} id={house.id} resident_id={house.resident_id} number={house.number.toLowerCase().replaceAll(" ", "-")} />
          </div>
          <DialogFooter>
            <Button className="w-full font-bold my-2" variant={"destructive"} onClick={() => onSubmit()}>
              I understand, delete house
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
