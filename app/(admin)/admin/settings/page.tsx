"use client";

import * as React from "react";
import {
  Settings,
  ShieldCheck,
  Building,
  Key,
  Bell,
  Save,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings Saved", {
        description: "Firm operational parameters updated in secure ledger.",
      });
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Firm Administration & Security"
        description="Configure corporate identifiers, billing integrations, API endpoints, and ethical wall protocols."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Settings" },
        ]}
        actions={
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#C9A45C] hover:bg-[#D8B76A] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider h-9 gap-1.5"
          >
            <Save className="h-3.5 w-3.5" />
            <span>{isSaving ? "Updating..." : "Save Settings"}</span>
          </Button>
        }
      />

      <Tabs defaultValue="firm" className="space-y-6">
        <TabsList className="bg-[#14110E] border border-[#262018]">
          <TabsTrigger value="firm">Firm Entity Profile</TabsTrigger>
          <TabsTrigger value="security">Security & Encryption</TabsTrigger>
          <TabsTrigger value="api">API & Integrations</TabsTrigger>
        </TabsList>

        {/* Tab 1: Firm Entity */}
        <TabsContent value="firm">
          <div className="rounded-xl border border-[#262018] bg-[#14110E] p-6 space-y-6">
            <h3 className="font-serif text-base font-bold text-[#F5F1E8] border-b border-[#221C16] pb-2">
              Corporate & Statutory Entity Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
                  Firm Legal Name
                </label>
                <Input defaultValue="LAWCREST Professional Corporation" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
                  Federal Employer ID (EIN)
                </label>
                <Input defaultValue="XX-XXXX892" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
                  Global Headquarters Address
                </label>
                <Input defaultValue="350 Fifth Avenue, 58th Floor, New York, NY 10118" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
                  Official Intake Telephone
                </label>
                <Input defaultValue="+1 (212) 555-0190" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
                Designated Managing Partner
              </label>
              <Input defaultValue="Alexander Drake, Esq." />
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Security */}
        <TabsContent value="security">
          <div className="rounded-xl border border-[#262018] bg-[#14110E] p-6 space-y-6">
            <h3 className="font-serif text-base font-bold text-[#F5F1E8] border-b border-[#221C16] pb-2">
              Privilege Safeguards & Access Logs
            </h3>

            <div className="space-y-4 text-xs text-[#B8B0A3]">
              <div className="flex items-center justify-between p-4 rounded-lg border border-[#221C16] bg-[#17130F]">
                <div>
                  <h4 className="font-semibold text-[#F5F1E8] text-sm">Two-Factor Hardware Authentication (MFA)</h4>
                  <p className="text-[#8F897F] mt-0.5">Enforce FIDO2 / WebAuthn physical security keys for all partners.</p>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Enforced</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-[#221C16] bg-[#17130F]">
                <div>
                  <h4 className="font-semibold text-[#F5F1E8] text-sm">Automated Conflict Checking</h4>
                  <p className="text-[#8F897F] mt-0.5">Scans prospective client parties against adversary entity graph.</p>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Active</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 3: API & Integrations */}
        <TabsContent value="api">
          <div className="rounded-xl border border-[#262018] bg-[#14110E] p-6 space-y-6">
            <h3 className="font-serif text-base font-bold text-[#F5F1E8] border-b border-[#221C16] pb-2">
              Backend Architecture & API Endpoints
            </h3>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-lg border border-[#2E2519] bg-[#0E0B09] space-y-2">
                <span className="font-mono text-xs text-[#C9A45C] block">
                  Current API Architecture Status:
                </span>
                <p className="text-xs text-[#E6E0D5] leading-relaxed">
                  The frontend is currently powered by a unified Next.js API route layer under <code className="text-[#C9A45C]">/api/*</code>. All React Query hooks connect via <code className="text-[#C9A45C]">lib/api/client.ts</code>.
                </p>
                <p className="text-xs text-[#8F897F] leading-relaxed">
                  When switching to a dedicated external production backend (e.g., Python / Node / Go), update <code className="text-[#C9A45C]">NEXT_PUBLIC_API_BASE_URL</code> in your <code className="text-[#C9A45C]">.env.local</code>. No frontend component alterations will be required.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
                  Backend API Base URL (NEXT_PUBLIC_API_BASE_URL)
                </label>
                <Input
                  defaultValue=""
                  placeholder="Leave empty for local Next.js API routes (or https://api.lawcrest.com)"
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
