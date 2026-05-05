import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/sections/CTASection";
import { CheckCircle2, Target, Eye, Heart, Rocket, Users, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About SSS Communications | BPO & Web Development Company Delhi",
  description:
    "Learn about SSS Communications — established in 2014, we provide integrated BPO and web development solutions from New Delhi. Our story, mission, values, and commitment to excellence.",
};

const values = [
  {
    icon: Target,
    title: "Excellence First",
    description: "We set the bar high for ourselves in every client interaction, every line of code, every call answered.",
  },
  {
    icon: Heart,
    title: "Client Partnership",
    description: "We don't just serve clients — we build lasting partnerships based on trust, transparency, and results.",
  },
  {
    icon: Rocket,
    title: "Innovation Driven",
    description: "We constantly adopt better technologies and methodologies to stay ahead and deliver superior outcomes.",
  },
  {
    icon: Users,
    title: "People Centric",
    description: "Our team is our greatest asset. We invest in talent, foster growth, and celebrate success together.",
  },
];

const milestones = [
  { year: "2014", title: "Foundation", desc: "SSS Communications incorporated in New Delhi with a vision to transform BPO services." },
  { year: "2016", title: "100 Clients", desc: "Reached our first 100 client milestone, serving leading financial and automotive brands." },
  { year: "2018", title: "Web Dev Launch", desc: "Expanded into web development, offering integrated digital solutions alongside BPO." },
  { year: "2020", title: "Digital Pivot", desc: "Successfully transitioned to hybrid operations during the pandemic with zero service disruption." },
  { year: "2022", title: "300+ Clients", desc: "Crossed 300 active clients, expanding across industries from finance to e-commerce." },
  { year: "2024", title: "500+ Strong", desc: "Today, 500+ businesses trust us for their BPO and web development needs." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page hero */}
        <section className="pt-32 pb-20 hero-gradient grid-pattern relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
              <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-gold text-xs font-semibold uppercase tracking-wider mb-4">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
              Delhi&apos;s Trusted BPO &amp;
              <br />
              <span className="gradient-text">Web Development Partner</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Since 2014, SSS Communications has been empowering businesses with integrated outsourcing and digital solutions — built on integrity, powered by innovation.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  A Decade of Leading, Not Following
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    SSS Communications was born in 2014 with a single, audacious belief: that businesses deserve a BPO partner who genuinely cares about their growth. Founded in the heart of New Delhi, we started with a small, passionate team and a commitment to excellence that would define everything we do.
                  </p>
                  <p>
                    Over a decade, we&apos;ve grown from a handful of call center agents to a full-service integrated business solutions provider — spanning inbound and outbound call center operations, business process outsourcing, and professional web development.
                  </p>
                  <p>
                    Our tagline, &quot;We Lead, Others Follow,&quot; isn&apos;t marketing speak — it&apos;s the standard we hold ourselves to every single day. When our clients win, we win.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6 mt-10">
                  {[
                    { value: "500+", label: "Clients Served" },
                    { value: "10+", label: "Years Experience" },
                    { value: "98%", label: "Retention Rate" },
                    { value: "24/7", label: "Operations" },
                  ].map((s) => (
                    <div key={s.label} className="bg-surface rounded-xl p-5 text-center">
                      <div className="text-2xl font-extrabold text-primary">{s.value}</div>
                      <div className="text-slate-500 text-sm mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-primary rounded-2xl p-8 text-white">
                  <Eye size={28} className="text-gold mb-4" />
                  <h3 className="font-bold text-xl mb-3">Our Vision</h3>
                  <p className="text-white/75 leading-relaxed">
                    To be India&apos;s most trusted integrated business solutions provider — where companies of all sizes access world-class BPO and digital services under one roof.
                  </p>
                </div>
                <div className="bg-gold rounded-2xl p-8">
                  <Target size={28} className="text-primary mb-4" />
                  <h3 className="font-bold text-xl text-primary mb-3">Our Mission</h3>
                  <p className="text-primary/75 leading-relaxed">
                    To deliver exceptional support, superior services, and innovative solutions that enable our clients to focus on their core business while we handle the rest — seamlessly and professionally.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                Our Values
              </span>
              <h2 className="section-heading">What We Stand For</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => (
                <div key={v.title} className="card p-6 text-center group">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300 mx-auto">
                    <v.icon size={24} />
                  </div>
                  <h3 className="font-bold text-primary text-lg mb-3">{v.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                Our Journey
              </span>
              <h2 className="section-heading">A Decade of Growth</h2>
            </div>
            <div className="relative">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 md:-translate-x-px" />
              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <div
                    key={m.year}
                    className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"} pl-14 md:pl-0`}>
                      <div className="card p-5 inline-block w-full">
                        <div className="text-gold font-black text-2xl mb-1">{m.year}</div>
                        <div className="text-primary font-bold text-lg mb-2">{m.title}</div>
                        <p className="text-slate-500 text-sm">{m.desc}</p>
                      </div>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-6 md:left-1/2 top-5 w-3 h-3 bg-gold rounded-full border-4 border-white shadow md:-translate-x-1.5 -translate-x-1.5" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CTASection title="Let's Build Something Great Together" subtitle="Ready to experience the SSS Communications difference? Let's talk about how we can accelerate your business." />
      </main>
      <Footer />
    </>
  );
}
