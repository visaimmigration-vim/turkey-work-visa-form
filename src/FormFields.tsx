import type { ReactNode } from 'react';
import { useLang } from './LanguageContext';
import type { TranslationKey } from './i18n';
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from './config';
import { formatFileSize } from './formData';

// ============================================================
// TEXT FIELD
// ============================================================
interface TextFieldProps {
  label: TranslationKey;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: TranslationKey;
  error?: string;
  maxLength?: number;
}

export function TextField({ label, value, onChange, required, type = 'text', placeholder, error, maxLength }: TextFieldProps) {
  const { t } = useLang();
  return (
    <div>
      <label className={`form-label ${required ? 'form-label-required' : ''}`}>{t(label)}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ? t(placeholder) : ''}
        maxLength={maxLength}
        className={`form-input ${error ? 'border-turkish-500' : ''}`}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

// ============================================================
// TEXT AREA
// ============================================================
interface TextAreaProps {
  label: TranslationKey;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: TranslationKey;
  rows?: number;
}

export function TextArea({ label, value, onChange, required, placeholder, rows = 3 }: TextAreaProps) {
  const { t } = useLang();
  return (
    <div>
      <label className={`form-label ${required ? 'form-label-required' : ''}`}>{t(label)}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ? t(placeholder) : ''}
        rows={rows}
        className="form-textarea"
      />
    </div>
  );
}

// ============================================================
// SELECT FIELD
// ============================================================
interface SelectFieldProps {
  label: TranslationKey;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  options: { value: string; labelKey: TranslationKey }[];
  placeholder?: TranslationKey;
}

export function SelectField({ label, value, onChange, required, options, placeholder }: SelectFieldProps) {
  const { t } = useLang();
  return (
    <div>
      <label className={`form-label ${required ? 'form-label-required' : ''}`}>{t(label)}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="form-select">
        <option value="">{placeholder ? t(placeholder) : t('selectOption')}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {t(opt.labelKey)}
          </option>
        ))}
      </select>
    </div>
  );
}

// ============================================================
// CHECKBOX FIELD
// ============================================================
interface CheckboxFieldProps {
  label: TranslationKey;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CheckboxField({ label, checked, onChange }: CheckboxFieldProps) {
  const { t } = useLang();
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="form-checkbox" />
      <span className="text-sm text-navy-700 group-hover:text-navy-900 transition-colors">{t(label)}</span>
    </label>
  );
}

// ============================================================
// DATE FIELD
// ============================================================
interface DateFieldProps {
  label: TranslationKey;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export function DateField({ label, value, onChange, required }: DateFieldProps) {
  const { t } = useLang();
  return (
    <div>
      <label className={`form-label ${required ? 'form-label-required' : ''}`}>{t(label)}</label>
      <input type="date" value={value} onChange={(e) => onChange(e.target.value)} className="form-input" />
    </div>
  );
}

// ============================================================
// SECTION CARD
// ============================================================
interface SectionCardProps {
  title: TranslationKey;
  icon?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
}

export function SectionCard({ title, icon, children, actions }: SectionCardProps) {
  const { t } = useLang();
  return (
    <div className="card animate-fade-in">
      <div className="card-header flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-base font-semibold text-navy-900">
          {icon}
          {t(title)}
        </h3>
        {actions}
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}

// ============================================================
// RECORD CARD (for repeatable records)
// ============================================================
interface RecordCardProps {
  index: number;
  onRemove: () => void;
  removeLabel: TranslationKey;
  children: ReactNode;
}

export function RecordCard({ index, onRemove, removeLabel, children }: RecordCardProps) {
  const { t } = useLang();
  return (
    <div className="rounded-lg border border-navy-200 bg-navy-50/50 p-4 mb-4 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <span className="badge bg-navy-200 text-navy-800">#{index + 1}</span>
        <button type="button" onClick={onRemove} className="btn-ghost text-turkish-500 hover:bg-turkish-50 text-xs">
          {t(removeLabel)}
        </button>
      </div>
      {children}
    </div>
  );
}

// ============================================================
// ADD BUTTON
// ============================================================
interface AddButtonProps {
  onClick: () => void;
  label: TranslationKey;
}

export function AddButton({ onClick, label }: AddButtonProps) {
  const { t } = useLang();
  return (
    <button type="button" onClick={onClick} className="btn-secondary w-full border-dashed mt-4">
      <span className="text-lg leading-none">+</span> {t(label)}
    </button>
  );
}

// ============================================================
// EMPTY STATE
// ============================================================
interface EmptyStateProps {
  message: TranslationKey;
}

export function EmptyState({ message }: EmptyStateProps) {
  const { t } = useLang();
  return (
    <div className="rounded-lg border-2 border-dashed border-navy-200 p-8 text-center">
      <p className="text-sm text-navy-400">{t(message)}</p>
    </div>
  );
}

// ============================================================
// FILE UPLOAD
// ============================================================
interface FileUploadProps {
  label: TranslationKey;
  fileName: string;
  onFileChange: (fileName: string) => void;
}

export function FileUpload({ label, fileName, onFileChange }: FileUploadProps) {
  const { t } = useLang();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= MAX_FILE_SIZE) {
      onFileChange(file.name);
    }
  };

  return (
    <div>
      <label className="form-label">{t(label)}</label>
      <div className="flex items-center gap-3">
        <label className="btn-secondary cursor-pointer text-xs whitespace-nowrap">
          {t('uploadFile')}
          <input type="file" accept={ACCEPTED_FILE_TYPES} onChange={handleChange} className="hidden" />
        </label>
        {fileName ? (
          <div className="flex items-center gap-2 text-sm text-navy-600">
            <span className="truncate max-w-[200px]">{fileName}</span>
            <button type="button" onClick={() => onFileChange('')} className="text-turkish-500 hover:text-turkish-600 text-xs">
              {t('removeFile')}
            </button>
          </div>
        ) : (
          <span className="text-sm text-navy-300">{t('noFileSelected')}</span>
        )}
      </div>
      <p className="mt-1 text-xs text-navy-300">{t('maxFileSize')}</p>
    </div>
  );
}
