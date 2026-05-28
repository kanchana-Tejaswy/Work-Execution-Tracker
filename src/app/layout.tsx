import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/layout/AppLayout";
import { getCurrentUser } from "@/services/users/user.service";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Work Execution Tracker",
  description: "AI-powered work tracking and insights.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body className={cn(inter.variable, "font-sans bg-background-main text-text-primary")}>
        <AppLayout user={user}>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
