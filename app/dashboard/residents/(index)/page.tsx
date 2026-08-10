import { IconBox } from "@tabler/icons-react";

import { EntityList } from "@/components/shared/entity-list";
import { getAllResidents } from "@/lib/actions/resident.action";

export default async function Resident() {
  const { data: residents } = await getAllResidents();

  return (
    <>
      <h1 className="text-2xl my-4 font-bold">Your Residents</h1>
      <EntityList
        icon={<IconBox />}
        items={residents.map((resident) => ({ id: resident.id, title: resident.name, subtitle: resident.description, href: `/dashboard/residents/${resident.id}` }))}
        searchPlaceholder="Search for resident..."
        addHref="/dashboard/residents/new"
        addLabel="Add Residents"
        emptyTitle="Resident is Empty"
        emptyDescription="You can add resident to add houses & family"
      />
    </>
  );
}
