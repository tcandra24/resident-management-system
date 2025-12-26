import { AppDangerZone } from "@/components/resident/setting/app-danger-zone";
import { SettingAppForm } from "@/components/resident/setting/app-main-form";
import { getDetailResident } from "@/lib/actions/resident.action";

export default async function General({ params }: { params: { id: string } }) {
  const { id } = await params;
  const resident = await getDetailResident(id);

  return (
    <div className="my-16 w-full">
      <div className="flex flex-col space-y-8">
        <h3 className="text-lg text-foreground">Resident Details</h3>
        <SettingAppForm resident={{ id, name: resident.data?.name ?? "", description: resident.data?.description ?? "" }} />

        <h3 className="text-lg text-foreground">Danger Zone</h3>
        <AppDangerZone resident={{ id, name: resident.data?.name ?? "" }} />
      </div>
    </div>
  );
}
