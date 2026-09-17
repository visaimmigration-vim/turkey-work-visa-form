# VIM — Turkey Work Visa & Professional Skills Application

A complete trilingual (Persian/Dari, English, Turkish) web application for collecting applicant information for Turkey work visa and professional skills assessment.

**VIM — Visa Immigration Management**

> **Important:** This is a **private applicant information collection and visa assistance system**. This website is not an official Government of Türkiye website.

## Features

- **Trilingual interface** — Persian/Dari (RTL), English (LTR), Turkish (LTR)
- **12-step multi-step form** with progress indicator and sidebar navigation
- **VIM branding** with Turkish flag and Turkey-themed design
- **Detailed professional skills** — 12 categories with 80+ specific skills
- **Unlimited records** — education, qualifications, work experience, skills, languages, computer skills, documents
- **Turkey employment** — employer details, job offers, preferred cities, salary
- **Complete document inventory** — 7 categories with 30+ document types
- **CV/Profile section** with auto-generated professional profile summary
- **Review page** with edit capability for each section
- **Declaration & consent** before submission
- **Application ID generation** (TVW-2026-XXXXXX format)
- **Google Sheets backend** with 15 auto-created sheets
- **Google Drive file uploads** organized by application ID
- **Responsive design** — desktop, tablet, mobile
- **GitHub Pages compatible** — uses relative paths

## Tech Stack

- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Backend:** Google Apps Script (Code.gs) + Google Sheets + Google Drive
- **Fonts:** Vazirmatn (Persian), Inter (Latin)

## Quick Start

### 1. Frontend Setup

```bash
npm install
npm run dev
```

### 2. Google Apps Script Backend Setup

