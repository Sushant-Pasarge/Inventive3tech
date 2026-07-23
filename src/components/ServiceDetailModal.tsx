import React from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { Service } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ServiceDetailModalProps {
  service: Service | null;
  onClose: () => void;
  onEnquire: (serviceId: string) => void;
}

export default function ServiceDetailModal({
  service,
  onClose,
  onEnquire,
}: ServiceDetailModalProps) {
  if (!service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal content container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-3xl overflow-hidden glass-card-panel text-white shadow-2xl max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="relative p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/30">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 font-mono">
                Inventive3 Tech Service Highlight
              </span>
              <h3 className="text-xl md:text-2xl font-bold font-sans tracking-tight text-slate-100 mt-1">
                {service.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              id="close-modal-btn"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* High-quality Technical Image Placeholder Concept */}
            <div className="relative rounded-xl overflow-hidden glass-service-item p-6 min-h-[200px] flex flex-col justify-between group">
              {/* Futuristic matrix green mesh watermark */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:16px_16px] pointer-events-none" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl pointer-events-none" />
              
              <div className="z-10 flex items-center justify-between">
                <span className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono px-2 py-1 rounded">
                  CAD VISUALIZER / METROLOGY SCANNER V.3
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  SYSTEM OK // TRACEABLE
                </span>
              </div>

              <div className="z-10 my-4 text-center">
                <p className="text-xs md:text-sm text-slate-300 italic font-mono max-w-lg mx-auto">
                  &quot;{service.imagePlaceholder}&quot;
                </p>
              </div>

              <div className="z-10 flex items-center justify-between text-[10px] font-mono text-emerald-500/70 border-t border-slate-800/80 pt-3">
                <span>COORD SYSTEM: MULTI-AXIS</span>
                <span>ACCURACY: ±0.0015 mm</span>
                <span>ISO 9001 CERTIFIED</span>
              </div>
            </div>

            {/* In-depth descriptions */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono">
                Service Overview
              </h4>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                {service.fullDesc}
              </p>
            </div>

            {/* Key Capabilities */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono">
                Key Technical Capabilities
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer with actions */}
          <div className="p-6 border-t border-slate-800 bg-slate-950/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono text-slate-400 text-center sm:text-left">
              Need on-site execution or custom work? Let us know.
            </span>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                id="modal-cancel-btn"
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-sm font-medium border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Back to Services
              </button>
              <button
                onClick={() => onEnquire(service.id)}
                id="modal-submit-enquiry-btn"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all cursor-pointer"
              >
                <span>Request Quotation</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
