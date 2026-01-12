import { SettingAppForm } from "@/components/house/setting/app-main-form";
import { AppDangerZone } from "@/components/house/setting/app-danger-zone";

import { getDetailHouse } from "@/lib/actions/house.action";

export default async function General({ params }: { params: { id: string } }) {
  const { id } = await params;
  const house = await getDetailHouse(id);

  return (
    <div className="my-16 md:w-1/2 md:mx-auto w-full mx-8">
      <div className="flex flex-col space-y-8 mx-auto">
        <div className="flex flex-col space-y-2">
          <h1 className="text-xl text-foreground font-bold">House Setting</h1>
          <p className="text-foreground m-0">Configure setting of your house here</p>
        </div>

        <h3 className="text-lg text-foreground">General settings</h3>
        <SettingAppForm house={{ id, number: house.data?.number ?? "", address: house.data?.address ?? "" }} />

        <h3 className="text-lg text-foreground">Delete House</h3>
        <AppDangerZone house={{ id, resident_id: house.data?.resident_id ?? "", number: house.data?.number ?? "" }} />
      </div>
    </div>
  );
}
