import React, { useEffect, useState } from 'react';
import type { ResumeData, SectionKey, TemplateKey } from '../types';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { ResumePreview } from './ResumePreview';

const previewProfiles = {
  business: {
    personalInfo: { fullName: 'Jordan Lee', email: 'jordan.lee@email.com', phoneNumber: '(555) 010-2480', address: 'Chicago, IL', linkedIn: 'linkedin.com/in/jordanlee', github: '', photo: '' },
    summary: 'Operations and business professional focused on improving processes, supporting teams, and delivering measurable outcomes.',
    workExperience: [
      { id: 'preview-1', jobTitle: 'Operations Manager', company: 'Northstar Group', location: 'Chicago, IL', startDate: '2021', endDate: '', isCurrent: true, description: 'Improved cross-team workflows and reporting processes.\nCoordinated project delivery with internal stakeholders.\nIntroduced a monthly service review and clarified ownership across teams.' },
      { id: 'preview-1b', jobTitle: 'Business Operations Analyst', company: 'Cedar Point Services', location: 'Chicago, IL', startDate: '2018', endDate: '2021', isCurrent: false, description: 'Prepared operating reports and documented process changes.\nPartnered with finance and customer teams to resolve recurring workflow issues.' },
    ],
    education: [{ id: 'preview-edu', institution: 'Lakeview University', degree: 'BBA', fieldOfStudy: 'Management', startDate: '2013', endDate: '2017' }],
    skills: [{ id: 'preview-s1', name: 'Process Improvement' }, { id: 'preview-s2', name: 'Team Leadership' }, { id: 'preview-s3', name: 'Budget Planning' }, { id: 'preview-s4', name: 'Stakeholder Relations' }, { id: 'preview-s5', name: 'Vendor Management' }, { id: 'preview-s6', name: 'Business Reporting' }, { id: 'preview-s7', name: 'Change Management' }, { id: 'preview-s8', name: 'Workflow Design' }],
    projects: [{ id: 'preview-p1', name: 'Service Workflow Refresh', description: 'Documented handoffs and introduced a shared review process for recurring projects.', url: '' }, { id: 'preview-p1b', name: 'Quarterly Planning Framework', description: 'Created a repeatable planning calendar and decision log for cross-functional initiatives.', url: '' }],
    awards: [{ id: 'preview-a1', name: 'Project Management Professional', issuer: 'PMI', date: '2022' }, { id: 'preview-a1b', name: 'Lean Process Foundations', issuer: 'Operations Learning Institute', date: '2020' }],
    additionalSections: [{ id: 'preview-biz-extra', title: 'Leadership & Community', entries: [{ id: 'preview-biz-extra-1', title: 'Operations Mentorship Circle', organization: 'Northstar Group', date: '2022 – Present', description: 'Mentor new team leads on planning, communication, and process documentation.', url: '' }] }],
  },
  finance: {
    personalInfo: { fullName: 'Taylor Morgan', email: 'taylor.morgan@email.com', phoneNumber: '(555) 010-7741', address: 'New York, NY', linkedIn: 'linkedin.com/in/taylormorgan', github: '', photo: '' },
    summary: 'Finance professional with experience in forecasting, reporting, and translating financial analysis into clear business decisions.',
    workExperience: [{ id: 'preview-2', jobTitle: 'Financial Analyst', company: 'Meridian Partners', location: 'New York, NY', startDate: '2022', endDate: '', isCurrent: true, description: 'Prepared recurring forecasts and variance analysis for business leaders.\nStreamlined monthly reporting and documentation.\nBuilt scenario models to support annual planning and department reviews.' }, { id: 'preview-2b', jobTitle: 'Finance Associate', company: 'Harbor Advisory', location: 'New York, NY', startDate: '2020', endDate: '2022', isCurrent: false, description: 'Supported monthly close, reconciliations, and management reporting.\nPrepared research summaries for client and internal planning meetings.' }],
    education: [{ id: 'preview-edu2', institution: 'Hudson College', degree: 'BS', fieldOfStudy: 'Finance', startDate: '2017', endDate: '2021' }],
    skills: [{ id: 'preview-f1', name: 'Financial Modeling' }, { id: 'preview-f2', name: 'Excel' }, { id: 'preview-f3', name: 'Forecasting' }, { id: 'preview-f4', name: 'SQL' }, { id: 'preview-f5', name: 'Variance Analysis' }, { id: 'preview-f6', name: 'Budgeting' }, { id: 'preview-f7', name: 'Power BI' }, { id: 'preview-f8', name: 'Valuation Research' }],
    projects: [{ id: 'preview-fp', name: 'Quarterly Forecast Model', description: 'Built a clear forecasting workbook to compare operating scenarios and assumptions.', url: '' }, { id: 'preview-fp2', name: 'Department Cost Review', description: 'Organized cost-center trends and prepared a concise summary for budget planning.', url: '' }],
    awards: [{ id: 'preview-fa', name: 'Financial Modeling Certificate', issuer: 'Corporate Finance Institute', date: '2023' }, { id: 'preview-fa2', name: 'Advanced Excel for Finance', issuer: 'Hudson College', date: '2021' }],
    additionalSections: [{ id: 'preview-fin-extra', title: 'Selected Analysis', entries: [{ id: 'preview-fin-extra-1', title: 'Market & Sector Review', organization: 'Meridian Partners', date: '2023', description: 'Prepared comparable-company notes and summarized quarterly sector trends for team review.', url: '' }] }],
  },
  healthcare: {
    personalInfo: { fullName: 'Morgan Patel, RN', email: 'morgan.patel@email.com', phoneNumber: '(555) 010-3382', address: 'Austin, TX', linkedIn: 'linkedin.com/in/morganpatel', github: '', photo: '' },
    summary: 'Registered nurse committed to safe, compassionate care, clear communication, and reliable coordination across clinical teams.',
    workExperience: [{ id: 'preview-3', jobTitle: 'Registered Nurse · Medical-Surgical', company: 'Central Medical Center', location: 'Austin, TX', startDate: '2021', endDate: '', isCurrent: true, description: 'Supported patient assessment and coordinated care with an interdisciplinary team.\nMaintained accurate records and provided patient education.\nCollaborated during shift handoffs and escalated changes in patient condition.' }, { id: 'preview-3b', jobTitle: 'Nurse Intern', company: 'Central Medical Center', location: 'Austin, TX', startDate: '2020', endDate: '2021', isCurrent: false, description: 'Assisted with supervised bedside care and patient mobility.\nPracticed clear documentation and communication with clinical staff.' }],
    education: [{ id: 'preview-edu3', institution: 'Central State University', degree: 'BSN', fieldOfStudy: 'Nursing', startDate: '2016', endDate: '2020' }],
    skills: [{ id: 'preview-h1', name: 'Patient Assessment' }, { id: 'preview-h2', name: 'Care Coordination' }, { id: 'preview-h3', name: 'EHR Documentation' }, { id: 'preview-h4', name: 'Patient Education' }, { id: 'preview-h5', name: 'Medication Safety' }, { id: 'preview-h6', name: 'Infection Prevention' }, { id: 'preview-h7', name: 'Discharge Planning' }, { id: 'preview-h8', name: 'Interdisciplinary Handoffs' }],
    projects: [{ id: 'preview-hp', name: 'Patient Handoff Improvement', description: 'Helped standardize shift handoff notes to support clear continuity of care.', url: '' }, { id: 'preview-hp2', name: 'Patient Education Resource', description: 'Contributed plain-language guidance for common discharge instructions.', url: '' }],
    awards: [{ id: 'preview-ha', name: 'Basic Life Support', issuer: 'American Heart Association', date: '2024' }, { id: 'preview-ha2', name: 'Advanced Cardiovascular Life Support', issuer: 'American Heart Association', date: '2023' }],
    additionalSections: [{ id: 'preview-rn-extra', title: 'Licensure & Clinical Training', entries: [{ id: 'preview-rn-extra-1', title: 'Registered Nurse License', organization: 'Texas Board of Nursing', date: '2021', description: 'Active registered nurse license.', url: '' }, { id: 'preview-rn-extra-2', title: 'Clinical Rotation', organization: 'Central Medical Center', date: '2019 – 2020', description: 'Completed supervised rotations in medical-surgical and community care settings.', url: '' }] }],
  },
  surgery: {
    personalInfo: { fullName: 'Avery Chen, MD', email: 'avery.chen@email.com', phoneNumber: '(555) 010-8914', address: 'Boston, MA', linkedIn: 'linkedin.com/in/averychen', github: '', photo: '' },
    summary: 'Surgical professional focused on careful clinical practice, team communication, and evidence-informed patient care.',
    workExperience: [{ id: 'preview-4', jobTitle: 'Surgical Resident', company: 'Harbor University Hospital', location: 'Boston, MA', startDate: '2020', endDate: '', isCurrent: true, description: 'Participated in supervised perioperative care and multidisciplinary rounds.\nContributed to case review and clinical documentation.\nCoordinated with attending physicians and nursing teams during pre- and post-operative care.' }, { id: 'preview-4b', jobTitle: 'Clinical Research Fellow', company: 'Harbor Surgical Research Unit', location: 'Boston, MA', startDate: '2018', endDate: '2020', isCurrent: false, description: 'Reviewed clinical literature and supported study documentation.\nPresented case summaries during departmental conferences.' }],
    education: [{ id: 'preview-edu4', institution: 'Harbor School of Medicine', degree: 'MD', fieldOfStudy: 'Medicine', startDate: '2012', endDate: '2016' }],
    skills: [{ id: 'preview-sg1', name: 'Clinical Assessment' }, { id: 'preview-sg2', name: 'Perioperative Care' }, { id: 'preview-sg3', name: 'Team Communication' }, { id: 'preview-sg4', name: 'Surgical Planning' }, { id: 'preview-sg5', name: 'Patient Safety' }, { id: 'preview-sg6', name: 'Clinical Documentation' }, { id: 'preview-sg7', name: 'Multidisciplinary Rounds' }],
    projects: [{ id: 'preview-sp', name: 'Clinical Outcomes Review', description: 'Reviewed published outcomes literature for a departmental quality discussion.', url: '' }, { id: 'preview-sp2', name: 'Perioperative Pathway Review', description: 'Summarized evidence and workflow observations for a service improvement meeting.', url: '' }],
    awards: [{ id: 'preview-sa', name: 'Research Presentation', issuer: 'Regional Medical Conference', date: '2023' }, { id: 'preview-sa2', name: 'Clinical Teaching Recognition', issuer: 'Harbor University Hospital', date: '2022' }],
    additionalSections: [{ id: 'preview-surg-extra', title: 'Clinical Training', entries: [{ id: 'preview-surg-extra-1', title: 'General Surgery Residency', organization: 'Harbor University Hospital', date: '2020 – Present', description: 'Supervised clinical training across inpatient, outpatient, and perioperative services.', url: '' }, { id: 'preview-surg-extra-2', title: 'Research & Presentations', organization: 'Harbor Surgical Research Unit', date: '2018 – 2020', description: 'Presented evidence summaries and case reviews at departmental meetings.', url: '' }] }],
  },
  technology: {
    personalInfo: { fullName: 'Riley Kim', email: 'riley.kim@email.com', phoneNumber: '(555) 010-6159', address: 'Seattle, WA', linkedIn: 'linkedin.com/in/rileykim', github: 'github.com/rileykim', photo: '' },
    summary: 'Software engineer building dependable web applications with a focus on maintainable systems and thoughtful user experiences.',
    workExperience: [{ id: 'preview-5', jobTitle: 'Software Engineer', company: 'Brightside Labs', location: 'Seattle, WA', startDate: '2022', endDate: '', isCurrent: true, description: 'Built reusable interface components and API integrations.\nWorked with design and product partners to ship accessible features.\nImproved build reliability and documented release procedures for the team.' }, { id: 'preview-5b', jobTitle: 'Associate Software Engineer', company: 'Pinecone Digital', location: 'Seattle, WA', startDate: '2020', endDate: '2022', isCurrent: false, description: 'Implemented user-facing features and maintained internal tools.\nParticipated in code reviews, testing, and sprint planning.' }],
    education: [{ id: 'preview-edu5', institution: 'Cascadia Institute', degree: 'BS', fieldOfStudy: 'Computer Science', startDate: '2017', endDate: '2021' }],
    skills: [{ id: 'preview-t1', name: 'TypeScript' }, { id: 'preview-t2', name: 'React' }, { id: 'preview-t3', name: 'Python' }, { id: 'preview-t4', name: 'PostgreSQL' }, { id: 'preview-t5', name: 'Git' }, { id: 'preview-t6', name: 'REST APIs' }, { id: 'preview-t7', name: 'Automated Testing' }, { id: 'preview-t8', name: 'Accessibility' }],
    projects: [{ id: 'preview-tp', name: 'Team Notes Dashboard', description: 'Developed a responsive dashboard with filtering and accessible keyboard navigation.', url: 'github.com/rileykim/notes' }, { id: 'preview-tp2', name: 'Service Status Toolkit', description: 'Created a small internal interface for reviewing service health and release notes.', url: 'github.com/rileykim/status' }],
    awards: [{ id: 'preview-ta', name: 'Cloud Fundamentals', issuer: 'Cloud Skills Program', date: '2023' }, { id: 'preview-ta2', name: 'Web Accessibility Basics', issuer: 'Brightside Learning', date: '2022' }],
    additionalSections: [{ id: 'preview-tech-extra', title: 'Technical Highlights', entries: [{ id: 'preview-tech-extra1', title: 'Open-source Contributions', organization: 'Community Projects', date: '2021 – Present', description: 'Contribute documentation fixes and small feature improvements to shared developer tools.', url: 'github.com/rileykim' }] }],
  },
  analyst: {
    personalInfo: { fullName: 'Casey Rivera', email: 'casey.rivera@email.com', phoneNumber: '(555) 010-4276', address: 'Denver, CO', linkedIn: 'linkedin.com/in/caseyrivera', github: 'github.com/caseyrivera', photo: '' },
    summary: 'Data analyst turning complex datasets into practical findings for product and operations teams.',
    workExperience: [{ id: 'preview-6', jobTitle: 'Data Analyst', company: 'Summit Research', location: 'Denver, CO', startDate: '2021', endDate: '', isCurrent: true, description: 'Created SQL-based reporting and dashboards for recurring analysis.\nWorked with stakeholders to clarify metrics and data definitions.\nPresented trend summaries and documented assumptions for repeatable analysis.' }, { id: 'preview-6b', jobTitle: 'Reporting Analyst', company: 'Evergreen Services', location: 'Denver, CO', startDate: '2019', endDate: '2021', isCurrent: false, description: 'Maintained scheduled reports and resolved data quality questions.\nPrepared monthly summaries for operations and customer teams.' }],
    education: [{ id: 'preview-edu6', institution: 'Front Range University', degree: 'BS', fieldOfStudy: 'Applied Statistics', startDate: '2016', endDate: '2020' }],
    skills: [{ id: 'preview-d1', name: 'SQL' }, { id: 'preview-d2', name: 'Python' }, { id: 'preview-d3', name: 'Data Visualization' }, { id: 'preview-d4', name: 'Experiment Analysis' }, { id: 'preview-d5', name: 'Pandas' }, { id: 'preview-d6', name: 'Dashboard Design' }, { id: 'preview-d7', name: 'Data Quality' }, { id: 'preview-d8', name: 'Statistical Methods' }],
    projects: [{ id: 'preview-dp', name: 'Customer Retention Analysis', description: 'Explored cohort trends and summarized findings for a product planning review.', url: '' }, { id: 'preview-dp2', name: 'Operations Performance Dashboard', description: 'Combined recurring measures into a dashboard for weekly team reviews.', url: '' }],
    awards: [{ id: 'preview-da', name: 'Applied Data Visualization', issuer: 'Front Range University', date: '2020' }],
    additionalSections: [{ id: 'preview-data-extra', title: 'Selected Research', entries: [{ id: 'preview-data-extra1', title: 'Customer Journey Cohort Study', organization: 'Summit Research', date: '2022', description: 'Compared cohort behavior and prepared a concise set of findings for product partners.', url: '' }] }],
  },
  design: {
    personalInfo: { fullName: 'Sam Ellis', email: 'sam.ellis@email.com', phoneNumber: '(555) 010-5501', address: 'Brooklyn, NY', linkedIn: 'linkedin.com/in/samellis', github: 'samellis.design', photo: '' },
    summary: 'Product designer connecting research, interaction design, and accessible visual systems to make digital tools easier to use.',
    workExperience: [{ id: 'preview-7', jobTitle: 'Product Designer', company: 'Fieldwork Studio', location: 'Brooklyn, NY', startDate: '2022', endDate: '', isCurrent: true, description: 'Led discovery and prototyping for workflow improvements.\nPartnered with engineering to refine and deliver interface patterns.\nPresented design decisions and usability findings to product stakeholders.' }, { id: 'preview-7b', jobTitle: 'UX Design Intern', company: 'Common Ground Studio', location: 'Brooklyn, NY', startDate: '2021', endDate: '2022', isCurrent: false, description: 'Supported user interviews, wireframes, and design QA.\nOrganized component references for a shared design library.' }],
    education: [{ id: 'preview-edu7', institution: 'City Design School', degree: 'BFA', fieldOfStudy: 'Communication Design', startDate: '2017', endDate: '2021' }],
    skills: [{ id: 'preview-c1', name: 'Figma' }, { id: 'preview-c2', name: 'Prototyping' }, { id: 'preview-c3', name: 'User Research' }, { id: 'preview-c4', name: 'Design Systems' }, { id: 'preview-c5', name: 'Interaction Design' }, { id: 'preview-c6', name: 'Usability Testing' }, { id: 'preview-c7', name: 'Accessibility' }, { id: 'preview-c8', name: 'Information Architecture' }],
    projects: [{ id: 'preview-cp', name: 'Accessible Booking Flow', description: 'Redesigned a multi-step booking flow after usability testing and iteration.', url: 'samellis.design/booking' }, { id: 'preview-cp2', name: 'Studio Design System', description: 'Organized reusable patterns and usage guidance to improve cross-product consistency.', url: 'samellis.design/system' }],
    awards: [{ id: 'preview-ca', name: 'Student Design Showcase', issuer: 'City Design School', date: '2021' }],
    additionalSections: [{ id: 'preview-design-extra', title: 'Portfolio Highlights', entries: [{ id: 'preview-design-extra1', title: 'Selected Case Studies', organization: 'Personal Portfolio', date: '2021 – Present', description: 'Showcase of research, interaction design, prototyping, and iterative product work.', url: 'samellis.design' }] }],
  },
  academic: {
    personalInfo: { fullName: 'Alex Parker', email: 'alex.parker@email.com', phoneNumber: '(555) 010-9028', address: 'Madison, WI', linkedIn: 'linkedin.com/in/alexparker', github: '', photo: '' },
    summary: 'Educator and researcher with experience designing inclusive learning experiences and supporting student progress.',
    workExperience: [{ id: 'preview-9', jobTitle: 'Teaching Assistant', company: 'Midwest University', location: 'Madison, WI', startDate: '2022', endDate: '2024', isCurrent: false, description: 'Prepared course materials and facilitated small-group instruction.\nSupported student research and assessment.\nProvided feedback and office-hour support for undergraduate learners.' }, { id: 'preview-9b', jobTitle: 'Education Program Intern', company: 'Madison Learning Center', location: 'Madison, WI', startDate: '2021', endDate: '2022', isCurrent: false, description: 'Assisted with lesson planning and classroom resource preparation.\nHelped coordinate family learning events and program communications.' }],
    education: [{ id: 'preview-edu9', institution: 'Midwest University', degree: 'MA', fieldOfStudy: 'Education', startDate: '2022', endDate: '2024' }, { id: 'preview-edu10', institution: 'North College', degree: 'BA', fieldOfStudy: 'History', startDate: '2018', endDate: '2022' }],
    skills: [{ id: 'preview-ac1', name: 'Curriculum Design' }, { id: 'preview-ac2', name: 'Qualitative Research' }, { id: 'preview-ac3', name: 'Academic Writing' }, { id: 'preview-ac4', name: 'Lesson Planning' }, { id: 'preview-ac5', name: 'Student Assessment' }, { id: 'preview-ac6', name: 'Classroom Facilitation' }],
    projects: [{ id: 'preview-acp', name: 'Community Learning Study', description: 'Co-authored a study exploring accessible learning resources for adult learners.', url: '' }, { id: 'preview-acp2', name: 'Open Course Materials', description: 'Developed and reviewed supplementary resources for an introductory course.', url: '' }],
    awards: [{ id: 'preview-aca', name: 'Graduate Research Fellowship', issuer: 'Midwest University', date: '2023' }, { id: 'preview-aca2', name: 'Teaching Excellence Recognition', issuer: 'Midwest University', date: '2024' }],
    additionalSections: [{ id: 'preview-ac-extra', title: 'Research & Publications', entries: [{ id: 'preview-ac-extra1', title: 'Accessible Learning Resources for Adult Learners', organization: 'Midwest Education Review', date: '2024', description: 'Co-authored research summary examining practical approaches to inclusive course materials.', url: '' }, { id: 'preview-ac-extra2', title: 'Regional Teaching Forum', organization: 'Wisconsin Educators Network', date: '2023', description: 'Presented a workshop on small-group learning and feedback practices.', url: '' }] }],
  },
  marketing: {
    personalInfo: { fullName: 'Drew Bennett', email: 'drew.bennett@email.com', phoneNumber: '(555) 010-1864', address: 'Austin, TX', linkedIn: 'linkedin.com/in/drewbennett', github: 'portfolio.drewbennett.com', photo: '' },
    summary: 'Marketing specialist blending audience research, clear storytelling, and campaign measurement to grow brand engagement.',
    workExperience: [{ id: 'preview-10', jobTitle: 'Content Marketing Specialist', company: 'Orbit Media', location: 'Austin, TX', startDate: '2022', endDate: '', isCurrent: true, description: 'Planned editorial calendars and created cross-channel campaign content.\nReviewed campaign reporting and shared recommendations with partners.\nCoordinated reviews with design, product, and sales teams.' }, { id: 'preview-10b', jobTitle: 'Marketing Coordinator', company: 'Juniper Creative', location: 'Austin, TX', startDate: '2020', endDate: '2022', isCurrent: false, description: 'Supported email campaigns, event promotion, and social content scheduling.\nCompiled performance summaries and maintained campaign documentation.' }],
    education: [{ id: 'preview-edu11', institution: 'Hill Country College', degree: 'BA', fieldOfStudy: 'Communications', startDate: '2017', endDate: '2021' }],
    skills: [{ id: 'preview-m1', name: 'Content Strategy' }, { id: 'preview-m2', name: 'Campaign Analytics' }, { id: 'preview-m3', name: 'Copywriting' }, { id: 'preview-m4', name: 'SEO' }, { id: 'preview-m5', name: 'Email Marketing' }, { id: 'preview-m6', name: 'Editorial Planning' }, { id: 'preview-m7', name: 'Social Media' }, { id: 'preview-m8', name: 'Brand Messaging' }],
    projects: [{ id: 'preview-mp', name: 'Product Launch Campaign', description: 'Coordinated launch messaging and content across web and email channels.', url: '' }, { id: 'preview-mp2', name: 'Customer Story Series', description: 'Produced a set of customer interviews and editorial stories for the company website.', url: '' }],
    awards: [{ id: 'preview-ma', name: 'Content Marketing Certificate', issuer: 'Orbit Learning Program', date: '2022' }],
    additionalSections: [{ id: 'preview-market-extra', title: 'Campaign Highlights', entries: [{ id: 'preview-market-extra1', title: 'Product Launch Editorial', organization: 'Orbit Media', date: '2023', description: 'Developed coordinated messaging and supporting copy for web, email, and partner materials.', url: '' }, { id: 'preview-market-extra2', title: 'Community Newsletter', organization: 'Juniper Creative', date: '2021', description: 'Maintained a monthly editorial calendar and prepared copy for audience updates.', url: '' }] }],
  },
} satisfies Record<string, ResumeData>;

