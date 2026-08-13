import { HouseSettings } from "./house-settings";
import { getDetailHouse } from "@/lib/actions/house.action";

export default async function General({ params }: { params: { id: string } }) {
  const { id } = await params;
  const house = await getDetailHouse(id);

  return (
    <div className="my-16 w-full px-4 md:w-1/2 md:mx-auto md:px-0">
      <div className="flex flex-col space-y-8 mx-auto">
        <div className="flex flex-col space-y-2">
          <h1 className="text-xl text-foreground font-bold">House Setting</h1>
          <p className="m-0">Configure setting of your house here</p>
        </div>

        <HouseSettings house={{ id, resident_id: house.data?.resident_id ?? "", number: house.data?.number ?? "", address: house.data?.address ?? "" }} />
      </div>
    </div>
  );
}
