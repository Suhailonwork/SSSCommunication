export const dynamic = "force-dynamic";

import { applicationsDB } from "@/lib/db";
import ApplicationStatusUpdater from "./ApplicationStatusUpdater";
import { Users } from "lucide-react";

export default function AdminApplicationsPage() {
  const applications = applicationsDB.getAll().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const statusColors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    reviewing: "bg-blue-100 text-blue-700",
    shortlisted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  const counts = {
    all: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    reviewing: applications.filter((a) => a.status === "reviewing").length,
    shortlisted: applications.filter((a) => a.status === "shortlisted").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="space-y-6 page-enter">
      <div>
        <h2 className="text-2xl font-bold text-primary">Applications</h2>
        <p className="text-slate-500 text-sm mt-1">{counts.all} total applications received</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Pending", count: counts.pending, color: "text-amber-600 bg-amber-50" },
          { label: "Reviewing", count: counts.reviewing, color: "text-blue-600 bg-blue-50" },
          { label: "Shortlisted", count: counts.shortlisted, color: "text-green-600 bg-green-50" },
          { label: "Rejected", count: counts.rejected, color: "text-red-600 bg-red-50" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl p-4 text-center ${s.color}`}>
            <div className="text-2xl font-extrabold">{s.count}</div>
            <div className="text-xs font-semibold mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {applications.length === 0 ? (
          <div className="text-center py-16">
            <Users size={40} className="text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-medium">No applications yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left px-5 py-3 text-slate-500 font-semibold">Applicant</th>
                  <th className="text-left px-4 py-3 text-slate-500 font-semibold">Position</th>
                  <th className="text-left px-4 py-3 text-slate-500 font-semibold">Experience</th>
                  <th className="text-left px-4 py-3 text-slate-500 font-semibold">Applied</th>
                  <th className="text-left px-4 py-3 text-slate-500 font-semibold">Status</th>
                  <th className="text-right px-5 py-3 text-slate-500 font-semibold">Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-800">{app.name}</div>
                      <div className="text-slate-400 text-xs">{app.email}</div>
                      <div className="text-slate-400 text-xs">{app.phone}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-slate-700 font-medium text-sm">{app.careerTitle}</div>
                    </td>
                    <td className="px-4 py-4 text-slate-500 text-sm">{app.experience}</td>
                    <td className="px-4 py-4 text-slate-400 text-xs">
                      {new Date(app.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`badge text-xs ${statusColors[app.status]}`}>{app.status}</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <ApplicationStatusUpdater applicationId={app.id} currentStatus={app.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
