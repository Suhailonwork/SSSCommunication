"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLinkStatus } from "next/link";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

function CTASpinner({ size = 18 }: { size?: number }) {
  const { pending } = useLinkStatus();
  return pending ? <Loader2 size={size} className="animate-spin" /> : <ArrowRight size={size} />;
}

const heroWords = ["Excellence", "Innovation", "Results", "Growth"];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % heroWords.length);
        setVisible(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const perks = ["10+ Years Experience", "500+ Clients Served", "24/7 Support", "ISO Certified"];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-gradient grid-pattern">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating cards */}
      <div className="absolute top-24 right-12 hidden xl:block animate-float">
        <div className="glass rounded-2xl p-4 text-white text-sm">
          <div className="text-gold font-bold text-2xl">500+</div>
          <div className="text-white/70">Happy Clients</div>
        </div>
      </div>
      <div className="absolute bottom-32 right-24 hidden xl:block animate-float" style={{ animationDelay: "1s" }}>
        <div className="glass rounded-2xl p-4 text-white text-sm">
          <div className="text-gold font-bold text-2xl">98%</div>
          <div className="text-white/70">Client Retention</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            Established 2014 · New Delhi, India
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight mb-6">
            Delivering Business{" "}
            <span
              className="gradient-text inline-block transition-all duration-400"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)" }}
            >
              {heroWords[wordIdx]}
            </span>
            <br />
            Through Integrated BPO
          </h1>

          <p className="text-lg text-white/75 leading-relaxed mb-10 max-w-2xl">
            SSS Communications provides world-class Business Process Outsourcing and Web Development solutions
            from the heart of Delhi. We empower businesses to grow faster, serve better, and lead their markets.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold text-primary font-bold px-7 py-4 rounded-xl hover:bg-gold-light transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 animate-pulse-glow"
            >
              Get Free Consultation <CTASpinner />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-7 py-4 rounded-xl hover:bg-white hover:text-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              Explore Services <CTASpinner size={16} />
            </Link>
          </div>

          {/* Perks */}
          <div className="flex flex-wrap gap-5">
            {perks.map((p) => (
              <div key={p} className="flex items-center gap-2 text-white/80 text-sm">
                <CheckCircle2 size={15} className="text-gold" />
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
