"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";

import { EntityForm } from "@/components/shared/entity-form";
import { postHouse } from "@/lib/actions/house.action";

const houseSchema = z.object({
  number: z.string().min(1).max(10),
  address: z.string().min(1).max(500),
});

export function NewHouseForm({ idResident }: { idResident: string }) {
  const router = useRouter();

  return (
    <EntityForm
      schema={houseSchema}
      defaultValues={{ number: "", address: "" }}
      cancelHref={`/dashboard/residents/${idResident}`}
      fields={[
        { name: "number", label: "Number", placeholder: "number of your house", description: "This is your house number." },
        { name: "address", label: "Address", placeholder: "Address of your home", description: "This is your house address.", type: "textarea" },
      ]}
      onSubmit={async (values) => {
        const response = await postHouse(idResident, values);
        if (!response.success) throw new Error(response.message);
        router.replace(`/dashboard/residents/${response.data?.resident_id}`);
      }}
    />
  );
}
