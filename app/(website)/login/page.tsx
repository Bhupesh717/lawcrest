"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Scale, Lock, ShieldCheck, ArrowRight, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { useLogin } from "@/lib/hooks/use-auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginMutation.mutateAsync(data);
      if (response.success) {
        toast.success("Authentication Successful", {
          description: `Welcome back, ${response.data.user.name}. Redirecting to portal...`,
        });
        router.push("/admin/dashboard");
      }
    } catch (error: any) {
      toast.error("Authentication Failed", {
        description: error?.message || "Invalid email or password. Please use demo credentials.",
      });
    }
  };

  const handleFillDemo = () => {
    setValue("email", "admin@lawcrest.com");
    setValue("password", "password123");
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Brand & Heading */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-3 group mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-[#C9A45C] bg-[#17130F] text-[#C9A45C] shadow-[0_0_15px_rgba(201,164,92,0.2)]">
              <Scale className="h-6 w-6" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-[0.18em] text-[#F5F1E8]">
              LAW<span className="text-[#C9A45C]">CREST</span>
            </span>
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F1E8]">
            Client & Attorney Portal
          </h1>
          <p className="mt-2 text-xs text-[#8F897F]">
            Authorized legal personnel, partners, and active clients only.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-[#2E2519] bg-[#14110E] p-8 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
                Official Email Address
              </label>
              <Input
                type="email"
                placeholder="attorney@lawcrest.com"
                {...register("email")}
                className={errors.email ? "border-red-500/50" : ""}
              />
              {errors.email && (
                <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3]">
                  Security Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("Password Reset", {
                      description: "For demo purposes, use 'admin@lawcrest.com' and 'password123'.",
                    });
                  }}
                  className="text-[11px] text-[#C9A45C] hover:underline"
                >
                  Forgot Key?
                </a>
              </div>
              <Input
                type="password"
                placeholder="••••••••••••"
                {...register("password")}
                className={errors.password ? "border-red-500/50" : ""}
              />
              {errors.password && (
                <p className="text-[11px] text-red-400 mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || loginMutation.isPending}
              className="w-full bg-[#C9A45C] hover:bg-[#D8B76A] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider h-11 shadow-[0_0_20px_rgba(201,164,92,0.25)] transition-all mt-2"
            >
              {isSubmitting || loginMutation.isPending ? (
                "Verifying Credentials..."
              ) : (
                <>
                  <span>Authenticate & Enter Portal</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Demo Quick-Fill Credentials Helper */}
          <div className="pt-4 border-t border-[#221C16] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#8F897F] flex items-center gap-1.5">
                <KeyRound className="h-3.5 w-3.5 text-[#C9A45C]" />
                Demo Credentials:
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] font-bold text-[#C9A45C] hover:text-[#D8B76A] uppercase tracking-wider underline cursor-pointer"
              >
                Auto-Fill Demo
              </button>
            </div>
            <div className="bg-[#0D0A08] p-2.5 rounded border border-[#221C16] font-mono text-[11px] text-[#8F897F] space-y-0.5">
              <div>Email: <span className="text-[#E6E0D5]">admin@lawcrest.com</span></div>
              <div>Pass: <span className="text-[#E6E0D5]">password123</span></div>
            </div>
          </div>
        </div>

        {/* Security badge footer */}
        <div className="flex items-center justify-center gap-2 text-xs text-[#8F897F]">
          <ShieldCheck className="h-4 w-4 text-[#C9A45C]" />
          <span>Protected by 256-Bit Hardware Encryption & Audit Logging</span>
        </div>
      </div>
    </div>
  );
}
