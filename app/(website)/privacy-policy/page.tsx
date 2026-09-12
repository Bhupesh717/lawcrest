import * as React from "react";
import { Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | LAWCREST Professional Corporation",
  description: "Our standards regarding attorney-client confidentiality and data privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <div>
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A45C] mb-3">
          <Shield className="h-4 w-4" />
          <span>Legal Disclosures</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F1E8]">
          Privacy Policy & Confidentiality
        </h1>
        <p className="text-xs text-[#8F897F] mt-2 font-mono">
          Last Revised: January 1, 2026 • LAWCREST Professional Corporation
        </p>
      </div>

      <div className="prose prose-invert max-w-none text-sm text-[#B8B0A3] leading-relaxed space-y-6">
        <h3 className="font-serif text-xl font-bold text-[#F5F1E8]">
          1. Attorney-Client Privilege and Confidentiality
        </h3>
        <p>
          LAWCREST maintains the highest standard of confidentiality mandated by the Model Rules of Professional Conduct and applicable state bar rules. Unsolicited information sent to LAWCREST does not establish an attorney-client relationship, but all intake communications through our secure portal are encrypted and retained with strict privilege safeguards.
        </p>

        <h3 className="font-serif text-xl font-bold text-[#F5F1E8]">
          2. Information We Collect
        </h3>
        <p>
          When you use our website or client portal, we collect personal identifiers (name, corporate affiliation, email address, telephone numbers) and technical data necessary for session security, fraud prevention, and audit compliance.
        </p>

        <h3 className="font-serif text-xl font-bold text-[#F5F1E8]">
          3. Security Measures and Encryption
        </h3>
        <p>
          We employ military-grade AES-256 encryption in transit and at rest for all case files, invoices, and communications stored within our digital infrastructure. Access is strictly partitioned according to ethical wall guidelines.
        </p>

        <h3 className="font-serif text-xl font-bold text-[#F5F1E8]">
          4. Contact Our Privacy Officer
        </h3>
        <p>
          Questions regarding this policy or data processing should be directed to privacy@lawcrest.com or via mail to: General Counsel, LAWCREST Professional Corporation, 350 Fifth Avenue, 58th Floor, New York, NY 10118.
        </p>
      </div>
    </div>
  );
}
