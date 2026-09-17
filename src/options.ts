import type { TranslationKey } from './i18n';
import { SKILL_CATEGORIES, COMPUTER_SKILLS_LIST, LANGUAGE_LIST } from './types';

export const genderOptions = [
  { value: 'male', labelKey: 'male' as TranslationKey },
  { value: 'female', labelKey: 'female' as TranslationKey },
  { value: 'other', labelKey: 'other' as TranslationKey },
];

export const maritalStatusOptions = [
  { value: 'single', labelKey: 'single' as TranslationKey },
  { value: 'married', labelKey: 'married' as TranslationKey },
  { value: 'divorced', labelKey: 'divorced' as TranslationKey },
  { value: 'widowed', labelKey: 'widowed' as TranslationKey },
  { value: 'separated', labelKey: 'separated' as TranslationKey },
];

export const passportTypeOptions = [
  { value: 'ordinary', labelKey: 'ordinary' as TranslationKey },
  { value: 'diplomatic', labelKey: 'diplomatic' as TranslationKey },
  { value: 'service', labelKey: 'service' as TranslationKey },
  { value: 'special', labelKey: 'special' as TranslationKey },
  { value: 'travel', labelKey: 'travel' as TranslationKey },
];

export const yesNoOptions = [
  { value: 'yes', labelKey: 'yes' as TranslationKey },
  { value: 'no', labelKey: 'no' as TranslationKey },
];

export const educationLevelOptions = [
  { value: 'primary', labelKey: 'primary' as TranslationKey },
  { value: 'middle', labelKey: 'middle' as TranslationKey },
  { value: 'high-school', labelKey: 'highSchool' as TranslationKey },
  { value: 'diploma', labelKey: 'diploma' as TranslationKey },
  { value: 'associate', labelKey: 'associate' as TranslationKey },
  { value: 'bachelor', labelKey: 'bachelor' as TranslationKey },
  { value: 'master', labelKey: 'master' as TranslationKey },
  { value: 'phd', labelKey: 'phd' as TranslationKey },
  { value: 'other', labelKey: 'other' as TranslationKey },
];

export const skillLevelOptions = [
  { value: 'beginner', labelKey: 'beginner' as TranslationKey },
  { value: 'intermediate', labelKey: 'intermediate' as TranslationKey },
  { value: 'advanced', labelKey: 'advanced' as TranslationKey },
  { value: 'expert', labelKey: 'expert' as TranslationKey },
];

export const employmentTypeOptions = [
  { value: 'full-time', labelKey: 'fullTime' as TranslationKey },
  { value: 'part-time', labelKey: 'partTime' as TranslationKey },
  { value: 'contract', labelKey: 'contract' as TranslationKey },
  { value: 'self-employed', labelKey: 'selfEmployed' as TranslationKey },
  { value: 'seasonal', labelKey: 'seasonal' as TranslationKey },
  { value: 'internship', labelKey: 'internship' as TranslationKey },
];

export const languageLevelOptions = [
  { value: 'none', labelKey: 'none' as TranslationKey },
  { value: 'basic', labelKey: 'basic' as TranslationKey },
  { value: 'intermediate', labelKey: 'intermediate' as TranslationKey },
  { value: 'advanced', labelKey: 'advanced' as TranslationKey },
  { value: 'fluent', labelKey: 'fluent' as TranslationKey },
  { value: 'native', labelKey: 'native' as TranslationKey },
];

export const proficiencyOptions = [
  { value: 'basic', labelKey: 'basic' as TranslationKey },
  { value: 'intermediate', labelKey: 'intermediate' as TranslationKey },
  { value: 'advanced', labelKey: 'advanced' as TranslationKey },
  { value: 'expert', labelKey: 'expert' as TranslationKey },
];

export const currencyOptions = [
  { value: 'try', labelKey: 'cur_try' as TranslationKey },
  { value: 'usd', labelKey: 'cur_usd' as TranslationKey },
  { value: 'eur', labelKey: 'cur_eur' as TranslationKey },
  { value: 'afn', labelKey: 'cur_afn' as TranslationKey },
  { value: 'irr', labelKey: 'cur_irr' as TranslationKey },
  { value: 'pkr', labelKey: 'cur_pkr' as TranslationKey },
  { value: 'other', labelKey: 'cur_other' as TranslationKey },
];

export const skillCategoryOptions = SKILL_CATEGORIES.map((cat) => ({
  value: cat.key,
  labelKey: `cat_${cat.key}` as TranslationKey,
}));

export function getSkillsForCategory(categoryKey: string): { value: string; labelKey: TranslationKey }[] {
  const cat = SKILL_CATEGORIES.find((c) => c.key === categoryKey);
  if (!cat) return [];
  return cat.skills.map((sk) => ({
    value: sk,
    labelKey: `sk_${sk}` as TranslationKey,
  }));
}

export const languageOptions = LANGUAGE_LIST.map((l) => {
  if (l === 'other-language') return { value: l, labelKey: 'otherLanguage' as TranslationKey };
  return { value: l, labelKey: l.replace('-', '') as TranslationKey };
});

export const computerSkillOptions = COMPUTER_SKILLS_LIST.map((cs) => ({
  value: cs,
  labelKey: `cs_${cs}` as TranslationKey,
}));

export function skillLabelKey(skillKey: string): TranslationKey {
  return `sk_${skillKey}` as TranslationKey;
}

export function categoryLabelKey(catKey: string): TranslationKey {
  return `cat_${catKey}` as TranslationKey;
}

export function docCategoryLabelKey(catKey: string): TranslationKey {
  return `cat_${catKey}` as TranslationKey;
}

export function docTypeLabelKey(docKey: string): TranslationKey {
  return `doc_${docKey}` as TranslationKey;
}
