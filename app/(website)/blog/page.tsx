"use client";

import * as React from "react";
import { BookOpen } from "lucide-react";
import { BlogCard } from "@/components/website/blog-card";
import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";
import { CtaSection } from "@/components/website/cta-section";
import { CardSkeleton } from "@/components/ui/loading-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { useBlogs } from "@/lib/hooks/use-blog";

export default function BlogPage() {
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("");

  const { data, isLoading } = useBlogs({
    search: search || undefined,
    limit: 50,
  });

  const posts = data?.data || [];

  const filteredPosts = React.useMemo(() => {
    if (!category) return posts;
    return posts.filter(
      (p) => p.category?.toLowerCase() === category.toLowerCase()
    );
  }, [posts, category]);

  return (
    <div className="space-y-16 py-12 sm:py-16">
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A45C] mb-4">
            <BookOpen className="h-4 w-4" />
            <span>Legal Analysis & Thought Leadership</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5F1E8] tracking-tight leading-tight mb-6">
            Insights on Precedent, <br />
            <span className="text-gold-gradient italic font-normal">
              Policy & Litigation.
            </span>
          </h1>
          <p className="text-lg text-[#B8B0A3] leading-relaxed font-light">
            In-depth perspectives and timely briefings from our practice leaders on groundbreaking judicial rulings, regulatory trends, and tactical trial considerations.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl border border-[#262018] bg-[#14110E]">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search publications by title or topic..."
            className="sm:w-80"
          />

          <div className="w-full sm:w-64">
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="All Topics"
            >
              <option value="">All Topics</option>
              <option value="Litigation">Litigation & Trial</option>
              <option value="Corporate Governance">Corporate Governance</option>
              <option value="Regulatory">Regulatory & Antitrust</option>
              <option value="Intellectual Property">Intellectual Property</option>
            </Select>
          </div>
        </div>
      </section>

      {/* 2. Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <CardSkeleton count={6} />
        ) : filteredPosts.length === 0 ? (
          <EmptyState
            title="No Publications Found"
            description="No articles matched your selected criteria."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* 3. CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CtaSection
          title="Subscribe To Executive Legal Briefings"
          subtitle="Receive monthly strategic insights curated specifically for general counsels, board directors, and institutional investors."
        />
      </section>
    </div>
  );
}
