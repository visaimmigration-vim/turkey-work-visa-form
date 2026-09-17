import type { FormData } from './types';

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function createEmptyFormData(): FormData {
  return {
    // Step 1
    firstName: '', middleName: '', lastName: '', fullNameEnglish: '', fullNameTurkish: '',
    fatherName: '', motherName: '', dateOfBirth: '', placeOfBirth: '', countryOfBirth: '',
    gender: '', maritalStatus: '', nationality: '', currentCountry: '', currentCity: '',
    nationalId: '', passportNumber: '', passportIssueDate: '', passportExpiryDate: '',
    passportIssuingCountry: '', passportIssuingAuthority: '',

    // Step 2
    primaryPhone: '', whatsappNumber: '', email: '', residentialAddress: '',
    contactCity: '', contactProvince: '', contactCountry: '', postalCode: '',
    emergencyContactName: '', emergencyContactRelation: '', emergencyContactPhone: '', emergencyContactEmail: '',

    // Step 3
    passportType: '', prevPassports: '', prevTurkishVisas: '', prevTurkishVisasDetail: '',
    prevResidencePermits: '', prevResidencePermitsDetail: '', prevWorkPermits: '', prevWorkPermitsDetail: '',
    prevVisaRefusals: '', visaRefusalCountry: '', visaRefusalDate: '', visaRefusalReason: '',
    prevTravelToTurkey: '', lastVisitTurkeyDate: '', lastVisitTurkeyPurpose: '',

    // Step 4
    education: [],

    // Step 5
    qualifications: [],

    // Step 6
    workExperience: [],

    // Step 7
    skills: [], otherSkills: '',

    // Step 8
    languages: [], computerSkills: [],

    // Step 9
    hasTurkishEmployer: '', hasTurkishJobOffer: '', employerName: '', companyAddress: '',
    employerCity: '', contactPerson: '', employerPhone: '', employerEmail: '',
    turkishJobTitle: '', turkishJobDescription: '', proposedSalary: '', proposedSalaryCurrency: '',
    contractAvailable: false, contractFileName: '', invitationAvailable: false, invitationFileName: '',
    desiredProfession: '', desiredIndustry: '', preferredTurkishCities: '', willingToRelocate: false,
    expectedSalary: '', expectedSalaryCurrency: '', employmentPreference: '', availableStartDate: '',
    applicantJobDescription: '',

    // Step 10
    documents: [],

    // Step 11
    cvFileName: '', linkedinProfile: '', personalWebsite: '', portfolio: '', githubProfile: '',
    professionalSocialMedia: '', professionalBio: '', careerObjective: '', mainStrengths: '',
    mainTechnicalSkills: '', preferredJobTitle: '', preferredTurkishIndustry: '',

    // Step 12
    declarationConfirmed: false, consentConfirmed: false, privacyAcknowledged: false,
    declarationDate: '', declarationName: '',
  };
}

export function generateApplicationId(): string {
  const d = new Date();
  const y = d.getFullYear();
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TVW-${y}-${rand}`;
}

export function isPassportExpiringSoon(expiryDate: string): boolean {
  if (!expiryDate) return false;
  const expiry = new Date(expiryDate);
  const now = new Date();
  const months = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30);
  return months > 0 && months < 6;
}

export function isPassportExpired(expiryDate: string): boolean {
  if (!expiryDate) return false;
  return new Date(expiryDate) < new Date();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^[\d\s\+\-\(\)]{7,20}$/.test(phone);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function calculateTotalExperience(workExperience: { yearsExperience: string }[]): string {
  let total = 0;
  for (const w of workExperience) {
    const yrs = parseInt(w.yearsExperience, 10);
    if (!isNaN(yrs)) total += yrs;
  }
  return `${total}`;
}

export function buildProfessionalProfile(data: FormData): {
  applicant: string;
  profession: string;
  totalExperience: string;
  education: string;
  mainSkills: string;
  techSkills: string;
  languages: string;
  certificates: string;
  currentEmployment: string;
  desiredJob: string;
  preferredCities: string;
  documents: string;
} {
  return {
    applicant: `${data.firstName} ${data.lastName}`.trim() || '—',
    profession: data.preferredJobTitle || data.desiredProfession || '—',
    totalExperience: calculateTotalExperience(data.workExperience) + ' yrs',
    education: data.education.map((e) => e.fieldOfStudy).filter(Boolean).join(', ') || '—',
    mainSkills: data.skills.map((s) => s.name).filter(Boolean).join(', ') || '—',
    techSkills: data.computerSkills.map((s) => s.skill).filter(Boolean).join(', ') || '—',
    languages: data.languages.map((l) => l.language).filter(Boolean).join(', ') || '—',
    certificates: data.qualifications.map((q) => q.name).filter(Boolean).join(', ') || '—',
    currentEmployment: data.workExperience.find((w) => w.isCurrent)?.jobTitle || '—',
    desiredJob: data.desiredProfession || '—',
    preferredCities: data.preferredTurkishCities || '—',
    documents: data.documents.filter((d) => d.available).map((d) => d.type).join(', ') || '—',
  };
}
