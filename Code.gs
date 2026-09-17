/**
 * ============================================================
 * VIM — Turkey Work Visa & Professional Skills Application
 * Google Apps Script Backend — Code.gs
 * ============================================================
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet.
 * 2. Go to Extensions → Apps Script.
 * 3. Delete existing code and paste this entire file.
 * 4. Run setup() and authorize when prompted.
 * 5. Deploy → New deployment → Web app.
 * 6. Set "Execute as" to "Me" (owner).
 * 7. Set "Who has access" to "Anyone".
 * 8. Copy the Web App URL.
 * 9. Paste it into src/config.ts in the frontend.
 * ============================================================
 */

// ============================================================
// CONFIGURATION
// ============================================================

var SPREADSHEET_NAME = 'VIM Turkey Work Visa Applications';
var DRIVE_FOLDER_NAME = 'VIM Turkey Visa Documents';

var SHEETS_CONFIG = {
  'Applicants': [
    'Application ID', 'Submission Date', 'Status', 'Language',
    'First Name', 'Middle Name', 'Last Name', 'Full Name English', 'Full Name Turkish',
    'Father Name', 'Mother Name', 'Date of Birth', 'Place of Birth', 'Country of Birth',
    'Gender', 'Marital Status', 'Nationality', 'Current Country', 'Current City', 'National ID',
    'Passport Number', 'Passport Issue Date', 'Passport Expiry Date', 'Passport Country', 'Passport Authority',
    'Primary Phone', 'WhatsApp', 'Email', 'Current Address',
    'Emergency Contact Name', 'Emergency Contact Relationship', 'Emergency Contact Phone', 'Emergency Contact Email',
    'Total Professional Experience', 'Current Employment', 'Desired Profession', 'Desired Turkish Industry',
    'Preferred Turkish City', 'Expected Salary', 'Availability',
    'Has Turkish Employer', 'Has Turkish Job Offer', 'CV File URL', 'Profile Status', 'Last Updated'
  ],
  'Contact Information': [
    'Application ID', 'Primary Phone', 'WhatsApp Number', 'Email',
    'Residential Address', 'City', 'Province', 'Country', 'Postal Code',
    'Emergency Contact Name', 'Emergency Contact Relationship', 'Emergency Contact Phone', 'Emergency Contact Email'
  ],
  'Passport & Travel': [
    'Application ID', 'Passport Type', 'Passport Number', 'Issue Date', 'Expiry Date',
    'Issuing Country', 'Issuing Authority', 'Previous Passports',
    'Previous Turkish Visas', 'Previous Residence Permits', 'Previous Work Permits',
    'Visa Refusals', 'Visa Refusal Country', 'Visa Refusal Date', 'Visa Refusal Reason',
    'Previous Travel to Turkey', 'Last Visit Date', 'Last Visit Purpose'
  ],
  'Education': [
    'Application ID', 'Education Record ID', 'Education Level', 'Institution',
    'Field of Study', 'Degree', 'Country', 'City', 'Start Date', 'End Date',
    'Graduation Year', 'Certificate Available', 'Certificate File URL', 'Additional Information', 'Created Date'
  ],
  'Qualifications': [
    'Application ID', 'Qualification ID', 'Qualification Name', 'Profession', 'Specialization',
    'Issuing Organization', 'Country', 'Issue Date', 'Expiry Date', 'Certificate Number',
    'Certificate Available', 'Certificate File URL', 'Has License', 'License Number',
    'License Authority', 'License Expiry', 'Additional Information', 'Created Date'
  ],
  'Employment History': [
    'Application ID', 'Employment Record ID', 'Job Title', 'Profession', 'Position',
    'Company', 'Industry', 'Country', 'City', 'Start Date', 'End Date',
    'Currently Employed', 'Employment Type', 'Salary', 'Currency', 'Years of Experience',
    'Responsibilities', 'Achievements', 'Tools', 'Technologies',
    'Employment Certificate', 'Certificate File URL',
    'Reference Name', 'Reference Phone', 'Reference Email', 'Created Date'
  ],
  'Professional Skills': [
    'Application ID', 'Skill Record ID', 'Skill Category', 'Skill Name', 'Skill Level',
    'Years of Experience', 'Last Used Date', 'Certificate Available', 'Certificate File URL',
    'Description', 'Tools', 'Equipment', 'Technologies', 'Created Date'
  ],
  'Languages': [
    'Application ID', 'Language Record ID', 'Language', 'Speaking', 'Reading',
    'Writing', 'Listening', 'Certificate Available', 'Certificate File URL', 'Created Date'
  ],
  'Computer Skills': [
    'Application ID', 'Computer Skill ID', 'Skill', 'Proficiency', 'Years Experience',
    'Certificate Available', 'Certificate File URL', 'Additional Information', 'Created Date'
  ],
  'Turkey Employment': [
    'Application ID', 'Has Turkish Employer', 'Has Turkish Job Offer',
    'Employer Name', 'Company Address', 'City', 'Contact Person', 'Employer Phone', 'Employer Email',
    'Job Title', 'Job Description', 'Proposed Salary', 'Currency',
    'Contract Available', 'Contract File URL', 'Invitation Available', 'Invitation File URL',
    'Desired Profession', 'Industry', 'Preferred Cities', 'Willing To Relocate',
    'Expected Salary', 'Employment Type', 'Available Start Date', 'Applicant Job Description', 'Created Date'
  ],
  'Documents': [
    'Application ID', 'Document ID', 'Document Category', 'Document Type',
    'Document Number', 'Issuing Authority', 'Issue Date', 'Expiry Date',
    'Available', 'File Name', 'File URL', 'Notes', 'Upload Date'
  ],
  'CV & Professional Profile': [
    'Application ID', 'CV File URL', 'LinkedIn Profile', 'Personal Website', 'Portfolio',
    'GitHub Profile', 'Professional Social Media', 'Professional Biography',
    'Career Objective', 'Main Strengths', 'Main Technical Skills',
    'Preferred Job Title', 'Preferred Turkish Industry', 'Created Date'
  ],
  'Applications': [
    'Application ID', 'Submission Date', 'Applicant Name', 'Passport Number',
    'Phone', 'Email', 'Current Country', 'Desired Profession', 'Total Experience',
    'Preferred Turkey City', 'Turkish Employer', 'Job Offer',
    'Application Status', 'Document Status', 'Profile Completion', 'Last Updated'
  ],
  'Application Logs': [
    'Timestamp', 'Application ID', 'Language', 'Status', 'Details'
  ],
  'Settings': [
    'Setting', 'Value', 'Description'
  ]
};

