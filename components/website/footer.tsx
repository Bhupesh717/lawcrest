import * as React from "react";
import Link from "next/link";
import { Scale, MapPin, Phone, Mail, Clock, ArrowRight, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#262018] bg-[#0A0A0A] text-[#8F897F]">
      {/* Upper Footer: Brand & Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center group">
              <img 
                src="/logo.png" 
                alt="LAWCREST Logo" 
                className="h-10 w-auto opacity-90 transition-opacity duration-300 group-hover:opacity-100" 
              />
            </Link>
            <p className="text-sm text-[#8F897F] leading-relaxed max-w-sm">
              Providing premier legal counsel and trial advocacy for Fortune 500 corporations, institutional leaders, and high-net-worth individuals facing existential legal challenges.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-[#C9A45C]">
              <Shield className="h-4 w-4 shrink-0" />
              <span>Ranked Tier 1 in Commercial Litigation & Corporate Law</span>
            </div>
          </div>

          {/* Column 2: Practice Areas */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#F5F1E8] mb-4">
              Practice Areas
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/practice-areas" className="hover:text-[#C9A45C] transition-colors">
                  Corporate & M&A
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="hover:text-[#C9A45C] transition-colors">
                  Commercial Litigation
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="hover:text-[#C9A45C] transition-colors">
                  Intellectual Property
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="hover:text-[#C9A45C] transition-colors">
                  White Collar Defense
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="hover:text-[#C9A45C] transition-colors">
                  Securities & Antitrust
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="hover:text-[#C9A45C] transition-colors">
                  Employment & Labor
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Firm Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#F5F1E8] mb-4">
              The Firm
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-[#C9A45C] transition-colors">
                  About LAWCREST
                </Link>
              </li>
              <li>
                <Link href="/lawyers" className="hover:text-[#C9A45C] transition-colors">
                  Our Attorneys
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-[#C9A45C] transition-colors">
                  Significant Verdicts
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#C9A45C] transition-colors">
                  Legal Insights & News
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="text-[#C9A45C] hover:text-[#D8B76A] transition-colors font-medium">
                  Attorney & Client Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Offices & Contact */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#F5F1E8] mb-4">
              Offices
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#C9A45C] shrink-0 mt-0.5" />
                <span>350 Fifth Avenue, 58th Floor<br />New York, NY 10118</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#C9A45C] shrink-0" />
                <span>+1 (212) 555-0190</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#C9A45C] shrink-0" />
                <span>contact@lawcrest.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-[#C9A45C] shrink-0" />
                <span>Mon – Fri: 8:00 AM – 8:00 PM EST</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Disclaimer & Copyright */}
      <div className="border-t border-[#1C1712] bg-[#070605] py-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#6E675D] text-center md:text-left">
            © {new Date().getFullYear()} LAWCREST Professional Corporation. All rights reserved. Attorney Advertising.
          </p>
          <div className="flex items-center gap-6 text-[#8F897F]">
            <Link href="/privacy-policy" className="hover:text-[#C9A45C] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#C9A45C] transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/contact" className="hover:text-[#C9A45C] transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
