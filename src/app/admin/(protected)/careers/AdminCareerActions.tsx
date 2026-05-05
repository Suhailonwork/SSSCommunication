"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function AdminCareerActions({ careerId }: { careerId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Delete this job listing? All related applications will also be removed.")) return;
    await fetch(`/api/careers/${careerId}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <button onClick={handleDelete} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
      <Trash2 size={15} />
    </button>
  );
}
