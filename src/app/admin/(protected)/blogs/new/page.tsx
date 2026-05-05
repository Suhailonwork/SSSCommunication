"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const categories = ["BPO", "Web Development", "Customer Service", "Business Growth", "Technology", "Company News"];

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "SSS Communications Team",
    category: "",
    tags: "",
    published: false,
    readTime: 5,
    seoTitle: "",
    seoDescription: "",
    coverImage: "/blog/default.jpg",
  });

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleTitleChange = (title: string) => {
    setForm((f) => ({
      ...f,
      title,
      slug: f.slug || generateSlug(title),
      seoTitle: f.seoTitle || title + " | SSS Communications",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        readTime: Number(form.readTime),
        publishedAt: form.published ? new Date().toISOString() : new Date().toISOString(),
      };
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        router.push("/admin/blogs");
        router.refresh();
      } else {
        const d = await res.json();
        setError(d.error || "Failed to create post");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 page-enter max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/blogs" className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-primary">New Blog Post</h2>
          <p className="text-slate-500 text-sm">Write and publish a new article</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Post Title *</label>
                <input
                  required
                  type="text"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter an engaging title..."
                  className="input-field text-lg font-semibold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">URL Slug *</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg text-slate-500 text-sm">/blog/</span>
                  <input
                    required
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="url-slug"
                    className="input-field rounded-l-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Excerpt *</label>
                <textarea
                  required
                  rows={3}
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="A short summary of the article (shown in listings and SEO)..."
                  className="input-field resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Content * (Markdown supported)</label>
                <textarea
                  required
                  rows={16}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="## Introduction&#10;&#10;Write your article content here...&#10;&#10;## Section Title&#10;&#10;Content..."
                  className="input-field resize-none font-mono text-sm"
                />
                <p className="text-slate-400 text-xs mt-1">Supports ## headings, ### subheadings, **bold**, and - list items</p>
              </div>
            </div>

            {/* SEO */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
              <h3 className="font-bold text-primary text-lg">SEO Settings</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">SEO Title</label>
                <input
                  type="text"
                  value={form.seoTitle}
                  onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                  placeholder="Title for search engines (60 chars ideal)"
                  className="input-field"
                />
                <p className="text-slate-400 text-xs mt-1">{form.seoTitle.length}/60 characters</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Meta Description</label>
                <textarea
                  rows={3}
                  value={form.seoDescription}
                  onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                  placeholder="Description for search results (155 chars ideal)..."
                  className="input-field resize-none"
                />
                <p className="text-slate-400 text-xs mt-1">{form.seoDescription.length}/155 characters</p>
              </div>
            </div>
          </div>

          {/* Sidebar settings */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
              <h3 className="font-bold text-primary">Post Settings</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Category *</label>
                <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
                  <option value="">Select category</option>
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tags</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="BPO, Business, Growth (comma separated)"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Author</label>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Read Time (minutes)</label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={form.readTime}
                  onChange={(e) => setForm({ ...form, readTime: Number(e.target.value) })}
                  className="input-field"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <div className="text-sm font-medium text-slate-700">Publish immediately</div>
                  <div className="text-xs text-slate-400">Toggle off to save as draft</div>
                </div>
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, published: !f.published }))}
                  className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${form.published ? "bg-green-500" : "bg-slate-200"}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${form.published ? "left-6" : "left-0.5"}`} />
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
              ) : (
                <><Save size={16} /> {form.published ? "Publish Post" : "Save Draft"}</>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
