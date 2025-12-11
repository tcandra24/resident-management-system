"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import Link from "next/link";

import { postHouse } from "@/lib/actions/house.action";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  number: z.string().min(1).max(10),
  address: z.string().min(1).max(500),
});

export const AddNewForm = (prop: { idResident: string }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: "",
      address: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await postHouse(prop.idResident, values);
      if (!response.success) {
        throw new Error(response.message);
      }

      router.replace(`/dashboard/residents/${response.data?.resident_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Number</FormLabel>
              <FormControl>
                <Input placeholder="number of your house" {...field} />
              </FormControl>
              <FormDescription>This is your house number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Address</FormLabel>
              <FormControl>
                <Textarea placeholder="Address of your home" {...field}></Textarea>
              </FormControl>
              <FormDescription>This is your house address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Link href={`/dashboard/residents/${prop.idResident}`}>
            <Button variant={"secondary"}>Cancel</Button>
          </Link>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