var STATUS_VALUES = [
  'Received', 'Under Review', 'Additional Information Required',
  'Document Review', 'Employment Assessment', 'Visa Assessment',
  'Processing', 'Completed', 'Closed'
];

var HEADER_BG = '#102a43';
var HEADER_TEXT = '#ffffff';
var HEADER_FONT_SIZE = 11;

// ============================================================
// SETUP FUNCTION — Run once
// ============================================================

function setup() {
  var ss = getOrCreateSpreadsheet();

  for (var sheetName in SHEETS_CONFIG) {
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) sheet = ss.insertSheet(sheetName);

    var headers = SHEETS_CONFIG[sheetName];
    sheet.clear();
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground(HEADER_BG);
    headerRange.setFontColor(HEADER_TEXT);
    headerRange.setFontSize(HEADER_FONT_SIZE);
    headerRange.setFontWeight('bold');
    headerRange.setHorizontalAlignment('center');
    sheet.setFrozenRows(1);

    for (var c = 1; c <= headers.length; c++) {
      var w = 150;
      if (headers[c - 1].length > 20) w = 250;
      if (headers[c - 1].length > 35) w = 300;
      sheet.setColumnWidth(c, w);
    }
  }

  // Status data validation
  var statusSheet = ss.getSheetByName('Applications');
  if (statusSheet && statusSheet.getMaxRows() > 1) {
    var rule = SpreadsheetApp.newDataValidation().requireValueInList(STATUS_VALUES).build();
    statusSheet.getRange(2, 13, Math.max(statusSheet.getMaxRows() - 1, 1), 1).setDataValidation(rule);
  }

  // Settings sheet defaults
  var settingsSheet = ss.getSheetByName('Settings');
  if (settingsSheet && settingsSheet.getLastRow() < 2) {
    settingsSheet.appendRow(['Default Status', 'Received', 'Initial status for new applications']);
    settingsSheet.appendRow(['Max File Size (MB)', '10', 'Maximum upload file size']);
    settingsSheet.appendRow(['Version', '1.0', 'System version']);
  }

  // Create Drive folder
  getOrCreateDriveFolder();

  Logger.log('Setup complete! All sheets created and formatted.');
  Logger.log('Spreadsheet URL: ' + ss.getUrl());
}

