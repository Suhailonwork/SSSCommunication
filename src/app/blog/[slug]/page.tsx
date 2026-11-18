import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogsDB } from "@/lib/db";
import { Calendar, Clock, Tag, ArrowLeft, Share2, User } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await blogsDB.getBySlug(slug);
  if (!blog) return { title: "Article Not Found" };

  return {
    title: blog.seoTitle || blog.title,
    description: blog.seoDescription || blog.excerpt,
    openGraph: {
      title: blog.seoTitle || blog.title,
      description: blog.seoDescription || blog.excerpt,
      type: "article",
      publishedTime: blog.publishedAt,
      authors: [blog.author],
      tags: blog.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = await blogsDB.getBySlug(slug);

  if (!blog || !blog.published) notFound();

  const publishedDate = new Date(blog.publishedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const allBlogs = await blogsDB.getPublished();
  const related = allBlogs.filter((b) => b.slug !== slug && b.category === blog.category).slice(0, 2);

  // Simple markdown to HTML
  const htmlContent = blog.content
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-primary mt-10 mb-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-primary-light mt-8 mb-3">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.+)$/gm, '<li class="flex items-start gap-2 text-slate-600"><span class="text-gold mt-1.5 shrink-0">•</span><span>$1</span></li>')
    .replace(/(<li[^>]*>[\s\S]*?<\/li>(\n|$))+/g, '<ul class="space-y-2 my-5">$&</ul>')
    .replace(/\n\n/g, '</p><p class="text-slate-600 leading-relaxed my-4">');

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 hero-gradient relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
              <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
            </svg>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft size={14} /> Back to Blog
            </Link>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="badge bg-gold text-primary text-xs">{blog.category}</span>
              {blog.tags.slice(0, 3).map((t) => (
                <span key={t} className="badge bg-white/10 text-white text-xs">{t}</span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-white/70 text-sm">
              <span className="flex items-center gap-2"><User size={14} />{blog.author}</span>
              <span className="flex items-center gap-2"><Calendar size={14} />{publishedDate}</span>
              <span className="flex items-center gap-2"><Clock size={14} />{blog.readTime} min read</span>
            </div>
          </div>
        </section>

        {/* Article */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Content */}
              <article className="lg:col-span-3">
                <p className="text-lg text-slate-600 leading-relaxed font-medium border-l-4 border-gold pl-5 mb-8 italic">
                  {blog.excerpt}
                </p>
                <div
                  className="text-slate-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: `<p class="text-slate-600 leading-relaxed my-4">${htmlContent}</p>` }}
                />

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-slate-100">
                  {blog.tags.map((t) => (
                    <span key={t} className="badge bg-primary/10 text-primary text-xs flex items-center gap-1">
                      <Tag size={10} /> {t}
                    </span>
                  ))}
                </div>

                {/* Share */}
                <div className="flex items-center gap-3 mt-8">
                  <span className="text-slate-500 text-sm font-medium flex items-center gap-2"><Share2 size={14} /> Share:</span>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(`https://sssdelhi.in/blog/${blog.slug}`)}`} target="_blank" rel="noopener noreferrer" className="badge bg-sky-50 text-sky-700 border border-sky-200 text-xs hover:bg-sky-100 transition-colors">Twitter</a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://sssdelhi.in/blog/${blog.slug}`)}`} target="_blank" rel="noopener noreferrer" className="badge bg-blue-50 text-blue-700 border border-blue-200 text-xs hover:bg-blue-100 transition-colors">LinkedIn</a>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-28 space-y-6">
                  <div className="bg-surface rounded-2xl p-5 border border-slate-100">
                    <h3 className="font-bold text-primary mb-4 text-sm uppercase tracking-wide">About the Author</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">S</div>
                      <div>
                        <div className="font-semibold text-slate-700 text-sm">{blog.author}</div>
                        <div className="text-slate-400 text-xs">SSS Communications</div>
                      </div>
                    </div>
                  </div>

                  {related.length > 0 && (
                    <div className="bg-surface rounded-2xl p-5 border border-slate-100">
                      <h3 className="font-bold text-primary mb-4 text-sm uppercase tracking-wide">Related Articles</h3>
                      <div className="space-y-3">
                        {related.map((r) => (
                          <Link key={r.id} href={`/blog/${r.slug}`} className="block group">
                            <div className="text-slate-700 text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">{r.title}</div>
                            <div className="text-slate-400 text-xs mt-1">{r.readTime} min read</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-primary rounded-2xl p-5 text-white">
                    <h3 className="font-bold mb-2">Get Expert Help</h3>
                    <p className="text-white/70 text-sm mb-4">Ready to transform your business operations?</p>
                    <Link href="/contact" className="block text-center bg-gold text-primary font-bold text-sm px-4 py-2.5 rounded-lg hover:bg-gold-light transition-colors">
                      Free Consultation
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