type PreviewProfile = keyof typeof previewProfiles;
interface TemplateOption {
  id: TemplateKey;
  name: string;
  profession: string;
  description: string;
  profile: PreviewProfile;
}
interface TemplateCategory {
  title: string;
  templates: TemplateOption[];
}

const categories: TemplateCategory[] = [
  { title: 'Business & Finance', templates: [
    { id: 'finance', name: 'Financial Analyst', profession: 'Finance · Accounting', description: 'Structured columns for financial experience and credentials.', profile: 'finance' },
    { id: 'executive', name: 'Investment Banker', profession: 'Investment Banking', description: 'Executive hierarchy for deal, analysis, and education details.', profile: 'finance' },
    { id: 'classic', name: 'Classic ATS', profession: 'All professions', description: 'Simple single-column layout designed for easy scanning.', profile: 'business' },
    { id: 'portfolioManager', name: 'Portfolio Manager', profession: 'Investment Management', description: 'Compact finance-oriented layout for credentials and skills.', profile: 'finance' },
    { id: 'corporate', name: 'Corporate Professional', profession: 'Operations · Management', description: 'Formal hierarchy for business roles and career progression.', profile: 'business' },
    { id: 'consulting', name: 'Consultant', profession: 'Strategy · Consulting', description: 'Executive-style presentation for impact and client work.', profile: 'business' },
    { id: 'projectManager', name: 'Project Manager', profession: 'Project · Program Management', description: 'Clear delivery-focused structure for roles and projects.', profile: 'business' },
  ] },
  { title: 'Healthcare', templates: [
    { id: 'registeredNurse', name: 'Registered Nurse', profession: 'Nursing · Clinical Care', description: 'Clinical experience and training take clear priority.', profile: 'healthcare' },
    { id: 'surgeon', name: 'Surgeon', profession: 'Surgery · Medicine', description: 'Clinical training-first format with a focused experience timeline.', profile: 'surgery' },
    { id: 'psychiatrist', name: 'Psychiatrist', profession: 'Mental Health · Medicine', description: 'Calm, readable format for clinical work and credentials.', profile: 'healthcare' },
    { id: 'medicalDoctor', name: 'Medical Doctor', profession: 'Medicine · Healthcare', description: 'Balanced clinical and education sections for medical roles.', profile: 'surgery' },
  ] },
  { title: 'Technology & Data', templates: [
    { id: 'techModern', name: 'Modern Developer', profession: 'Software · IT', description: 'Technical skills and projects in a compact developer layout.', profile: 'technology' },
    { id: 'techMinimal', name: 'Minimal Tech', profession: 'Engineering · Technical', description: 'Spacious single column with a quiet technical style.', profile: 'technology' },
    { id: 'techPro', name: 'Data Analyst', profession: 'Analytics · Data Science', description: 'Skills are prominent and projects are easy to scan.', profile: 'analyst' },
    { id: 'techSupporter', name: 'IT Support', profession: 'IT · Support', description: 'Practical two-column format for experience and tools.', profile: 'technology' },
    { id: 'techArch', name: 'Solutions Architect', profession: 'Cloud · Architecture', description: 'Minimal layout for technical work and systems projects.', profile: 'technology' },
    { id: 'techManager', name: 'Engineering Manager', profession: 'Technology Leadership', description: 'Leadership-oriented split layout for teams and outcomes.', profile: 'business' },
    { id: 'dataScientist', name: 'Data Scientist', profession: 'Data · Research', description: 'Analytical skills and project work lead the reading order.', profile: 'analyst' },
  ] },
  { title: 'Creative & Graduate', templates: [
    { id: 'startup', name: 'Startup & Growth', profession: 'Marketing · Business Development', description: 'Expressive accent column for versatile growth roles.', profile: 'business' },
    { id: 'uxDesigner', name: 'UX / UI Designer', profession: 'Design · Creative', description: 'Distinctive creative layout with readable experience details.', profile: 'design' },
    { id: 'marketing', name: 'Marketing & Content', profession: 'Marketing · Communications', description: 'Editorial-inspired format for campaigns, content, and results.', profile: 'marketing' },
    { id: 'sales', name: 'Sales & Business Development', profession: 'Sales · Partnerships', description: 'Achievement-led hierarchy for client and revenue-facing roles.', profile: 'business' },
    { id: 'humanResources', name: 'People & HR', profession: 'Human Resources · Operations', description: 'Formal, people-focused structure for talent and operations roles.', profile: 'business' },
    { id: 'teacher', name: 'Teaching Professional', profession: 'Education · Teaching', description: 'Education-first structure for teaching, curriculum, and student support.', profile: 'academic' },
    { id: 'academicResearcher', name: 'Academic Research', profession: 'Research · Higher Education', description: 'Academic hierarchy emphasizes education, research projects, and credentials.', profile: 'academic' },
    { id: 'graduate', name: 'Graduate & Fresher', profession: 'Entry-level · New graduate', description: 'Education and projects lead for candidates building early experience.', profile: 'academic' },
    { id: 'engineer', name: 'Engineering Professional', profession: 'Engineering · Technical', description: 'Technical, precise layout for engineering experience and project work.', profile: 'technology' },
    { id: 'accountant', name: 'Accounting Professional', profession: 'Accounting · Audit', description: 'Traditional finance format for accounting and credentials.', profile: 'finance' },
  ] },
];

