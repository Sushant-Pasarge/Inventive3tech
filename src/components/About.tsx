import React from 'react';
import { Shield, Sparkles, Target, Award } from 'lucide-react';
import { STATS_DATA } from '../data';
import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Narrative Block */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-slate-800 bg-slate-900/50 text-xs font-mono text-emerald-400">
              <span>01 // ABOUT INVENTIVE3 TECH</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight text-white leading-tight">
              Pioneering High-Precision Metrology &amp; Quality Engineering
            </h2>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              <strong>Inventive3 Tech</strong> is a premium provider of high-precision inspection and quality engineering solutions that help global manufacturers achieve superior dimensional quality, absolute accuracy, and peak productivity through advanced metrology technologies.
            </p>

            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              In modern industrial environments, even a fraction of a micron determines the success of a mission-critical component. We serve as your precision partner, integrating leading-edge 3D laser scanners, touch-trigger CMM probes, and custom-designed fixture clampings. Our dedicated metrologists inspect parts to absolute tolerances, validating compliance and generating high-fidelity CAD parametric models.
            </p>

            {/* Core Values / Strengths list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex gap-3 items-start p-4 rounded-xl glass-card-panel">
                <Target className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-200">ISO/IEC Compliant Calibrations</h4>
                  <p className="text-xs text-slate-400 mt-1">Full NIST-traceable alignment with high repeatability guidelines.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start p-4 rounded-xl glass-card-panel">
                <Award className="h-6 w-6 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Aerospace-Grade Precision</h4>
                  <p className="text-xs text-slate-400 mt-1">Surgical dimensional checking for turbines, assemblies, and complex tooling.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Statistics & Visual Counter Block */}
          <div className="lg:col-span-5 relative">
            {/* Tech grid border box decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl blur-xl opacity-50" />
            
            <div className="relative p-6 sm:p-8 rounded-2xl glass-card-panel space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                  Precision Scorecard
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  REAL-TIME // STATUS: OPTIMAL
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {STATS_DATA.map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight flex items-baseline">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                        {stat.value}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-tight">
                      {stat.label}
                    </h4>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      {stat.sublabel}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
