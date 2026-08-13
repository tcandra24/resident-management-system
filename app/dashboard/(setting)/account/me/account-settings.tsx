"use client";
import { useUser, useClerk } from "@clerk/nextjs";
import { z } from "zod";
// import { useRouter } from "next/navigation";

import { EntityForm } from "@/components/shared/entity-form";
import { EntityDangerZone } from "@/components/shared/entity-danger-zone";

import { Skeleton } from "@/components/ui/skeleton";

const accountSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
});

export function AccountSettings() {
  // const router = useRouter();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded) {
    return (
      <>
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="flex w-full flex-col gap-7">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="w-full flex justify-end">
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </>
    );
  }

  const userData = {
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    fullname: user?.fullName ?? "",
  };

  return (
    <>
      <h3 className="text-lg text-foreground">Profile information</h3>
      <EntityForm
        variant="settings"
        schema={accountSchema}
        defaultValues={userData}
        submitLabel="Save"
        fields={[
          { name: "firstName", label: "First Name", placeholder: "Your first name" },
          { name: "lastName", label: "Last Name", placeholder: "Your last name" },
        ]}
        onSubmit={async (values) => {
          await user?.update({
            firstName: values.firstName,
            lastName: values.lastName,
          });
        }}
      />

      <h3 className="text-lg text-foreground">Delete Account</h3>
      <EntityDangerZone
        entityLabel="account"
        warningTitle="Request for account deletion"
        warningBody="Deleting your account is permanent and cannot be undone"
        deleteEndpoint="/api/account"
        confirmValue={`${userData.firstName.toLowerCase().replaceAll(" ", "-")}-${userData.lastName.toLowerCase().replaceAll(" ", "-")}`}
        confirmDisplayValue={`${userData.fullname}`}
        redirectAfterDelete="/"
        onDeleted={() => signOut()}
      />
    </>
  );
}
