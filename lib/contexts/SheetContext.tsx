"use client";
import { createContext, useState, useContext } from "react";

type SheetContextType = {
  isOpen: boolean;
  toggleSheet: (param: boolean) => void;
};

const SheetCreateFamilyContext = createContext<SheetContextType | null>(null);

export function SheetCreateFamilyProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSheet = (param: boolean) => {
    setIsOpen(param);
  };

  return <SheetCreateFamilyContext.Provider value={{ isOpen, toggleSheet }}>{children}</SheetCreateFamilyContext.Provider>;
}

export function useSheet() {
  const context = useContext(SheetCreateFamilyContext);
  if (!context) {
    throw new Error("useSheet must be used within a SheetCreateFamilyProvider");
  }
  return context;
}
