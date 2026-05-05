"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

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
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-gold text-xs font-semibold uppercase tracking-wider mb-4">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Let&apos;s Start a Conversation
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Have a project in mind or want to learn more about our services? We&apos;d love to hear from you.
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
                  <p className="text-slate-500 text-sm">Reach out through any of the channels below or fill in the form and we&apos;ll respond within 24 hours.</p>
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

                {/* Quick links */}
                <div className="border-t border-slate-100 pt-6">
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">Quick Actions</p>
                  <div className="space-y-2">
                    <a href="tel:+919868480116" className="flex items-center gap-2 bg-primary text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors">
                      <Phone size={16} /> Call Us Now
                    </a>
                    <a href="mailto:info@sssdelhi.in" className="flex items-center gap-2 border border-primary text-primary px-4 py-3 rounded-lg text-sm font-semibold hover:bg-primary hover:text-white transition-colors">
                      <Mail size={16} /> Send Email
                    </a>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-3">Message Sent!</h3>
                    <p className="text-slate-500 mb-6">Thank you for reaching out. Our team will get back to you within 24 business hours.</p>
                    <button onClick={() => setStatus("idle")} className="btn-outline">Send Another Message</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-surface rounded-2xl p-8 space-y-5">
                    <div>
                      <h2 className="text-xl font-bold text-primary mb-1">Send Us a Message</h2>
                      <p className="text-slate-500 text-sm">We typically respond within 24 hours.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
                        <input
                          required
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your full name"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address *</label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="your@email.com"
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+91 XXXXX XXXXX"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject *</label>
                        <select
                          required
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className="input-field"
                        >
                          <option value="">Select a subject</option>
                          <option>BPO Services Inquiry</option>
                          <option>Web Development Project</option>
                          <option>Partnership Opportunity</option>
                          <option>Career / Job Inquiry</option>
                          <option>General Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Message *</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us about your project or inquiry..."
                        className="input-field resize-none"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">Something went wrong. Please try again or call us directly.</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-dark transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {status === "loading" ? (
                        <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                      ) : (
                        <><Send size={18} /> Send Message</>
                      )}
                    </button>
                  </form>
                )}
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
