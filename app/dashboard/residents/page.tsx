// import { SectionCards } from "@/components/section-cards";
import { IconPlus, IconSearch } from "@tabler/icons-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { description } from "@/components/chart-area-interactive";

import Link from "next/link";

const groups = [
  {
    id: 1,
    name: "Group 1",
    description: "Group 1 RT 1",
  },
  {
    id: 2,
    name: "Group 2",
    description: "Group 2 RT 2",
  },
  {
    id: 3,
    name: "Group 3",
    description: "Group 3 RT 7",
  },
  {
    id: 4,
    name: "Group 4",
    description: "Group 4 RT 10",
  },
  {
    id: 5,
    name: "Group 5",
    description: "Group 5 RT 3",
  },
];

export default async function Resident() {
  return (
    <>
      <h1 className="text-2xl my-4 font-bold">Your Group</h1>
      {/* Search Panel */}
      <div className="w-full flex justify-between">
        <div className="w-1/3">
          <InputGroup>
            <InputGroupInput placeholder="Search for group..." />
            <InputGroupAddon>
              <IconSearch />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <Link href={"/dashboard/residents/new"}>
          <Button>
            <IconPlus />
            Add Group
          </Button>
        </Link>
      </div>
      <div className="flex gap-5">
        {groups.map((group) => (
          <Card key={group.id} className="w-full max-w-md group hover:cursor-pointer">
            <CardHeader>
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <CardTitle className="group-hover:text-gray-500">{group.name}</CardTitle>
                  <CardDescription className="text-gray-400 font-bold group-hover:text-gray-300">{group.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </>
  );
}
