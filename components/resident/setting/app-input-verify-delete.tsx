"use client";

import { forwardRef, useImperativeHandle } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

type VerifyDeleteProps = {
  name: string;
};

export const AppInputVerifyDelete = forwardRef<{ submit: () => void }, VerifyDeleteProps>(({ name }, ref) => {
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
