export type Language = 'fa' | 'en' | 'tr';

export type Gender = '' | 'male' | 'female' | 'other';
export type MaritalStatus = '' | 'single' | 'married' | 'divorced' | 'widowed' | 'separated';
export type PassportType = '' | 'ordinary' | 'diplomatic' | 'service' | 'special' | 'travel';
export type SkillLevel = '' | 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type EmploymentType = '' | 'full-time' | 'part-time' | 'contract' | 'self-employed' | 'seasonal' | 'internship';
export type LanguageLevel = '' | 'none' | 'basic' | 'intermediate' | 'advanced' | 'fluent' | 'native';
export type EducationLevel = '' | 'primary' | 'middle' | 'high-school' | 'diploma' | 'associate' | 'bachelor' | 'master' | 'phd' | 'other';
export type Currency = '' | 'try' | 'usd' | 'eur' | 'afn' | 'irr' | 'pkr' | 'other';
export type YesNo = '' | 'yes' | 'no';
export type ProficiencyLevel = '' | 'basic' | 'intermediate' | 'advanced' | 'expert';

export interface EducationRecord {
  id: string;
  level: EducationLevel;
  institution: string;
  fieldOfStudy: string;
  degree: string;
  country: string;
  city: string;
  startDate: string;
  endDate: string;
  graduationYear: string;
  certificateAvailable: boolean;
  fileName: string;
  additionalInfo: string;
}

export interface QualificationRecord {
  id: string;
  name: string;
  profession: string;
  specialization: string;
  issuingOrg: string;
  country: string;
  dateObtained: string;
  expiryDate: string;
  certNumber: string;
  certAvailable: boolean;
  fileName: string;
  hasLicense: boolean;
  licenseNumber: string;
  licenseAuthority: string;
  licenseExpiry: string;
  additionalInfo: string;
}

export interface WorkExperienceRecord {
  id: string;
  jobTitle: string;
  profession: string;
  position: string;
  company: string;
  industry: string;
  country: string;
  city: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  employmentType: EmploymentType;
  salary: string;
  currency: Currency;
  yearsExperience: string;
  responsibilities: string;
  achievements: string;
  tools: string;
  technologies: string;
  certAvailable: boolean;
  fileName: string;
  referenceName: string;
  referencePhone: string;
  referenceEmail: string;
}

export interface SkillRecord {
  id: string;
  category: string;
  name: string;
  level: SkillLevel;
  yearsExperience: string;
  lastUsed: string;
  certAvailable: boolean;
  fileName: string;
  description: string;
  tools: string;
}

export interface LanguageRecord {
  id: string;
  language: string;
  speaking: LanguageLevel;
  reading: LanguageLevel;
  writing: LanguageLevel;
  listening: LanguageLevel;
  certAvailable: boolean;
  fileName: string;
}

export interface ComputerSkillRecord {
  id: string;
  skill: string;
  proficiency: ProficiencyLevel;
  yearsExperience: string;
  certAvailable: boolean;
  fileName: string;
  additionalInfo: string;
}

export interface DocumentRecord {
  id: string;
  category: string;
  type: string;
  documentNumber: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate: string;
  available: boolean;
  fileName: string;
  notes: string;
}

export interface FormData {
  // Step 1 — Personal Information
  firstName: string;
  middleName: string;
  lastName: string;
  fullNameEnglish: string;
  fullNameTurkish: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  countryOfBirth: string;
  gender: Gender;
  maritalStatus: MaritalStatus;
  nationality: string;
  currentCountry: string;
  currentCity: string;
  nationalId: string;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  passportIssuingCountry: string;
  passportIssuingAuthority: string;

  // Step 2 — Contact Information
  primaryPhone: string;
  whatsappNumber: string;
  email: string;
  residentialAddress: string;
  contactCity: string;
  contactProvince: string;
  contactCountry: string;
  postalCode: string;
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactPhone: string;
  emergencyContactEmail: string;

