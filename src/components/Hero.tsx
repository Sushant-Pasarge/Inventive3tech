import React from 'react';
import { ArrowRight, ChevronDown, Activity, ShieldAlert, Sparkles, Orbit } from 'lucide-react';
import { motion } from 'motion/react';
import Logo from './Logo';

interface HeroProps {
  onOurServicesClick: () => void;
  onSendEnquiryClick: () => void;
}

export default function Hero({ onOurServicesClick, onSendEnquiryClick }: HeroProps) {
  // Smooth scroll helper
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
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-[#070b13] overflow-hidden pt-20"
    >
      {/* Dynamic Grid Overlay & Precision Metrology Graphics */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />

      {/* Laser Scanning Line Animation Overlay */}
      <div className="absolute top-1/4 left-0 right-0 h-[2px] bg-emerald-500/35 shadow-[0_0_15px_#10b981] animate-[bounce_8s_infinite] z-0 pointer-events-none" />
      <div className="absolute top-2/3 left-0 right-0 h-[1.5px] bg-teal-400/25 shadow-[0_0_10px_#2dd4bf] animate-[bounce_12s_infinite] z-0 pointer-events-none" />

      {/* Glowing background circles for visual depth */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Abstract Watermark Style Logo Graphic in background (subtle and readable) */}
      <div className="absolute right-[-10%] bottom-[-5%] opacity-10 pointer-events-none z-0 transform rotate-[15deg]">
        <Logo size="lg" showText={false} className="w-[40rem] h-[40rem] text-emerald-500/20" />
      </div>

      {/* Hero Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">

        {/* Hero Brand Identity Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <div className="p-3 rounded-2xl glass-card-panel">
            <Logo size="lg" showText={false} />
          </div>
        </motion.div>

        {/* Bold Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-sans tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6"
        >
          Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400">Metrology Solutions</span> for Modern Manufacturing
        </motion.h1>

        {/* Professional Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10"
        >
          Expert-led dimensional inspection, sub-micron 3D scanning, reverse engineering, and custom workholding systems engineered to guarantee quality, accuracy, and performance in advanced aerospace, automotive, and defense sectors.
        </motion.p>

        {/* Prominent CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          {/* Main Our Services CTA */}
          <button
            onClick={onOurServicesClick}
            id="hero-our-services-btn"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold tracking-wide bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all cursor-pointer group"
          >
            <span>Our Services</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Send Enquiry CTA */}
          <button
            onClick={onSendEnquiryClick}
            id="hero-send-enquiry-btn"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-medium tracking-wide border border-slate-700 bg-slate-900/60 text-slate-200 hover:border-emerald-500/50 hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
          >
            <span>Send Enquiry</span>
          </button>
        </motion.div>

        {/* Floating Calibration Indicators */}
        <div className="hidden xl:flex absolute bottom-12 left-12 items-center gap-3 px-4 py-2.5 rounded-lg glass-card-panel text-[11px] font-mono text-slate-400">
          <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
          <span>LASER SYNC: ACTIVE [3D-COORD]</span>
        </div>

        <div className="hidden xl:flex absolute bottom-12 right-12 items-center gap-3 px-4 py-2.5 rounded-lg glass-card-panel text-[11px] font-mono text-slate-400">
          <span>TOLERANCE THRESHOLD: &lt; ±0.0025 mm</span>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer"
             onClick={() => handleScrollToId('about')}
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll To Explore</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
