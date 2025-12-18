import { getFamiliesByHouseId } from "@/lib/actions/family.action";
import { getDetailHouse } from "@/lib/actions/house.action";
import Link from "next/link";

export default async function Overview({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { data } = await getDetailHouse(id);
  const { data: families } = await getFamiliesByHouseId(id);

  return (
    <div className="mx-5">
      <div className="flex justify-between py-16 gap-5 border-b border-muted">
        <h1 className="text-3xl">{data?.number}</h1>
        <div className="flex items-center gap-x-5">
          <div className="flex flex-col gap-y-2">
            <Link href={`/dashboard/houses/${id}/editor`} className="text-sm">
              Families
            </Link>
            <p className="text-2xl">{families.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
