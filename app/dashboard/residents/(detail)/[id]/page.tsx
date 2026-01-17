import { AppList } from "@/components/house/app-list";
import { getAllHouses } from "@/lib/actions/house.action";

export default async function ResidentDetail({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { data: houses } = await getAllHouses(id);

  return (
    <>
      <h1 className="text-2xl my-4 font-bold">Your Houses</h1>
      <AppList id={id} houses={houses} />
    </>
  );
}