// ============================================================
// SPREADSHEET / DRIVE HELPERS
// ============================================================

function getOrCreateSpreadsheet() {
  var files = DriveApp.getFilesByName(SPREADSHEET_NAME);
  if (files.hasNext()) return SpreadsheetApp.open(files.next());
  return SpreadsheetApp.create(SPREADSHEET_NAME);
}

function getOrCreateDriveFolder() {
  var folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(DRIVE_FOLDER_NAME);
}

// ============================================================
// WEB APP ENTRY POINTS
// ============================================================

function doGet(e) {
  return jsonOutput({ status: 'ok', message: 'VIM Turkey Work Visa API is running.' });
}

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    if (payload.action === 'submit') return handleSubmit(payload);
    if (payload.action === 'getStatus') return handleGetStatus(payload);
    return jsonOutput({ success: false, error: 'Unknown action: ' + payload.action });
  } catch (err) {
    logError(err);
    return jsonOutput({ success: false, error: 'Server error: ' + err.message });
  }
}

// ============================================================
// SUBMISSION HANDLER
// ============================================================

function handleSubmit(payload) {
  var ss = getOrCreateSpreadsheet();
  var applicationId = sanitize(payload.applicationId) || generateApplicationId();
  var submissionDate = sanitize(payload.submissionDate) || Utilities.formatDate(new Date(), 'UTC', 'yyyy-MM-dd');
  var language = sanitize(payload.language) || 'fa';
  var data = payload.formData || {};

  if (isDuplicate(ss, applicationId)) {
    return jsonOutput({ success: false, error: 'Duplicate application', applicationId: applicationId });
  }

  writeToApplicants(ss, applicationId, submissionDate, language, data);
  writeToContact(ss, applicationId, data);
  writeToPassportTravel(ss, applicationId, data);
  writeToEducation(ss, applicationId, data);
  writeToQualifications(ss, applicationId, data);
  writeToEmployment(ss, applicationId, data);
  writeToSkills(ss, applicationId, data);
  writeToLanguages(ss, applicationId, data);
  writeToComputerSkills(ss, applicationId, data);
  writeToTurkeyEmployment(ss, applicationId, data);
  writeToDocuments(ss, applicationId, data);
  writeToCVProfile(ss, applicationId, data);
  writeToApplications(ss, applicationId, submissionDate, data);
  writeToLogs(ss, applicationId, language, 'Received', 'Application submitted');

  return jsonOutput({ success: true, applicationId: applicationId, submissionDate: submissionDate, status: 'Received' });
}

function handleGetStatus(payload) {
  var ss = getOrCreateSpreadsheet();
  var appId = sanitize(payload.applicationId);
  if (!appId) return jsonOutput({ success: false, error: 'Missing application ID' });

  var sheet = ss.getSheetByName('Applications');
  if (!sheet || sheet.getLastRow() < 2) return jsonOutput({ success: false, error: 'Not found' });

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === appId) {
      return jsonOutput({ success: true, applicationId: appId, status: data[i][12] });
    }
  }
  return jsonOutput({ success: false, error: 'Not found' });
}

// ============================================================
// SHEET WRITERS
// ============================================================

