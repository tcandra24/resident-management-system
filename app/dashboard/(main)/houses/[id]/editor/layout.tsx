import { AppSidebar } from "@/components/family/app-sidebar";
import { AppHeader } from "@/components/house/editor/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { SheetCreateFamilyProvider } from "@/lib/contexts/SheetContext";

export default function Layout({
  family,
}: Readonly<{
  family: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SheetCreateFamilyProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <div className="flex flex-1 flex-col gap-4 pt-0">{family}</div>
        </SidebarInset>
      </SheetCreateFamilyProvider>
    </SidebarProvider>
  );
}
