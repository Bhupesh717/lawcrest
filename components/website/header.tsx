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
        "fixed top-0 z-50 w-full transition-all duration-500 ease-in-out",
        scrolled
          ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#262018] shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "flex items-center justify-between transition-all duration-500 ease-in-out",
          scrolled ? "h-16 md:h-20" : "h-20 md:h-24"
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="/logo.png"
              alt="LAWCREST Logo"
              className={cn(
                "w-auto transition-all duration-500 ease-in-out group-hover:scale-105",
                scrolled ? "h-10 sm:h-14 md:h-16" : "h-12 sm:h-16 md:h-20 lg:h-22"
              )}
            />
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
            <div className="flex flex-col items-end gap-1.5">
              {/* <a href="tel:+15551234567" className="flex items-center gap-1.5 text-[11px] font-semibold text-[#B8B0A3] hover:text-[#C9A45C] transition-colors tracking-widest uppercase">
                <Phone className="h-3 w-3 text-[#C9A45C]" />
                <span>+1 (555) 123-4567</span>
              </a> */}
              <Link href="/contact">
                <Button
                  className="relative overflow-hidden border border-[#C9A45C]/40 bg-transparent text-[#D8B76A] font-semibold text-[11px] tracking-widest uppercase h-9 px-6 transition-all duration-500 hover:border-[#C9A45C] hover:bg-gradient-to-r hover:from-[#C9A45C] hover:to-[#D8B76A] hover:text-[#0A0A0A] hover:shadow-[0_0_20px_rgba(201,164,92,0.3)] rounded-sm cursor-pointer"
                >
                  Schedule Consultation
                </Button>
              </Link>
            </div>
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
