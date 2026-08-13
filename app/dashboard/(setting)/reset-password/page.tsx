"use client";

import Link from "next/link";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1).max(100),
  newPassword: z.string().min(1).max(100),
});

export default function ResetPassword() {
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof changePasswordSchema>) => {};

  return (
    <>
      <div className="w-full sticky top-0 p-3 md:p-6">
        <div className="w-full flex justify-between">
          <Link href="/dashboard/residents">
            <Image src={"/logo-with-name-dark.png"} alt="Logo Large" width={180} height={80} />
          </Link>
        </div>
      </div>
      <div className="w-full md:max-w-4xl">
        <div className="max-w-sm mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              {/*  */}
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
