import type { FormData, EducationRecord, QualificationRecord, WorkExperienceRecord } from './types';
import type { TranslationKey } from './i18n';
import { useLang } from './LanguageContext';
import {
  TextField, TextArea, SelectField, CheckboxField, DateField,
  SectionCard, RecordCard, AddButton, EmptyState, FileUpload,
} from './FormFields';
import { generateId } from './formData';
import {
  genderOptions, maritalStatusOptions, passportTypeOptions, yesNoOptions,
  educationLevelOptions, employmentTypeOptions, currencyOptions,
} from './options';
import { isPassportExpired, isPassportExpiringSoon, isValidEmail, isValidPhone } from './formData';

// ============================================================
// STEP 1 — PERSONAL INFORMATION
// ============================================================
export function Step1Personal({ data, update }: { data: FormData; update: (patch: Partial<FormData>) => void }) {
  return (
    <SectionCard title="step1Title" icon={<IconUser />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <TextField label="firstName" value={data.firstName} onChange={(v) => update({ firstName: v })} required />
        <TextField label="middleName" value={data.middleName} onChange={(v) => update({ middleName: v })} />
        <TextField label="lastName" value={data.lastName} onChange={(v) => update({ lastName: v })} required />
        <TextField label="fullNameEnglish" value={data.fullNameEnglish} onChange={(v) => update({ fullNameEnglish: v })} />
        <TextField label="fullNameTurkish" value={data.fullNameTurkish} onChange={(v) => update({ fullNameTurkish: v })} />
        <TextField label="fatherName" value={data.fatherName} onChange={(v) => update({ fatherName: v })} />
        <TextField label="motherName" value={data.motherName} onChange={(v) => update({ motherName: v })} />
        <DateField label="dateOfBirth" value={data.dateOfBirth} onChange={(v) => update({ dateOfBirth: v })} required />
        <TextField label="placeOfBirth" value={data.placeOfBirth} onChange={(v) => update({ placeOfBirth: v })} />
        <TextField label="countryOfBirth" value={data.countryOfBirth} onChange={(v) => update({ countryOfBirth: v })} />
        <SelectField label="gender" value={data.gender} onChange={(v) => update({ gender: v as FormData['gender'] })} options={genderOptions} />
        <SelectField label="maritalStatus" value={data.maritalStatus} onChange={(v) => update({ maritalStatus: v as FormData['maritalStatus'] })} options={maritalStatusOptions} />
        <TextField label="nationality" value={data.nationality} onChange={(v) => update({ nationality: v })} required />
        <TextField label="currentCountry" value={data.currentCountry} onChange={(v) => update({ currentCountry: v })} required />
        <TextField label="currentCity" value={data.currentCity} onChange={(v) => update({ currentCity: v })} required />
        <TextField label="nationalId" value={data.nationalId} onChange={(v) => update({ nationalId: v })} />
        <TextField label="passportNumber" value={data.passportNumber} onChange={(v) => update({ passportNumber: v })} required />
        <DateField label="passportIssueDate" value={data.passportIssueDate} onChange={(v) => update({ passportIssueDate: v })} />
        <DateField label="passportExpiryDate" value={data.passportExpiryDate} onChange={(v) => update({ passportExpiryDate: v })} required />
        <TextField label="passportIssuingCountry" value={data.passportIssuingCountry} onChange={(v) => update({ passportIssuingCountry: v })} />
        <TextField label="passportIssuingAuthority" value={data.passportIssuingAuthority} onChange={(v) => update({ passportIssuingAuthority: v })} />
      </div>
      <PassportWarning expiryDate={data.passportExpiryDate} />
    </SectionCard>
  );
}

function PassportWarning({ expiryDate }: { expiryDate: string }) {
  const { t } = useLang();
  const expired = isPassportExpired(expiryDate);
  const soon = isPassportExpiringSoon(expiryDate);
  if (!expired && !soon) return null;
  return (
    <div className={`mt-4 rounded-lg border px-4 py-3 ${expired ? 'bg-turkish-50 border-turkish-200' : 'bg-amber-50 border-amber-200'}`}>
      <p className={`text-sm font-medium ${expired ? 'text-turkish-600' : 'text-amber-600'}`}>
        {expired ? t('passportExpiryDate') + ': ' + expiryDate : ''}
      </p>
    </div>
  );
}

// ============================================================
// STEP 2 — CONTACT INFORMATION
// ============================================================
export function Step2Contact({ data, update }: { data: FormData; update: (patch: Partial<FormData>) => void }) {
  const emailErr = data.email && !isValidEmail(data.email) ? 'invalidEmail' : '';
  const phoneErr = data.primaryPhone && !isValidPhone(data.primaryPhone) ? 'invalidPhone' : '';

  return (
    <SectionCard title="step2Title" icon={<IconPhone />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <TextField label="primaryPhone" value={data.primaryPhone} onChange={(v) => update({ primaryPhone: v })} required error={phoneErr} />
        <TextField label="whatsappNumber" value={data.whatsappNumber} onChange={(v) => update({ whatsappNumber: v })} />
        <TextField label="email" value={data.email} onChange={(v) => update({ email: v })} required type="email" error={emailErr} />
      </div>
      <div className="mt-4">
        <TextArea label="residentialAddress" value={data.residentialAddress} onChange={(v) => update({ residentialAddress: v })} rows={2} />
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <TextField label="contactCity" value={data.contactCity} onChange={(v) => update({ contactCity: v })} />
        <TextField label="contactProvince" value={data.contactProvince} onChange={(v) => update({ contactProvince: v })} />
        <TextField label="contactCountry" value={data.contactCountry} onChange={(v) => update({ contactCountry: v })} />
        <TextField label="postalCode" value={data.postalCode} onChange={(v) => update({ postalCode: v })} />
      </div>
      <div className="mt-6 pt-6 border-t border-navy-100">
        <h4 className="text-sm font-semibold text-navy-800 mb-4">Emergency Contact</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TextField label="emergencyContactName" value={data.emergencyContactName} onChange={(v) => update({ emergencyContactName: v })} />
          <TextField label="emergencyContactRelation" value={data.emergencyContactRelation} onChange={(v) => update({ emergencyContactRelation: v })} />
          <TextField label="emergencyContactPhone" value={data.emergencyContactPhone} onChange={(v) => update({ emergencyContactPhone: v })} />
          <TextField label="emergencyContactEmail" value={data.emergencyContactEmail} onChange={(v) => update({ emergencyContactEmail: v })} type="email" />
        </div>
      </div>
    </SectionCard>
  );
}

// ============================================================
// STEP 3 — PASSPORT & TRAVEL
// ============================================================
export function Step3PassportTravel({ data, update }: { data: FormData; update: (patch: Partial<FormData>) => void }) {
  return (
    <SectionCard title="step3Title" icon={<IconBook />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField label="passportType" value={data.passportType} onChange={(v) => update({ passportType: v as FormData['passportType'] })} options={passportTypeOptions} />
        <TextField label="prevPassports" value={data.prevPassports} onChange={(v) => update({ prevPassports: v })} />
      </div>

      <div className="mt-6 pt-6 border-t border-navy-100 space-y-4">
        <h4 className="text-sm font-semibold text-navy-800">Türkiye History</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField label="prevTurkishVisas" value={data.prevTurkishVisas} onChange={(v) => update({ prevTurkishVisas: v as FormData['prevTurkishVisas'] })} options={yesNoOptions} />
          {data.prevTurkishVisas === 'yes' && (
            <TextField label="prevTurkishVisasDetail" value={data.prevTurkishVisasDetail} onChange={(v) => update({ prevTurkishVisasDetail: v })} />
          )}
          <SelectField label="prevResidencePermits" value={data.prevResidencePermits} onChange={(v) => update({ prevResidencePermits: v as FormData['prevResidencePermits'] })} options={yesNoOptions} />
          {data.prevResidencePermits === 'yes' && (
            <TextField label="prevResidencePermitsDetail" value={data.prevResidencePermitsDetail} onChange={(v) => update({ prevResidencePermitsDetail: v })} />
          )}
          <SelectField label="prevWorkPermits" value={data.prevWorkPermits} onChange={(v) => update({ prevWorkPermits: v as FormData['prevWorkPermits'] })} options={yesNoOptions} />
          {data.prevWorkPermits === 'yes' && (
            <TextField label="prevWorkPermitsDetail" value={data.prevWorkPermitsDetail} onChange={(v) => update({ prevWorkPermitsDetail: v })} />
          )}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-navy-100 space-y-4">
        <h4 className="text-sm font-semibold text-navy-800">Visa Refusals</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SelectField label="prevVisaRefusals" value={data.prevVisaRefusals} onChange={(v) => update({ prevVisaRefusals: v as FormData['prevVisaRefusals'] })} options={yesNoOptions} />
          {data.prevVisaRefusals === 'yes' && (
            <>
              <TextField label="visaRefusalCountry" value={data.visaRefusalCountry} onChange={(v) => update({ visaRefusalCountry: v })} />
              <DateField label="visaRefusalDate" value={data.visaRefusalDate} onChange={(v) => update({ visaRefusalDate: v })} />
              <TextField label="visaRefusalReason" value={data.visaRefusalReason} onChange={(v) => update({ visaRefusalReason: v })} />
            </>
          )}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-navy-100 space-y-4">
        <h4 className="text-sm font-semibold text-navy-800">Previous Travel</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SelectField label="prevTravelToTurkey" value={data.prevTravelToTurkey} onChange={(v) => update({ prevTravelToTurkey: v as FormData['prevTravelToTurkey'] })} options={yesNoOptions} />
          {data.prevTravelToTurkey === 'yes' && (
            <>
              <DateField label="lastVisitTurkeyDate" value={data.lastVisitTurkeyDate} onChange={(v) => update({ lastVisitTurkeyDate: v })} />
              <TextField label="lastVisitTurkeyPurpose" value={data.lastVisitTurkeyPurpose} onChange={(v) => update({ lastVisitTurkeyPurpose: v })} />
            </>
          )}
        </div>
      </div>
    </SectionCard>
  );
}

// ============================================================
// STEP 4 — EDUCATION
// ============================================================
export function Step4Education({ data, update }: { data: FormData; update: (patch: Partial<FormData>) => void }) {
  const addRecord = () => {
    const rec: EducationRecord = {
      id: generateId(), level: '', institution: '', fieldOfStudy: '', degree: '',
      country: '', city: '', startDate: '', endDate: '', graduationYear: '',
      certificateAvailable: false, fileName: '', additionalInfo: '',
    };
    update({ education: [...data.education, rec] });
  };
  const updateRec = (id: string, patch: Partial<EducationRecord>) => {
    update({ education: data.education.map((r) => (r.id === id ? { ...r, ...patch } : r)) });
  };
  const removeRec = (id: string) => {
    update({ education: data.education.filter((r) => r.id !== id) });
  };

  return (
    <SectionCard title="step4Title" icon={<IconCap />}>
      {data.education.length === 0 && <EmptyState message="noEducationRecords" />}
      {data.education.map((rec, i) => (
        <RecordCard key={rec.id} index={i} onRemove={() => removeRec(rec.id)} removeLabel="remove">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SelectField label="educationLevel" value={rec.level} onChange={(v) => updateRec(rec.id, { level: v as EducationRecord['level'] })} options={educationLevelOptions} />
            <TextField label="institution" value={rec.institution} onChange={(v) => updateRec(rec.id, { institution: v })} />
            <TextField label="fieldOfStudy" value={rec.fieldOfStudy} onChange={(v) => updateRec(rec.id, { fieldOfStudy: v })} />
            <TextField label="degree" value={rec.degree} onChange={(v) => updateRec(rec.id, { degree: v })} />
            <TextField label="country" value={rec.country} onChange={(v) => updateRec(rec.id, { country: v })} />
            <TextField label="city" value={rec.city} onChange={(v) => updateRec(rec.id, { city: v })} />
            <DateField label="startDate" value={rec.startDate} onChange={(v) => updateRec(rec.id, { startDate: v })} />
            <DateField label="endDate" value={rec.endDate} onChange={(v) => updateRec(rec.id, { endDate: v })} />
            <TextField label="graduationYear" value={rec.graduationYear} onChange={(v) => updateRec(rec.id, { graduationYear: v })} type="number" />
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <CheckboxField label="certificateAvailable" checked={rec.certificateAvailable} onChange={(v) => updateRec(rec.id, { certificateAvailable: v })} />
            </div>
            {rec.certificateAvailable && (
              <FileUpload label="uploadFile" fileName={rec.fileName} onFileChange={(fn) => updateRec(rec.id, { fileName: fn })} />
            )}
          </div>
          <div className="mt-4">
            <TextArea label="additionalInfo" value={rec.additionalInfo} onChange={(v) => updateRec(rec.id, { additionalInfo: v })} rows={2} />
          </div>
        </RecordCard>
      ))}
      <AddButton onClick={addRecord} label="addEducation" />
    </SectionCard>
  );
}

// ============================================================
// STEP 5 — PROFESSIONAL QUALIFICATIONS & CERTIFICATES
// ============================================================
export function Step5Qualifications({ data, update }: { data: FormData; update: (patch: Partial<FormData>) => void }) {
  const addRec = () => {
    const rec: QualificationRecord = {
      id: generateId(), name: '', profession: '', specialization: '', issuingOrg: '',
      country: '', dateObtained: '', expiryDate: '', certNumber: '', certAvailable: false,
      fileName: '', hasLicense: false, licenseNumber: '', licenseAuthority: '', licenseExpiry: '',
      additionalInfo: '',
    };
    update({ qualifications: [...data.qualifications, rec] });
  };
  const updateRec = (id: string, patch: Partial<QualificationRecord>) => {
    update({ qualifications: data.qualifications.map((r) => (r.id === id ? { ...r, ...patch } : r)) });
  };
  const removeRec = (id: string) => {
    update({ qualifications: data.qualifications.filter((r) => r.id !== id) });
  };

  return (
    <SectionCard title="step5Title" icon={<IconAward />}>
      {data.qualifications.length === 0 && <EmptyState message="noQualifications" />}
      {data.qualifications.map((rec, i) => (
        <RecordCard key={rec.id} index={i} onRemove={() => removeRec(rec.id)} removeLabel="remove">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TextField label="qualificationName" value={rec.name} onChange={(v) => updateRec(rec.id, { name: v })} />
            <TextField label="profession" value={rec.profession} onChange={(v) => updateRec(rec.id, { profession: v })} />
            <TextField label="specialization" value={rec.specialization} onChange={(v) => updateRec(rec.id, { specialization: v })} />
            <TextField label="issuingOrg" value={rec.issuingOrg} onChange={(v) => updateRec(rec.id, { issuingOrg: v })} />
            <TextField label="country" value={rec.country} onChange={(v) => updateRec(rec.id, { country: v })} />
            <DateField label="dateObtained" value={rec.dateObtained} onChange={(v) => updateRec(rec.id, { dateObtained: v })} />
            <DateField label="expiryDate" value={rec.expiryDate} onChange={(v) => updateRec(rec.id, { expiryDate: v })} />
            <TextField label="certNumber" value={rec.certNumber} onChange={(v) => updateRec(rec.id, { certNumber: v })} />
          </div>
          <div className="mt-4">
            <CheckboxField label="certAvailable" checked={rec.certAvailable} onChange={(v) => updateRec(rec.id, { certAvailable: v })} />
          </div>
          {rec.certAvailable && (
            <div className="mt-3">
              <FileUpload label="uploadFile" fileName={rec.fileName} onFileChange={(fn) => updateRec(rec.id, { fileName: fn })} />
            </div>
          )}
          <div className="mt-4 pt-4 border-t border-navy-100">
            <CheckboxField label="hasLicense" checked={rec.hasLicense} onChange={(v) => updateRec(rec.id, { hasLicense: v })} />
          </div>
          {rec.hasLicense && (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <TextField label="licenseNumber" value={rec.licenseNumber} onChange={(v) => updateRec(rec.id, { licenseNumber: v })} />
              <TextField label="licenseAuthority" value={rec.licenseAuthority} onChange={(v) => updateRec(rec.id, { licenseAuthority: v })} />
              <DateField label="licenseExpiry" value={rec.licenseExpiry} onChange={(v) => updateRec(rec.id, { licenseExpiry: v })} />
            </div>
          )}
          <div className="mt-4">
            <TextArea label="additionalInfo" value={rec.additionalInfo} onChange={(v) => updateRec(rec.id, { additionalInfo: v })} rows={2} />
          </div>
        </RecordCard>
      ))}
      <AddButton onClick={addRec} label="addQualification" />
    </SectionCard>
  );
}

// ============================================================
// STEP 6 — WORK EXPERIENCE
// ============================================================
export function Step6WorkExperience({ data, update }: { data: FormData; update: (patch: Partial<FormData>) => void }) {
  const { t } = useLang();
  const addRec = () => {
    const rec: WorkExperienceRecord = {
      id: generateId(), jobTitle: '', profession: '', position: '', company: '',
      industry: '', country: '', city: '', startDate: '', endDate: '', isCurrent: false,
      employmentType: '', salary: '', currency: '', yearsExperience: '',
      responsibilities: '', achievements: '', tools: '', technologies: '',
      certAvailable: false, fileName: '', referenceName: '', referencePhone: '', referenceEmail: '',
    };
    update({ workExperience: [...data.workExperience, rec] });
  };
  const updateRec = (id: string, patch: Partial<WorkExperienceRecord>) => {
    update({ workExperience: data.workExperience.map((r) => (r.id === id ? { ...r, ...patch } : r)) });
  };
  const removeRec = (id: string) => {
    update({ workExperience: data.workExperience.filter((r) => r.id !== id) });
  };

  const totalExp = data.workExperience.reduce((sum, w) => {
    const yrs = parseInt(w.yearsExperience, 10);
    return sum + (isNaN(yrs) ? 0 : yrs);
  }, 0);

  return (
    <SectionCard title="step6Title" icon={<IconBriefcase />}>
      {totalExp > 0 && (
        <div className="mb-4 rounded-lg bg-navy-900 text-white px-4 py-3 flex items-center justify-between">
          <span className="text-sm font-medium">{t('totalExperience')}</span>
          <span className="text-lg font-bold">{totalExp} {t('yearsExperience')}</span>
        </div>
      )}
      {data.workExperience.length === 0 && <EmptyState message="noWorkExperience" />}
      {data.workExperience.map((rec, i) => (
        <RecordCard key={rec.id} index={i} onRemove={() => removeRec(rec.id)} removeLabel="remove">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TextField label="jobTitle" value={rec.jobTitle} onChange={(v) => updateRec(rec.id, { jobTitle: v })} />
            <TextField label="profession" value={rec.profession} onChange={(v) => updateRec(rec.id, { profession: v })} />
            <TextField label="position" value={rec.position} onChange={(v) => updateRec(rec.id, { position: v })} />
            <TextField label="company" value={rec.company} onChange={(v) => updateRec(rec.id, { company: v })} />
            <TextField label="industry" value={rec.industry} onChange={(v) => updateRec(rec.id, { industry: v })} />
            <TextField label="country" value={rec.country} onChange={(v) => updateRec(rec.id, { country: v })} />
            <TextField label="city" value={rec.city} onChange={(v) => updateRec(rec.id, { city: v })} />
            <DateField label="startDate" value={rec.startDate} onChange={(v) => updateRec(rec.id, { startDate: v })} />
            <DateField label="endDate" value={rec.endDate} onChange={(v) => updateRec(rec.id, { endDate: v })} />
            <SelectField label="employmentType" value={rec.employmentType} onChange={(v) => updateRec(rec.id, { employmentType: v as WorkExperienceRecord['employmentType'] })} options={employmentTypeOptions} />
            <TextField label="salary" value={rec.salary} onChange={(v) => updateRec(rec.id, { salary: v })} type="number" />
            <SelectField label="currency" value={rec.currency} onChange={(v) => updateRec(rec.id, { currency: v as WorkExperienceRecord['currency'] })} options={currencyOptions} />
            <TextField label="yearsExperience" value={rec.yearsExperience} onChange={(v) => updateRec(rec.id, { yearsExperience: v })} type="number" />
          </div>
          <div className="mt-3">
            <CheckboxField label="isCurrent" checked={rec.isCurrent} onChange={(v) => updateRec(rec.id, { isCurrent: v })} />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <TextArea label="responsibilities" value={rec.responsibilities} onChange={(v) => updateRec(rec.id, { responsibilities: v })} rows={2} />
            <TextArea label="achievements" value={rec.achievements} onChange={(v) => updateRec(rec.id, { achievements: v })} rows={2} />
            <TextField label="tools" value={rec.tools} onChange={(v) => updateRec(rec.id, { tools: v })} />
            <TextField label="technologies" value={rec.technologies} onChange={(v) => updateRec(rec.id, { technologies: v })} />
          </div>
          <div className="mt-4 pt-4 border-t border-navy-100">
            <CheckboxField label="certAvailable" checked={rec.certAvailable} onChange={(v) => updateRec(rec.id, { certAvailable: v })} />
          </div>
          {rec.certAvailable && (
            <div className="mt-3">
              <FileUpload label="uploadFile" fileName={rec.fileName} onFileChange={(fn) => updateRec(rec.id, { fileName: fn })} />
            </div>
          )}
          <div className="mt-4 pt-4 border-t border-navy-100">
            <h4 className="text-sm font-semibold text-navy-800 mb-3">Reference</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <TextField label="referenceName" value={rec.referenceName} onChange={(v) => updateRec(rec.id, { referenceName: v })} />
              <TextField label="referencePhone" value={rec.referencePhone} onChange={(v) => updateRec(rec.id, { referencePhone: v })} />
              <TextField label="referenceEmail" value={rec.referenceEmail} onChange={(v) => updateRec(rec.id, { referenceEmail: v })} type="email" />
            </div>
          </div>
        </RecordCard>
      ))}
      <AddButton onClick={addRec} label="addWorkExperience" />
    </SectionCard>
  );
}

// ============================================================
// ICONS
// ============================================================
function IconUser() {
  return <svg className="h-5 w-5 text-navy-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
}
function IconPhone() {
  return <svg className="h-5 w-5 text-navy-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>;
}
function IconBook() {
  return <svg className="h-5 w-5 text-navy-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>;
}
function IconCap() {
  return <svg className="h-5 w-5 text-navy-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M22 10v6M2 10l10-5 10 5-10 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 12v5c0 1 2 3 6 3s6-2 6-3v-5" /></svg>;
}
function IconAward() {
  return <svg className="h-5 w-5 text-navy-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></svg>;
}
function IconBriefcase() {
  return <svg className="h-5 w-5 text-navy-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>;
}
