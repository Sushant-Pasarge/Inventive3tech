import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import EnquiryForm from './components/EnquiryForm';
import Footer from './components/Footer';
import ServiceDetailModal from './components/ServiceDetailModal';
import InventiveLogo from './components/InventiveLogo';
import { SERVICES_DATA } from './data';
import { Service } from './types';

export default function App() {
  // Slide-out right side navigation panel for Services
  const [isServicesDrawerOpen, setIsServicesDrawerOpen] = useState(false);

  // Active service selected on side tabs
  const [activeServiceId, setActiveServiceId] = useState<string>('cmm-inspection');

  // Currently selected service to pre-populate Enquiry Form
  const [enquiryServiceId, setEnquiryServiceId] = useState<string>('');

  // Currently opened detailed modal service
  const [detailedService, setDetailedService] = useState<Service | null>(null);

  // Handlers
  const handleOpenServicesDrawer = () => setIsServicesDrawerOpen(true);
  const handleCloseServicesDrawer = () => setIsServicesDrawerOpen(false);

  // When a user selects a service from the drawer slide-out menu
  const handleSelectServiceFromDrawer = (serviceId: string) => {
    setActiveServiceId(serviceId);
    setEnquiryServiceId(serviceId);
    setIsServicesDrawerOpen(false);
  };

  // Scroll helper
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

  // When a user clicks CTA in hero to view services
  const handleHeroOurServicesClick = () => {
    handleScrollToId('services');
  };

  // When a user clicks CTA in hero to send enquiry
  const handleHeroSendEnquiryClick = () => {
    setEnquiryServiceId(''); // Clear selection so they can choose
    handleScrollToId('enquiry');
  };

  // When a user clicks "Request Quotation" in the Service Detail Modal
  const handleModalEnquiryRequest = (serviceId: string) => {
    setDetailedService(null); // Close modal
    setEnquiryServiceId(serviceId);
    
    // Select correct service in left index list as well
    setActiveServiceId(serviceId);

    // Scroll to form
    setTimeout(() => {
      handleScrollToId('enquiry');
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 glass-viewport-bg text-slate-100 font-sans antialiased overflow-x-hidden relative">
      
      {/* Immersive Website Background Watermark (Subtle glowing, rotating logo) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center opacity-[0.035] md:opacity-[0.055]">
        <div className="w-[120vw] h-[120vw] max-w-[720px] max-h-[720px] animate-[spin_180s_linear_infinite]">
          <InventiveLogo size="100%" textColor="#10B981" accentColor="#10B981" />
        </div>
      </div>

      {/* Navigation Header with built-in Services Slide-out panel */}
      <Navbar
        services={SERVICES_DATA}
        onOpenServicesDrawer={handleOpenServicesDrawer}
        isServicesDrawerOpen={isServicesDrawerOpen}
        onCloseServicesDrawer={handleCloseServicesDrawer}
        onSelectServiceFromDrawer={handleSelectServiceFromDrawer}
      />

      {/* Hero Entrance Block */}
      <Hero
        onOurServicesClick={handleHeroOurServicesClick}
        onSendEnquiryClick={handleHeroSendEnquiryClick}
      />

      {/* About Section */}
      <About />

      {/* Services Section with Side Tab Panel */}
      <Services
        services={SERVICES_DATA}
        activeServiceId={activeServiceId}
        onSetActiveService={(id) => {
          setActiveServiceId(id);
          setEnquiryServiceId(id);
        }}
        onLearnMore={(service) => setDetailedService(service)}
      />

      {/* Why Choose Us Animated Features Grid */}
      <WhyChooseUs />

      {/* Customer Enquiry Form Section with Full backend API integration */}
      <EnquiryForm
        services={SERVICES_DATA}
        selectedServiceId={enquiryServiceId}
      />

      {/* Professional Footer */}
      <Footer
        onSelectService={(id) => {
          setActiveServiceId(id);
          setEnquiryServiceId(id);
          handleScrollToId('services');
        }}
      />

      {/* Detailed Modal Overlay for Service items */}
      <ServiceDetailModal
        service={detailedService}
        onClose={() => setDetailedService(null)}
        onEnquire={handleModalEnquiryRequest}
      />

    </div>
  );
}
