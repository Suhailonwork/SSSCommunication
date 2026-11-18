export const dynamic = "force-dynamic";

import { careersDB } from "@/lib/db";
import Link from "next/link";
import { PlusCircle, Edit, Trash2, Eye, Briefcase } from "lucide-react";
import AdminCareerActions from "./AdminCareerActions";

export default async function AdminCareersPage() {
  const careers = (await careersDB.getAll()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6 page-enter">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Job Listings</h2>
          <p className="text-slate-500 text-sm mt-1">{careers.length} total positions</p>
        </div>
        <Link href="/admin/careers/new" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-dark transition-colors text-sm">
          <PlusCircle size={16} /> Post New Job
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {careers.length === 0 ? (
          <div className="text-center py-16">
            <Briefcase size={40} className="text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-medium">No job listings yet</p>
            <Link href="/admin/careers/new" className="inline-flex items-center gap-2 mt-4 text-primary text-sm font-semibold hover:underline">
              <PlusCircle size={14} /> Post your first job
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-5 py-3 text-slate-500 font-semibold">Position</th>
                <th className="text-left px-4 py-3 text-slate-500 font-semibold hidden md:table-cell">Department</th>
                <th className="text-left px-4 py-3 text-slate-500 font-semibold hidden md:table-cell">Type</th>
                <th className="text-left px-4 py-3 text-slate-500 font-semibold hidden lg:table-cell">Status</th>
                <th className="text-right px-5 py-3 text-slate-500 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {careers.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-800">{job.title}</div>
                    <div className="text-slate-400 text-xs mt-0.5">{job.location}</div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="badge bg-primary/10 text-primary text-xs">{job.department}</span>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell text-slate-600 text-xs">{job.type}</td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className={`badge text-xs ${job.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {job.published ? "Active" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/careers/${job.id}`} target="_blank" className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="View">
                        <Eye size={15} />
                      </Link>
                      <Link href={`/admin/careers/${job.id}`} className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Edit">
                        <Edit size={15} />
                      </Link>
                      <AdminCareerActions careerId={job.id} />
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
