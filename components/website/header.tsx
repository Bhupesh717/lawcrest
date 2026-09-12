"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scale, Menu, X, ShieldCheck, ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Practice Areas", href: "/practice-areas" },
  { label: "Attorneys", href: "/lawyers" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#262018] shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
          : "bg-gradient-to-b from-[#0A0A0A] to-transparent border-b border-transparent"
      )}
    >

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#C9A45C] bg-[#17130F] text-[#C9A45C] transition-all duration-300 group-hover:border-[#D8B76A] group-hover:shadow-[0_0_15px_rgba(201,164,92,0.3)]">
              <Scale className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-[0.18em] text-[#F5F1E8] group-hover:text-white transition-colors">
                LAW<span className="text-[#C9A45C]">CREST</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#8F897F]">
                Professional Corporation
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-8">
            {navigationItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium tracking-wide transition-colors relative py-1",
                    isActive
                      ? "text-[#C9A45C]"
                      : "text-[#B8B0A3] hover:text-[#F5F1E8]"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C9A45C] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="text-xs font-semibold uppercase tracking-wider text-[#C9A45C] hover:text-[#D8B76A] px-3 py-2 transition-colors xl:hidden"
            >
              Portal
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-[#C9A45C]/50 bg-[#C9A45C]/10 text-[#D8B76A] hover:bg-[#C9A45C] hover:text-[#0A0A0A] font-semibold text-xs tracking-wider uppercase h-10 px-5 transition-all duration-300"
              >
                Schedule Consultation
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 xl:hidden">
            <Link href="/contact" className="sm:hidden">
              <Button
                size="sm"
                className="bg-[#C9A45C] text-[#0A0A0A] text-xs font-bold px-3 h-8"
              >
                Consult
              </Button>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md border border-[#262018] bg-[#14110E] text-[#F5F1E8] hover:text-[#C9A45C] focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-[#262018] bg-[#0E0C0A] px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-2">
            {navigationItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#C9A45C]/15 text-[#C9A45C] font-semibold"
                      : "text-[#B8B0A3] hover:bg-[#1A1612] hover:text-[#F5F1E8]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-[#262018] flex flex-col gap-2.5">
            <Link href="/admin/dashboard">
              <Button
                variant="outline"
                className="w-full border-[#2E2519] bg-[#17130F] text-[#C9A45C] justify-center"
              >
                Enter Admin Portal
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="w-full bg-[#C9A45C] text-[#0A0A0A] font-bold justify-center">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
