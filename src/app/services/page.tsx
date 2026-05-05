import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/sections/CTASection";
import { Headphones, Phone, Users, Globe, BarChart3, Code2, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BPO & Web Development Services | SSS Communications Delhi",
  description:
    "Explore SSS Communications' full range of services: inbound/outbound call centers, BPO solutions, web development, CRM integration, and analytics. Premium services at competitive rates.",
};

const services = [
  {
    id: "inbound",
    icon: Headphones,
    tag: "Call Center",
    title: "Inbound Call Center Services",
    description:
      "Deliver exceptional customer experiences with our professional inbound call center team. We handle every customer interaction with empathy, efficiency, and expertise — representing your brand at its best.",
    features: [
      "24/7 customer support with multilingual capabilities",
      "Technical helpdesk and tier-1/tier-2 support",
      "Order taking, processing, and tracking",
      "Complaint resolution within defined SLA",
      "Appointment scheduling and calendar management",
      "IVR system setup and management",
    ],
    color: "bg-blue-600",
    lightColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    id: "outbound",
    icon: Phone,
    tag: "Call Center",
    title: "Outbound Call Center Services",
    description:
      "Drive revenue growth with our results-oriented outbound call center. Our trained agents execute targeted campaigns with precision, turning prospects into loyal customers.",
    features: [
      "B2B and B2C telemarketing campaigns",
      "Lead generation and qualification",
      "Appointment setting for sales teams",
      "Customer win-back and retention calls",
      "Market research and customer surveys",
      "Collection and payment reminder calls",
    ],
    color: "bg-green-600",
    lightColor: "bg-green-50",
    textColor: "text-green-600",
  },
  {
    id: "bpo",
    icon: Users,
    tag: "BPO",
    title: "Business Process Outsourcing",
    description:
      "From data entry to complex back-office operations — our BPO solutions free your team to focus on core business activities while we handle the rest with precision and accuracy.",
    features: [
      "Data entry, processing, and management",
      "Document verification and digitization",
      "HR and payroll support services",
      "Finance and accounting back-office",
      "Compliance and reporting support",
      "Custom workflow automation",
    ],
    color: "bg-purple-600",
    lightColor: "bg-purple-50",
    textColor: "text-purple-600",
  },
  {
    id: "web-dev",
    icon: Globe,
    tag: "Technology",
    title: "Web Design & Development",
    description:
      "Professional websites and web applications that look stunning, load fast, and rank on Google. Our development team builds digital assets that become your most powerful business tool.",
    features: [
      "Responsive website design and development",
      "E-commerce platforms and online stores",
      "Corporate portals and dashboards",
      "SEO-optimized content management systems",
      "Landing pages and conversion-focused sites",
      "Website maintenance and updates",
    ],
    color: "bg-amber-600",
    lightColor: "bg-amber-50",
    textColor: "text-amber-600",
  },
  {
    id: "analytics",
    icon: BarChart3,
    tag: "Intelligence",
    title: "Analytics & Performance Reporting",
    description:
      "Data-driven insights that help you understand your business, your customers, and your opportunities. We turn raw data into actionable intelligence.",
    features: [
      "Real-time call center performance dashboards",
      "Custom KPI reports and business scorecards",
      "Customer satisfaction (CSAT) tracking",
      "Campaign ROI analysis and reporting",
      "Agent productivity and quality monitoring",
      "Monthly business review presentations",
    ],
    color: "bg-red-600",
    lightColor: "bg-red-50",
    textColor: "text-red-600",
  },
  {
    id: "crm",
    icon: Code2,
    tag: "Technology",
    title: "CRM Integration & Automation",
    description:
      "Streamline your customer data and workflows with smart CRM setup, integration, and automation solutions tailored to your business processes.",
    features: [
      "CRM selection, setup, and customization",
      "CRM integration with existing systems",
      "Automated lead nurturing workflows",
      "Customer journey mapping and automation",
      "Team training on CRM best practices",
      "API integrations and third-party connectors",
    ],
    color: "bg-teal-600",
    lightColor: "bg-teal-50",
    textColor: "text-teal-600",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 hero-gradient grid-pattern relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
              <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-gold text-xs font-semibold uppercase tracking-wider mb-4">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
              Complete Business Solutions
              <br />
              <span className="gradient-text">Under One Roof</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
              From inbound call handling to enterprise web development — SSS Communications delivers integrated solutions that drive real business results.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {services.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm hover:bg-white hover:text-primary transition-all duration-200"
                >
                  {s.title.split(" ")[0]} {s.title.split(" ")[1]}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            {services.map((s, i) => (
              <div
                key={s.id}
                id={s.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full ${s.lightColor} ${s.textColor} text-xs font-semibold uppercase tracking-wider mb-4`}>
                    {s.tag}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-5">{s.title}</h2>
                  <p className="text-slate-600 leading-relaxed mb-7">{s.description}</p>
                  <ul className="space-y-3">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-slate-600 text-sm">
                        <CheckCircle2 size={16} className={`${s.textColor} mt-0.5 shrink-0`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 mt-8 bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark transition-all duration-300 hover:shadow-lg"
                  >
                    Get Started <ArrowRight size={16} />
                  </Link>
                </div>
                <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className={`${s.color} rounded-3xl p-12 flex items-center justify-center h-72 lg:h-80`}>
                    <div className="text-center">
                      <s.icon size={64} className="text-white/30 mb-4 mx-auto" />
                      <div className="text-white font-black text-4xl">{s.title.split(" ")[0]}</div>
                      <div className="text-white/70 text-sm mt-2 font-medium">{s.tag}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CTASection
          title="Not Sure Which Service You Need?"
          subtitle="Talk to our team — we'll assess your business needs and recommend the perfect solution package."
        />
      </main>
      <Footer />
    </>
  );
}
