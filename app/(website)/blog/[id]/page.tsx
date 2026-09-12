"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { useBlog } from "@/lib/hooks/use-blog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { CtaSection } from "@/components/website/cta-section";
import { toast } from "sonner";

export default function BlogDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data, isLoading, isError, refetch } = useBlog(id);

  const post = data?.data;

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Article link copied to clipboard");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-72 rounded-xl" />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ErrorState
          title="Article Not Found"
          message="The legal briefing you requested could not be found."
          onRetry={refetch}
        />
        <div className="text-center mt-6">
          <Link href="/blog">
            <Button variant="outline" className="border-[#2E2519] text-[#C9A45C]">
              Return to Insights Directory
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 py-12 sm:py-16">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8F897F] hover:text-[#C9A45C] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Insights</span>
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Badge
              variant="default"
              className="bg-[#C9A45C]/15 text-[#D8B76A] border-[#C9A45C]/40 uppercase tracking-wider text-xs"
            >
              {post.category || "Legal Briefing"}
            </Badge>
            {post.readingTimeMinutes && (
              <span className="text-xs text-[#8F897F] flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-[#C9A45C]" />
                {post.readingTimeMinutes} min read
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F1E8] tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center justify-between py-4 border-y border-[#262018] text-xs text-[#8F897F]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[#E6E0D5]">
                <User className="h-3.5 w-3.5 text-[#C9A45C]" />
                {post.author?.name || "LAWCREST Editorial Board"}
              </span>
              {post.publishedAt && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#C9A45C]" />
                  {post.publishedAt}
                </span>
              )}
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-[#C9A45C] hover:text-[#D8B76A] transition-colors focus:outline-none"
            >
              <Share2 className="h-4 w-4" />
              <span>Share Briefing</span>
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-96 w-full overflow-hidden rounded-2xl border border-[#262018] shadow-2xl">
          <Image
            src={
              post.coverImage ||
              post.image ||
              (post.category === "Corporate Law"
                ? "/images/corporate-merger.jpg"
                : "/images/legal-gavel.jpg")
            }
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover filter contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
        </div>

        {/* Article Body Content */}
        <div className="prose prose-invert max-w-none text-[#B8B0A3] leading-relaxed space-y-6 text-base">
          <p className="text-lg text-[#F5F1E8] font-serif leading-relaxed italic border-l-2 border-[#C9A45C] pl-4">
            {post.excerpt || post.summary}
          </p>

          <div className="border-t border-[#221C16] pt-6 space-y-5 text-sm sm:text-base leading-relaxed">
            {post.content ? (
              <div className="whitespace-pre-line">{post.content}</div>
            ) : (
              <>
                <p>
                  As state and federal appellate benches continue to reinterpret longstanding commercial precedents, corporate risk officers face shifting liability standards that necessitate preemptive operational adjustments.
                </p>
                <h3 className="font-serif text-xl font-bold text-[#F5F1E8] mt-6">
                  Key Strategic Implications
                </h3>
                <p>
                  The court’s decision establishes that internal corporate records previously presumed privileged may face heightened exposure during expedited administrative discovery unless rigorous separation of counsel protocols are maintained from inception.
                </p>
                <h3 className="font-serif text-xl font-bold text-[#F5F1E8] mt-6">
                  Recommended Action Steps for Corporate Counsel
                </h3>
                <ul className="list-disc list-inside space-y-2 text-[#E6E0D5]">
                  <li>Review existing confidentiality markings across all internal audit memos.</li>
                  <li>Incorporate specialized choice-of-law clauses specifically addressing digital dispute jurisdictions.</li>
                  <li>Retain independent outside counsel early whenever internal inquiries indicate regulatory vulnerability.</li>
                </ul>
              </>
            )}
          </div>
        </div>

        {/* Author Bio Box */}
        <div className="p-6 rounded-xl border border-[#262018] bg-[#14110E] flex items-center justify-between gap-4 mt-12">
          <div>
            <h4 className="font-serif text-base font-bold text-[#F5F1E8]">
              Published by {post.author?.name || "LAWCREST Practice Group"}
            </h4>
            <p className="text-xs text-[#8F897F] mt-1">
              Providing authoritative counsel on complex commercial litigation, antitrust investigations, and corporate governance.
            </p>
          </div>
          <Link href="/lawyers" className="shrink-0">
            <Button
              variant="outline"
              size="sm"
              className="border-[#2E2519] bg-[#17130F] text-[#C9A45C] text-xs"
            >
              Meet Counsel
            </Button>
          </Link>
        </div>
      </article>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CtaSection />
      </section>
    </div>
  );
}
