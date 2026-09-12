import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function BlogCard({
  post,
  className,
}: {
  post: BlogPost;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-[#262018] bg-[#14110E] transition-all duration-300 hover:border-[#C9A45C]/50 hover:shadow-[0_12px_35px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden bg-[#1E1914]">
        {(() => {
          const imageSrc =
            post.image ||
            (post.category === "Corporate Law"
              ? "/images/corporate-merger.jpg"
              : "/images/legal-gavel.jpg");

          return (
            <Image
              src={imageSrc}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover filter contrast-105 transition-transform duration-500 group-hover:scale-105"
            />
          );
        })()}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14110E] via-transparent to-transparent opacity-80" />
        <div className="absolute top-3 left-3">
          <Badge
            variant="default"
            className="bg-[#0A0A0A]/85 text-[#C9A45C] border-[#C9A45C]/40 text-[10px] uppercase tracking-wider backdrop-blur-sm"
          >
            {post.category || "Legal Insight"}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-3 text-[11px] text-[#8F897F] mb-3">
            {post.publishedAt && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-[#C9A45C]" />
                {post.publishedAt}
              </span>
            )}
            {post.readTime && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-[#C9A45C]" />
                {post.readTime} min read
              </span>
            )}
          </div>

          <h3 className="font-serif text-lg font-bold text-[#F5F1E8] group-hover:text-[#D8B76A] transition-colors leading-snug mb-2.5">
            {post.title}
          </h3>

          <p className="text-xs text-[#8F897F] leading-relaxed line-clamp-2 mb-6">
            {post.excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-[#221C16] flex items-center justify-between">
          <span className="text-xs text-[#8F897F]">
            By <span className="text-[#E6E0D5] font-medium">{post.author || "Senior Partner"}</span>
          </span>
          <Link
            href={`/blog/${post.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#C9A45C] hover:text-[#D8B76A] transition-colors uppercase tracking-wider"
          >
            <span>Read Article</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
