import { AppList } from "@/components/resident/app-list";
import { getAllResidents } from "@/lib/actions/resident.action";

export default async function Resident() {
  const { data: residents } = await getAllResidents();

  return (
    <>
      <h1 className="text-2xl my-4 font-bold">Your Residents</h1>
      <AppList residents={residents} />
    </>
  );
}
