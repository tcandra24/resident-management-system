"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";

import { EntityForm } from "@/components/shared/entity-form";
import { EntityDangerZone } from "@/components/shared/entity-danger-zone";
import { updateHouse } from "@/lib/actions/house.action";

const houseSchema = z.object({
  number: z.string().min(1).max(10),
  address: z.string().min(1).max(500),
});

type HouseSettingsProps = {
  house: { id: string; resident_id: string; number: string; address: string };
};

export function HouseSettings({ house }: HouseSettingsProps) {
  const router = useRouter();

  return (
    <>
      <h3 className="text-lg text-foreground">General settings</h3>
      <EntityForm
        variant="settings"
        schema={houseSchema}
        defaultValues={{ number: house.number, address: house.address }}
        cancelHref={`/dashboard/houses/${house.id}/settings/general`}
        submitLabel="Save"
        fields={[
          { name: "number", label: "Number", placeholder: "Number of your house" },
          { name: "address", label: "Address", placeholder: "Address of your house", type: "textarea" },
        ]}
        onSubmit={async (values) => {
          const response = await updateHouse({ id: house.id, ...values });
          if (!response.success) throw new Error(response.message);
          router.replace(`/dashboard/houses/${house.id}/settings/general`);
        }}
      />

      <h3 className="text-lg text-foreground">Delete House</h3>
      <EntityDangerZone
        entityLabel="house"
        warningTitle="Deleting this house will also remove its families"
        deleteEndpoint={`/api/house/${house.id}`}
        confirmValue={house.number.toLowerCase().replaceAll(" ", "-")}
        confirmDisplayValue={house.number}
        redirectAfterDelete={`/dashboard/residents/${house.resident_id}`}
      />
    </>
  );
}
