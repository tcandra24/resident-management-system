import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { IconHome2, IconUsersGroup, IconShieldCheck } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    icon: IconHome2,
    title: "Residents & houses",
    description: "Organize every housing complex you manage, down to each house and unit.",
  },
  {
    icon: IconUsersGroup,
    title: "Families & members",
    description: "Keep family records (KK) and member details accurate and easy to find.",
  },
  {
    icon: IconShieldCheck,
    title: "Your data, protected",
    description: "Sign in with Clerk-backed accounts so only your team sees your data.",
  },
];

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="" width={32} height={32} priority />
          <span className="font-bold text-lg">Resident Management</span>
        </div>
        {userId ? (
          <Button asChild>
            <Link href="/dashboard/residents">Go to Dashboard</Link>
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 sm:py-24 text-center">
        <Image src="/logo.png" alt="" width={72} height={72} className="mb-6" priority />
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-2xl text-balance">Manage every housing complex from one place</h1>
        <p className="mt-4 text-muted-foreground text-base sm:text-lg max-w-xl text-balance">Track residents, houses, families, and members without spreadsheets scattered across your team.</p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-6 sm:px-0">
          <Button asChild size="lg" className="font-bold">
            <Link href={userId ? "/dashboard/residents" : "/sign-up"}>{userId ? "Go to Dashboard" : "Get Started"}</Link>
          </Button>
          {!userId && (
            <Button asChild size="lg" variant="secondary">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          )}
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl text-left">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="mb-2 size-6 text-primary" />
                <CardTitle className="text-base">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
