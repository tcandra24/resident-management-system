import { AppNavbar } from "@/components/resident/setting/app-navbar";

export default function Layout({
  setting,
}: Readonly<{
  setting: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="flex flex-col gap-7">
          <h1 className="text-3xl">Resident Settings</h1>
          <div className="border-b border-b-muted w-full">
            <AppNavbar />
          </div>
        </div>
        <div>{setting}</div>
      </div>
    </>
  );
}
