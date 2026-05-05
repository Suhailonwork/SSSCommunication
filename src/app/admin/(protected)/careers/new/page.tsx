"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";

const departments = ["BPO Operations", "Technology", "Sales & Marketing", "Human Resources", "Finance", "Quality Assurance"];
const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

export default function NewCareerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    department: "",
    location: "New Delhi (On-site)",
    type: "Full-time",
    experience: "",
    salary: "",
    description: "",
    published: true,
    deadline: "",
  });
  const [responsibilities, setResponsibilities] = useState<string[]>([""]);
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [benefits, setBenefits] = useState<string[]>([""]);

  const addItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) =>
    setter((prev) => [...prev, ""]);

  const updateItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, idx: number, val: string) =>
    setter((prev) => prev.map((v, i) => (i === idx ? val : v)));

  const removeItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, idx: number) =>
    setter((prev) => prev.filter((_, i) => i !== idx));

  const ListEditor = ({
    label,
    items,
    setter,
  }: {
    label: string;
    items: string[];
    setter: React.Dispatch<React.SetStateAction<string[]>>;
  }) => (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <button type="button" onClick={() => addItem(setter)} className="flex items-center gap-1 text-primary text-xs font-medium hover:underline">
          <Plus size={12} /> Add
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(setter, idx, e.target.value)}
              placeholder={`${label.replace("*", "").trim()} ${idx + 1}...`}
              className="input-field flex-1"
            />
            {items.length > 1 && (
              <button type="button" onClick={() => removeItem(setter, idx)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <X size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        ...form,
        responsibilities: responsibilities.filter(Boolean),
        requirements: requirements.filter(Boolean),
        benefits: benefits.filter(Boolean),
        deadline: form.deadline ? new Date(form.deadline).toISOString() : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        router.push("/admin/careers");
      } else {
        const d = await res.json();
        setError(d.error || "Failed to create job");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 page-enter max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/careers" className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-primary">Post New Job</h2>
          <p className="text-slate-500 text-sm">Create a new job listing</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Job Title *</label>
                <input required type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Senior Customer Support Executive" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Job Description *</label>
                <textarea required rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the role, team, and what success looks like..." className="input-field resize-none" />
              </div>
              <ListEditor label="Key Responsibilities *" items={responsibilities} setter={setResponsibilities} />
              <ListEditor label="Requirements *" items={requirements} setter={setRequirements} />
              <ListEditor label="Benefits & Perks" items={benefits} setter={setBenefits} />
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
              <h3 className="font-bold text-primary">Job Details</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Department *</label>
                <select required value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="input-field">
                  <option value="">Select department</option>
                  {departments.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Job Type *</label>
                <select required value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input-field">
                  {jobTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Location *</label>
                <input required type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Experience Required *</label>
                <input required type="text" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} placeholder="e.g. 2-4 years" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Salary Range *</label>
                <input required type="text" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} placeholder="e.g. ₹25,000 – ₹35,000/month" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Application Deadline</label>
                <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="input-field" />
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="text-sm font-medium text-slate-700">Publish listing</div>
                <button type="button" onClick={() => setForm((f) => ({ ...f, published: !f.published }))} className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${form.published ? "bg-green-500" : "bg-slate-200"}`}>
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${form.published ? "left-6" : "left-0.5"}`} />
                </button>
              </div>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>}

            <button type="submit" disabled={loading} className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</> : <><Save size={16} /> Post Job</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
