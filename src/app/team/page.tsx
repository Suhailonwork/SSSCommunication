import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/sections/CTASection";
import { Globe, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Team | SSS Communications Delhi",
  description:
    "Meet the passionate professionals behind SSS Communications — the team that delivers world-class BPO and web development services every day.",
};

const leadership = [
  {
    name: "Rajesh Kumar",
    role: "Founder & Chief Executive Officer",
    bio: "A seasoned entrepreneur with 15+ years in the BPO industry, Rajesh founded SSS Communications with the vision of creating a truly client-centric outsourcing company. His leadership has guided the company to serve 500+ clients across India.",
    dept: "Leadership",
    initials: "RK",
    color: "from-primary to-primary-light",
  },
  {
    name: "Priya Sharma",
    role: "Chief Operations Officer",
    bio: "Priya oversees all BPO operations, ensuring service excellence and SLA adherence across all client accounts. With a background in process optimization, she has streamlined operations to achieve a 98% client retention rate.",
    dept: "Operations",
    initials: "PS",
    color: "from-purple-700 to-purple-500",
  },
  {
    name: "Arjun Mehta",
    role: "Head of Technology",
    bio: "Arjun leads the web development team and technology infrastructure. A full-stack developer by training, he ensures that every digital solution delivered by SSS Communications is built to the highest standards.",
    dept: "Technology",
    initials: "AM",
    color: "from-teal-700 to-teal-500",
  },
];

const team = [
  { name: "Sunita Verma", role: "Senior BPO Manager", dept: "Operations", initials: "SV", color: "from-blue-600 to-blue-400" },
  { name: "Deepak Singh", role: "Lead Web Developer", dept: "Technology", initials: "DS", color: "from-green-700 to-green-500" },
  { name: "Kavitha Nair", role: "Quality Assurance Head", dept: "Quality", initials: "KN", color: "from-red-600 to-red-400" },
  { name: "Amit Gupta", role: "Sales Manager", dept: "Business Dev", initials: "AG", color: "from-amber-600 to-amber-400" },
  { name: "Rekha Bansal", role: "HR Manager", dept: "Human Resources", initials: "RB", color: "from-pink-600 to-pink-400" },
  { name: "Suresh Yadav", role: "Team Leader – BPO", dept: "Operations", initials: "SY", color: "from-indigo-600 to-indigo-400" },
  { name: "Pooja Agarwal", role: "UI/UX Designer", dept: "Technology", initials: "PA", color: "from-cyan-600 to-cyan-400" },
  { name: "Vijay Pandey", role: "IT Infrastructure Lead", dept: "Technology", initials: "VP", color: "from-slate-600 to-slate-400" },
];

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 hero-gradient grid-pattern relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
              <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-gold text-xs font-semibold uppercase tracking-wider mb-4">
              Our Team
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
              The People Behind
              <br />
              <span className="gradient-text">Our Success</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Meet the dedicated professionals who work tirelessly to deliver exceptional results for our 500+ clients every single day.
            </p>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                Leadership
              </span>
              <h2 className="section-heading">Senior Leadership Team</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadership.map((member) => (
                <div key={member.name} className="card overflow-hidden group">
                  <div className={`bg-gradient-to-br ${member.color} h-52 flex items-center justify-center relative`}>
                    <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center">
                      <span className="text-white font-black text-3xl">{member.initials}</span>
                    </div>
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <button className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors">
                        <Globe size={14} />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors">
                        <Mail size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="badge bg-primary/10 text-primary text-xs mb-2">{member.dept}</span>
                    <h3 className="text-primary font-bold text-xl mt-2">{member.name}</h3>
                    <p className="text-gold font-medium text-sm mb-4">{member.role}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                Team
              </span>
              <h2 className="section-heading">Meet the Team</h2>
              <p className="section-subheading mx-auto">
                A diverse group of professionals united by a passion for excellence.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {team.map((m) => (
                <div key={m.name} className="card p-5 text-center group hover:border-primary/20">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-white font-bold text-lg">{m.initials}</span>
                  </div>
                  <h3 className="font-bold text-primary text-base">{m.name}</h3>
                  <p className="text-slate-500 text-xs mt-1 mb-2">{m.role}</p>
                  <span className="badge bg-slate-100 text-slate-500 text-[10px]">{m.dept}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Culture */}
        <section className="py-20 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Our Growing Team
            </h2>
            <p className="text-white/70 text-lg mb-10">
              We&apos;re always looking for talented, passionate individuals who share our commitment to excellence. Explore current openings and build your career with SSS Communications.
            </p>
            <a
              href="/careers"
              className="inline-flex items-center gap-2 bg-gold text-primary font-bold px-8 py-4 rounded-xl hover:bg-gold-light transition-all duration-300 hover:shadow-xl"
            >
              View Open Positions
            </a>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
