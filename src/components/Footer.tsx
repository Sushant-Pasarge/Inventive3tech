import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram, ArrowUp } from 'lucide-react';
import Logo from './Logo';
import { SERVICES_DATA } from '../data';

interface FooterProps {
  onSelectService?: (serviceId: string) => void;
}

export default function Footer({ onSelectService }: FooterProps) {
  // Smooth scroll back to top helper
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Smooth scroll to element helper
  const handleScrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer id="contact" className="relative bg-slate-950 border-t border-slate-900 text-slate-400 pt-16 pb-8 overflow-hidden">
      {/* Subtle abstract pattern in background */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Main Footer Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Col: Logo, description, socials (Column Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <Logo size="md" variant="dark" />
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Inventive3 Tech is a premier provider of high-precision inspection and engineering solutions that help manufacturers achieve superior quality, accuracy, and productivity through advanced metrology technologies.
            </p>

            {/* Social media icons */}
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all cursor-pointer"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook Profile"
                className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all cursor-pointer"
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Profile"
                className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all cursor-pointer"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column (Column Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold border-b border-slate-900 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => handleScrollToId('home')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Home Landing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollToId('about')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  About Corporate
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollToId('services')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Metrology Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollToId('why-choose-us')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Why Choose Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollToId('enquiry')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Customer Enquiry
                </button>
              </li>
            </ul>
          </div>

          {/* Services Column (Column Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold border-b border-slate-900 pb-2">
              Services Portfolio
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => {
                      if (onSelectService) {
                        onSelectService(service.id);
                      } else {
                        handleScrollToId('services');
                      }
                    }}
                    className="hover:text-emerald-400 transition-colors text-left text-xs leading-relaxed cursor-pointer"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact details column (Column Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold border-b border-slate-900 pb-2">
              Corporate Headquarters
            </h4>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  60 feet road , D Group Employees layout Lingadheeranahalli Andhralli - 560091
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-teal-400 shrink-0" />
                <a href="tel:9353592391" className="hover:text-emerald-400 transition-colors">
                  9353592391
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-emerald-500 shrink-0" />
                <a href="mailto:inventive3tech@gmail.com" className="hover:text-emerald-400 transition-colors">
                  inventive3tech@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright alignment */}
        <div className="border-t border-slate-900/85 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <span>&copy; Inventive3 Tech. All Rights Reserved.</span>
          <div className="flex gap-4">
            <span className="text-emerald-500/50">// HIGH-PRECISION MEASUREMENTS</span>
            <span>|</span>
            <button
              onClick={handleScrollToTop}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Back To Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
