"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Fragment, useEffect, useState } from "react";

const formatLabel = (segment: string) => segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

export function AppBreadcrumb({ segments }: { segments: string[] }) {
  const [paths, setPaths] = useState<string[]>(segments);

  useEffect(() => {
    async function resolveBreadcrumbs() {
      const updatedPaths = [...segments];

      const page = updatedPaths[0];
      const id = updatedPaths[1];

      if (!id) {
        setPaths(updatedPaths);
        return;
      }

      if (page === "residents") {
        const response = await fetch(`/api/resident/${id}`);
        const data = await response.json();

        updatedPaths[1] = data.data.name;
      }

      if (page === "houses") {
        const response = await fetch(`/api/house/${id}`);
        const data = await response.json();

        updatedPaths[1] = data.data.number;
      }

      setPaths(updatedPaths);
    }

    resolveBreadcrumbs();
  }, [segments]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((segment, index) => {
          const href = `/${paths.slice(0, index + 1).join("/")}`;

          return (
            <Fragment key={href}>
              {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
              <BreadcrumbItem>
                <BreadcrumbPage>{formatLabel(segment)}</BreadcrumbPage>
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