  // Step 3 — Passport & Travel
  passportType: PassportType;
  prevPassports: string;
  prevTurkishVisas: YesNo;
  prevTurkishVisasDetail: string;
  prevResidencePermits: YesNo;
  prevResidencePermitsDetail: string;
  prevWorkPermits: YesNo;
  prevWorkPermitsDetail: string;
  prevVisaRefusals: YesNo;
  visaRefusalCountry: string;
  visaRefusalDate: string;
  visaRefusalReason: string;
  prevTravelToTurkey: YesNo;
  lastVisitTurkeyDate: string;
  lastVisitTurkeyPurpose: string;

  // Step 4 — Education
  education: EducationRecord[];

  // Step 5 — Qualifications
  qualifications: QualificationRecord[];

  // Step 6 — Work Experience
  workExperience: WorkExperienceRecord[];

  // Step 7 — Professional Skills
  skills: SkillRecord[];
  otherSkills: string;

  // Step 8 — Language & Computer Skills
  languages: LanguageRecord[];
  computerSkills: ComputerSkillRecord[];

  // Step 9 — Turkey Employment
  hasTurkishEmployer: YesNo;
  hasTurkishJobOffer: YesNo;
  employerName: string;
  companyAddress: string;
  employerCity: string;
  contactPerson: string;
  employerPhone: string;
  employerEmail: string;
  turkishJobTitle: string;
  turkishJobDescription: string;
  proposedSalary: string;
  proposedSalaryCurrency: Currency;
  contractAvailable: boolean;
  contractFileName: string;
  invitationAvailable: boolean;
  invitationFileName: string;
  desiredProfession: string;
  desiredIndustry: string;
  preferredTurkishCities: string;
  willingToRelocate: boolean;
  expectedSalary: string;
  expectedSalaryCurrency: Currency;
  employmentPreference: EmploymentType;
  availableStartDate: string;
  applicantJobDescription: string;

  // Step 10 — Documents
  documents: DocumentRecord[];

  // Step 11 — CV / Professional Profile
  cvFileName: string;
  linkedinProfile: string;
  personalWebsite: string;
  portfolio: string;
  githubProfile: string;
  professionalSocialMedia: string;
  professionalBio: string;
  careerObjective: string;
  mainStrengths: string;
  mainTechnicalSkills: string;
  preferredJobTitle: string;
  preferredTurkishIndustry: string;

  // Step 12 — Declaration
  declarationConfirmed: boolean;
  consentConfirmed: boolean;
  privacyAcknowledged: boolean;
  declarationDate: string;
  declarationName: string;
}

export interface SubmissionResult {
  success: boolean;
  applicationId?: string;
  submissionDate?: string;
  status?: string;
  message?: string;
}

// ============================================================
// SKILL CATEGORIES (12 categories A-L)
// ============================================================

