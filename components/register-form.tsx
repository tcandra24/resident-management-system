"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Spinner } from "@/components/ui/spinner";

import Image from "next/image";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import Link from "next/link";

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <SignUp.Root>
            <Clerk.Loading>
              {(isGlobalLoading) => (
                <>
                  <SignUp.Step name="start" className="p-6 md:p-8">
                    <Clerk.GlobalError />
                    <FieldGroup>
                      <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-2xl font-bold">Welcome</h1>
                        <p className="text-muted-foreground text-balance">Register to your Acme Inc account</p>
                      </div>
                      <Clerk.Field name="emailAddress" asChild>
                        <Field>
                          <Clerk.Label asChild>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                          </Clerk.Label>
                          <Clerk.Input type="email" id="email" required placeholder="m@example.com" asChild>
                            <Input />
                          </Clerk.Input>
                          <Clerk.FieldError className="block text-sm text-destructive" />
                        </Field>
                      </Clerk.Field>
                      <Clerk.Field name="firstName" asChild>
                        <Field>
                          <Clerk.Label asChild>
                            <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                          </Clerk.Label>
                          <Clerk.Input type="text" id="firstName" required placeholder="John" asChild>
                            <Input />
                          </Clerk.Input>
                          <Clerk.FieldError className="block text-sm text-destructive" />
                        </Field>
                      </Clerk.Field>
                      <Clerk.Field name="lastName" asChild>
                        <Field>
                          <Clerk.Label asChild>
                            <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                          </Clerk.Label>
                          <Clerk.Input type="text" id="lastName" required placeholder="Doe" asChild>
                            <Input />
                          </Clerk.Input>
                          <Clerk.FieldError className="block text-sm text-destructive" />
                        </Field>
                      </Clerk.Field>
                      <Clerk.Field name="password" asChild>
                        <Field>
                          <Clerk.Label asChild>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                          </Clerk.Label>
                          <Clerk.Input type="password" id="password" required asChild>
                            <Input />
                          </Clerk.Input>
                          <Clerk.FieldError className="block text-sm text-destructive" />
                        </Field>
                      </Clerk.Field>
                      <Field>
                        <SignUp.Captcha />
                      </Field>
                      <Field>
                        <SignUp.Action submit asChild>
                          <Button disabled={isGlobalLoading}>
                            <Clerk.Loading>{(isLoading) => (isLoading ? <Spinner /> : "Register")}</Clerk.Loading>
                          </Button>
                        </SignUp.Action>
                      </Field>
                      <FieldDescription className="text-center">
                        Already have an account?
                        <Link href="/sign-in">Sign In</Link>
                      </FieldDescription>
                    </FieldGroup>
                  </SignUp.Step>
                  <SignUp.Step name="verifications" className="p-6 md:p-8">
                    <SignUp.Strategy name="email_code">
                      <FieldGroup>
                        <div className="flex flex-col items-center gap-2 text-center">
                          <h1 className="text-2xl font-bold">Check your email</h1>
                        </div>

                        <Clerk.Field name="code" asChild>
                          <Field>
                            <Clerk.Label asChild>
                              <FieldLabel htmlFor="code">Email Code</FieldLabel>
                            </Clerk.Label>
                            <Clerk.Input id="code" asChild>
                              <Input />
                            </Clerk.Input>
                            <Clerk.FieldError className="block text-sm text-destructive" />
                          </Field>
                        </Clerk.Field>

                        <SignUp.Action submit asChild>
                          <Button disabled={isGlobalLoading}>Verify</Button>
                        </SignUp.Action>
                      </FieldGroup>
                    </SignUp.Strategy>
                  </SignUp.Step>
                </>
              )}
            </Clerk.Loading>
          </SignUp.Root>
          <div className="bg-muted relative hidden md:block">
            <Image src="/placeholder.svg" width={16} height={16} alt="Image" className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
