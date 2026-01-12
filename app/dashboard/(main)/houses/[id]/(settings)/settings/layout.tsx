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
        <div className="w-full flex flex-col">{settings}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