1. **Create a Google Sheet** at [sheets.google.com](https://sheets.google.com)

2. **Open Extensions → Apps Script** from the Google Sheets menu

3. **Paste Code.gs** — Delete any existing code in the Apps Script editor and paste the entire contents of `Code.gs` from this project.

4. **Run `setup()`** — Select the `setup` function from the dropdown and click Run. Authorize the script when prompted. This will:
   - Create all 15 sheets with headers, formatting, and frozen rows
   - Set column widths
   - Create a Google Drive folder for document uploads
   - Add data validation for application status

5. **Deploy as Web App:**
   - Click **Deploy → New deployment**
   - Select **Web app**
   - Set **Execute as** to **Me** (owner)
   - Set **Who has access** to **Anyone**
   - Click **Deploy**
   - Authorize when prompted

6. **Copy the Web App URL** — After deployment, copy the URL that looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

7. **Paste the URL into the frontend config:**
   - Open `src/config.ts`
   - Replace the placeholder:
   ```typescript
   export const API_URL = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
   - With your actual URL:
   ```typescript
   export const API_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
   ```

8. **Build and deploy:**
   ```bash
   npm run build
   ```
   The built files will be in the `dist/` directory.

### 3. Deploy to GitHub Pages

1. Create a GitHub repository (e.g., `visaimmigration-vim.github.io/<repository-name>`)
2. Push the `dist/` folder contents to the repository
3. Go to Settings → Pages
4. Set source to the main branch
5. Your app will be available at `https://visaimmigration-vim.github.io/<repository-name>/`

The project uses relative paths (`base: './'` in vite.config.ts) so it works correctly under any subpath.

## Form Steps

| Step | Title | Description |
|------|-------|-------------|
| 1 | Personal Information | Name, DOB, nationality, passport basics |
| 2 | Contact Information | Phone, email, address, emergency contact |
| 3 | Passport & Travel | Passport type, Turkish visa history, visa refusals |
| 4 | Education | Multiple education records |
| 5 | Professional Qualifications | Certificates, licenses, vocational qualifications |
| 6 | Work Experience | Multiple employment records with references |
| 7 | Professional Skills | 12 categories, 80+ skills with levels |
| 8 | Language & Computer Skills | Languages + computer proficiency |
| 9 | Turkey Employment | Employer details, job preferences, salary |
| 10 | Available Documents | 7 categories, 30+ document types |
| 11 | CV / Professional Profile | CV, links, bio, auto-generated profile |
| 12 | Review, Declaration & Submit | Full review, declaration, submission |

## Google Sheet Structure

The `setup()` function in Code.gs automatically creates these 15 sheets:

1. **Applicants** — Master summary of each application
2. **Contact Information** — Contact details
3. **Passport & Travel** — Passport and travel history
4. **Education** — One row per education record
5. **Qualifications** — One row per qualification
6. **Employment History** — One row per job
7. **Professional Skills** — One row per skill
8. **Languages** — One row per language
9. **Computer Skills** — One row per computer skill
10. **Turkey Employment** — Employment preferences and employer details
11. **Documents** — One row per document
12. **CV & Professional Profile** — CV and profile links
13. **Applications** — Application tracking with status
14. **Application Logs** — Submission and error logs
15. **Settings** — System configuration

## Google Drive Document Uploads

- All uploaded files are stored in a dedicated Google Drive folder named "VIM Turkey Visa Documents"
- Each application gets its own subfolder named by Application ID
- Files are set to viewable by anyone with the link
- File URLs are stored in the corresponding Google Sheet rows
- Accepted formats: PDF, JPG, JPEG, PNG, WEBP
- Maximum file size: 10 MB

## Application Status Flow

```
Received → Under Review → Additional Information Required → Document Review
→ Employment Assessment → Visa Assessment → Processing → Completed → Closed
```

## Language Support

| Language | Code | Direction | Font |
|----------|------|-----------|------|
| Persian/Dari | `fa` | RTL | Vazirmatn |
| English | `en` | LTR | Inter |
| Turkish | `tr` | LTR | Inter |

Default language is Persian/Dari. Switch anytime using the header selector.

## Security

- Google Sheet credentials never exposed in frontend
- All input sanitized server-side to prevent formula injection
- Application IDs generated server-side
- Duplicate detection prevents resubmissions
- Files validated by type and size
- Only one API URL needs to be configured

## File Structure

```
├── index.html              — HTML entry point (UTF-8)
├── src/
│   ├── App.tsx             — Main app orchestrator
│   ├── config.ts           — API URL configuration (ONE place)
│   ├── types.ts            — TypeScript types and constants
│   ├── i18n.ts             — Trilingual translations (fa/en/tr)
│   ├── LanguageContext.tsx — Language context provider
│   ├── formData.ts         — Form data utilities
│   ├── FormFields.tsx      — Reusable form field components
│   ├── FormSteps1.tsx      — Steps 1-6
│   ├── FormSteps2.tsx      — Steps 7-12
│   ├── Layout.tsx          — VIM header, progress bar, disclaimer
│   ├── options.ts          — Select field option lists
│   ├── submission.ts       — Google Apps Script submission service
│   ├── index.css           — Tailwind + custom styles
│   └── main.tsx            — React entry point
├── Code.gs                 — Google Apps Script backend
├── README.md               — This file
├── package.json
├── vite.config.ts          — GitHub Pages compatible (base: './')
└── tailwind.config.js
```

## Development

```bash
npm install      # Install dependencies
npm run dev      # Start dev server
npm run build    # Build for production
npm run typecheck # Type check
npm run lint     # Lint
```

## Disclaimer

**Persian:** این سامانه یک سیستم خصوصی جمع‌آوری اطلاعات متقاضی و کمک به ویزا است. این وب‌سایت یک وب‌سایت رسمی دولت ترکیه نیست.

**English:** Private applicant information collection and visa assistance system. This website is not an official Government of Türkiye website.

**Turkish:** Özel başvuru bilgi toplama ve vize destek sistemidir. Bu web sitesi resmî bir Türkiye Cumhuriyeti devlet web sitesi değildir.
