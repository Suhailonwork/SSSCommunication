"use client";

import { useRouter } from "next/navigation";

const statuses = ["pending", "reviewing", "shortlisted", "rejected"] as const;
type Status = typeof statuses[number];

export default function ApplicationStatusUpdater({
  applicationId,
  currentStatus,
}: {
  applicationId: string;
  currentStatus: Status;
}) {
  const router = useRouter();

  const handleChange = async (status: Status) => {
    await fetch(`/api/applications/${applicationId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  };

  return (
    <select
      value={currentStatus}
      onChange={(e) => handleChange(e.target.value as Status)}
      className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </option>
      ))}
    </select>
  );
}
