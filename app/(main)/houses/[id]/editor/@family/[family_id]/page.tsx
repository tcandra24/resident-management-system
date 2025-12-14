import { DataTable } from "@/components/data-table";

import data from "../../../../../data.json";

export default async function House({ params }: { params: { id: string; family_id: string } }) {
  const { id, family_id } = await params;
  return (
    <>
      <p>
        Family Page {id} - {family_id}
      </p>
      <DataTable data={data} />
    </>
  );
}
