import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const fontSans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
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
        <body className={`${fontSans.variable} antialiased overflow-auto`}>
          <main className="relative min-h-screen">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
