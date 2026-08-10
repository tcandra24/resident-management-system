"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";

import { EntityForm } from "@/components/shared/entity-form";
import { EntityDangerZone } from "@/components/shared/entity-danger-zone";
import { updateResident } from "@/lib/actions/resident.action";

const residentSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(500),
});

type ResidentSettingsProps = {
  resident: { id: string; name: string; description: string };
};

export function ResidentSettings({ resident }: ResidentSettingsProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col space-y-8">
      <h3 className="text-lg text-foreground">Resident Details</h3>
      <EntityForm
        variant="settings"
        schema={residentSchema}
        defaultValues={{ name: resident.name, description: resident.description }}
        cancelHref={`/dashboard/residents/${resident.id}/general`}
        submitLabel="Save"
        fields={[
          { name: "name", label: "Resident Name", placeholder: "Name of your resident" },
          { name: "description", label: "Description", placeholder: "Description of your resident", type: "textarea" },
        ]}
        onSubmit={async (values) => {
          const response = await updateResident({ id: resident.id, ...values });
          if (!response.success) throw new Error(response.message);
          router.replace(`/dashboard/residents/${resident.id}/general`);
        }}
      />

      <h3 className="text-lg text-foreground">Danger Zone</h3>
      <EntityDangerZone
        entityLabel="resident"
        warningTitle="Deleting this resident will also remove its houses"
        deleteEndpoint={`/api/resident/${resident.id}`}
        confirmValue={resident.name.toLowerCase().replaceAll(" ", "-")}
        confirmDisplayValue={resident.name}
        redirectAfterDelete="/dashboard/residents"
      />
    </div>
  );
}
