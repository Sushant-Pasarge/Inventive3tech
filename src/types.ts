export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  imagePlaceholder: string;
  features: string[];
}

export interface EnquiryForm {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  subject: string;
  message: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Stat {
  value: string;
  label: string;
  sublabel: string;
}
