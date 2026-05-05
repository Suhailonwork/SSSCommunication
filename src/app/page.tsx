import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import ServicesSection from "@/components/sections/ServicesSection";
import Clients from "@/components/sections/Clients";
import WhyUs from "@/components/sections/WhyUs";
import CTASection from "@/components/sections/CTASection";
import BlogCard from "@/components/BlogCard";
import { blogsDB } from "@/lib/db";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "SSS Communications | BPO & Web Development Delhi",
  description:
    "SSS Communications — Delhi's premier BPO and web development company since 2014. Inbound & outbound call centers, web design, and integrated business solutions. 500+ satisfied clients.",
};

export default function HomePage() {
  const featuredBlogs = blogsDB.getPublished().slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Clients />
        <ServicesSection />
        <WhyUs />

        {featuredBlogs.length > 0 && (
          <section className="py-20 bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
                    Latest Insights
                  </span>
                  <h2 className="section-heading text-3xl md:text-4xl">From Our Blog</h2>
                </div>
                <Link
                  href="/blog"
                  className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-200"
                >
                  View all posts <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            </div>
          </section>
        )}

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
