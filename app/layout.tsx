import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Outfit, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const fontSans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-mono-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resident Management System",
  description: "Manage data resident and connect the people",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={`${fontSans.variable} ${geistMono.variable} antialiased overflow-auto`}>
          <main className="relative min-h-screen">{children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
