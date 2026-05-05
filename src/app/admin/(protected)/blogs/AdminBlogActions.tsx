"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function AdminBlogActions({ blogId }: { blogId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog post? This cannot be undone.")) return;
    const res = await fetch(`/api/blogs/${blogId}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      title="Delete"
    >
      <Trash2 size={15} />
    </button>
  );
}
