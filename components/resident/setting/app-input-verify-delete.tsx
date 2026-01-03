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
  name: string;
};

export const AppInputVerifyDelete = forwardRef<{ submit: () => void }, VerifyDeleteProps>(({ id, name }, ref) => {
  const router = useRouter();

  const formSchema = z.object({
    verify: z.string().refine((val) => val === name, {
      message: `You must type ${name} to confirm`,
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      verify: "",
    },
  });

  const onSubmit = async () => {
    const response = await fetch(`/api/resident/${id}`, {
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

    router.replace(`/dashboard/residents`);
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
              <FormLabel className="font-bold">Please type {name} to confirm</FormLabel>
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
