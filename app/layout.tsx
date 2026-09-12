import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { QueryProvider } from "@/lib/providers/query-provider";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LAWCREST | Professional Corporation — Your Rights. Our Commitment.",
    template: "%s | LAWCREST",
  },
  description:
    "LAWCREST Professional Corporation provides trusted legal counsel and strategic guidance for individuals and businesses. Legal solutions. Strategic guidance. A stronger tomorrow.",
  keywords: [
    "law firm",
    "legal counsel",
    "corporate law",
    "litigation",
    "legal services",
    "LAWCREST",
  ],
  openGraph: {
    title: "LAWCREST | Professional Corporation",
    description:
      "Trusted legal counsel and strategic guidance for individuals and businesses.",
    type: "website",
    locale: "en_US",
    siteName: "LAWCREST",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#0A0A0A] text-[#F5F1E8] font-sans antialiased">
        <QueryProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1D1712",
                border: "1px solid rgba(201,164,92,0.25)",
                color: "#F5F1E8",
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
