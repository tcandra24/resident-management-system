import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle, ItemActions } from "@/components/ui/item";
import { getFamiliesByHouseId } from "@/lib/actions/family.action";

import { IconUsersGroup } from "@tabler/icons-react";
import Link from "next/link";

export default async function House({ params }: { params: { id: string } }) {
  const { id } = await params;

  const { data } = await getFamiliesByHouseId(id);

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 mx-32 my-8">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto flex flex-col gap-5">
        <Item variant="outline" size="sm" asChild>
          <Link href="#">
            <ItemMedia>
              <div className="bg-primary p-2 rounded-full">
                <IconUsersGroup className="size-7 text-white" />
              </div>
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="font-bold">Create a family</ItemTitle>
              <ItemDescription className="text-xs">Create and manage family data</ItemDescription>
            </ItemContent>
          </Link>
        </Item>

        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-sm">Recent Families</h1>
          <div className="flex flex-col gap-1">
            {data &&
              data.map((family) => (
                <Item className="p-0 py-2" key={family.id} asChild>
                  <Link href={`/dashboard/houses/${id}/editor/${family.id}`}>
                    <ItemMedia>
                      <div className="p-2 rounded-xl border">
                        <IconUsersGroup className="size-5 text-black/50" />
                      </div>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{family.identifier}</ItemTitle>
                    </ItemContent>
                    <ItemActions>action</ItemActions>
                  </Link>
                </Item>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
