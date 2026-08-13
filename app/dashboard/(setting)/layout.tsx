import { AppSidebar } from "@/components/account/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="w-full flex flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
