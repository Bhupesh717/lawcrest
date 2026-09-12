import * as React from "react";
import { Header } from "@/components/website/header";
import { Footer } from "@/components/website/footer";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#F5F1E8]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
