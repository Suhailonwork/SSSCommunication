import Link from "next/link";
import { Phone, Mail, MapPin, Globe, Share2, ArrowRight } from "lucide-react";

const services = [
  { label: "Inbound Call Center", href: "/services#inbound" },
  { label: "Outbound Call Center", href: "/services#outbound" },
  { label: "Web Development", href: "/services#web-dev" },
  { label: "BPO Solutions", href: "/services#bpo" },
  { label: "Customer Support", href: "/services#support" },
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { icon: Globe, href: "#", label: "Website" },
  { icon: Share2, href: "#", label: "Social" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Newsletter band */}
      <div className="bg-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-primary text-xl font-bold">Stay Updated</h3>
              <p className="text-primary/70 text-sm mt-1">Get the latest BPO insights and company news in your inbox.</p>
            </div>
            <form className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 md:w-72 px-4 py-2.5 rounded-lg bg-white text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="submit"
                className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2"
              >
                Subscribe <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-gold flex items-center justify-center">
                <span className="text-primary font-black text-xl leading-none">S³</span>
              </div>
              <div>
                <div className="font-bold text-white leading-tight">SSS Communications</div>
                <div className="text-gold text-[10px] tracking-widest uppercase">Est. 2014</div>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Delhi's trusted partner for integrated BPO and web development solutions. We lead, others follow.
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-gold hover:text-primary flex items-center justify-center transition-all duration-300 text-slate-400"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Services</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-slate-400 hover:text-gold text-sm flex items-center gap-2 transition-colors group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-slate-400 hover:text-gold text-sm flex items-center gap-2 transition-colors group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-slate-400">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                <span>3257, 1st Floor, Mahindra Park, Andhra Bank Opp Street, Rani Bagh, New Delhi – 110034</span>
              </li>
              <li>
                <a href="tel:+919868480116" className="flex gap-3 text-sm text-slate-400 hover:text-gold transition-colors">
                  <Phone size={16} className="text-gold mt-0.5 shrink-0" />
                  +91 98684 80116
                </a>
              </li>
              <li>
                <a href="mailto:info@sssdelhi.in" className="flex gap-3 text-sm text-slate-400 hover:text-gold transition-colors">
                  <Mail size={16} className="text-gold mt-0.5 shrink-0" />
                  info@sssdelhi.in
                </a>
              </li>
              <li>
                <a href="mailto:ssscommdelhi@gmail.com" className="flex gap-3 text-sm text-slate-400 hover:text-gold transition-colors">
                  <Mail size={16} className="text-gold mt-0.5 shrink-0" />
                  ssscommdelhi@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} SSS Communications. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-gold transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
