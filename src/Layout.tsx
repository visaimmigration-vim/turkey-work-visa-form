import { useLang } from './LanguageContext';
import type { Language } from './types';
import type { TranslationKey } from './i18n';
import type { ReactNode } from 'react';

// ============================================================
// LANGUAGE SELECTOR
// ============================================================
export function LanguageSelector() {
  const { lang, setLang } = useLang();
  const langs: { code: Language; label: string }[] = [
    { code: 'fa', label: 'فارسی' },
    { code: 'en', label: 'English' },
    { code: 'tr', label: 'Türkçe' },
  ];

  return (
    <div className="flex items-center gap-1 rounded-lg bg-navy-800 p-1">
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
            lang === l.code ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-300 hover:text-white'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

// ============================================================
// VIM LOGO
// ============================================================
function VimLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-lg bg-turkish-500 shadow-md">
        <span className="text-white font-extrabold text-lg tracking-tight">VIM</span>
      </div>
      <div className="hidden sm:block">
        <div className="text-white font-bold text-sm leading-tight">VIM</div>
        <div className="text-navy-300 text-[10px] leading-tight">Visa Immigration Management</div>
      </div>
    </div>
  );
}

// ============================================================
// TURKISH FLAG ICON
// ============================================================
function TurkishFlag() {
  return (
    <svg viewBox="0 0 120 80" className="h-7 w-auto rounded overflow-hidden shadow-sm">
      <rect width="120" height="80" fill="#e30a17" />
      <circle cx="40" cy="40" r="16" fill="#ffffff" />
      <circle cx="46" cy="40" r="13" fill="#e30a17" />
      <polygon points="58,40 66,36 62,40 66,44" fill="#ffffff" />
      <polygon points="58,40 66.5,36 62.5,40 66.5,44" fill="#ffffff" transform="rotate(0 60 40)" />
    </svg>
  );
}

// ============================================================
// HEADER
// ============================================================
export function Header() {
  const { t } = useLang();
  return (
    <header className="sticky top-0 z-40 bg-navy-900 text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <VimLogo />
            <div className="hidden md:block h-8 w-px bg-navy-700" />
            <div className="hidden md:block">
              <h1 className="text-sm font-semibold leading-tight max-w-[400px]">{t('appTitle')}</h1>
              <p className="text-xs text-navy-300">{t('appSubtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <TurkishFlag />
            </div>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}

// ============================================================
// PROGRESS BAR
// ============================================================
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: { titleKey: TranslationKey }[];
  onStepClick?: (step: number) => void;
  completedSteps: Set<number>;
}

export function ProgressBar({ currentStep, totalSteps, steps, onStepClick, completedSteps }: ProgressBarProps) {
  const { t } = useLang();
  return (
    <div className="bg-white border-b border-navy-100 sticky top-[57px] z-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-navy-600">
            {t('step')} {currentStep} {t('of')} {totalSteps}
          </span>
          <div className="flex-1 mx-4 h-2 bg-navy-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-turkish-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-navy-900">{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="flex gap-1 overflow-x-auto pb-1">
          {steps.map((step, i) => {
            const stepNum = i + 1;
            const isCompleted = completedSteps.has(stepNum);
            const isActive = stepNum === currentStep;
            const isUpcoming = !isActive && !isCompleted;
            return (
              <button
                key={i}
                onClick={() => onStepClick?.(stepNum)}
                className={`step-nav-item flex-shrink-0 ${
                  isActive ? 'step-nav-item-active' : isCompleted ? 'step-nav-item-completed' : 'step-nav-item-upcoming'
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold flex-shrink-0 ${
                    isActive ? 'bg-white text-navy-900' : isCompleted ? 'bg-green-200 text-green-800' : 'bg-navy-100 text-navy-400'
                  }`}
                >
                  {isCompleted ? '✓' : stepNum}
                </span>
                <span className="hidden lg:inline whitespace-nowrap">{t(step.titleKey)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// DISCLAIMER MODAL
// ============================================================
export function Disclaimer({ onAccept }: { onAccept: () => void }) {
  const { t } = useLang();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 backdrop-blur-sm p-4">
      <div className="card max-w-2xl w-full animate-slide-up shadow-2xl">
        <div className="card-header bg-turkish-50 border-turkish-100">
          <h2 className="flex items-center gap-2 text-lg font-bold text-turkish-700">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {t('disclaimerTitle')}
          </h2>
        </div>
        <div className="card-body">
          <p className="text-sm text-navy-700 leading-relaxed mb-6">{t('disclaimerText')}</p>
          <button onClick={onAccept} className="btn-primary w-full">
            {t('iUnderstand')}
          </button>
        </div>
      </div>
    </div>
  );
}
