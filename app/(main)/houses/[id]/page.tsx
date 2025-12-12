import { DataTable } from "@/components/data-table";

import data from "../../data.json";

export default async function House({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <>
      <p>House Page {id}</p>
      <DataTable data={data} />
    </>
  );
}