function writeToApplicants(ss, appId, date, lang, d) {
  var sheet = ss.getSheetByName('Applicants');
  var totalExp = 0;
  if (d.workExperience) {
    for (var i = 0; i < d.workExperience.length; i++) {
      var yrs = parseInt(d.workExperience[i].yearsExperience, 10);
      if (!isNaN(yrs)) totalExp += yrs;
    }
  }
  var currentEmp = '';
  if (d.workExperience) {
    for (var j = 0; j < d.workExperience.length; j++) {
      if (d.workExperience[j].isCurrent) { currentEmp = d.workExperience[j].jobTitle || ''; break; }
    }
  }
  sheet.appendRow([
    appId, date, 'Received', lang,
    s(d.firstName), s(d.middleName), s(d.lastName), s(d.fullNameEnglish), s(d.fullNameTurkish),
    s(d.fatherName), s(d.motherName), s(d.dateOfBirth), s(d.placeOfBirth), s(d.countryOfBirth),
    s(d.gender), s(d.maritalStatus), s(d.nationality), s(d.currentCountry), s(d.currentCity), s(d.nationalId),
    s(d.passportNumber), s(d.passportIssueDate), s(d.passportExpiryDate), s(d.passportIssuingCountry), s(d.passportIssuingAuthority),
    s(d.primaryPhone), s(d.whatsappNumber), s(d.email), s(d.residentialAddress),
    s(d.emergencyContactName), s(d.emergencyContactRelation), s(d.emergencyContactPhone), s(d.emergencyContactEmail),
    totalExp + ' years', currentEmp, s(d.desiredProfession), s(d.desiredIndustry),
    s(d.preferredTurkishCities), s(d.expectedSalary), s(d.availableStartDate),
    s(d.hasTurkishEmployer), s(d.hasTurkishJobOffer), s(d.cvFileName), 'Profile Collected', date
  ]);
}

function writeToContact(ss, appId, d) {
  var sheet = ss.getSheetByName('Contact Information');
  sheet.appendRow([
    appId, s(d.primaryPhone), s(d.whatsappNumber), s(d.email),
    s(d.residentialAddress), s(d.contactCity), s(d.contactProvince), s(d.contactCountry), s(d.postalCode),
    s(d.emergencyContactName), s(d.emergencyContactRelation), s(d.emergencyContactPhone), s(d.emergencyContactEmail)
  ]);
}

function writeToPassportTravel(ss, appId, d) {
  var sheet = ss.getSheetByName('Passport & Travel');
  sheet.appendRow([
    appId, s(d.passportType), s(d.passportNumber), s(d.passportIssueDate), s(d.passportExpiryDate),
    s(d.passportIssuingCountry), s(d.passportIssuingAuthority), s(d.prevPassports),
    s(d.prevTurkishVisas), s(d.prevResidencePermits), s(d.prevWorkPermits),
    s(d.prevVisaRefusals), s(d.visaRefusalCountry), s(d.visaRefusalDate), s(d.visaRefusalReason),
    s(d.prevTravelToTurkey), s(d.lastVisitTurkeyDate), s(d.lastVisitTurkeyPurpose)
  ]);
}

function writeToEducation(ss, appId, d) {
  var sheet = ss.getSheetByName('Education');
  var records = d.education || [];
  var now = nowStr();
  for (var i = 0; i < records.length; i++) {
    var r = records[i];
    sheet.appendRow([
      appId, r.id || (i + 1), s(r.level), s(r.institution), s(r.fieldOfStudy), s(r.degree),
      s(r.country), s(r.city), s(r.startDate), s(r.endDate), s(r.graduationYear),
      r.certificateAvailable ? 'Yes' : 'No', s(r.fileName), s(r.additionalInfo), now
    ]);
  }
}

function writeToQualifications(ss, appId, d) {
  var sheet = ss.getSheetByName('Qualifications');
  var records = d.qualifications || [];
  var now = nowStr();
  for (var i = 0; i < records.length; i++) {
    var r = records[i];
    sheet.appendRow([
      appId, r.id || (i + 1), s(r.name), s(r.profession), s(r.specialization),
      s(r.issuingOrg), s(r.country), s(r.dateObtained), s(r.expiryDate), s(r.certNumber),
      r.certAvailable ? 'Yes' : 'No', s(r.fileName),
      r.hasLicense ? 'Yes' : 'No', s(r.licenseNumber), s(r.licenseAuthority), s(r.licenseExpiry),
      s(r.additionalInfo), now
    ]);
  }
}

