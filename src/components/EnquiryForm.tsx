import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Building, User, PhoneCall, MessageSquare, HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { EnquiryForm as EnquiryFormType, Service } from '../types';

interface EnquiryFormProps {
  services: Service[];
  selectedServiceId: string;
}

export default function EnquiryForm({ services, selectedServiceId }: EnquiryFormProps) {
  // Local state for form submission
  const [formData, setFormData] = useState<EnquiryFormType>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    serviceRequired: '',
    subject: '',
    message: '',
  });

  // Local state for feedback states
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryFormType, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<{
    success: boolean;
    message: string;
    enquiryId: string;
    data: { recipient: string; estimatedResponseTime: string };
  } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sync selectedServiceId prop to the state
  useEffect(() => {
    if (selectedServiceId) {
      const match = services.find(s => s.id === selectedServiceId);
      if (match) {
        setFormData(prev => ({ ...prev, serviceRequired: match.title }));
      }
    }
  }, [selectedServiceId, services]);

  // Handle value modifications
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear individual field errors on change
    if (errors[name as keyof EnquiryFormType]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setSubmitError(null);
  };

  // Perform validations
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof EnquiryFormType, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please provide a valid email format (e.g. user@company.com).';
      }
    }
    if (!formData.serviceRequired) {
      newErrors.serviceRequired = 'Please select a required metrology service.';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Detailed message is required.';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Please provide a slightly more descriptive message (min 15 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setSuccessResponse(null);

    try {
      // Connect to the genuine express API route
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessResponse(data);
        // Clear form after success
        setFormData({
          fullName: '',
          companyName: '',
          email: '',
          phone: '',
          serviceRequired: '',
          subject: '',
          message: '',
        });
      } else {
        setSubmitError(data.error || 'Server rejected the request. Please check validation limits.');
      }
    } catch (err) {
      console.error('Enquiry post error:', err);
      setSubmitError('Failed to establish contact with the server. Please check your network connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="enquiry" className="relative py-24 bg-transparent overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Tech Contact card details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-slate-800 bg-slate-950 text-xs font-mono text-emerald-400 uppercase tracking-widest">
                04 // Get In Touch
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight text-white leading-tight">
                Request a Precision Metrology Quotation
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Submit your project specifications and raw blueprints. Our engineering team conducts coordinate checks and provides full-scope volumetric price estimations.
              </p>
            </div>

            {/* Direct Channel Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl glass-card-panel">
                <div className="p-3 rounded-lg glass-service-item text-emerald-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Direct Email</span>
                  <a href="mailto:inventive3tech@gmail.com" className="text-sm font-semibold text-slate-200 hover:text-emerald-400 block transition-colors">
                    inventive3tech@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl glass-card-panel">
                <div className="p-3 rounded-lg glass-service-item text-teal-400">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Support Line</span>
                  <a href="tel:9353592391" className="text-sm font-semibold text-slate-200 hover:text-emerald-400 block transition-colors">
                    9353592391
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl glass-card-panel">
                <div className="p-3 rounded-lg glass-service-item text-emerald-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Office Location</span>
                  <span className="text-sm font-semibold text-slate-200 block">
                    60 feet road , D Group Employees layout Lingadheeranahalli Andhralli - 560091
                  </span>
                </div>
              </div>
            </div>

            {/* Response speed badge */}
            <div className="p-4 rounded-xl glass-service-item text-xs font-mono text-slate-400 flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>GUARANTEED RESPONSE TIME: &lt; 24 BUSINESS HOURS</span>
            </div>
          </div>

          {/* Right Column: Enquiry Form Container */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl glass-card-panel">
              
              {/* Submission successful screen overlay */}
              {successResponse ? (
                <div className="text-center py-12 px-4 space-y-6 flex flex-col items-center">
                  <div className="p-4 bg-emerald-950/60 border border-emerald-500 rounded-full text-emerald-400 animate-bounce">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      Enquiry Submitted Successfully
                    </h3>
                    <p className="text-slate-300 text-sm max-w-md mx-auto">
                      {successResponse.message}
                    </p>
                  </div>

                  {/* Submission technical logs display */}
                  <div className="w-full bg-slate-950 border border-slate-800/80 p-5 rounded-xl text-left space-y-3 font-mono text-xs text-slate-400 max-w-lg">
                    <div className="flex justify-between border-b border-slate-900 pb-2">
                      <span className="text-emerald-500 font-semibold">ENQUIRY ID:</span>
                      <span className="text-slate-200 font-bold">{successResponse.enquiryId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Server Destination:</span>
                      <span className="text-slate-300">{successResponse.data.recipient}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Reply:</span>
                      <span className="text-emerald-400">{successResponse.data.estimatedResponseTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Calibration Sync:</span>
                      <span className="text-teal-400">SECURE SHIELD V.3</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSuccessResponse(null)}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-slate-800 text-emerald-400 hover:bg-slate-700 rounded-lg transition-all cursor-pointer"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" id="enquiry-form">
                  {/* General submission warning error banner */}
                  {submitError && (
                    <div className="p-4 rounded-xl border border-red-500/30 bg-red-950/30 text-red-400 text-xs flex items-center gap-3 font-mono">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Full Name & Company Name Side-by-Side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 font-mono flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-emerald-500" />
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 rounded-lg glass-input-field text-sm transition-all ${
                          errors.fullName ? 'border-red-500/60! focus:border-red-500!' : ''
                        }`}
                      />
                      {errors.fullName && <p className="text-[10px] text-red-400 font-mono">{errors.fullName}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 font-mono flex items-center gap-1.5">
                        <Building className="h-3.5 w-3.5 text-emerald-500" />
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Industrial Manufacturing Inc."
                        className="w-full px-4 py-3 rounded-lg glass-input-field text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Phone Number Side-by-Side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 font-mono flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-emerald-500" />
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="johndoe@company.com"
                        className={`w-full px-4 py-3 rounded-lg glass-input-field text-sm transition-all ${
                          errors.email ? 'border-red-500/60! focus:border-red-500!' : ''
                        }`}
                      />
                      {errors.email && <p className="text-[10px] text-red-400 font-mono">{errors.email}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 font-mono flex items-center gap-1.5">
                        <PhoneCall className="h-3.5 w-3.5 text-emerald-500" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-3 rounded-lg glass-input-field text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Service dropdown selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 font-mono flex items-center gap-1.5">
                      <HelpCircle className="h-3.5 w-3.5 text-emerald-500" />
                      Service Required <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg glass-input-field text-sm transition-all appearance-none cursor-pointer ${
                        errors.serviceRequired ? 'border-red-500/60! focus:border-red-500!' : ''
                      }`}
                    >
                      <option value="">-- Select Metrology Service --</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                    {errors.serviceRequired && <p className="text-[10px] text-red-400 font-mono">{errors.serviceRequired}</p>}
                  </div>

                  {/* Subject input field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 font-mono flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5 text-emerald-500" />
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Turbine housing CMM check quotation"
                      className={`w-full px-4 py-3 rounded-lg glass-input-field text-sm transition-all ${
                        errors.subject ? 'border-red-500/60! focus:border-red-500!' : ''
                      }`}
                    />
                    {errors.subject && <p className="text-[10px] text-red-400 font-mono">{errors.subject}</p>}
                  </div>

                  {/* Message body input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 font-mono flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5 text-emerald-500" />
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Please describe your component, size, dimensional specs, material tolerances, and on-site preferences..."
                      className={`w-full px-4 py-3 rounded-lg glass-input-field text-sm transition-all resize-none ${
                        errors.message ? 'border-red-500/60! focus:border-red-500!' : ''
                      }`}
                    />
                    {errors.message && <p className="text-[10px] text-red-400 font-mono">{errors.message}</p>}
                  </div>

                  {/* Professional Send Enquiry button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="submit-enquiry-form-btn"
                    className="w-full py-4 rounded-xl text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border-[2.5px] border-slate-950 border-t-transparent animate-spin" />
                        <span>Transmitting Coordinates...</span>
                      </span>
                    ) : (
                      <>
                        <span>Send Enquiry</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
