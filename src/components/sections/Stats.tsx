"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Briefcase, Award, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: 500, suffix: "+", label: "Clients Served", color: "text-blue-600" },
  { icon: Briefcase, value: 10, suffix: "+", label: "Years in Business", color: "text-gold" },
  { icon: Award, value: 98, suffix: "%", label: "Client Retention", color: "text-green-600" },
  { icon: Clock, value: 24, suffix: "/7", label: "Support Available", color: "text-purple-600" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const step = (target / duration) * 16;
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            setCount(Math.floor(current));
            if (current >= target) clearInterval(timer);
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 mb-4 ${s.color}`}>
                <s.icon size={22} />
              </div>
              <div className={`text-3xl font-extrabold ${s.color} mb-1`}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-slate-500 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
