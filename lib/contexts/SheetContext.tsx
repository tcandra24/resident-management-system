"use client";
import { createContext, useState, useContext } from "react";

type PayloadProps = { url: string; id: string; house_id: string; identifier: string };

type SheetContextType = {
  isOpen: boolean;
  toggleSheet: (param: boolean) => void;
  setPayloadData: (param: PayloadProps | null) => void;
  payload: PayloadProps | null;
};

const SheetCreateFamilyContext = createContext<SheetContextType | null>(null);

export function SheetCreateFamilyProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [payload, setPayload] = useState<PayloadProps | null>(null);

  const toggleSheet = (param: boolean) => {
    setIsOpen(param);
  };

  const setPayloadData = (param: PayloadProps | null) => {
    setPayload(param);
  };

  return <SheetCreateFamilyContext.Provider value={{ isOpen, toggleSheet, setPayloadData, payload }}>{children}</SheetCreateFamilyContext.Provider>;
}

export function useSheet() {
  const context = useContext(SheetCreateFamilyContext);
  if (!context) {
    throw new Error("useSheet must be used within a SheetCreateFamilyProvider");
  }
  return context;
}
