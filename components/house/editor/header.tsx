"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function AppHeader() {
  const pathname = usePathname();
  const [header, setHeader] = useState("families");
  const segments = pathname.split("/").filter(Boolean);
  const familyId = segments[4];

  useEffect(() => {
    async function resolveHeader() {
      if (familyId) {
        const response = await fetch(`/api/family/${familyId}`);
        const data = await response.json();

        setHeader(data.data.identifier);
      }
    }

    resolveHeader();
  }, [familyId]);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4 py-2 w-full border-b">
        {/* <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" /> */}
        <p className="font-semibold">{header.toUpperCase()}</p>
      </div>
    </header>
  );
}
