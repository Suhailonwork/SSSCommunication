import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import { careersDB } from "@/lib/db";
import { Briefcase, Users, TrendingUp, Heart, Briefcase as BriefcaseEmpty } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers at SSS Communications | Job Openings in Delhi",
  description:
    "Join the SSS Communications team — open positions in BPO operations, web development, and business management in New Delhi. Competitive pay, growth opportunities, and a great culture.",
};

const perks = [
  { icon: TrendingUp, title: "Career Growth", desc: "Clear career paths and regular performance-based promotions." },
  { icon: Heart, title: "Employee Wellness", desc: "PF, ESI, health benefits, and paid leaves included." },
  { icon: Users, title: "Great Culture", desc: "Collaborative team environment with a focus on learning." },
  { icon: Briefcase, title: "Skill Development", desc: "Ongoing training programs and professional certifications." },
];

export const dynamic = "force-dynamic";

export default async function CareersPage() {
  const jobs = await careersDB.getPublished();

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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-gold text-xs font-semibold uppercase tracking-wider mb-4">
              Join Our Team
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Build Your Career With
              <br />
              <span className="gradient-text">SSS Communications</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              We&apos;re always looking for talented, passionate people. Explore our current openings and take your career to the next level.
            </p>
          </div>
        </section>

        {/* Perks */}
        <section className="py-14 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {perks.map((p) => (
                <div key={p.title} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center group hover:border-primary/20 hover:shadow-md transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <p.icon size={20} />
                  </div>
                  <h3 className="font-bold text-primary text-sm mb-2">{p.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Job listings */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="section-heading text-2xl md:text-3xl">Open Positions</h2>
                <p className="text-slate-500 text-sm mt-1">{jobs.length} position{jobs.length !== 1 ? "s" : ""} available</p>
              </div>
            </div>

            {jobs.length === 0 ? (
              <div className="text-center py-20">
                <BriefcaseEmpty size={48} className="text-slate-300 mx-auto mb-4" />
                <h3 className="text-slate-400 font-medium text-lg">No open positions right now</h3>
                <p className="text-slate-400 text-sm mt-2">
                  Check back soon or send your CV to{" "}
                  <a href="mailto:info@sssdelhi.in" className="text-primary hover:underline">info@sssdelhi.in</a>
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}

            {/* General apply */}
            <div className="mt-16 bg-surface rounded-2xl p-8 border border-slate-100 text-center">
              <h3 className="text-xl font-bold text-primary mb-3">Don&apos;t See a Fit?</h3>
              <p className="text-slate-500 mb-5">
                We&apos;re always open to exceptional talent. Send your CV and tell us how you can contribute to SSS Communications.
              </p>
              <a
                href="mailto:info@sssdelhi.in?subject=General Application"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Send General Application
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
