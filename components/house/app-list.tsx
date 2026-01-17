"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { IconPlus, IconSearch, IconHome2 } from "@tabler/icons-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Avatar } from "@/components/ui/avatar";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type HouseProps = {
  id: string;
  number: string;
  address: string;
};

export function AppList({ houses, id }: { houses: HouseProps[]; id: string }) {
  const [searchParam, setSearchParam] = useState("");

  const filteredHouses = useMemo(() => {
    if (!searchParam) return houses;

    return houses.filter((house) => house.number.toLowerCase().includes(searchParam.toLowerCase()));
  }, [searchParam, houses]);

  return (
    <>
      <div className="w-full flex justify-between">
        <div className="w-1/3">
          <InputGroup>
            <InputGroupInput placeholder="Search for house..." value={searchParam} onChange={(e) => setSearchParam(e.target.value)} />
            <InputGroupAddon>
              <IconSearch />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <Link href={`/dashboard/houses/new/${id}`}>
          <Button className="font-bold">
            <IconPlus />
            Add House
          </Button>
        </Link>
      </div>
      <div className="flex gap-5">
        {filteredHouses.length > 0 ? (
          filteredHouses.map((house: HouseProps) => (
            <Link key={house.id} href={`/dashboard/houses/${house.id}`} className="w-full max-w-md group hover:cursor-pointer">
              <Card className="h-40">
                <CardHeader>
                  <div className="flex gap-4">
                    <Avatar>
                      <IconHome2 />
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <CardTitle className="group-hover:text-gray-500">{house.number}</CardTitle>
                      <CardDescription className="text-gray-400 font-bold group-hover:text-gray-300">{house.address}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))
        ) : searchParam ? (
          <Alert>
            <AlertTitle>No results found</AlertTitle>
            <AlertDescription>You search for &quot;{searchParam}&quot; did not return any results</AlertDescription>
          </Alert>
        ) : (
          <Empty className="border border-double w-full">
            <EmptyHeader>
              <EmptyTitle className="font-bold">House is Empty</EmptyTitle>
              <EmptyDescription>You can add house to add family</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Link href={`/dashboard/houses/new/${id}`}>
                <Button variant="outline" size="sm">
                  <IconPlus />
                  Add House
                </Button>
              </Link>
            </EmptyContent>
          </Empty>
        )}
      </div>
    </>
  );
}
