import Link from "next/link";
import { Phone, Globe, Users, BarChart3, Headphones, Code2, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Headphones,
    title: "Inbound Call Center",
    description: "Professional customer support, helpdesk, and query resolution services that keep your customers satisfied 24/7.",
    href: "/services#inbound",
    color: "bg-blue-50 text-blue-600",
    border: "border-blue-100",
  },
  {
    icon: Phone,
    title: "Outbound Call Center",
    description: "Targeted telemarketing, lead generation, and sales campaigns that drive measurable revenue growth.",
    href: "/services#outbound",
    color: "bg-green-50 text-green-600",
    border: "border-green-100",
  },
  {
    icon: Users,
    title: "BPO Solutions",
    description: "End-to-end business process outsourcing — from data entry to complex back-office operations.",
    href: "/services#bpo",
    color: "bg-purple-50 text-purple-600",
    border: "border-purple-100",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Modern, responsive websites and web applications built for performance, SEO, and user experience.",
    href: "/services#web-dev",
    color: "bg-amber-50 text-amber-600",
    border: "border-amber-100",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Detailed performance reports and business intelligence to keep you informed and ahead of the curve.",
    href: "/services#analytics",
    color: "bg-red-50 text-red-600",
    border: "border-red-100",
  },
  {
    icon: Code2,
    title: "CRM Integration",
    description: "Seamless CRM setup and integration to streamline your customer data and team workflows.",
    href: "/services#crm",
    color: "bg-teal-50 text-teal-600",
    border: "border-teal-100",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            Our Services
          </span>
          <h2 className="section-heading">
            Integrated Solutions for
            <br />
            <span className="gradient-text">Modern Businesses</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            From call center operations to professional web development — we provide the complete business support
            ecosystem your company needs to thrive.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className={`group card p-6 border ${s.border}`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${s.color} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <s.icon size={22} />
              </div>
              <h3 className="text-primary font-bold text-lg mb-3 group-hover:text-primary-light transition-colors">
                {s.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.description}</p>
              <div className="flex items-center gap-1 text-primary text-sm font-medium mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn more <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services" className="btn-outline">
            View All Services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
