"use client";
import { IconPlus, IconSearch, IconBox } from "@tabler/icons-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Avatar } from "@/components/ui/avatar";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import Link from "next/link";

import { useEffectEvent, useEffect, useState } from "react";

type ResidentProps = {
  id: string;
  name: string;
  description: string;
};

export function AppList({ residents }: { residents: ResidentProps[] }) {
  const [searchParam, setSearchParam] = useState("");
  const [data, setData] = useState(residents);

  const handleSearch = useEffectEvent(() => {
    if (searchParam) {
      setData(() => {
        return residents.filter((resident) => resident.name.includes(searchParam.toLowerCase()));
      });
    } else {
      setData(residents);
    }
  });

  useEffect(() => {
    handleSearch();
  }, [searchParam, residents]);

  return (
    <>
      <div className="w-full flex justify-between">
        <div className="w-1/3">
          <InputGroup>
            <InputGroupInput placeholder="Search for resident..." value={searchParam} onChange={(e) => setSearchParam(e.target.value)} />
            <InputGroupAddon>
              <IconSearch />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <Link href={"/dashboard/residents/new"}>
          <Button className="font-bold">
            <IconPlus />
            Add Residents
          </Button>
        </Link>
      </div>
      <div className="flex gap-5">
        {data.length > 0 ? (
          data.map((resident: ResidentProps) => (
            <Link key={resident.id} href={`/dashboard/residents/${resident.id}`} className="w-full max-w-md group hover:cursor-pointer">
              <Card>
                <CardHeader>
                  <div className="flex gap-4">
                    <Avatar>
                      <IconBox />
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <CardTitle className="group-hover:text-gray-500">{resident.name}</CardTitle>
                      <CardDescription className="text-gray-400 font-bold group-hover:text-gray-300">{resident.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))
        ) : searchParam ? (
          <Alert variant="default">
            <AlertTitle>No results found</AlertTitle>
            <AlertDescription>You search for &quot;{searchParam}&quot; did not return any results</AlertDescription>
          </Alert>
        ) : (
          <Empty className="border border-double w-full">
            <EmptyHeader>
              <EmptyTitle className="font-bold">Resident is Empty</EmptyTitle>
              <EmptyDescription>You can add resident to add houses & family</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Link href={"/dashboard/residents/new"}>
                <Button variant="outline" size="sm">
                  <IconPlus />
                  Add Residents
                </Button>
              </Link>
            </EmptyContent>
          </Empty>
        )}
      </div>
    </>
  );
}
