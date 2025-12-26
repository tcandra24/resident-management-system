"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { updateResident } from "@/lib/actions/resident.action";
import { useRouter } from "next/navigation";

type ResidentProps = {
  id: string;
  name: string;
  description: string;
};

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(500),
});

export function SettingAppForm({ resident }: { resident: ResidentProps }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: resident.name,
      description: resident.description,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await updateResident({ id: resident.id, ...values });
      if (!response.success) {
        throw new Error(response.message);
      }

      router.replace(`/dashboard/residents/${resident.id}/general`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="w-full border rounded-lg flex flex-col">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex justify-between items-center py-3 border-b">
                <FormLabel className="font-bold flex-1 p-3">Resident Name</FormLabel>
                <FormControl className="p-2 m-3 border flex-3 rounded-lg" id="resident_name">
                  <Input placeholder="Name of your resident" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex justify-between items-center py-3 border-b">
                <FormLabel className="font-bold flex-1 p-3">Description</FormLabel>
                <FormControl className="p-2 m-3 border flex-3 rounded-lg">
                  <Textarea placeholder="Description of your resident" {...field}></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-end">
            <div className="m-3 flex gap-3">
              <Button variant={"secondary"} className="cursor-pointer">
                Cancel
              </Button>
              <Button className="cursor-pointer">Save</Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
