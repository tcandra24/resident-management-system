import { IconPlus, IconSearch, IconBox } from "@tabler/icons-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Avatar } from "@/components/ui/avatar";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";

import Link from "next/link";
import { getAllResidents } from "@/lib/actions/resident.action";

type ResidentProps = {
  id: string;
  name: string;
  description: string;
};

export default async function Resident() {
  const { data } = await getAllResidents();

  return (
    <>
      <h1 className="text-2xl my-4 font-bold">Your Residents</h1>
      {/* Search Panel */}
      <div className="w-full flex justify-between">
        <div className="w-1/3">
          <InputGroup>
            <InputGroupInput placeholder="Search for resident..." />
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
