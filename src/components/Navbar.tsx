import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
import { Service } from '../types';

interface NavbarProps {
  services: Service[];
  onOpenServicesDrawer: () => void;
  isServicesDrawerOpen: boolean;
  onCloseServicesDrawer: () => void;
  onSelectServiceFromDrawer: (serviceId: string) => void;
}

export default function Navbar({
  services,
  onOpenServicesDrawer,
  isServicesDrawerOpen,
  onCloseServicesDrawer,
  onSelectServiceFromDrawer,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Smooth scroll helper
  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    onCloseServicesDrawer();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed navbar
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

  // Tracking scroll to add glassmorphic styling when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Floating Glassmorphic Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'glass-nav-bar py-3 shadow-lg shadow-slate-950/20'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo('home');
              }}
              className="cursor-pointer"
            >
              <Logo size="md" variant="dark" />
            </a>

            {/* Desktop Navigation Link Items */}
            <div className="hidden md:flex items-center gap-1 lg:gap-3">
              <button
                onClick={() => handleScrollTo('home')}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-emerald-400 rounded-md transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => handleScrollTo('about')}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-emerald-400 rounded-md transition-colors cursor-pointer"
              >
                About
              </button>

              {/* Special Services Drawer Trigger */}
              <button
                onClick={onOpenServicesDrawer}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full border transition-all cursor-pointer ${
                  isServicesDrawerOpen
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400 font-semibold'
                    : 'bg-slate-800/40 border-slate-700/50 text-slate-200 hover:border-emerald-500/50 hover:text-emerald-400'
                }`}
              >
                Services
                <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              </button>

              <button
                onClick={() => handleScrollTo('why-choose-us')}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-emerald-400 rounded-md transition-colors cursor-pointer"
              >
                Why Choose Us
              </button>
              <button
                onClick={() => handleScrollTo('enquiry')}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-emerald-400 rounded-md transition-colors cursor-pointer"
              >
                Enquiry
              </button>
              <button
                onClick={() => handleScrollTo('contact')}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-emerald-400 rounded-md transition-colors cursor-pointer"
              >
                Contact
              </button>
            </div>

            {/* CTA action button in navbar */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:9353592391"
                className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-emerald-500" />
                <span>9353592391</span>
              </a>
              <button
                onClick={() => handleScrollTo('enquiry')}
                className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/25 transition-all cursor-pointer"
              >
                Request Services
              </button>
            </div>

            {/* Mobile menu trigger hamburger button */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={onOpenServicesDrawer}
                className="px-3 py-1.5 text-xs font-semibold bg-emerald-950/80 border border-emerald-500/50 rounded-full text-emerald-400 font-mono flex items-center gap-1.5 cursor-pointer"
              >
                Services Drawer
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                id="mobile-menu-hamburger-btn"
                className="p-2 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-emerald-400 transition-all cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-slate-900/95 backdrop-blur-lg border-b border-emerald-500/10"
            >
              <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
                <button
                  onClick={() => handleScrollTo('home')}
                  className="px-3 py-2.5 text-left text-base font-medium text-slate-200 hover:text-emerald-400 hover:bg-slate-800/40 rounded-lg transition-colors cursor-pointer"
                >
                  Home
                </button>
                <button
                  onClick={() => handleScrollTo('about')}
                  className="px-3 py-2.5 text-left text-base font-medium text-slate-200 hover:text-emerald-400 hover:bg-slate-800/40 rounded-lg transition-colors cursor-pointer"
                >
                  About Inventive3 Tech
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenServicesDrawer();
                  }}
                  className="px-3 py-2.5 text-left text-base font-semibold text-emerald-400 hover:bg-slate-800/40 rounded-lg flex items-center justify-between cursor-pointer"
                >
                  <span>Our Metrology Services (Open Side Tab)</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleScrollTo('why-choose-us')}
                  className="px-3 py-2.5 text-left text-base font-medium text-slate-200 hover:text-emerald-400 hover:bg-slate-800/40 rounded-lg transition-colors cursor-pointer"
                >
                  Why Choose Us
                </button>
                <button
                  onClick={() => handleScrollTo('enquiry')}
                  className="px-3 py-2.5 text-left text-base font-medium text-slate-200 hover:text-emerald-400 hover:bg-slate-800/40 rounded-lg transition-colors cursor-pointer"
                >
                  Send Customer Enquiry
                </button>
                <button
                  onClick={() => handleScrollTo('contact')}
                  className="px-3 py-2.5 text-left text-base font-medium text-slate-200 hover:text-emerald-400 hover:bg-slate-800/40 rounded-lg transition-colors cursor-pointer"
                >
                  Contact Info
                </button>

                <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-3">
                  <a
                    href="tel:9353592391"
                    className="flex items-center gap-3 px-3 py-2 text-slate-400 text-sm font-mono hover:text-emerald-400 transition-all"
                  >
                    <Phone className="h-4 w-4 text-emerald-500" />
                    <span>9353592391</span>
                  </a>
                  <button
                    onClick={() => handleScrollTo('enquiry')}
                    className="w-full py-3 text-center text-sm font-semibold rounded-lg bg-emerald-500 text-slate-950 font-sans cursor-pointer"
                  >
                    Get Free Metrology Quote
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Services Slide-Out Side Navigation Panel / Drawer */}
      <AnimatePresence>
        {isServicesDrawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={onCloseServicesDrawer}
              className="absolute inset-0 bg-slate-950"
            />

            {/* Slide-out Panel container */}
            <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                className="w-screen max-w-md md:max-w-lg bg-slate-950/85 backdrop-blur-2xl border-l border-emerald-500/20 text-white shadow-2xl flex flex-col"
              >
                {/* Header of Drawer */}
                <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 to-emerald-950/20">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <h3 className="text-lg font-bold font-sans tracking-tight text-slate-100">
                      Our Metrology Portfolio
                    </h3>
                  </div>
                  <button
                    onClick={onCloseServicesDrawer}
                    id="close-services-drawer-btn"
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Services list with premium designs */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                    Select a solution below to navigate or enquire:
                  </p>

                  <div className="space-y-4">
                    {services.map((service, idx) => {
                      return (
                        <div
                          key={service.id}
                          className="relative group p-5 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-950 hover:border-emerald-500/30 transition-all duration-300"
                        >
                          {/* Tech grid watermarking */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:12px_12px] transition-opacity pointer-events-none rounded-xl" />

                          <div className="relative flex items-start gap-4">
                            {/* Accent line index */}
                            <span className="text-[10px] font-mono font-semibold text-emerald-500 shrink-0 mt-1">
                              0{idx + 1} //
                            </span>

                            <div className="space-y-2">
                              <h4 className="text-base font-bold font-sans text-slate-100 group-hover:text-emerald-400 transition-colors">
                                {service.title}
                              </h4>
                              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                                {service.shortDesc}
                              </p>

                              {/* Interactive drawer buttons */}
                              <div className="pt-2 flex items-center gap-3">
                                <button
                                  onClick={() => {
                                    onSelectServiceFromDrawer(service.id);
                                    handleScrollTo('services');
                                  }}
                                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 group/link cursor-pointer"
                                >
                                  <span>Explore Details</span>
                                  <ChevronRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                                </button>
                                <span className="text-slate-700">|</span>
                                <button
                                  onClick={() => {
                                    onSelectServiceFromDrawer(service.id);
                                    handleScrollTo('enquiry');
                                  }}
                                  className="text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
                                >
                                  Enquire Directly
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer of Drawer */}
                <div className="p-6 border-t border-slate-800 bg-slate-950/70 space-y-4">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-emerald-400 shrink-0" />
                    <p className="text-xs text-slate-300">
                      Unsure which metrology process fits your components? Speak to an expert now.
                    </p>
                  </div>
                  <button
                    onClick={() => handleScrollTo('enquiry')}
                    className="w-full py-3 flex items-center justify-center gap-2 rounded-lg text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/10 transition-all cursor-pointer"
                  >
                    <span>Request Engineering Call</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
