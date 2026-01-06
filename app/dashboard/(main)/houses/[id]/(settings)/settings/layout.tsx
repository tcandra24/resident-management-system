import { AppSidebar } from "@/components/house/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({
  settings,
}: Readonly<{
  settings: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 pt-0">{settings}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
