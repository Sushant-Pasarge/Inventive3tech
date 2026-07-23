import React from 'react';
import {
  Layers,
  Box,
  ShieldCheck,
  Zap,
  MapPin,
  GitBranch,
  Wrench,
  Headphones,
  DollarSign,
} from 'lucide-react';
import { FEATURES_DATA } from '../data';

export default function WhyChooseUs() {
  // Lucide dynamic mapping
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="h-6 w-6 text-emerald-400" />;
      case 'Box':
        return <Box className="h-6 w-6 text-teal-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="h-6 w-6 text-emerald-400" />;
      case 'Zap':
        return <Zap className="h-6 w-6 text-yellow-400 animate-pulse" />;
      case 'MapPin':
        return <MapPin className="h-6 w-6 text-teal-400" />;
      case 'GitBranch':
        return <GitBranch className="h-6 w-6 text-emerald-400" />;
      case 'Wrench':
        return <Wrench className="h-6 w-6 text-teal-400" />;
      case 'Headphones':
        return <Headphones className="h-6 w-6 text-emerald-400" />;
      case 'DollarSign':
        return <DollarSign className="h-6 w-6 text-teal-400" />;
      default:
        return <Layers className="h-6 w-6 text-emerald-400" />;
    }
  };

  return (
    <section id="why-choose-us" className="relative py-24 bg-transparent overflow-hidden">
      {/* Visual coordinates system backgrounds */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-slate-800 bg-slate-900/60 text-xs font-mono text-emerald-400 uppercase tracking-widest backdrop-blur-sm">
            03 // The Metrology Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-sans tracking-tight text-white">
            Why Choose Inventive3 Tech
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            By combining advanced measurement instrumentation, certified metrology expertise, and ISO quality guidelines, we deliver engineering inspection reports you can trust for manufacturing excellence.
          </p>
        </div>

        {/* Responsive Features Grid of 9 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES_DATA.map((feature) => (
            <div
              key={feature.id}
              className="relative group p-6 rounded-2xl glass-card-panel transition-all duration-300 flex flex-col justify-between"
            >
              {/* Green gradient glow accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] rounded-t-2xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500 group-hover:to-teal-400 transition-all duration-500" />
              
              <div className="space-y-4">
                {/* Icon wrapper */}
                <div className="inline-flex p-3 rounded-xl glass-service-item">
                  {getIcon(feature.iconName)}
                </div>

                {/* Text Block */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-sans text-slate-100 group-hover:text-emerald-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Decorative design vector index */}
              <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-[9px] font-mono text-slate-600 group-hover:text-emerald-500/60 transition-colors">
                <span>SYSTEM PARAM // PASS</span>
                <span>METRO_0{feature.id.length}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
