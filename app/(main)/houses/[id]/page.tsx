import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";

import data from "../../data.json";

export default async function House({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <>
      <p>House Page {id}</p>
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </>
  );
}
