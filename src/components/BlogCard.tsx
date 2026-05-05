import Link from "next/link";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import type { Blog } from "@/lib/db";

interface BlogCardProps {
  blog: Blog;
  featured?: boolean;
}

export default function BlogCard({ blog, featured = false }: BlogCardProps) {
  const date = new Date(blog.publishedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (featured) {
    return (
      <Link href={`/blog/${blog.slug}`} className="group block">
        <article className="card overflow-hidden flex flex-col md:flex-row h-full">
          <div className="md:w-2/5 bg-gradient-to-br from-primary to-primary-light h-48 md:h-auto flex items-center justify-center shrink-0">
            <div className="text-center p-6">
              <div className="text-gold text-4xl font-black mb-2">{blog.category[0]}</div>
              <div className="text-white/80 text-sm font-semibold">{blog.category}</div>
            </div>
          </div>
          <div className="p-6 flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                <span className="flex items-center gap-1"><Calendar size={12} />{date}</span>
                <span className="flex items-center gap-1"><Clock size={12} />{blog.readTime} min read</span>
              </div>
              <h3 className="text-primary font-bold text-xl mb-3 group-hover:text-primary-light transition-colors line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{blog.excerpt}</p>
            </div>
            <div className="flex items-center gap-2 text-primary text-sm font-semibold mt-5 group-hover:gap-3 transition-all duration-200">
              Read article <ArrowRight size={14} />
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${blog.slug}`} className="group block h-full">
      <article className="card overflow-hidden h-full flex flex-col">
        <div className="bg-gradient-to-br from-primary to-primary-light h-44 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gold text-3xl font-black">{blog.category[0]}</div>
            <div className="text-white/70 text-xs font-semibold mt-1">{blog.category}</div>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
            <span className="flex items-center gap-1"><Calendar size={11} />{date}</span>
            <span className="flex items-center gap-1"><Clock size={11} />{blog.readTime} min</span>
          </div>
          <h3 className="text-primary font-bold text-base mb-2 group-hover:text-primary-light transition-colors line-clamp-2 flex-1">
            {blog.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">{blog.excerpt}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {blog.tags.slice(0, 2).map((t) => (
              <span key={t} className="badge bg-primary/8 text-primary text-[11px] py-0.5">
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-primary text-sm font-semibold group-hover:gap-2.5 transition-all duration-200 mt-auto">
            Read more <ArrowRight size={13} />
          </div>
        </div>
      </article>
    </Link>
  );
}
