import { AppSidebar } from "@/components/family/app-sidebar";
import { AppHeader } from "@/components/house/editor/header";
// import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({
  family,
}: Readonly<{
  family: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-1 flex-col gap-4 pt-0">{family}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
