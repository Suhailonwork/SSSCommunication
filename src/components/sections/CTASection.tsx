"use client";

import Link from "next/link";
import { useLinkStatus } from "next/link";
import { ArrowRight, Phone, Loader2 } from "lucide-react";

function CTASpinner() {
  const { pending } = useLinkStatus();
  return pending ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />;
}

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTASection({
  title = "Ready to Transform Your Business?",
  subtitle = "Join 500+ companies that trust SSS Communications for their BPO and web development needs. Get a free consultation today.",
  primaryLabel = "Get Free Consultation",
  primaryHref = "/contact",
  secondaryLabel = "Call Us Now",
  secondaryHref = "tel:+919868480116",
}: CTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-gold via-gold-light to-gold relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-5">{title}</h2>
        <p className="text-primary/70 text-lg mb-10 max-w-2xl mx-auto">{subtitle}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary-dark transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            {primaryLabel} <CTASpinner />
          </Link>
          <a
            href={secondaryHref}
            className="inline-flex items-center gap-2 border-2 border-primary text-primary font-bold px-8 py-4 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            <Phone size={18} /> {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
