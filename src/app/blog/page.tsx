import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { blogsDB } from "@/lib/db";
import { Search, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — BPO & Web Development Insights | SSS Communications",
  description:
    "Read expert insights on BPO operations, web development, customer service, and business growth from the SSS Communications team. Stay ahead with our industry knowledge.",
};

const categories = ["All", "BPO", "Web Development", "Customer Service", "Business Growth", "Technology"];

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const blogs = await blogsDB.getPublished();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 hero-gradient grid-pattern relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
              <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-gold text-xs font-semibold uppercase tracking-wider mb-4">
              Knowledge Hub
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Insights & Industry Expertise
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Expert knowledge on BPO, web development, and business growth — straight from the SSS Communications team.
            </p>
          </div>
        </section>

        {/* Blog grid */}
        <section className="py-16 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search articles..."
                  className="input-field pl-9"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      c === "All"
                        ? "bg-primary text-white"
                        : "bg-white text-slate-600 border border-slate-200 hover:border-primary/30 hover:text-primary"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {blogs.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen size={48} className="text-slate-300 mx-auto mb-4" />
                <h3 className="text-slate-400 font-medium text-lg">No articles published yet</h3>
                <p className="text-slate-400 text-sm mt-2">Check back soon for industry insights.</p>
              </div>
            ) : (
              <>
                {/* Featured first */}
                {blogs[0] && (
                  <div className="mb-8">
                    <BlogCard blog={blogs[0]} featured />
                  </div>
                )}

                {/* Grid */}
                {blogs.length > 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.slice(1).map((blog) => (
                      <BlogCard key={blog.id} blog={blog} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
