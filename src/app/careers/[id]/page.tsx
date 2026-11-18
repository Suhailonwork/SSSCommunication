import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { careersDB } from "@/lib/db";
import { MapPin, Briefcase, Clock, DollarSign, Building2, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import ApplyForm from "./ApplyForm";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const job = await careersDB.getById(id);
  if (!job) return { title: "Job Not Found" };
  return {
    title: `${job.title} | SSS Communications Careers`,
    description: `${job.description.slice(0, 155)}...`,
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const job = await careersDB.getById(id);

  if (!job || !job.published) notFound();

  const deadline = new Date(job.deadline).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const typeColors: Record<string, string> = {
    "Full-time": "bg-green-50 text-green-700 border-green-200",
    "Part-time": "bg-blue-50 text-blue-700 border-blue-200",
    Contract: "bg-orange-50 text-orange-700 border-orange-200",
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 hero-gradient grid-pattern relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
              <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link href="/careers" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft size={14} /> All Positions
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`badge border text-xs ${typeColors[job.type] || "bg-white/20 text-white border-white/30"}`}>{job.type}</span>
              <span className="badge bg-gold text-primary text-xs">{job.department}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">{job.title}</h1>
            <div className="flex flex-wrap gap-5 text-white/70 text-sm">
              <span className="flex items-center gap-1.5"><Building2 size={14} />{job.department}</span>
              <span className="flex items-center gap-1.5"><MapPin size={14} />{job.location}</span>
              <span className="flex items-center gap-1.5"><Briefcase size={14} />{job.experience}</span>
              <span className="flex items-center gap-1.5"><DollarSign size={14} />{job.salary}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} />Closes {deadline}</span>
            </div>
          </div>
        </section>

        {/* Detail */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left: Job detail */}
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h2 className="text-xl font-bold text-primary mb-4">About this Role</h2>
                  <p className="text-slate-600 leading-relaxed">{job.description}</p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-primary mb-4">Key Responsibilities</h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((r) => (
                      <li key={r} className="flex items-start gap-3 text-slate-600 text-sm">
                        <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-primary mb-4">Requirements</h2>
                  <ul className="space-y-3">
                    {job.requirements.map((r) => (
                      <li key={r} className="flex items-start gap-3 text-slate-600 text-sm">
                        <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-primary mb-4">What We Offer</h2>
                  <ul className="space-y-3">
                    {job.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-slate-600 text-sm">
                        <CheckCircle2 size={16} className="text-gold mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Apply form */}
              <div className="lg:col-span-1">
                <div className="sticky top-28">
                  <ApplyForm careerId={job.id} careerTitle={job.title} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
