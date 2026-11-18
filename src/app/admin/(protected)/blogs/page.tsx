export const dynamic = "force-dynamic";

import { blogsDB } from "@/lib/db";
import Link from "next/link";
import { PlusCircle, Edit, Trash2, Eye, EyeOff, FileText } from "lucide-react";
import AdminBlogActions from "./AdminBlogActions";

export default async function AdminBlogsPage() {
  const blogs = (await blogsDB.getAll()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6 page-enter">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Blog Posts</h2>
          <p className="text-slate-500 text-sm mt-1">{blogs.length} total posts</p>
        </div>
        <Link href="/admin/blogs/new" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-dark transition-colors text-sm">
          <PlusCircle size={16} /> New Post
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <FileText size={40} className="text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-medium">No blog posts yet</p>
            <Link href="/admin/blogs/new" className="inline-flex items-center gap-2 mt-4 text-primary text-sm font-semibold hover:underline">
              <PlusCircle size={14} /> Create your first post
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-5 py-3 text-slate-500 font-semibold">Title</th>
                <th className="text-left px-4 py-3 text-slate-500 font-semibold hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-slate-500 font-semibold hidden lg:table-cell">Status</th>
                <th className="text-left px-4 py-3 text-slate-500 font-semibold hidden lg:table-cell">Date</th>
                <th className="text-right px-5 py-3 text-slate-500 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-800 line-clamp-1">{blog.title}</div>
                    <div className="text-slate-400 text-xs mt-0.5">{blog.readTime} min read</div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="badge bg-primary/10 text-primary text-xs">{blog.category}</span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className={`badge text-xs ${blog.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-400 text-xs hidden lg:table-cell">
                    {new Date(blog.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye size={15} />
                      </Link>
                      <Link
                        href={`/admin/blogs/${blog.id}`}
                        className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={15} />
                      </Link>
                      <AdminBlogActions blogId={blog.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
