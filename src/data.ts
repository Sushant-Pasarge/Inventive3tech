import { Service, Feature, Stat } from './types';

export const SERVICES_DATA: Service[] = [
  {
    id: 'cmm-inspection',
    title: 'CMM Inspection (Portable & Fixed)',
    shortDesc: 'Precision Coordinate Measuring Machine inspection services delivering micrometer-level dimensional analysis on-site or in-lab.',
    fullDesc: 'We provide both portable and fixed Coordinate Measuring Machine (CMM) inspection services, delivering precise dimensional analysis for components of all sizes — whether on your shop floor or directly at your production site. Our temperature-controlled metrology laboratory is equipped with high-accuracy CNC coordinate measuring machines capable of sub-micron precision.',
    iconName: 'Ruler',
    imagePlaceholder: 'High-accuracy CMM probing for Aerospace, Defense, Automotive, Medical & General Manufacturing, measuring geometric tolerances (GD&T) with a ruby-tipped stylus in a temperature-controlled laboratory.',
    features: [
      'Fixed bridge coordinate measuring machines with sub-micron accuracy',
      'On-site portable measuring arm inspection (FARO / Hexagon Romer Arms)',
      'Automated CNC inspection programs for serial production runs',
      'Comprehensive GD&T (Geometric Dimensioning & Tolerancing) report delivery',
      'Direct CAD-to-part comparison and 3D error color-mapping'
    ]
  },
  {
    id: '3d-scanning',
    title: '3D Scanning, Inspection & Reverse Engineering',
    shortDesc: 'Capturing dense high-accuracy point clouds and polygon meshes for surface deviation inspection and parametric CAD modeling.',
    fullDesc: 'Using advanced 3D scanning technology, we capture highly accurate surface and dimensional data for quality inspection, as-built documentation, and reverse engineering of legacy or complex parts — enabling faster product development and quality assurance. Our blue-light and laser scanners digitize physical objects with extreme precision.',
    iconName: 'ScanFace',
    imagePlaceholder: 'Industrial blue-light 3D scanner project projecting fringe patterns onto a complex casting, generating an ultra-dense point cloud for digital reconstruction.',
    features: [
      'High-resolution structured blue-light & laser scanning systems',
      'Parametric 3D CAD modeling (SolidWorks, STEP, IGES format delivery)',
      'Legacy part reconstruction and digital archiving of obsolete tooling',
      'Color-coded surface deviation mapping against master CAD models',
      'Complex organic and freeform surface inspection capability'
    ]
  },
  {
    id: 'cmm-stylus-fixtures',
    title: 'CMM Stylus & Custom Fixtures',
    shortDesc: 'Premium metrology probing systems, ruby-tipped styli, and modular custom nesting fixtures to secure parts.',
    fullDesc: 'We supply a wide range of CMM styli, probing systems, and custom fixtures from leading manufacturers, ensuring your metrology equipment operates at peak performance and accuracy. Our team also designs and manufactures custom clamping fixtures to ensure stable, highly repeatable alignment for parts during measurement.',
    iconName: 'Cpu',
    imagePlaceholder: 'A collection of precision ruby-tipped metrology styli, ceramic extensions, and custom modular vacuum holding fixtures designed for automotive panel inspection.',
    features: [
      'Authorized distributor of industry-leading ruby and ceramic styli',
      'Custom styli configuration and stylus star-probe custom designs',
      'Bespoke modular fixtures engineered for high part repeatability',
      'Vacuum-assisted holding systems for flexible, thin-walled parts',
      'Turnkey metrology workholding solution design and deployment'
    ]
  },
  {
    id: 'vmm-inspection',
    title: 'VMM Inspection (Video Measuring Machine)',
    shortDesc: 'Automated high-speed 2D and 3D optical measurements using advanced multi-sensor Video Measuring Machines.',
    fullDesc: 'Our Video Measuring Machine (VMM) inspection services utilize advanced non-contact optical imaging and high-precision tactile multi-sensor probes to measure ultra-precise components. VMM is optimal for delicate parts, complex 2D profiles, electronic PCBs, microfluidic chips, and fine plastic/rubber parts where traditional mechanical contact probing could cause deflection or damage.',
    iconName: 'Eye',
    imagePlaceholder: 'Multi-sensor high-precision video measuring machine with high-magnification telecentric lens measuring micron-scale geometry on a micro-injection molded automotive connector.',
    features: [
      'Automated CNC optical scanning and edge-detection systems',
      'Tactile probe and laser sensor integration for multi-sensor checks',
      'Sub-micron scale resolution for intricate 2D/3D part geometry',
      'Perfect for electronic parts, microfluidics, and flexible polymers',
      'Instant visual geometric report generation with nominal overlay'
    ]
  },
  {
    id: 'contour-tracer',
    title: 'Contour Tracer Analysis',
    shortDesc: 'High-precision stylus profile measurements to scan, trace, and inspect complex outer/inner geometries and contours.',
    fullDesc: 'We provide advanced contour tracing and measurement services to analyze internal and external component contours with exceptional accuracy. Using precision stylus tracing systems, we record continuous geometric profiles of complex shapes like threads, gear profiles, turbine blades, ball screws, and gothic arcs, comparing them directly to CAD profiles.',
    iconName: 'Activity',
    imagePlaceholder: 'High-precision contour tracer profiling stylus scanning the intricate internal threads of a heavy-duty ball screw under laboratory conditions.',
    features: [
      'Ultra-precise continuous contact tracing of internal & external profiles',
      'Analysis of gothic arcs, thread leads, micro-radii, and angles',
      'Direct DXF contour drawing comparison to target CAD drawings',
      'High-resolution measurement data for reverse engineering profiles',
      'Repeatable measurements with micron-level mechanical styli'
    ]
  },
  {
    id: 'surface-roughness',
    title: 'Surface Roughness & Texture Measurement',
    shortDesc: 'Accurate contact and optical metrology measuring surface finish, waviness, and micro-texture to international standards.',
    fullDesc: 'Our surface roughness and texture testing services deliver certified, highly repeatable analysis of surface topography and quality. Using both skidless contact styli and advanced 3D non-contact optical interferometers, we measure roughness (Ra, Rz, Rq, Rt, and 3D areal parameters) to ensure your parts satisfy tribological, seals, and visual finish engineering specifications.',
    iconName: 'Waves',
    imagePlaceholder: 'Precision skidless roughness tester scanning the polished surface of a hydraulic piston rod, calculating micro-texture profiles on a graphic interface.',
    features: [
      'High-resolution contact stylus profiling for deep/narrow grooves',
      'Non-contact 3D optical interferometry for areal surface parameters',
      'Full statistical analysis (Ra, Rz, Rq, Rmax, Rt, Rz1max, and more)',
      'Verification of sealing, wear, tribology, and cosmetic surface finishes',
      'ISO 4287 and ISO 25178 compliance certificate reporting'
    ]
  }
];

