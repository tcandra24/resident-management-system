"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { IconPlus, IconSearch } from "@tabler/icons-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Avatar } from "@/components/ui/avatar";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export type EntityListItem = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
};

type EntityListProps = {
  items: EntityListItem[];
  icon: ReactNode;
  searchPlaceholder: string;
  addHref: string;
  addLabel: string;
  emptyTitle: string;
  emptyDescription: string;
};

/**
 * Shared searchable, responsive card grid used for the resident and house
 * index pages. Search filters by `title`; layout is a 1/2/3-column grid
 * depending on viewport instead of an unwrapped flex row.
 */
export function EntityList({ items, icon, searchPlaceholder, addHref, addLabel, emptyTitle, emptyDescription }: EntityListProps) {
  const [searchParam, setSearchParam] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchParam) return items;
    return items.filter((item) => item.title.toLowerCase().includes(searchParam.toLowerCase()));
  }, [searchParam, items]);

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row gap-3 sm:justify-between">
        <div className="w-full sm:w-1/3">
          <InputGroup>
            <InputGroupInput placeholder={searchPlaceholder} value={searchParam} onChange={(e) => setSearchParam(e.target.value)} />
            <InputGroupAddon>
              <IconSearch />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <Button asChild className="font-bold w-full sm:w-auto">
          <Link href={addHref}>
            <IconPlus />
            {addLabel}
          </Link>
        </Button>
      </div>

      <div className="mt-5">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => (
              <Link key={item.id} href={item.href} className="group hover:cursor-pointer">
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex gap-4">
                      <Avatar>{icon}</Avatar>
                      <div className="flex flex-col space-y-1 min-w-0">
                        <CardTitle className="group-hover:text-gray-500 truncate">{item.title}</CardTitle>
                        <CardDescription className="text-gray-400 font-bold group-hover:text-gray-300 truncate">{item.subtitle}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        ) : searchParam ? (
          <Alert>
            <AlertTitle>No results found</AlertTitle>
            <AlertDescription>You search for &quot;{searchParam}&quot; did not return any results</AlertDescription>
          </Alert>
        ) : (
          <Empty className="border border-double w-full">
            <EmptyHeader>
              <EmptyTitle className="font-bold">{emptyTitle}</EmptyTitle>
              <EmptyDescription>{emptyDescription}</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button asChild variant="outline" size="sm">
                <Link href={addHref}>
                  <IconPlus />
                  {addLabel}
                </Link>
              </Button>
            </EmptyContent>
          </Empty>
        )}
      </div>
    </>
  );
}
