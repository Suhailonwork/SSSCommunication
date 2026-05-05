"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Loader2 } from "lucide-react";

function NavSpinner() {
  const { pending } = useLinkStatus();
  return pending ? (
    <Loader2 size={12} className="ml-1 inline-block animate-spin opacity-90" aria-hidden />
  ) : null;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
      }`}
    >
      {/* Top bar */}
      <div
        className={`hidden md:flex items-center justify-end gap-6 px-6 py-1.5 text-sm transition-all duration-300 ${
          transparent ? "bg-white/10 text-white/80" : "bg-primary text-white/80"
        }`}
      >
        <a href="tel:+919868480116" className="flex items-center gap-1.5 hover:text-white transition-colors">
          <Phone size={12} />
          <span>+91 98684 80116</span>
        </a>
        <a href="mailto:info@sssdelhi.in" className="hover:text-white transition-colors">
          info@sssdelhi.in
        </a>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
              <span className="text-gold font-black text-lg leading-none">S³</span>
            </div>
            <div>
              <div
                className={`font-bold text-base leading-tight transition-colors duration-300 ${
                  transparent ? "text-white" : "text-primary"
                }`}
              >
                SSS Communications
              </div>
              <div
                className={`text-[10px] font-medium tracking-widest uppercase transition-colors duration-300 ${
                  transparent ? "text-gold-light" : "text-gold"
                }`}
              >
                We Lead, Others Follow
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 inline-flex items-center ${
                      active
                        ? transparent
                          ? "text-gold bg-white/10"
                          : "text-primary bg-primary/10"
                        : transparent
                        ? "text-white/90 hover:text-white hover:bg-white/10"
                        : "text-slate-600 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {link.label}
                    <NavSpinner />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="bg-gold text-primary font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-gold-light transition-all duration-300 hover:shadow-md inline-flex items-center"
            >
              Get Quote
              <NavSpinner />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              transparent ? "text-white hover:bg-white/10" : "text-primary hover:bg-primary/10"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-screen pb-4" : "max-h-0"
          }`}
        >
          <div className={`rounded-xl p-2 ${transparent ? "bg-primary/95" : "bg-slate-50"} mt-2`}>
            {navLinks.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "text-gold bg-primary/20"
                      : transparent
                      ? "text-white/90 hover:text-white hover:bg-white/10"
                      : "text-slate-700 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 px-2">
              <Link
                href="/contact"
                className="block text-center bg-gold text-primary font-semibold text-sm px-4 py-3 rounded-lg hover:bg-gold-light transition-colors"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
