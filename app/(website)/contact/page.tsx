import * as React from "react";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Lock, Building } from "lucide-react";
import { ConsultationForm } from "@/components/website/consultation-form";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata = {
  title: "Contact & Consultations | LAWCREST Professional Corporation",
  description:
    "Schedule a confidential case evaluation with our senior partners. Offices in New York, Washington D.C., and London.",
};

const offices = [
  {
    city: "New York",
    isPrimary: true,
    address: "350 Fifth Avenue, 58th Floor",
    cityStateZip: "New York, NY 10118",
    phone: "+1 (212) 555-0190",
    email: "ny@lawcrest.com",
  },
  {
    city: "Washington, D.C.",
    isPrimary: false,
    address: "1201 Pennsylvania Ave NW, Suite 700",
    cityStateZip: "Washington, DC 20004",
    phone: "+1 (202) 555-0144",
    email: "dc@lawcrest.com",
  },
  {
    city: "London",
    isPrimary: false,
    address: "100 Bishopsgate, Level 24",
    cityStateZip: "London EC2N 4AG, United Kingdom",
    phone: "+44 (0) 20 7946 0912",
    email: "london@lawcrest.com",
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-16 py-12 sm:py-16">
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A45C] mb-4">
            <Lock className="h-4 w-4" />
            <span>Privileged Inquiries</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5F1E8] tracking-tight leading-tight mb-6">
            Confidential Counsel <br />
            <span className="text-gold-gradient italic font-normal">
              When Stakes Are Paramount.
            </span>
          </h1>
          <p className="text-lg text-[#B8B0A3] leading-relaxed font-light">
            Whether your enterprise requires immediate injunction defense, regulatory crisis management, or strategic advisory, our senior partners are prepared to act decisively.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form on left (7 cols) */}
          <div className="lg:col-span-7">
            <ConsultationForm />
          </div>

          {/* Details & Offices on right (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Emergency Line */}
            <div className="rounded-xl border border-[#C9A45C]/30 bg-[#17130F] p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-2 text-[#C9A45C]">
                <ShieldCheck className="h-5 w-5" />
                <h3 className="font-serif text-base font-bold uppercase tracking-wider">
                  24/7 Litigation Emergency Desk
                </h3>
              </div>
              <p className="text-xs text-[#8F897F] leading-relaxed mb-4">
                For immediate temporary restraining orders, emergency federal court filings, or dawn-raid responses:
              </p>
              <div className="text-2xl font-serif font-bold text-[#D8B76A]">
                <a href="tel:+12125550190" className="hover:underline">
                  +1 (212) 555-0190
                </a>
              </div>
              <p className="text-[11px] text-[#6E675D] mt-2">
                Monitored continuously by designated rotating trial partners.
              </p>
            </div>

            {/* Office Locations */}
            <div className="space-y-4">
              <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#F5F1E8]">
                Global Office Locations
              </h3>
              {offices.map((office, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[#262018] bg-[#14110E] p-5 transition-colors hover:border-[#C9A45C]/40"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-base font-bold text-[#F5F1E8]">
                      {office.city}
                    </span>
                    {office.isPrimary && (
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C9A45C] border border-[#C9A45C]/30 px-2 py-0.5 rounded">
                        Global HQ
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 text-xs text-[#8F897F]">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-[#C9A45C] shrink-0 mt-0.5" />
                      <span>{office.address}<br />{office.cityStateZip}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-[#C9A45C] shrink-0" />
                      <a href={`tel:${office.phone}`} className="hover:text-[#F5F1E8]">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-[#C9A45C] shrink-0" />
                      <a href={`mailto:${office.email}`} className="hover:text-[#F5F1E8]">
                        {office.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
