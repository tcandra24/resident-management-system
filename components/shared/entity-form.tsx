"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type DefaultValues, type FieldValues, type Path } from "react-hook-form";
import type { ZodType } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";

export type EntityFieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder: string;
  description?: string;
  type?: "input" | "textarea";
};

type EntityFormProps<T extends FieldValues> = {
  schema: ZodType<T>;
  fields: EntityFieldConfig<T>[];
  defaultValues: DefaultValues<T>;
  onSubmit: (values: T) => Promise<void>;
  cancelHref: string;
  submitLabel?: string;
  /** "card" is used for standalone "create new" pages, "settings" for the
   *  bordered row layout used on entity settings pages. */
  variant?: "card" | "settings";
};

/**
 * Shared create/edit form used by residents, houses, and similar entities.
 * Field labels, placeholders, validation, and submit behavior are supplied
 * by the caller so the same component covers every entity type instead of
 * duplicating a near-identical form per entity.
 */
export function EntityForm<T extends FieldValues>({ schema, fields, defaultValues, onSubmit, cancelHref, submitLabel = "Submit", variant = "card" }: EntityFormProps<T>) {
  const router = useRouter();
  const isSettings = variant === "settings";

  const form = useForm<T>({
    resolver: zodResolver(schema as never) as never,
    defaultValues,
  });

  const handleSubmit = async (values: T) => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className={cn(isSettings && "w-full border rounded-lg flex flex-col overflow-hidden")}>
          {fields.map((fieldConfig, index) => (
            <FormField
              key={fieldConfig.name}
              control={form.control}
              name={fieldConfig.name}
              render={({ field }) => (
                <FormItem className={cn(isSettings && ["flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 py-3 px-3 sm:px-0", index < fields.length - 1 && "border-b"])}>
                  <FormLabel className={cn("font-bold", isSettings && "sm:flex-1 sm:p-3")}>{fieldConfig.label}</FormLabel>
                  <FormControl className={cn(isSettings && "sm:p-2 sm:m-3 sm:border sm:flex-3 sm:rounded-lg")}>
                    {fieldConfig.type === "textarea" ? <Textarea placeholder={fieldConfig.placeholder} {...field} /> : <Input placeholder={fieldConfig.placeholder} {...field} />}
                  </FormControl>
                  {!isSettings && fieldConfig.description && <FormDescription>{fieldConfig.description}</FormDescription>}
                  <FormMessage className={cn(isSettings && "sm:px-3")} />
                </FormItem>
              )}
            />
          ))}

          <div className={cn("flex flex-col-reverse sm:flex-row justify-between gap-3", isSettings ? "sm:justify-end px-3 pb-3 sm:px-3" : "sm:justify-between")}>
            <Button type="button" variant="secondary" className="w-full sm:w-auto cursor-pointer" onClick={() => router.push(cancelHref)}>
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto cursor-pointer">
              {submitLabel}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
