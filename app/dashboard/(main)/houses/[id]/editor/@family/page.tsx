import { formatDistanceToNow } from "date-fns";

import { AppBtnLgNew } from "@/components/family/app-btn-lg-new";
import { Item, ItemContent, ItemMedia, ItemTitle, ItemDescription } from "@/components/ui/item";
import { Empty, EmptyMedia, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { getFamiliesByHouseId } from "@/lib/actions/family.action";

import { IconUsersGroup } from "@tabler/icons-react";
import Link from "next/link";

export default async function House({ params }: { params: { id: string } }) {
  const { id } = await params;

  const { data: families } = await getFamiliesByHouseId(id);

  return (
    <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:py-6 md:px-16 lg:px-32 my-8">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto flex flex-col gap-5">
        <AppBtnLgNew />

        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-sm">Recent Families</h1>
          <div className="flex flex-col gap-1">
            {families.length > 0 ? (
              families.map((family) => (
                <Item className="p-0 py-2" key={family.id} asChild>
                  <Link href={`/dashboard/houses/${id}/editor/${family.id}`}>
                    <ItemMedia>
                      <div className="p-2 rounded-xl border">
                        <IconUsersGroup className="size-6 text-black/50 dark:text-white/50" />
                      </div>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle className="flex flex-1 gap-5 items-center">{family.identifier}</ItemTitle>
                      <ItemDescription>{formatDistanceToNow(new Date(family.created_at), { addSuffix: true })}</ItemDescription>
                    </ItemContent>
                  </Link>
                </Item>
              ))
            ) : (
              <Empty className="border border-double w-full">
                <EmptyMedia variant="icon">
                  <IconUsersGroup className="size-5 text-black/50 dark:text-white/50" />
                </EmptyMedia>
                <EmptyHeader>
                  <EmptyTitle className="font-bold text-sm">No recent items yet</EmptyTitle>
                  <EmptyDescription className="text-sm">Items will appear here as you browse through your family</EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
