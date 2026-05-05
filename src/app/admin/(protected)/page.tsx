export const dynamic = "force-dynamic";

import { blogsDB, careersDB, applicationsDB, contactsDB } from "@/lib/db";
import Link from "next/link";
import { FileText, Briefcase, Users, MessageSquare, PlusCircle, TrendingUp, Eye } from "lucide-react";

export default function AdminDashboard() {
  const blogs = blogsDB.getAll();
  const careers = careersDB.getAll();
  const applications = applicationsDB.getAll();
  const contacts = contactsDB.getAll();

  const pendingApps = applications.filter((a) => a.status === "pending").length;
  const unreadContacts = contacts.filter((c) => !c.read).length;

  const stats = [
    {
      label: "Blog Posts",
      value: blogs.length,
      sub: `${blogs.filter((b) => b.published).length} published`,
      icon: FileText,
      color: "bg-blue-50 text-blue-600",
      href: "/admin/blogs",
    },
    {
      label: "Job Listings",
      value: careers.length,
      sub: `${careers.filter((c) => c.published).length} active`,
      icon: Briefcase,
      color: "bg-green-50 text-green-600",
      href: "/admin/careers",
    },
    {
      label: "Applications",
      value: applications.length,
      sub: `${pendingApps} pending review`,
      icon: Users,
      color: "bg-purple-50 text-purple-600",
      href: "/admin/applications",
      badge: pendingApps,
    },
    {
      label: "Messages",
      value: contacts.length,
      sub: `${unreadContacts} unread`,
      icon: MessageSquare,
      color: "bg-amber-50 text-amber-600",
      href: "/admin/contacts",
      badge: unreadContacts,
    },
  ];

  const recentApps = [...applications].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
  const recentBlogs = [...blogs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4);

  const statusColors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    reviewing: "bg-blue-100 text-blue-700",
    shortlisted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-8 page-enter">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-primary">Dashboard</h2>
        <p className="text-slate-500 text-sm mt-1">Overview of your SSS Communications website.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <s.icon size={20} />
              </div>
              {s.badge ? (
                <span className="w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                  {s.badge}
                </span>
              ) : null}
            </div>
            <div className="text-2xl font-extrabold text-primary">{s.value}</div>
            <div className="text-slate-500 text-xs font-medium mt-0.5">{s.label}</div>
            <div className="text-slate-400 text-xs mt-1">{s.sub}</div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/admin/blogs/new" className="flex items-center gap-3 bg-primary text-white px-4 py-3 rounded-xl hover:bg-primary-dark transition-colors">
          <PlusCircle size={18} />
          <span className="text-sm font-semibold">New Blog Post</span>
        </Link>
        <Link href="/admin/careers/new" className="flex items-center gap-3 bg-gold text-primary px-4 py-3 rounded-xl hover:bg-gold-light transition-colors">
          <PlusCircle size={18} />
          <span className="text-sm font-semibold">Post New Job</span>
        </Link>
        <Link href="/admin/applications" className="flex items-center gap-3 bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-xl hover:border-primary/30 hover:text-primary transition-colors">
          <Eye size={18} />
          <span className="text-sm font-semibold">View Applications</span>
        </Link>
        <Link href="/" target="_blank" className="flex items-center gap-3 bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-xl hover:border-primary/30 hover:text-primary transition-colors">
          <TrendingUp size={18} />
          <span className="text-sm font-semibold">View Website</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent applications */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h3 className="font-bold text-primary">Recent Applications</h3>
            <Link href="/admin/applications" className="text-primary text-sm hover:underline">View all</Link>
          </div>
          {recentApps.length === 0 ? (
            <div className="px-6 py-10 text-center text-slate-400 text-sm">No applications yet</div>
          ) : (
            <ul className="divide-y divide-slate-50">
              {recentApps.map((app) => (
                <li key={app.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-800 text-sm truncate">{app.name}</div>
                    <div className="text-slate-400 text-xs truncate">{app.careerTitle}</div>
                  </div>
                  <span className={`badge text-xs shrink-0 ${statusColors[app.status]}`}>{app.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent blogs */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h3 className="font-bold text-primary">Blog Posts</h3>
            <Link href="/admin/blogs" className="text-primary text-sm hover:underline">Manage all</Link>
          </div>
          {recentBlogs.length === 0 ? (
            <div className="px-6 py-10 text-center text-slate-400 text-sm">No blog posts yet</div>
          ) : (
            <ul className="divide-y divide-slate-50">
              {recentBlogs.map((b) => (
                <li key={b.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-800 text-sm truncate">{b.title}</div>
                    <div className="text-slate-400 text-xs">{b.category}</div>
                  </div>
                  <span className={`badge text-xs ${b.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                    {b.published ? "Published" : "Draft"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
