import type { FormData, SkillRecord, LanguageRecord, ComputerSkillRecord, DocumentRecord } from './types';
import type { TranslationKey } from './i18n';
import { useLang } from './LanguageContext';
import {
  TextField, TextArea, SelectField, CheckboxField, DateField,
  SectionCard, RecordCard, AddButton, EmptyState, FileUpload,
} from './FormFields';
import { generateId, buildProfessionalProfile } from './formData';
import {
  skillCategoryOptions, getSkillsForCategory, skillLevelOptions,
  languageOptions, languageLevelOptions, computerSkillOptions, proficiencyOptions,
  employmentTypeOptions, currencyOptions, yesNoOptions,
  docCategoryLabelKey, docTypeLabelKey,
} from './options';
import { DOCUMENT_CATEGORIES } from './types';

// ============================================================
// STEP 7 — PROFESSIONAL SKILLS
// ============================================================
export function Step7Skills({ data, update }: { data: FormData; update: (patch: Partial<FormData>) => void }) {
  const addSkill = () => {
    const rec: SkillRecord = {
      id: generateId(), category: '', name: '', level: '', yearsExperience: '',
      lastUsed: '', certAvailable: false, fileName: '', description: '', tools: '',
    };
    update({ skills: [...data.skills, rec] });
  };
  const updateSkill = (id: string, patch: Partial<SkillRecord>) => {
    update({ skills: data.skills.map((r) => (r.id === id ? { ...r, ...patch } : r)) });
  };
  const removeSkill = (id: string) => {
    update({ skills: data.skills.filter((r) => r.id !== id) });
  };

  return (
    <SectionCard title="step7Title" icon={<IconWrench />}>
      {data.skills.length === 0 && <EmptyState message="noSkills" />}
      {data.skills.map((rec, i) => (
        <RecordCard key={rec.id} index={i} onRemove={() => removeSkill(rec.id)} removeLabel="remove">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SelectField
              label="skillCategory"
              value={rec.category}
              onChange={(v) => updateSkill(rec.id, { category: v, name: '' })}
              options={skillCategoryOptions}
            />
            {rec.category && (
              <SelectField
                label="skillName"
                value={rec.name}
                onChange={(v) => updateSkill(rec.id, { name: v })}
                options={getSkillsForCategory(rec.category)}
              />
            )}
            <SelectField
              label="skillLevel"
              value={rec.level}
              onChange={(v) => updateSkill(rec.id, { level: v as SkillRecord['level'] })}
              options={skillLevelOptions}
            />
            <TextField label="yearsExperience" value={rec.yearsExperience} onChange={(v) => updateSkill(rec.id, { yearsExperience: v })} type="number" />
            <DateField label="lastUsed" value={rec.lastUsed} onChange={(v) => updateSkill(rec.id, { lastUsed: v })} />
          </div>
          <div className="mt-4">
            <TextArea label="skillDescription" value={rec.description} onChange={(v) => updateSkill(rec.id, { description: v })} rows={2} />
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField label="tools" value={rec.tools} onChange={(v) => updateSkill(rec.id, { tools: v })} />
            <div>
              <CheckboxField label="certificateAvailable" checked={rec.certAvailable} onChange={(v) => updateSkill(rec.id, { certAvailable: v })} />
            </div>
          </div>
          {rec.certAvailable && (
            <div className="mt-3">
              <FileUpload label="uploadFile" fileName={rec.fileName} onFileChange={(fn) => updateSkill(rec.id, { fileName: fn })} />
            </div>
          )}
        </RecordCard>
      ))}
      <AddButton onClick={addSkill} label="addSkill" />
      <div className="mt-6">
        <TextArea label="otherSkills" value={data.otherSkills} onChange={(v) => update({ otherSkills: v })} rows={4} />
      </div>
    </SectionCard>
  );
}

