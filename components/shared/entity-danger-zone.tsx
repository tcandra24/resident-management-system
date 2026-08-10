"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquareWarning } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type EntityDangerZoneProps = {
  /** Lowercase entity name used in copy, e.g. "resident", "house". */
  entityLabel: string;
  warningTitle: string;
  warningBody?: string;
  /** API endpoint called with DELETE to remove this entity. */
  deleteEndpoint: string;
  /** Exact string the user must type to enable the delete button. */
  confirmValue: string;
  /** Human-readable name shown in the confirmation copy (can differ in casing from confirmValue). */
  confirmDisplayValue: string;
  redirectAfterDelete: string;
};

/**
 * Shared "delete this entity" danger zone: warning banner + confirmation
 * dialog that requires typing the entity's name before the destructive
 * action is enabled. Used by residents, houses, and similar entities.
 */
export function EntityDangerZone({ entityLabel, warningTitle, warningBody = "Make sure you have made a backup of your data if you want to keep it.", deleteEndpoint, confirmValue, confirmDisplayValue, redirectAfterDelete }: EntityDangerZoneProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [verifyText, setVerifyText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const canDelete = verifyText.trim() === confirmValue;

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) setVerifyText("");
  };

  const handleDelete = async () => {
    if (!canDelete || isDeleting) return;

    setIsDeleting(true);
    try {
      const response = await fetch(deleteEndpoint, { method: "DELETE" });
      const data = await response.json();

      if (!data.success) throw new Error(data.message);

      router.replace(redirectAfterDelete);
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Alert variant="destructive" className="bg-[#d2150326]">
        <MessageSquareWarning />
        <AlertTitle className="font-bold">{warningTitle}</AlertTitle>
        <AlertDescription className="flex flex-col gap-3">
          <p className="m-0">{warningBody}</p>
          <div className="w-full">
            <Button variant="destructive" className="font-bold cursor-pointer" onClick={() => setIsOpen(true)}>
              Delete {entityLabel}
            </Button>
          </div>
        </AlertDescription>
      </Alert>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {entityLabel}</DialogTitle>
            <DialogDescription>
              This action <span className="font-bold">cannot</span> be undone. This will permanently delete <span className="font-bold">{confirmDisplayValue}</span> and all of its related data.
            </DialogDescription>
          </DialogHeader>

          <div className="my-2 space-y-2">
            <Label htmlFor="verify-delete" className="font-bold">
              Please type {confirmValue} to confirm
            </Label>
            <Input id="verify-delete" placeholder="Enter string above" value={verifyText} onChange={(e) => setVerifyText(e.target.value)} autoComplete="off" />
          </div>

          <DialogFooter>
            <Button className="w-full font-bold my-2" variant="destructive" disabled={!canDelete || isDeleting} onClick={handleDelete}>
              {isDeleting ? "Deleting…" : `I understand, delete this ${entityLabel}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
