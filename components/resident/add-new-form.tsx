"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

import { postResident } from "@/lib/actions/resident.action";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(500),
});

export const AddNewForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await postResident(values);
      if (!response.success) {
        throw new Error(response.message);
      }

      router.replace("/dashboard/residents");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Name</FormLabel>
              <FormControl>
                <Input placeholder="name of your resident" {...field} />
              </FormControl>
              <FormDescription>This is your resident name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description of your resident" {...field}></Textarea>
              </FormControl>
              <FormDescription>This is your description of resident.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Link href="/dashboard/residents">
            <Button variant={"secondary"}>Cancel</Button>
          </Link>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
