import React from 'react';
import { Ruler, ScanFace, Cpu, ArrowRight, Star, Layers, Binary, Eye, Activity, Waves } from 'lucide-react';
import { Service } from '../types';

interface ServicesProps {
  services: Service[];
  activeServiceId: string;
  onSetActiveService: (serviceId: string) => void;
  onLearnMore: (service: Service) => void;
}

export default function Services({
  services,
  activeServiceId,
  onSetActiveService,
  onLearnMore,
}: ServicesProps) {

  // Dynamic Lucide icon lookup helper
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ruler':
        return <Ruler className="h-6 w-6 text-emerald-400" />;
      case 'ScanFace':
        return <ScanFace className="h-6 w-6 text-teal-400" />;
      case 'Cpu':
        return <Cpu className="h-6 w-6 text-emerald-400" />;
      case 'Eye':
        return <Eye className="h-6 w-6 text-teal-400" />;
      case 'Activity':
        return <Activity className="h-6 w-6 text-emerald-400" />;
      case 'Waves':
        return <Waves className="h-6 w-6 text-teal-400" />;
      default:
        return <Ruler className="h-6 w-6 text-emerald-400" />;
    }
  };

  return (
    <section id="services" className="relative py-24 bg-transparent overflow-hidden">
      {/* Visual background details */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-slate-800 bg-slate-950/60 text-xs font-mono text-emerald-400 uppercase tracking-widest backdrop-blur-sm">
            <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
            02 // Core Metrology Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-sans tracking-tight text-white leading-none">
            Our Precision Services
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            From microns to meters, our engineering and inspection services operate with absolute rigor. Discover how Inventive3 Tech delivers high-end volumetric accuracy.
          </p>
        </div>

        {/* Dual Layout: Side Navigation Panel (Left) & Service Cards (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Side Tab Navigation (Left 4 columns on Desktop, hidden or scrolling on mobile) */}
          <div className="lg:col-span-4 space-y-3 sticky top-28 glass-card-panel p-4">
            <div className="px-3 pb-3 border-b border-slate-800/80">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Services Portfolio Index
              </h3>
            </div>
            
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-2 lg:pb-0 scrollbar-none">
              {services.map((service, idx) => {
                const isActive = service.id === activeServiceId;
                return (
                  <button
                    key={service.id}
                    onClick={() => onSetActiveService(service.id)}
                    className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg border transition-all shrink-0 lg:shrink cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-950/60 to-slate-900/60 border-emerald-500 text-emerald-400 font-semibold shadow-md shadow-emerald-500/5 backdrop-blur-sm'
                        : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-emerald-500/60">
                      0{idx + 1}
                    </span>
                    <span className="text-sm truncate font-sans">
                      {service.title.split(' (')[0]} {/* Shorten for left index tab display */}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick calibration status graphic */}
            <div className="hidden lg:block pt-3 border-t border-slate-800/80 text-center">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                Active Scanner Calibration Status: OK
              </span>
            </div>
          </div>

          {/* Service Cards (Right 8 columns on Desktop) */}
          <div className="lg:col-span-8 space-y-8">
            {services.map((service) => {
              const isActive = service.id === activeServiceId;
              return (
                <div
                  key={service.id}
                  id={`service-${service.id}`}
                  className={`p-6 md:p-8 rounded-2xl glass-card-panel transition-all duration-500 ${
                    isActive
                      ? 'border-emerald-500! shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/20'
                      : ''
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                    {/* Icon and Description */}
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl glass-service-item flex items-center justify-center">
                          {renderIcon(service.iconName)}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold font-sans text-white tracking-tight">
                          {service.title}
                        </h3>
                      </div>

                      <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                        {service.shortDesc}
                      </p>

                      {/* Key features bullets snippet */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                        {service.features.slice(0, 3).map((feat, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-slate-400">
                            <Star className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Miniature graphic representation with Learn More CTA */}
                    <div className="w-full md:w-52 shrink-0 flex flex-col justify-between self-stretch glass-service-item p-4 gap-4">
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider block">
                          Technical Scope
                        </span>
                        <div className="h-[2px] w-8 bg-emerald-500" />
                        <span className="text-[11px] text-slate-400 leading-tight block pt-1 italic">
                          Precision inspection, complete reports, and 100% digital trace compliance.
                        </span>
                      </div>

                      <button
                        onClick={() => onLearnMore(service)}
                        id={`learn-more-${service.id}-btn`}
                        className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider bg-slate-800/80 text-emerald-400 hover:bg-slate-700/80 hover:text-emerald-300 border border-slate-700/80 hover:border-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