export const SKILL_CATEGORIES: { key: string; skills: string[] }[] = [
  {
    key: 'construction',
    skills: ['mason', 'carpenter', 'welder', 'electrician', 'plumber', 'painter', 'tile-worker', 'steel-worker', 'crane-operator', 'heavy-machinery-operator', 'construction-supervisor', 'construction-engineer', 'architect', 'surveyor', 'other-construction'],
  },
  {
    key: 'mechanical',
    skills: ['auto-mechanic', 'diesel-mechanic', 'industrial-mechanic', 'machine-operator-mech', 'maintenance-technician', 'hvac-technician', 'motorcycle-mechanic', 'other-mechanical'],
  },
  {
    key: 'electrical',
    skills: ['electrical-technician', 'industrial-electrician', 'solar-technician', 'electrical-engineer', 'generator-technician', 'wiring', 'electrical-maintenance', 'other-electrical'],
  },
  {
    key: 'it',
    skills: ['software-developer', 'web-developer', 'mobile-developer', 'network-technician', 'system-administrator', 'cybersecurity', 'database', 'graphic-design', 'ui-ux', 'digital-marketing', 'computer-technician', 'data-entry', 'it-support', 'other-it'],
  },
  {
    key: 'healthcare',
    skills: ['doctor', 'nurse', 'medical-assistant', 'pharmacist', 'lab-technician', 'dental-professional', 'physiotherapist', 'healthcare-assistant', 'other-healthcare'],
  },
  {
    key: 'hospitality',
    skills: ['chef', 'cook', 'baker', 'waiter', 'hotel-receptionist', 'housekeeping', 'restaurant-manager', 'kitchen-assistant', 'other-hospitality'],
  },
  {
    key: 'transportation',
    skills: ['driver', 'truck-driver', 'bus-driver', 'taxi-driver', 'heavy-vehicle-driver', 'forklift-operator', 'delivery-driver', 'logistics-worker', 'other-transportation'],
  },
  {
    key: 'agriculture',
    skills: ['farmer', 'agricultural-worker', 'livestock-worker', 'irrigation-worker', 'greenhouse-worker', 'agricultural-technician', 'other-agriculture'],
  },
  {
    key: 'manufacturing',
    skills: ['factory-worker', 'machine-operator-mfg', 'production-worker', 'quality-control', 'packaging', 'textile-worker', 'welding-mfg', 'other-manufacturing'],
  },
  {
    key: 'business',
    skills: ['accountant', 'office-administrator', 'manager', 'sales', 'customer-service', 'hr', 'procurement', 'finance', 'other-business'],
  },
  {
    key: 'security',
    skills: ['security-guard', 'security-supervisor', 'risk-management', 'other-security'],
  },
  {
    key: 'other-skills',
    skills: ['other-professional'],
  },
];

// ============================================================
// DOCUMENT CATEGORIES
// ============================================================

export const DOCUMENT_CATEGORIES: { key: string; items: string[] }[] = [
  {
    key: 'identity',
    items: ['passport', 'national-id', 'birth-certificate', 'family-certificate', 'marriage-certificate', 'divorce-certificate', 'other-identity'],
  },
  {
    key: 'education-docs',
    items: ['diploma', 'degree', 'transcript', 'training-certificate', 'vocational-certificate', 'professional-certificate'],
  },
  {
    key: 'employment-docs',
    items: ['employment-contract', 'employment-certificate', 'experience-letter', 'recommendation-letter', 'salary-certificate', 'payslip', 'employer-reference'],
  },
  {
    key: 'professional-docs',
    items: ['professional-license', 'trade-license', 'driving-license', 'technical-certificate', 'safety-certificate', 'medical-license', 'engineering-license'],
  },
  {
    key: 'turkey-docs',
    items: ['turkish-job-offer', 'turkish-employment-contract', 'employer-invitation', 'work-permit-docs', 'previous-turkish-visa', 'turkish-residence-permit', 'other-turkish-doc'],
  },
  {
    key: 'language-docs',
    items: ['english-certificate', 'turkish-certificate', 'other-language-certificate'],
  },
  {
    key: 'other-docs',
    items: ['police-clearance', 'medical-documents', 'bank-documents', 'photos', 'cv-doc', 'cover-letter', 'other-document'],
  },
];

// ============================================================
// COMPUTER SKILLS LIST
// ============================================================

export const COMPUTER_SKILLS_LIST = [
  'ms-word', 'ms-excel', 'ms-powerpoint', 'google-workspace', 'photoshop',
  'autocad', 'adobe-tools', 'programming', 'web-development', 'database-skill',
  'accounting-software', 'erp', 'pos', 'other-computer',
];

// ============================================================
// LANGUAGE LIST
// ============================================================

export const LANGUAGE_LIST = [
  'persian-dari', 'pashto', 'english', 'turkish', 'arabic',
  'urdu', 'russian', 'german', 'french', 'other-language',
];

// ============================================================
// TURKISH CITIES
// ============================================================

export const TURKISH_CITIES = [
  'istanbul', 'ankara', 'izmir', 'bursa', 'antalya', 'adana', 'konya',
  'gaziantep', 'mersin', 'kayseri', 'eskisehir', 'trabzon', 'sanliurfa',
  'malatya', 'manisa', 'kahramanmaras', 'denizli', 'samsun', 'sakarya',
  'balikesir', 'other-city',
];
