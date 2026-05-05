import Link from "next/link";
import { MapPin, Briefcase, Clock, DollarSign, ArrowRight, Building2 } from "lucide-react";
import type { Career } from "@/lib/db";

interface JobCardProps {
  job: Career;
}

export default function JobCard({ job }: JobCardProps) {
  const deadline = new Date(job.deadline).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const typeColors: Record<string, string> = {
    "Full-time": "bg-green-50 text-green-700 border-green-200",
    "Part-time": "bg-blue-50 text-blue-700 border-blue-200",
    Contract: "bg-orange-50 text-orange-700 border-orange-200",
    Internship: "bg-purple-50 text-purple-700 border-purple-200",
  };

  return (
    <article className="card p-6 group">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <Link href={`/careers/${job.id}`}>
            <h3 className="text-primary font-bold text-lg group-hover:text-primary-light transition-colors">
              {job.title}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 text-slate-500 text-sm mt-1">
            <Building2 size={13} />
            <span>{job.department}</span>
          </div>
        </div>
        <span className={`badge border text-xs shrink-0 ${typeColors[job.type] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
          {job.type}
        </span>
      </div>

      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-5">{job.description}</p>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="flex items-center gap-2 text-slate-500 text-xs">
          <MapPin size={13} className="text-primary/60 shrink-0" />
          <span className="truncate">{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-xs">
          <Briefcase size={13} className="text-primary/60 shrink-0" />
          <span>{job.experience}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-xs">
          <DollarSign size={13} className="text-primary/60 shrink-0" />
          <span className="truncate">{job.salary}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-xs">
          <Clock size={13} className="text-primary/60 shrink-0" />
          <span>Closes {deadline}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <Link
          href={`/careers/${job.id}`}
          className="flex-1 text-center bg-primary text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-primary-dark transition-colors"
        >
          View & Apply
        </Link>
        <Link
          href={`/careers/${job.id}`}
          className="flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all duration-200"
        >
          Details <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
}
