"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  MessageSquare,
  LogOut,
  PlusCircle,
  Globe,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navGroups = [
  {
    label: "Overview",
    items: [{ icon: LayoutDashboard, label: "Dashboard", href: "/admin" }],
  },
  {
    label: "Content",
    items: [
      { icon: FileText, label: "Blog Posts", href: "/admin/blogs" },
      { icon: PlusCircle, label: "New Blog Post", href: "/admin/blogs/new" },
    ],
  },
  {
    label: "Recruitment",
    items: [
      { icon: Briefcase, label: "Job Listings", href: "/admin/careers" },
      { icon: PlusCircle, label: "Post New Job", href: "/admin/careers/new" },
      { icon: Users, label: "Applications", href: "/admin/applications" },
    ],
  },
  {
    label: "Communication",
    items: [{ icon: MessageSquare, label: "Contact Messages", href: "/admin/contacts" }],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="px-4 py-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3" target="_blank">
          <div className="w-9 h-9 rounded-xl bg-gold flex items-center justify-center">
            <span className="text-primary font-black text-base">S³</span>
          </div>
          <div>
            <div className="font-bold text-white text-sm">SSS Communications</div>
            <div className="text-white/40 text-[10px] tracking-wider">Admin Panel</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-5">
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest px-3 mb-2">{group.label}</p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`admin-sidebar-link ${active ? "active" : ""}`}
                    >
                      <item.icon size={17} />
                      <span className="flex-1">{item.label}</span>
                      {active && <ChevronRight size={13} className="text-gold" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom links */}
      <div className="px-3 pb-5 space-y-1 border-t border-white/10 pt-4">
        <Link href="/" target="_blank" className="admin-sidebar-link">
          <Globe size={17} />
          View Website
        </Link>
        <button onClick={handleLogout} className="admin-sidebar-link w-full text-left text-red-400 hover:text-red-300 hover:bg-red-500/10">
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-primary-dark min-h-screen shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <aside className="w-60 bg-primary-dark flex flex-col h-full shadow-2xl">
            <SidebarContent />
          </aside>
          <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  );
}