// ============================================================
// STEP 8 — LANGUAGE & COMPUTER SKILLS
// ============================================================
export function Step8Languages({ data, update }: { data: FormData; update: (patch: Partial<FormData>) => void }) {
  // Languages
  const addLang = () => {
    const rec: LanguageRecord = {
      id: generateId(), language: '', speaking: '', reading: '', writing: '',
      listening: '', certAvailable: false, fileName: '',
    };
    update({ languages: [...data.languages, rec] });
  };
  const updateLang = (id: string, patch: Partial<LanguageRecord>) => {
    update({ languages: data.languages.map((r) => (r.id === id ? { ...r, ...patch } : r)) });
  };
  const removeLang = (id: string) => {
    update({ languages: data.languages.filter((r) => r.id !== id) });
  };

  // Computer skills
  const addCS = () => {
    const rec: ComputerSkillRecord = {
      id: generateId(), skill: '', proficiency: '', yearsExperience: '',
      certAvailable: false, fileName: '', additionalInfo: '',
    };
    update({ computerSkills: [...data.computerSkills, rec] });
  };
  const updateCS = (id: string, patch: Partial<ComputerSkillRecord>) => {
    update({ computerSkills: data.computerSkills.map((r) => (r.id === id ? { ...r, ...patch } : r)) });
  };
  const removeCS = (id: string) => {
    update({ computerSkills: data.computerSkills.filter((r) => r.id !== id) });
  };

  return (
    <div className="space-y-4">
      <SectionCard title="languagesInfo" icon={<IconGlobe />}>
        {data.languages.length === 0 && <EmptyState message="noLanguages" />}
        {data.languages.map((rec, i) => (
          <RecordCard key={rec.id} index={i} onRemove={() => removeLang(rec.id)} removeLabel="remove">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <SelectField label="language" value={rec.language} onChange={(v) => updateLang(rec.id, { language: v })} options={languageOptions} />
              <SelectField label="speaking" value={rec.speaking} onChange={(v) => updateLang(rec.id, { speaking: v as LanguageRecord['speaking'] })} options={languageLevelOptions} />
              <SelectField label="reading" value={rec.reading} onChange={(v) => updateLang(rec.id, { reading: v as LanguageRecord['reading'] })} options={languageLevelOptions} />
              <SelectField label="writing" value={rec.writing} onChange={(v) => updateLang(rec.id, { writing: v as LanguageRecord['writing'] })} options={languageLevelOptions} />
              <SelectField label="listening" value={rec.listening} onChange={(v) => updateLang(rec.id, { listening: v as LanguageRecord['listening'] })} options={languageLevelOptions} />
            </div>
            <div className="mt-3">
              <CheckboxField label="certificateAvailable" checked={rec.certAvailable} onChange={(v) => updateLang(rec.id, { certAvailable: v })} />
            </div>
            {rec.certAvailable && (
              <div className="mt-3">
                <FileUpload label="uploadFile" fileName={rec.fileName} onFileChange={(fn) => updateLang(rec.id, { fileName: fn })} />
              </div>
            )}
          </RecordCard>
        ))}
        <AddButton onClick={addLang} label="addLanguage" />
      </SectionCard>

      <SectionCard title="computerSkills" icon={<IconMonitor />}>
        {data.computerSkills.length === 0 && <EmptyState message="noComputerSkills" />}
        {data.computerSkills.map((rec, i) => (
          <RecordCard key={rec.id} index={i} onRemove={() => removeCS(rec.id)} removeLabel="remove">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <SelectField label="computerSkill" value={rec.skill} onChange={(v) => updateCS(rec.id, { skill: v })} options={computerSkillOptions} />
              <SelectField label="proficiency" value={rec.proficiency} onChange={(v) => updateCS(rec.id, { proficiency: v as ComputerSkillRecord['proficiency'] })} options={proficiencyOptions} />
              <TextField label="yearsExperience" value={rec.yearsExperience} onChange={(v) => updateCS(rec.id, { yearsExperience: v })} type="number" />
            </div>
            <div className="mt-3">
              <CheckboxField label="certificateAvailable" checked={rec.certAvailable} onChange={(v) => updateCS(rec.id, { certAvailable: v })} />
            </div>
            {rec.certAvailable && (
              <div className="mt-3">
                <FileUpload label="uploadFile" fileName={rec.fileName} onFileChange={(fn) => updateCS(rec.id, { fileName: fn })} />
              </div>
            )}
            <div className="mt-3">
              <TextArea label="additionalInfo" value={rec.additionalInfo} onChange={(v) => updateCS(rec.id, { additionalInfo: v })} rows={2} />
            </div>
          </RecordCard>
        ))}
        <AddButton onClick={addCS} label="addComputerSkill" />
      </SectionCard>
    </div>
  );
}

