"use client";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(8).max(100),
  newPassword: z.string().min(8).max(100),
});

export default function ResetPassword() {
  const { signOut } = useClerk();

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof changePasswordSchema>) => {
    try {
      const response = await fetch("/api/account/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (!data.success) throw new Error(data.message);

      signOut({ redirectUrl: "/sign-in" });
    } catch (error: Error | unknown) {
      toast.error("Failed to save password", {
        description: (error as Error).message,
      });
    }
  };

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
        <div className="max-w-sm mx-auto space-y-14">
          <h3 className="text-4xl text-foreground">Change your password</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem className="flex flex-col text-left gap-3">
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input placeholder="••••••••" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="flex flex-col text-left gap-3">
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input placeholder="••••••••" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full cursor-pointer">
                Send new password
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