function writeToEmployment(ss, appId, d) {
  var sheet = ss.getSheetByName('Employment History');
  var records = d.workExperience || [];
  var now = nowStr();
  for (var i = 0; i < records.length; i++) {
    var r = records[i];
    sheet.appendRow([
      appId, r.id || (i + 1), s(r.jobTitle), s(r.profession), s(r.position),
      s(r.company), s(r.industry), s(r.country), s(r.city), s(r.startDate), s(r.endDate),
      r.isCurrent ? 'Yes' : 'No', s(r.employmentType), s(r.salary), s(r.currency), s(r.yearsExperience),
      s(r.responsibilities), s(r.achievements), s(r.tools), s(r.technologies),
      r.certAvailable ? 'Yes' : 'No', s(r.fileName),
      s(r.referenceName), s(r.referencePhone), s(r.referenceEmail), now
    ]);
  }
}

function writeToSkills(ss, appId, d) {
  var sheet = ss.getSheetByName('Professional Skills');
  var records = d.skills || [];
  var now = nowStr();
  for (var i = 0; i < records.length; i++) {
    var r = records[i];
    sheet.appendRow([
      appId, r.id || (i + 1), s(r.category), s(r.name), s(r.level),
      s(r.yearsExperience), s(r.lastUsed), r.certAvailable ? 'Yes' : 'No', s(r.fileName),
      s(r.description), s(r.tools), '', '', now
    ]);
  }
}

function writeToLanguages(ss, appId, d) {
  var sheet = ss.getSheetByName('Languages');
  var records = d.languages || [];
  var now = nowStr();
  for (var i = 0; i < records.length; i++) {
    var r = records[i];
    sheet.appendRow([
      appId, r.id || (i + 1), s(r.language), s(r.speaking), s(r.reading),
      s(r.writing), s(r.listening), r.certAvailable ? 'Yes' : 'No', s(r.fileName), now
    ]);
  }
}

function writeToComputerSkills(ss, appId, d) {
  var sheet = ss.getSheetByName('Computer Skills');
  var records = d.computerSkills || [];
  var now = nowStr();
  for (var i = 0; i < records.length; i++) {
    var r = records[i];
    sheet.appendRow([
      appId, r.id || (i + 1), s(r.skill), s(r.proficiency), s(r.yearsExperience),
      r.certAvailable ? 'Yes' : 'No', s(r.fileName), s(r.additionalInfo), now
    ]);
  }
}

function writeToTurkeyEmployment(ss, appId, d) {
  var sheet = ss.getSheetByName('Turkey Employment');
  var now = nowStr();
  sheet.appendRow([
    appId, s(d.hasTurkishEmployer), s(d.hasTurkishJobOffer),
    s(d.employerName), s(d.companyAddress), s(d.employerCity), s(d.contactPerson),
    s(d.employerPhone), s(d.employerEmail), s(d.turkishJobTitle), s(d.turkishJobDescription),
    s(d.proposedSalary), s(d.proposedSalaryCurrency),
    d.contractAvailable ? 'Yes' : 'No', s(d.contractFileName),
    d.invitationAvailable ? 'Yes' : 'No', s(d.invitationFileName),
    s(d.desiredProfession), s(d.desiredIndustry), s(d.preferredTurkishCities),
    d.willingToRelocate ? 'Yes' : 'No', s(d.expectedSalary), s(d.expectedSalaryCurrency),
    s(d.employmentPreference), s(d.availableStartDate), s(d.applicantJobDescription), now
  ]);
}

function writeToDocuments(ss, appId, d) {
  var sheet = ss.getSheetByName('Documents');
  var records = d.documents || [];
  var now = nowStr();
  for (var i = 0; i < records.length; i++) {
    var r = records[i];
    sheet.appendRow([
      appId, r.id || (i + 1), s(r.category), s(r.type), s(r.documentNumber),
      s(r.issuingAuthority), s(r.issueDate), s(r.expiryDate),
      r.available ? 'Yes' : 'No', s(r.fileName), '', s(r.notes), now
    ]);
  }
}

function writeToCVProfile(ss, appId, d) {
  var sheet = ss.getSheetByName('CV & Professional Profile');
  var now = nowStr();
  sheet.appendRow([
    appId, s(d.cvFileName), s(d.linkedinProfile), s(d.personalWebsite), s(d.portfolio),
    s(d.githubProfile), s(d.professionalSocialMedia), s(d.professionalBio),
    s(d.careerObjective), s(d.mainStrengths), s(d.mainTechnicalSkills),
    s(d.preferredJobTitle), s(d.preferredTurkishIndustry), now
  ]);
}