export const FEATURES_DATA: Feature[] = [
  {
    id: 'high-precision',
    title: 'High Precision Measurements',
    description: 'Micrometer and sub-micron scale tolerances certified using ISO 17025 compliant metrology processes and calibrated systems.',
    iconName: 'Layers'
  },
  {
    id: 'advanced-equipment',
    title: 'Advanced Metrology Equipment',
    description: 'Equipped with state-of-the-art CNC bridge CMMs, industrial blue-light scanners, and ultra-accurate laser tracking trackers.',
    iconName: 'Box'
  },
  {
    id: 'experienced-engineers',
    title: 'Experienced Engineers',
    description: 'Our certified metrology and application engineers hold decades of combined experience across aerospace, automotive, and defense sectors.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'fast-turnaround',
    title: 'Fast Turnaround Time',
    description: 'Optimized inspection workflows and automatic path planning guarantee express delivery of digital reports and CAD files.',
    iconName: 'Zap'
  },
  {
    id: 'onsite-capability',
    title: 'On-Site Inspection Capability',
    description: 'Deployable on-site portable arm measurements and scanning setups brought directly to your manufacturing or assembly floor.',
    iconName: 'MapPin'
  },
  {
    id: 'reverse-engineering',
    title: 'Reverse Engineering Expertise',
    description: 'Reconstruct complex geometry into fully featured, editable, parametric 3D CAD parts ready for CNC machining or tooling manufacture.',
    iconName: 'GitBranch'
  },
  {
    id: 'custom-solutions',
    title: 'Custom Metrology Solutions',
    description: 'Tailored fixture designs and bespoke measurement routines tailored precisely to solve your unique production inspection bottlenecks.',
    iconName: 'Wrench'
  },
  {
    id: 'reliable-support',
    title: 'Reliable Customer Support',
    description: 'Direct communication with dedicated metrologists for troubleshooting, report explanation, and post-delivery assistance.',
    iconName: 'Headphones'
  },
  {
    id: 'competitive-pricing',
    title: 'Competitive Pricing',
    description: 'Flexible tiered pricing structure offering premium tier metrology lab services at highly cost-effective rates.',
    iconName: 'DollarSign'
  }
];

export const STATS_DATA: Stat[] = [
  { value: '0.1µm', label: 'Probing Resolution', sublabel: 'For high-tolerance components' },
  { value: '10+', label: 'Years Metrology Experience', sublabel: 'Serving precision industries' },
  { value: '1,200+', label: 'Components Certified', sublabel: 'Aerospace, medical, & automotive' },
  { value: '100%', label: 'Traceability & Quality', sublabel: 'Conforming to NIST & ISO standards' }
];