const galleryOrder: SectionKey[] = ['personalInfo', 'summary', 'workExperience', 'education', 'skills', 'projects', 'awards'];
interface TemplateGalleryProps {
  activeTemplate: TemplateKey;
  onSelectTemplate: (templateId: TemplateKey) => void;
}

export const TemplateGalleryRedesigned: React.FC<TemplateGalleryProps> = ({ activeTemplate, onSelectTemplate }) => {
  const [previewTemplate, setPreviewTemplate] = useState<TemplateOption | null>(null);

  useEffect(() => {
    if (!previewTemplate) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreviewTemplate(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [previewTemplate]);

  const renderResume = (template: TemplateOption) => <ResumePreview
    resumeData={previewProfiles[template.profile]}
    sectionOrder={galleryOrder}
    template={template.id}
  />;

  return <>
    <div className="space-y-10">
      {categories.map(category => <section key={category.title}>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">{category.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">Choose a layout designed around how your experience is read.</p>
          </div>
          <span className="hidden rounded-full border px-3 py-1 text-xs text-muted-foreground sm:inline">{category.templates.length} layouts</span>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {category.templates.map(template => <Card key={template.id} className={`overflow-hidden transition-all duration-200 ${activeTemplate === template.id ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'hover:-translate-y-0.5 hover:shadow-lg'}`}>
            <div className="relative flex h-[400px] items-start justify-center overflow-hidden border-b bg-slate-100 p-3 dark:bg-slate-900">
              <div aria-hidden="true" className="pointer-events-none w-[816px] shrink-0 origin-top scale-[0.35] shadow-xl">{renderResume(template)}</div>
              {activeTemplate === template.id && <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold text-primary-foreground shadow">Selected</span>}
              <button type="button" className="absolute inset-0 cursor-zoom-in" aria-label={`Preview ${template.name} resume layout`} onClick={() => setPreviewTemplate(template)} />
            </div>
            <CardContent className="p-4">
              <div className="min-h-[82px]">
                <h3 className="font-semibold text-foreground">{template.name}</h3>
                <p className="mt-1 text-xs font-medium text-primary">{template.profession}</p>
                <p className="mt-1 text-sm leading-snug text-muted-foreground">{template.description}</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => setPreviewTemplate(template)}>Preview</Button>
                <Button size="sm" onClick={() => onSelectTemplate(template.id)}>{activeTemplate === template.id ? 'Selected' : 'Use template'}</Button>
              </div>
            </CardContent>
          </Card>)}
        </div>
      </section>)}
    </div>

    {previewTemplate && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/75 p-3 sm:p-6" onMouseDown={event => { if (event.target === event.currentTarget) setPreviewTemplate(null); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="template-preview-title" className="flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border bg-background shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b p-4 sm:p-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-primary">{previewTemplate.profession}</p>
            <h2 id="template-preview-title" className="mt-1 text-xl font-bold">{previewTemplate.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{previewTemplate.description}</p>
          </div>
          <Button variant="ghost" size="icon" aria-label="Close template preview" onClick={() => setPreviewTemplate(null)}>×</Button>
        </header>
        <div className="min-h-0 overflow-auto bg-slate-100 p-4 dark:bg-slate-950 sm:p-6">
          <div className="mx-auto w-[816px] origin-top scale-[0.42] shadow-xl sm:scale-[0.62]">{renderResume(previewTemplate)}</div>
        </div>
        <footer className="flex justify-end gap-3 border-t p-4">
          <Button variant="outline" onClick={() => setPreviewTemplate(null)}>Close</Button>
          <Button onClick={() => { onSelectTemplate(previewTemplate.id); setPreviewTemplate(null); }}>Use this template</Button>
        </footer>
      </section>
    </div>}
  </>;
};
