"use client";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { forwardRef, useImperativeHandle } from "react";
import { useParams } from "next/navigation";
import { useSheet } from "@/lib/contexts/SheetContext";

type AddNewFormProps = {
  onSuccess?: (redirectUrl: string) => void;
  identifier?: string;
};

const formSchema = z.object({
  identifier: z.string().min(1).max(25),
});

export const AddNewForm = forwardRef<{ submit: () => void }, AddNewFormProps>(({ onSuccess }, ref) => {
  const params = useParams();
  const { payload } = useSheet();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: payload ? payload.identifier : "",
    },
  });

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    let url = `/api/house/${params.id}/family`;
    let method = "POST";

    if (payload) {
      url = payload.url;
      method = "PUT";
    }

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: value.identifier,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      console.log("Error : " + data.message);
      return;
    }

    onSuccess?.(`/dashboard/houses/${params.id}/editor/${data.data.id}`);
  };

  useImperativeHandle(ref, () => ({
    submit: () => form.handleSubmit(onSubmit)(),
  }));

  return (
    <div className="grid flex-1 auto-rows-min gap-6 px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <div className="grid gap-3">
                  <FormLabel htmlFor="identifier" className="font-bold">
                    Identifier
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="identifier of your family" {...field} />
                  </FormControl>
                </div>
                <FormDescription>This is your family identifier (KK).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
});

AddNewForm.displayName = "AddNewForm";
