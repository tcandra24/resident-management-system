"use client";

import { forwardRef, useImperativeHandle } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { useRouter } from "next/navigation";

type VerifyDeleteProps = {
  id: string;
  resident_id: string;
  number: string;
};

export const AppInputVerifyDelete = forwardRef<{ submit: () => void }, VerifyDeleteProps>(({ id, resident_id, number }, ref) => {
  const router = useRouter();

  const formSchema = z.object({
    verify: z.string().refine((val) => val === number, {
      message: `You must type ${number} to confirm`,
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      verify: "",
    },
  });

  const onSubmit = async () => {
    const response = await fetch(`/api/house/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!data.success) {
      console.log("Error : " + data.message);
      return;
    }

    router.replace(`/dashboard/residents/${resident_id}`);
  };

  useImperativeHandle(ref, () => ({
    submit: () => form.handleSubmit(onSubmit)(),
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="verify"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Please type {number} to confirm</FormLabel>
              <FormControl>
                <Input placeholder="Enter string above" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
});

AppInputVerifyDelete.displayName = "FormVerifyDelete";
