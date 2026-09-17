import type { FormData, SubmissionResult } from './types';
import { API_URL } from './config';
import { generateApplicationId } from './formData';

export async function submitApplication(data: FormData, lang: string): Promise<SubmissionResult> {
  if (!API_URL) {
    return { success: false, message: 'CONFIG_ERROR' };
  }

  const applicationId = generateApplicationId();
  const now = new Date();
  const submissionDate = now.toISOString().split('T')[0];

  const payload = {
    action: 'submit',
    applicationId,
    submissionDate,
    language: lang,
    formData: data,
  };

  try {
    await fetch(API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });

    return {
      success: true,
      applicationId,
      submissionDate,
      status: 'Received',
    };
  } catch {
    return { success: false, message: 'SUBMISSION_ERROR' };
  }
}
