import * as React from "react";
import { Scale } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | LAWCREST Professional Corporation",
  description: "Terms governing use of the LAWCREST website and portals.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <div>
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A45C] mb-3">
          <Scale className="h-4 w-4" />
          <span>Legal Disclosures</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F1E8]">
          Terms & Conditions of Service
        </h1>
        <p className="text-xs text-[#8F897F] mt-2 font-mono">
          Last Revised: January 1, 2026 • Attorney Advertising Disclaimer
        </p>
      </div>

      <div className="prose prose-invert max-w-none text-sm text-[#B8B0A3] leading-relaxed space-y-6">
        <h3 className="font-serif text-xl font-bold text-[#F5F1E8]">
          1. Attorney Advertising Notice
        </h3>
        <p>
          This website contains attorney advertising. Prior results do not guarantee a similar outcome. Statements regarding past trial outcomes, settlement amounts, and case resolutions reflect specific circumstances and cannot be construed as promises for future matters.
        </p>

        <h3 className="font-serif text-xl font-bold text-[#F5F1E8]">
          2. No Legal Advice Created
        </h3>
        <p>
          The materials made available on this website are provided for informational purposes only and do not constitute legal advice. Receipt or transmission of information via this website does not create an attorney-client relationship.
        </p>

        <h3 className="font-serif text-xl font-bold text-[#F5F1E8]">
          3. Portal Access & Account Integrity
        </h3>
        <p>
          Authorized users granted access to the LAWCREST Case Management Portal are solely responsible for safeguarding credentials and multifactor keys. Any unauthorized attempt to probe or bypass authentication is subject to immediate civil and criminal prosecution under the Computer Fraud and Abuse Act (CFAA).
        </p>
      </div>
    </div>
  );
}
