import { useState, useCallback } from 'react';
import { LanguageProvider, useLang } from './LanguageContext';
import { Header, ProgressBar, Disclaimer } from './Layout';
import type { TranslationKey } from './i18n';
import type { FormData, SubmissionResult } from './types';
import { createEmptyFormData } from './formData';
import { submitApplication } from './submission';
import {
  Step1Personal, Step2Contact, Step3PassportTravel,
  Step4Education, Step5Qualifications, Step6WorkExperience,
} from './FormSteps1';
import {
  Step7Skills, Step8Languages, Step9TurkeyEmployment,
  Step10Documents, Step11CV, Step12Review,
} from './FormSteps2';

const TOTAL_STEPS = 12;

const STEPS: { titleKey: TranslationKey }[] = [
  { titleKey: 'step1Title' },
  { titleKey: 'step2Title' },
  { titleKey: 'step3Title' },
  { titleKey: 'step4Title' },
  { titleKey: 'step5Title' },
  { titleKey: 'step6Title' },
  { titleKey: 'step7Title' },
  { titleKey: 'step8Title' },
  { titleKey: 'step9Title' },
  { titleKey: 'step10Title' },
  { titleKey: 'step11Title' },
  { titleKey: 'step12Title' },
];

function AppContent() {
  const { t, lang } = useLang();
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<FormData>(createEmptyFormData());
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  const update = useCallback((patch: Partial<FormData>) => {
    setData((prev) => ({ ...prev, ...patch }));
  }, []);

  const goToStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    setCompletedSteps((prev) => new Set(prev).add(currentStep));
    if (currentStep < TOTAL_STEPS) goToStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) goToStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const res = await submitApplication(data, lang);
    setResult(res);
    setSubmitting(false);
    setCompletedSteps((prev) => new Set(prev).add(TOTAL_STEPS));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startNew = () => {
    setData(createEmptyFormData());
    setCurrentStep(1);
    setResult(null);
    setCompletedSteps(new Set());
    setShowDisclaimer(true);
  };

  // Success screen
  if (result && result.success) {
    return (
      <div className="min-h-screen bg-navy-50">
        <Header />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="card animate-slide-up shadow-lg">
            <div className="card-body text-center py-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
                <svg className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-navy-900 mb-2">{t('submissionSuccess')}</h2>
              <p className="text-sm text-navy-500 mb-8">{t('profileGenerated')}</p>
              <div className="rounded-lg bg-navy-50 border border-navy-200 p-6 mb-8 text-start">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-navy-500">{t('applicationId')}</span>
                    <span className="text-sm font-bold text-navy-900 font-mono">{result.applicationId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-navy-500">{t('submissionDate')}</span>
                    <span className="text-sm font-medium text-navy-800">{result.submissionDate}</span>
                  </div>
                </div>
              </div>
              <button onClick={startNew} className="btn-primary">{t('newApplication')}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error screen
  if (result && !result.success) {
    const isConfigError = result.message === 'CONFIG_ERROR';
    return (
      <div className="min-h-screen bg-navy-50">
        <Header />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="card animate-slide-up shadow-lg">
            <div className="card-body text-center py-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-turkish-100 mb-6">
                <svg className="h-8 w-8 text-turkish-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-navy-900 mb-2">{t('submissionError')}</h2>
              {isConfigError && <p className="text-sm text-navy-500 mb-6">{t('configError')}</p>}
              <button onClick={() => setResult(null)} className="btn-primary">{t('backToForm')}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1Personal data={data} update={update} />;
      case 2: return <Step2Contact data={data} update={update} />;
      case 3: return <Step3PassportTravel data={data} update={update} />;
      case 4: return <Step4Education data={data} update={update} />;
      case 5: return <Step5Qualifications data={data} update={update} />;
      case 6: return <Step6WorkExperience data={data} update={update} />;
      case 7: return <Step7Skills data={data} update={update} />;
      case 8: return <Step8Languages data={data} update={update} />;
      case 9: return <Step9TurkeyEmployment data={data} update={update} />;
      case 10: return <Step10Documents data={data} update={update} />;
      case 11: return <Step11CV data={data} update={update} />;
      case 12: return <Step12Review data={data} update={update} onEdit={goToStep} />;
      default: return null;
    }
  };

  const canSubmit = data.declarationConfirmed && data.consentConfirmed && data.privacyAcknowledged;

  return (
    <div className="min-h-screen bg-navy-50">
      <Header />
      <ProgressBar
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        steps={STEPS}
        onStepClick={goToStep}
        completedSteps={completedSteps}
      />

      {showDisclaimer && <Disclaimer onAccept={() => setShowDisclaimer(false)} />}

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Sidebar navigation — desktop */}
          <aside className="hidden lg:block">
            <div className="card sticky top-[160px]">
              <div className="card-body py-3">
                <nav className="space-y-1">
                  {STEPS.map((step, i) => {
                    const stepNum = i + 1;
                    const isCompleted = completedSteps.has(stepNum);
                    const isActive = stepNum === currentStep;
                    return (
                      <button
                        key={i}
                        onClick={() => goToStep(stepNum)}
                        className={`step-nav-item ${
                          isActive ? 'step-nav-item-active' : isCompleted ? 'step-nav-item-completed' : 'step-nav-item-upcoming'
                        }`}
                      >
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold flex-shrink-0 ${
                          isActive ? 'bg-white text-navy-900' : isCompleted ? 'bg-green-200 text-green-800' : 'bg-navy-100 text-navy-400'
                        }`}>
                          {isCompleted ? '✓' : stepNum}
                        </span>
                        <span className="truncate">{t(step.titleKey)}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </aside>

          {/* Form content */}
          <div>
            {renderStep()}

            {/* Navigation buttons */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <button onClick={handlePrevious} disabled={currentStep === 1} className="btn-secondary">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                {t('previous')}
              </button>

              {currentStep < TOTAL_STEPS ? (
                <button onClick={handleNext} className="btn-primary">
                  {t('next')}
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={submitting || !canSubmit} className="btn-primary">
                  {submitting ? (
                    <>
                      <span className="spinner" />
                      {t('submitting')}
                    </>
                  ) : (
                    t('submit')
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-navy-100 bg-white py-6 mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-navy-400 text-center leading-relaxed">{t('disclaimerText')}</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
