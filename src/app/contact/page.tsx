import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | SSS Communications Delhi",
  description:
    "Get in touch with SSS Communications. Call us directly or reach out by email for BPO and web development services in New Delhi.",
};

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98684 80116",
    href: "tel:+919868480116",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@sssdelhi.in",
    href: "mailto:info@sssdelhi.in",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "3257, 1st Floor, Mahindra Park, Rani Bagh, New Delhi – 110034",
    href: "https://maps.google.com/?q=Mahindra+Park+New+Delhi+110034",
    color: "bg-red-50 text-red-600",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Sat: 9:00 AM – 7:00 PM",
    href: null,
    color: "bg-purple-50 text-purple-600",
  },
];

export default function ContactPage() {
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
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Let&apos;s Start a Conversation
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Have a project in mind or want to learn more about our services? Give us a call — we&apos;d love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Info */}
              <div className="lg:col-span-2 space-y-5">
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-2">Contact Information</h2>
                  <p className="text-slate-500 text-sm">Reach out through any of the channels below and we&apos;ll be happy to help.</p>
                </div>

                {contactInfo.map((info) => (
                  <div key={info.label} className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl ${info.color} flex items-center justify-center shrink-0`}>
                      <info.icon size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">{info.label}</div>
                      {info.href ? (
                        <a href={info.href} target={info.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-slate-700 font-medium text-sm hover:text-primary transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-slate-700 font-medium text-sm">{info.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Call us directly */}
              <div className="lg:col-span-3">
                <div className="bg-primary rounded-2xl p-10 text-center text-white h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-6">
                    <Phone size={36} className="text-gold" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Call Us Directly</h2>
                  <p className="text-white/70 mb-8 max-w-sm">
                    Speak with our team right away — we&apos;re available Monday to Saturday, 9:00 AM to 7:00 PM.
                  </p>
                  <a
                    href="tel:+919868480116"
                    className="text-3xl md:text-4xl font-extrabold tracking-tight hover:text-gold transition-colors"
                  >
                    +91 98684 80116
                  </a>
                  <a
                    href="tel:+919868480116"
                    className="mt-8 inline-flex items-center gap-2 bg-gold text-primary px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity"
                  >
                    <Phone size={18} /> Call Now
                  </a>
                  <div className="mt-6 text-white/60 text-sm">
                    Prefer email?{" "}
                    <a href="mailto:info@sssdelhi.in" className="text-white font-semibold hover:text-gold transition-colors">
                      info@sssdelhi.in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map placeholder */}
        <div className="h-64 bg-slate-100 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={32} className="text-primary mx-auto mb-3" />
            <p className="text-slate-600 font-medium">3257, 1st Floor, Mahindra Park</p>
            <p className="text-slate-400 text-sm">Rani Bagh, New Delhi – 110034</p>
            <a
              href="https://maps.google.com/?q=Mahindra+Park+Rani+Bagh+New+Delhi+110034"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-primary text-sm font-semibold hover:underline"
            >
              View on Google Maps →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