function writeToApplications(ss, appId, date, d) {
  var sheet = ss.getSheetByName('Applications');
  var totalExp = 0;
  if (d.workExperience) {
    for (var i = 0; i < d.workExperience.length; i++) {
      var yrs = parseInt(d.workExperience[i].yearsExperience, 10);
      if (!isNaN(yrs)) totalExp += yrs;
    }
  }
  var docCount = d.documents ? d.documents.filter(function(doc) { return doc.available; }).length : 0;
  var profileCompletion = 'Incomplete';
  if (d.declarationConfirmed) profileCompletion = 'Complete';

  sheet.appendRow([
    appId, date, s(d.fullNameEnglish || (d.firstName + ' ' + d.lastName)),
    s(d.passportNumber), s(d.primaryPhone), s(d.email), s(d.currentCountry),
    s(d.desiredProfession), totalExp + ' years', s(d.preferredTurkishCities),
    s(d.hasTurkishEmployer), s(d.hasTurkishJobOffer),
    'Received', docCount + ' documents', profileCompletion, date
  ]);
}

function writeToLogs(ss, appId, lang, status, details) {
  var sheet = ss.getSheetByName('Application Logs');
  sheet.appendRow([nowStr(), appId, lang, status, s(details)]);
}

// ============================================================
// FILE UPLOAD (Google Drive)
// ============================================================

function uploadFile(base64Data, fileName, mimeType, applicationId) {
  try {
    var folder = getOrCreateDriveFolder();
    var subFolder = folder.getFoldersByName(applicationId);
    var appFolder;
    if (subFolder.hasNext()) {
      appFolder = subFolder.next();
    } else {
      appFolder = folder.createFolder(applicationId);
    }

    var bytes = Utilities.base64Decode(base64Data);
    var blob = Utilities.newBlob(bytes, mimeType, fileName);
    var file = appFolder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    return { success: true, fileId: file.getId(), fileUrl: file.getUrl(), fileName: fileName };
  } catch (err) {
    logError(err);
    return { success: false, error: err.message };
  }
}

// ============================================================
// UTILITIES
// ============================================================

function generateApplicationId() {
  var d = new Date();
  var y = d.getFullYear();
  var rand = ('000000' + Math.floor(Math.random() * 1000000)).slice(-6);
  return 'TVW-' + y + '-' + rand;
}

function isDuplicate(ss, appId) {
  var sheet = ss.getSheetByName('Applicants');
  if (!sheet || sheet.getLastRow() < 2) return false;
  var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues();
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] === appId) return true;
  }
  return false;
}

function s(value) { return sanitize(value); }

function sanitize(value) {
  if (value === null || value === undefined) return '';
  var str = String(value);
  if (str.charAt(0) === '=' || str.charAt(0) === '+' || str.charAt(0) === '-' ||
      str.charAt(0) === '@' || str.charAt(0) === '#' || str.charAt(0) === '\t') {
    str = "'" + str;
  }
  if (str.length > 50000) str = str.substring(0, 50000);
  return str;
}

function validateRequest(payload) {
  if (!payload) return false;
  if (!payload.action) return false;
  return true;
}

function getApplication(appId) {
  var ss = getOrCreateSpreadsheet();
  var sheet = ss.getSheetByName('Applicants');
  if (!sheet || sheet.getLastRow() < 2) return null;
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === appId) {
      var obj = {};
      for (var j = 0; j < headers.length; j++) obj[headers[j]] = data[i][j];
      return obj;
    }
  }
  return null;
}

function getApplicationStatus(appId) {
  var app = getApplication(appId);
  if (!app) return null;
  return app['Status'] || app['Application Status'] || 'Unknown';
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function nowStr() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
}

function logError(err) {
  try {
    var ss = getOrCreateSpreadsheet();
    var sheet = ss.getSheetByName('Application Logs');
    if (sheet) sheet.appendRow([nowStr(), '', '', 'Error', String(err)]);
  } catch (e) {}
  Logger.log('Error: ' + err);
}
