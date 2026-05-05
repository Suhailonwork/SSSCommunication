import { Shield, Zap, TrendingUp, HeartHandshake, Clock, Award } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Proven Track Record",
    description: "10+ years of delivering consistent results for clients across financial services, automotive, and telecom sectors.",
  },
  {
    icon: Zap,
    title: "Rapid Deployment",
    description: "Get your BPO operations or website live in record time. We move fast without compromising quality.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description: "Start small, grow big. Our infrastructure scales seamlessly as your business demands increase.",
  },
  {
    icon: HeartHandshake,
    title: "Dedicated Partnership",
    description: "We don't just execute — we partner. Your success metrics are our success metrics.",
  },
  {
    icon: Clock,
    title: "24/7 Operations",
    description: "Round-the-clock operations ensure your customers are always supported, no matter the timezone.",
  },
  {
    icon: Award,
    title: "Trained Professionals",
    description: "Our team undergoes rigorous training in communication, product knowledge, and CRM tools.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-gold text-xs font-semibold uppercase tracking-wider mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            The SSS Communications
            <br />
            <span className="gradient-text">Advantage</span>
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto text-lg">
            What sets us apart from the rest is not just what we do — it's how we do it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/20 border border-gold/30 flex items-center justify-center mb-5 group-hover:bg-gold/30 transition-colors">
                <r.icon size={22} className="text-gold" />
              </div>
              <h3 className="text-white font-bold text-lg mb-3">{r.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
