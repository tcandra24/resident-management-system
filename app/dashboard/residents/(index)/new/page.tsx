"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";

import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { EntityForm } from "@/components/shared/entity-form";
import { postResident } from "@/lib/actions/resident.action";

const residentSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(500),
});

export default function Create() {
  const router = useRouter();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create a new Resident</CardTitle>
        <CardDescription>Your residents will add & you can add houses with family in that resident</CardDescription>
      </CardHeader>
      <CardContent>
        <EntityForm
          schema={residentSchema}
          defaultValues={{ name: "", description: "" }}
          cancelHref="/dashboard/residents"
          fields={[
            { name: "name", label: "Name", placeholder: "Name of your resident", description: "This is your resident name." },
            { name: "description", label: "Description", placeholder: "Description of your resident", description: "This is your description of resident.", type: "textarea" },
          ]}
          onSubmit={async (values) => {
            const response = await postResident(values);
            if (!response.success) throw new Error(response.message);
            router.replace(`/dashboard/residents/${response.data?.id}`);
          }}
        />
      </CardContent>
    </Card>
  );
}
