import { ResidentSettings } from "./resident-settings";
import { getDetailResident } from "@/lib/actions/resident.action";

export default async function General({ params }: { params: { id: string } }) {
  const { id } = await params;
  const resident = await getDetailResident(id);

  return (
    <div className="my-16 w-full">
      <ResidentSettings resident={{ id, name: resident.data?.name ?? "", description: resident.data?.description ?? "" }} />
    </div>
  );
}
