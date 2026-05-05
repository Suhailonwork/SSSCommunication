"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

interface ApplyFormProps {
  careerId: string;
  careerTitle: string;
}

export default function ApplyForm({ careerId, careerTitle }: ApplyFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, careerId, careerTitle }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", experience: "", coverLetter: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="card p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={32} className="text-green-600" />
        </div>
        <h3 className="font-bold text-primary text-xl mb-2">Application Submitted!</h3>
        <p className="text-slate-500 text-sm mb-5">
          Our HR team will review and contact you within 3-5 business days.
        </p>
        <button onClick={() => setStatus("idle")} className="btn-outline text-sm px-4 py-2">
          Apply Again
        </button>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="bg-primary p-5">
        <h3 className="font-bold text-white text-lg">Apply for this Position</h3>
        <p className="text-white/70 text-sm mt-1">Fill out the form below to submit your application.</p>
      </div>
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
          <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone *</label>
          <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Years of Experience *</label>
          <input required type="text" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} placeholder="e.g. 2 years" className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Cover Letter / Message</label>
          <textarea rows={4} value={form.coverLetter} onChange={(e) => setForm({ ...form, coverLetter: e.target.value })} placeholder="Tell us why you're a great fit..." className="input-field resize-none" />
        </div>
        {status === "error" && (
          <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">Something went wrong. Please try again.</p>
        )}
        <button type="submit" disabled={status === "loading"} className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
          {status === "loading" ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
          ) : (
            <><Send size={16} /> Submit Application</>
          )}
        </button>
      </form>
    </div>
  );
}
