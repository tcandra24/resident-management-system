import { IconHome2 } from "@tabler/icons-react";

import { EntityList } from "@/components/shared/entity-list";
import { getAllHouses } from "@/lib/actions/house.action";

export default async function ResidentDetail({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { data: houses } = await getAllHouses(id);

  return (
    <>
      <h1 className="text-2xl my-4 font-bold">Your Houses</h1>
      <EntityList
        icon={<IconHome2 />}
        items={houses.map((house) => ({ id: house.id, title: house.number, subtitle: house.address, href: `/dashboard/houses/${house.id}` }))}
        searchPlaceholder="Search for house..."
        addHref={`/dashboard/houses/new/${id}`}
        addLabel="Add House"
        emptyTitle="House is Empty"
        emptyDescription="You can add house to add family"
      />
    </>
  );
}
