"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { updateHouse } from "@/lib/actions/house.action";
import { useRouter } from "next/navigation";

type HouseProps = {
  id: string;
  number: string;
  address: string;
};

const formSchema = z.object({
  number: z.string().min(1).max(10),
  address: z.string().min(1).max(500),
});

export const SettingAppForm = ({ house }: { house: HouseProps }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: house.number,
      address: house.address,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await updateHouse({ id: house.id, ...values });
      if (!response.success) {
        throw new Error(response.message);
      }

      router.replace(`/dashboard/houses/${house.id}/settings/general`);
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
            name="number"
            render={({ field }) => (
              <FormItem className="flex justify-between items-center py-3 border-b">
                <FormLabel className="font-bold flex-1 p-3">Number</FormLabel>
                <FormControl className="p-2 m-3 border flex-3 rounded-lg" id="resident_name">
                  <Input placeholder="Number of your house" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex justify-between items-center py-3 border-b">
                <FormLabel className="font-bold flex-1 p-3">Address</FormLabel>
                <FormControl className="p-2 m-3 border flex-3 rounded-lg">
                  <Textarea placeholder="Address of your house" {...field}></Textarea>
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
};