// ============================================================
// STEP 9 — TURKEY EMPLOYMENT INFORMATION
// ============================================================
export function Step9TurkeyEmployment({ data, update }: { data: FormData; update: (patch: Partial<FormData>) => void }) {
  return (
    <SectionCard title="step9Title" icon={<IconMap />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <SelectField label="hasTurkishEmployer" value={data.hasTurkishEmployer} onChange={(v) => update({ hasTurkishEmployer: v as FormData['hasTurkishEmployer'] })} options={yesNoOptions} />
        <SelectField label="hasTurkishJobOffer" value={data.hasTurkishJobOffer} onChange={(v) => update({ hasTurkishJobOffer: v as FormData['hasTurkishJobOffer'] })} options={yesNoOptions} />
      </div>

      {(data.hasTurkishEmployer === 'yes' || data.hasTurkishJobOffer === 'yes') && (
        <div className="pt-4 border-t border-navy-100">
          <h4 className="text-sm font-semibold text-navy-800 mb-4">Employer Details</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TextField label="employerName" value={data.employerName} onChange={(v) => update({ employerName: v })} />
            <TextField label="companyAddress" value={data.companyAddress} onChange={(v) => update({ companyAddress: v })} />
            <TextField label="employerCity" value={data.employerCity} onChange={(v) => update({ employerCity: v })} />
            <TextField label="contactPerson" value={data.contactPerson} onChange={(v) => update({ contactPerson: v })} />
            <TextField label="employerPhone" value={data.employerPhone} onChange={(v) => update({ employerPhone: v })} />
            <TextField label="employerEmail" value={data.employerEmail} onChange={(v) => update({ employerEmail: v })} type="email" />
            <TextField label="turkishJobTitle" value={data.turkishJobTitle} onChange={(v) => update({ turkishJobTitle: v })} />
            <TextField label="proposedSalary" value={data.proposedSalary} onChange={(v) => update({ proposedSalary: v })} type="number" />
            <SelectField label="currency" value={data.proposedSalaryCurrency} onChange={(v) => update({ proposedSalaryCurrency: v as FormData['proposedSalaryCurrency'] })} options={currencyOptions} />
          </div>
          <div className="mt-4">
            <TextArea label="turkishJobDescription" value={data.turkishJobDescription} onChange={(v) => update({ turkishJobDescription: v })} rows={3} />
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <CheckboxField label="contractAvailable" checked={data.contractAvailable} onChange={(v) => update({ contractAvailable: v })} />
              {data.contractAvailable && (
                <div className="mt-2">
                  <FileUpload label="uploadFile" fileName={data.contractFileName} onFileChange={(fn) => update({ contractFileName: fn })} />
                </div>
              )}
            </div>
            <div>
              <CheckboxField label="invitationAvailable" checked={data.invitationAvailable} onChange={(v) => update({ invitationAvailable: v })} />
              {data.invitationAvailable && (
                <div className="mt-2">
                  <FileUpload label="uploadFile" fileName={data.invitationFileName} onFileChange={(fn) => update({ invitationFileName: fn })} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-navy-100">
        <h4 className="text-sm font-semibold text-navy-800 mb-4">Employment Preferences</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TextField label="desiredProfession" value={data.desiredProfession} onChange={(v) => update({ desiredProfession: v })} />
          <TextField label="desiredIndustry" value={data.desiredIndustry} onChange={(v) => update({ desiredIndustry: v })} />
          <TextField label="preferredTurkishCities" value={data.preferredTurkishCities} onChange={(v) => update({ preferredTurkishCities: v })} />
          <SelectField label="employmentPreference" value={data.employmentPreference} onChange={(v) => update({ employmentPreference: v as FormData['employmentPreference'] })} options={employmentTypeOptions} />
          <TextField label="expectedSalary" value={data.expectedSalary} onChange={(v) => update({ expectedSalary: v })} type="number" />
          <SelectField label="currency" value={data.expectedSalaryCurrency} onChange={(v) => update({ expectedSalaryCurrency: v as FormData['expectedSalaryCurrency'] })} options={currencyOptions} />
          <DateField label="availableStartDate" value={data.availableStartDate} onChange={(v) => update({ availableStartDate: v })} />
        </div>
        <div className="mt-3">
          <CheckboxField label="willingToRelocate" checked={data.willingToRelocate} onChange={(v) => update({ willingToRelocate: v })} />
        </div>
        <div className="mt-4">
          <TextArea label="applicantJobDescription" value={data.applicantJobDescription} onChange={(v) => update({ applicantJobDescription: v })} rows={4} />
        </div>
      </div>
    </SectionCard>
  );
}

// ============================================================
// STEP 10 — AVAILABLE DOCUMENTS
// ============================================================
export function Step10Documents({ data, update }: { data: FormData; update: (patch: Partial<FormData>) => void }) {
  const { t } = useLang();

  const addDoc = () => {
    const rec: DocumentRecord = {
      id: generateId(), category: '', type: '', documentNumber: '',
      issuingAuthority: '', issueDate: '', expiryDate: '', available: false,
      fileName: '', notes: '',
    };
    update({ documents: [...data.documents, rec] });
  };
  const updateDoc = (id: string, patch: Partial<DocumentRecord>) => {
    update({ documents: data.documents.map((r) => (r.id === id ? { ...r, ...patch } : r)) });
  };
  const removeDoc = (id: string) => {
    update({ documents: data.documents.filter((r) => r.id !== id) });
  };

  const getCategoryItems = (catKey: string): { value: string; labelKey: TranslationKey }[] => {
    const cat = DOCUMENT_CATEGORIES.find((c) => c.key === catKey);
    if (!cat) return [];
    return cat.items.map((item) => ({
      value: item,
      labelKey: docTypeLabelKey(item),
    }));
  };

  return (
    <SectionCard title="step10Title" icon={<IconFile />}>
      {data.documents.length === 0 && <EmptyState message="noDocuments" />}
      {data.documents.map((rec, i) => (
        <RecordCard key={rec.id} index={i} onRemove={() => removeDoc(rec.id)} removeLabel="remove">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SelectField
              label="documentCategory"
              value={rec.category}
              onChange={(v) => updateDoc(rec.id, { category: v, type: '' })}
              options={DOCUMENT_CATEGORIES.map((c) => ({ value: c.key, labelKey: docCategoryLabelKey(c.key) }))}
            />
            {rec.category && (
              <SelectField
                label="documentType"
                value={rec.type}
                onChange={(v) => updateDoc(rec.id, { type: v })}
                options={getCategoryItems(rec.category)}
              />
            )}
            <TextField label="documentNumber" value={rec.documentNumber} onChange={(v) => updateDoc(rec.id, { documentNumber: v })} />
            <TextField label="issuingAuthority" value={rec.issuingAuthority} onChange={(v) => updateDoc(rec.id, { issuingAuthority: v })} />
            <DateField label="issueDate" value={rec.issueDate} onChange={(v) => updateDoc(rec.id, { issueDate: v })} />
            <DateField label="expiryDate" value={rec.expiryDate} onChange={(v) => updateDoc(rec.id, { expiryDate: v })} />
          </div>
          <div className="mt-3">
            <CheckboxField label="available" checked={rec.available} onChange={(v) => updateDoc(rec.id, { available: v })} />
          </div>
          {rec.available && (
            <div className="mt-3">
              <FileUpload label="uploadFile" fileName={rec.fileName} onFileChange={(fn) => updateDoc(rec.id, { fileName: fn })} />
            </div>
          )}
          <div className="mt-3">
            <TextArea label="notes" value={rec.notes} onChange={(v) => updateDoc(rec.id, { notes: v })} rows={2} />
          </div>
        </RecordCard>
      ))}
      <AddButton onClick={addDoc} label="addDocument" />
    </SectionCard>
  );
}

// ============================================================
// STEP 11 — CV / PROFESSIONAL PROFILE
// ============================================================
export function Step11CV({ data, update }: { data: FormData; update: (patch: Partial<FormData>) => void }) {
  return (
    <div className="space-y-4">
      <SectionCard title="cvSection" icon={<IconFile />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FileUpload label="cvUpload" fileName={data.cvFileName} onFileChange={(fn) => update({ cvFileName: fn })} />
          <TextField label="linkedinProfile" value={data.linkedinProfile} onChange={(v) => update({ linkedinProfile: v })} />
          <TextField label="personalWebsite" value={data.personalWebsite} onChange={(v) => update({ personalWebsite: v })} />
          <TextField label="portfolio" value={data.portfolio} onChange={(v) => update({ portfolio: v })} />
          <TextField label="githubProfile" value={data.githubProfile} onChange={(v) => update({ githubProfile: v })} />
          <TextField label="professionalSocialMedia" value={data.professionalSocialMedia} onChange={(v) => update({ professionalSocialMedia: v })} />
        </div>
        <div className="mt-4 space-y-4">
          <TextArea label="professionalBio" value={data.professionalBio} onChange={(v) => update({ professionalBio: v })} rows={4} />
          <TextArea label="careerObjective" value={data.careerObjective} onChange={(v) => update({ careerObjective: v })} rows={3} />
          <TextArea label="mainStrengths" value={data.mainStrengths} onChange={(v) => update({ mainStrengths: v })} rows={3} />
          <TextArea label="mainTechnicalSkills" value={data.mainTechnicalSkills} onChange={(v) => update({ mainTechnicalSkills: v })} rows={3} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField label="preferredJobTitle" value={data.preferredJobTitle} onChange={(v) => update({ preferredJobTitle: v })} />
            <TextField label="preferredTurkishIndustry" value={data.preferredTurkishIndustry} onChange={(v) => update({ preferredTurkishIndustry: v })} />
          </div>
        </div>
      </SectionCard>

      {/* Professional Profile Summary */}
      <ProfessionalProfileSummary data={data} />
    </div>
  );
}

function ProfessionalProfileSummary({ data }: { data: FormData }) {
  const { t } = useLang();
  const profile = buildProfessionalProfile(data);
  const fields: { labelKey: TranslationKey; value: string }[] = [
    { labelKey: 'profileApplicant', value: profile.applicant },
    { labelKey: 'profileProfession', value: profile.profession },
    { labelKey: 'profileTotalExp', value: profile.totalExperience },
    { labelKey: 'profileEducation', value: profile.education },
    { labelKey: 'profileMainSkills', value: profile.mainSkills },
    { labelKey: 'profileTechSkills', value: profile.techSkills },
    { labelKey: 'profileLanguages', value: profile.languages },
    { labelKey: 'profileCertificates', value: profile.certificates },
    { labelKey: 'profileCurrentEmp', value: profile.currentEmployment },
    { labelKey: 'profileDesiredJob', value: profile.desiredJob },
    { labelKey: 'profilePreferredCities', value: profile.preferredCities },
    { labelKey: 'profileDocuments', value: profile.documents },
  ];

  return (
    <div className="card bg-navy-50 border-navy-200">
      <div className="card-header">
        <h3 className="text-base font-semibold text-navy-900">{t('profileGenerated')}</h3>
      </div>
      <div className="card-body">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
          {fields.map((f, i) => (
            <div key={i}>
              <span className="text-xs text-navy-400">{t(f.labelKey)}</span>
              <p className="text-sm font-medium text-navy-800">{f.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// STEP 12 — REVIEW, DECLARATION & SUBMIT
// ============================================================
export function Step12Review({ data, update, onEdit }: { data: FormData; update: (patch: Partial<FormData>) => void; onEdit: (step: number) => void }) {
  const { t } = useLang();

  const ReviewSection = ({ titleKey, stepNum, children }: { titleKey: TranslationKey; stepNum: number; children: React.ReactNode }) => (
    <div className="card mb-4">
      <div className="card-header flex items-center justify-between">
        <h3 className="text-base font-semibold text-navy-900">{t(titleKey)}</h3>
        <button onClick={() => onEdit(stepNum)} className="btn-ghost text-xs text-turkish-500 hover:bg-turkish-50">
          {t('edit')}
        </button>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );

  const Field = ({ labelKey, value }: { labelKey: TranslationKey; value: string | number | boolean | undefined }) => (
    <div className="mb-2">
      <span className="text-xs text-navy-400">{t(labelKey)}: </span>
      <span className="text-sm text-navy-800 font-medium">
        {typeof value === 'boolean' ? (value ? t('yes') : t('no')) : (value || '—')}
      </span>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="card bg-navy-50 border-navy-200">
        <div className="card-body">
          <h3 className="text-lg font-bold text-navy-900 mb-2">{t('reviewTitle')}</h3>
          <p className="text-sm text-navy-600">{t('reviewSubtitle')}</p>
        </div>
      </div>

      <ReviewSection titleKey="personalInfo" stepNum={1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4">
          <Field labelKey="firstName" value={data.firstName} />
          <Field labelKey="lastName" value={data.lastName} />
          <Field labelKey="fullNameEnglish" value={data.fullNameEnglish} />
          <Field labelKey="dateOfBirth" value={data.dateOfBirth} />
          <Field labelKey="nationality" value={data.nationality} />
          <Field labelKey="passportNumber" value={data.passportNumber} />
        </div>
      </ReviewSection>

      <ReviewSection titleKey="contactInfo" stepNum={2}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4">
          <Field labelKey="primaryPhone" value={data.primaryPhone} />
          <Field labelKey="email" value={data.email} />
          <Field labelKey="contactCity" value={data.contactCity} />
          <Field labelKey="contactCountry" value={data.contactCountry} />
        </div>
      </ReviewSection>

      <ReviewSection titleKey="passportTravel" stepNum={3}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4">
          <Field labelKey="passportType" value={data.passportType} />
          <Field labelKey="prevTurkishVisas" value={data.prevTurkishVisas} />
          <Field labelKey="prevTravelToTurkey" value={data.prevTravelToTurkey} />
        </div>
      </ReviewSection>

      <ReviewSection titleKey="educationInfo" stepNum={4}>
        {data.education.length === 0 ? (
          <p className="text-sm text-navy-400">{t('noEducationRecords')}</p>
        ) : (
          data.education.map((e, i) => (
            <div key={e.id} className="mb-3 pb-3 border-b border-navy-100 last:border-0">
              <span className="badge bg-navy-100 text-navy-700 mb-2">#{i + 1}</span>
              <Field labelKey="fieldOfStudy" value={e.fieldOfStudy} />
              <Field labelKey="institution" value={e.institution} />
              <Field labelKey="degree" value={e.degree} />
            </div>
          ))
        )}
      </ReviewSection>

      <ReviewSection titleKey="qualificationsInfo" stepNum={5}>
        {data.qualifications.length === 0 ? (
          <p className="text-sm text-navy-400">{t('noQualifications')}</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {data.qualifications.map((q) => (
              <span key={q.id} className="badge bg-navy-100 text-navy-700">{q.name}</span>
            ))}
          </div>
        )}
      </ReviewSection>

      <ReviewSection titleKey="workInfo" stepNum={6}>
        {data.workExperience.length === 0 ? (
          <p className="text-sm text-navy-400">{t('noWorkExperience')}</p>
        ) : (
          data.workExperience.map((w, i) => (
            <div key={w.id} className="mb-3 pb-3 border-b border-navy-100 last:border-0">
              <span className="badge bg-navy-100 text-navy-700 mb-2">#{i + 1}</span>
              <Field labelKey="jobTitle" value={w.jobTitle} />
              <Field labelKey="company" value={w.company} />
              <Field labelKey="yearsExperience" value={w.yearsExperience} />
            </div>
          ))
        )}
      </ReviewSection>

      <ReviewSection titleKey="skillsInfo" stepNum={7}>
        {data.skills.length === 0 ? (
          <p className="text-sm text-navy-400">{t('noSkills')}</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {data.skills.map((s) => (
              <span key={s.id} className="badge bg-navy-100 text-navy-700">
                {s.name} {s.level && `(${t(s.level as TranslationKey)})`}
              </span>
            ))}
          </div>
        )}
        {data.otherSkills && <p className="mt-3 text-sm text-navy-600">{data.otherSkills}</p>}
      </ReviewSection>

      <ReviewSection titleKey="languagesInfo" stepNum={8}>
        {data.languages.length === 0 ? (
          <p className="text-sm text-navy-400">{t('noLanguages')}</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {data.languages.map((l) => (
              <span key={l.id} className="badge bg-navy-100 text-navy-700">{l.language}</span>
            ))}
          </div>
        )}
        {data.computerSkills.length > 0 && (
          <div className="mt-3 pt-3 border-t border-navy-100">
            <div className="flex flex-wrap gap-2">
              {data.computerSkills.map((c) => (
                <span key={c.id} className="badge bg-navy-100 text-navy-700">{c.skill}</span>
              ))}
            </div>
          </div>
        )}
      </ReviewSection>

      <ReviewSection titleKey="turkeyEmployment" stepNum={9}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4">
          <Field labelKey="hasTurkishEmployer" value={data.hasTurkishEmployer} />
          <Field labelKey="desiredProfession" value={data.desiredProfession} />
          <Field labelKey="preferredTurkishCities" value={data.preferredTurkishCities} />
          <Field labelKey="expectedSalary" value={data.expectedSalary} />
          <Field labelKey="availableStartDate" value={data.availableStartDate} />
          <Field labelKey="willingToRelocate" value={data.willingToRelocate} />
        </div>
      </ReviewSection>

      <ReviewSection titleKey="documentsInfo" stepNum={10}>
        {data.documents.filter((d) => d.available).length === 0 ? (
          <p className="text-sm text-navy-400">—</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {data.documents.filter((d) => d.available).map((d) => (
              <span key={d.id} className="badge bg-green-100 text-green-700">{t(docTypeLabelKey(d.type))}</span>
            ))}
          </div>
        )}
      </ReviewSection>

      <ReviewSection titleKey="cvProfile" stepNum={11}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4">
          <Field labelKey="preferredJobTitle" value={data.preferredJobTitle} />
          <Field labelKey="linkedinProfile" value={data.linkedinProfile} />
          <Field labelKey="githubProfile" value={data.githubProfile} />
        </div>
      </ReviewSection>

      {/* Declaration */}
      <div className="card border-turkish-200">
        <div className="card-header bg-turkish-50">
          <h3 className="text-base font-semibold text-turkish-700">{t('declaration')}</h3>
        </div>
        <div className="card-body space-y-4">
          <CheckboxField label="declaration" checked={data.declarationConfirmed} onChange={(v) => update({ declarationConfirmed: v })} />
          <CheckboxField label="consent" checked={data.consentConfirmed} onChange={(v) => update({ consentConfirmed: v })} />
          <CheckboxField label="privacyAck" checked={data.privacyAcknowledged} onChange={(v) => update({ privacyAcknowledged: v })} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-navy-100">
            <DateField label="declarationDate" value={data.declarationDate} onChange={(v) => update({ declarationDate: v })} />
            <TextField label="declarationName" value={data.declarationName} onChange={(v) => update({ declarationName: v })} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ICONS
// ============================================================
function IconWrench() {
  return <svg className="h-5 w-5 text-navy-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>;
}
function IconGlobe() {
  return <svg className="h-5 w-5 text-navy-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>;
}
function IconMonitor() {
  return <svg className="h-5 w-5 text-navy-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>;
}
function IconMap() {
  return <svg className="h-5 w-5 text-navy-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0L9 7" /></svg>;
}
function IconFile() {
  return <svg className="h-5 w-5 text-navy-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>;
}
