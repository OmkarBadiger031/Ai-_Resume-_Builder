
import React, { useState, useEffect } from 'react';
import { ResumeBuilder } from './components/ResumeBuilder';
import { Sparkles, BuilderIcon, SunIcon, MoonIcon } from './components/icons';
import { Button } from './components/ui/Button';
import { AuthPage } from './components/AuthPage';
import type { User, ResumeData, TemplateKey } from './types';
import { AIAssistantModal } from './components/AIAssistantModal';

// --- START: Sample Resume Data for Templates ---

const softwareEngineerData: ResumeData = {
  personalInfo: {
    fullName: 'Jane Smith',
    email: 'jane.smith@email.com',
    phoneNumber: '123-456-7890',
    address: 'San Francisco, CA',
    linkedIn: 'https://linkedin.com/in/janesmith-dev',
    github: 'https://github.com/janesmith',
    photo: '',
  },
  summary: 'Innovative and deadline-driven Software Engineer with 5+ years of experience designing and developing user-centered digital products from initial concept to final, polished deliverable.',
  workExperience: [
    { id: '1', jobTitle: 'Senior Software Engineer', company: 'Tech Solutions Inc.', location: 'San Francisco, CA', startDate: '2020-01-15', endDate: '', isCurrent: true, description: '- Led a team of 5 engineers in developing a new microservices architecture, improving system scalability by 40%.\n- Optimized application performance, resulting in a 25% reduction in page load times.\n- Mentored junior developers, fostering a culture of learning and continuous improvement.', },
    { id: '2', jobTitle: 'Software Engineer', company: 'Digital Innovations LLC', location: 'Palo Alto, CA', startDate: '2018-06-01', endDate: '2019-12-31', isCurrent: false, description: '- Developed and maintained front-end features for a high-traffic e-commerce platform using React and Redux.\n- Collaborated with UX/UI designers to implement responsive and accessible user interfaces.', },
  ],
  education: [ { id: '1', institution: 'State University', degree: 'Bachelor of Science', fieldOfStudy: 'Computer Science', startDate: '2014-08-25', endDate: '2018-05-12', } ],
  skills: [ { id: '1', name: 'React' }, { id: '2', name: 'TypeScript' }, { id: '3', name: 'Node.js' }, { id: '4', name: 'Python' }, { id: '5', name: 'AWS' }, { id: '6', name: 'Docker' }, ],
  projects: [ { id: '1', name: 'Personal Portfolio Website', description: 'Designed and developed a responsive personal portfolio using React and Tailwind CSS, hosted on Vercel.', url: 'https://janesmith.dev' } ],
  awards: [ { id: '1', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', date: '2021-03-10' } ]
};

const financialAnalystData: ResumeData = {
    personalInfo: { fullName: 'Michael Chen', email: 'michael.chen@email.com', phoneNumber: '212-555-0192', address: 'New York, NY', linkedIn: 'https://linkedin.com/in/michaelchen-finance', github: '', photo: '' },
    summary: 'Detail-oriented Financial Analyst with 4 years of experience in financial modeling, forecasting, and data analysis. Proven ability to provide actionable insights to support strategic decision-making and drive profitability.',
    workExperience: [ { id: '1', jobTitle: 'Financial Analyst', company: 'J.P. Morgan Chase', location: 'New York, NY', startDate: '2020-07-01', endDate: '', isCurrent: true, description: '- Built complex financial models to support valuation, planning, and forecasting activities.\n- Performed variance analysis and identified key performance drivers, presenting findings to senior management.\n- Automated reporting processes using VBA, reducing manual effort by 20 hours per week.' } ],
    education: [ { id: '1', institution: 'New York University', degree: 'Bachelor of Science', fieldOfStudy: 'Finance', startDate: '2016-09-01', endDate: '2020-05-20' } ],
    skills: [ { id: '1', name: 'Financial Modeling' }, { id: '2', name: 'Excel & VBA' }, { id: '3', name: 'SQL' }, { id: '4', name: 'Bloomberg Terminal' }, { id: '5', name: 'Valuation (DCF, LBO)' }, { id: '6', name: 'Risk Analysis' } ],
    projects: [ { id: '1', name: 'Equity Valuation Model for Tech Sector', description: 'Developed a comprehensive DCF model to evaluate emerging tech stocks, identifying three undervalued companies that subsequently outperformed the market by 15%.', url: '' } ],
    awards: [ { id: '1', name: 'CFA Level II Candidate', issuer: 'CFA Institute', date: '2023-08-01' } ]
};

const investmentBankerData: ResumeData = {
    personalInfo: { fullName: 'Alexandra Volkov', email: 'alex.volkov@email.com', phoneNumber: '312-555-0234', address: 'Chicago, IL', linkedIn: 'https://linkedin.com/in/alexvolkov-ib', github: '', photo: '' },
    summary: 'Results-driven Investment Banking Analyst with expertise in M&A advisory, LBO modeling, and due diligence for middle-market transactions. Adept at creating compelling pitch materials and performing rigorous valuation analyses.',
    workExperience: [ { id: '1', jobTitle: 'Investment Banking Analyst', company: 'Goldman Sachs', location: 'Chicago, IL', startDate: '2021-06-15', endDate: '', isCurrent: true, description: '- Created detailed financial models and valuation analyses (DCF, LBO, comparable companies) for M&A transactions.\n- Developed pitch books and other marketing materials for client presentations.\n- Supported senior bankers in all phases of deal execution, from origination to closing.' } ],
    education: [ { id: '1', institution: 'University of Chicago Booth School of Business', degree: 'Master of Business Administration (MBA)', fieldOfStudy: 'Finance, Accounting', startDate: '2019-09-01', endDate: '2021-06-01' } ],
    skills: [ { id: '1', name: 'Mergers & Acquisitions (M&A)' }, { id: '2', name: 'LBO Modeling' }, { id: '3', name: 'Due Diligence' }, { id: '4', name: 'Financial Modeling' }, { id: '5', name: 'Capital Markets' }, { id: '6', name: 'Pitch Book Creation' } ],
    projects: [],
    awards: [ { id: '1', name: 'Series 79 & 63', issuer: 'FINRA', date: '2021-08-15' } ]
};

const accountantData: ResumeData = {
    personalInfo: { fullName: 'David Rodriguez', email: 'david.r@email.com', phoneNumber: '404-555-1087', address: 'Atlanta, GA', linkedIn: 'https://linkedin.com/in/davidrodriguez-cpa', github: '', photo: '' },
    summary: 'Certified Public Accountant (CPA) with over 6 years of experience in public accounting and corporate finance. Strong background in financial reporting, auditing, and tax compliance, with a keen eye for detail and accuracy.',
    workExperience: [ { id: '1', jobTitle: 'Senior Accountant', company: 'Deloitte', location: 'Atlanta, GA', startDate: '2018-09-01', endDate: '', isCurrent: true, description: '- Performed financial statement audits for clients in the manufacturing and retail sectors.\n- Prepared corporate and partnership tax returns, ensuring compliance with federal and state regulations.\n- Assisted in the implementation of a new ERP system, improving financial reporting efficiency by 30%.' } ],
    education: [ { id: '1', institution: 'University of Georgia', degree: 'Master of Accountancy', fieldOfStudy: 'Accounting', startDate: '2017-08-20', endDate: '2018-05-15' } ],
    skills: [ { id: '1', name: 'GAAP' }, { id: '2', name: 'Tax Preparation' }, { id: '3', name: 'Auditing' }, { id: '4', name: 'QuickBooks' }, { id: '5', name: 'Financial Reporting' }, { id: '6', name: 'SOX Compliance' } ],
    projects: [],
    awards: [ { id: '1', name: 'Certified Public Accountant (CPA)', issuer: 'Georgia State Board of Accountancy', date: '2019-11-20' } ]
};

const portfolioManagerData: ResumeData = {
    personalInfo: { fullName: 'Sophia Loren', email: 'sophia.loren@email.com', phoneNumber: '617-555-0311', address: 'Boston, MA', linkedIn: 'https://linkedin.com/in/sophialoren-pm', github: '', photo: '' },
    summary: 'Experienced Portfolio Manager with a 10-year track record of outperforming benchmarks through rigorous quantitative analysis and strategic asset allocation. Manages a $750M multi-asset fund with a focus on sustainable growth.',
    workExperience: [ { id: '1', jobTitle: 'Portfolio Manager', company: 'BlackRock', location: 'Boston, MA', startDate: '2015-03-01', endDate: '', isCurrent: true, description: '- Developed and executed investment strategies for a $750M large-cap equity fund, achieving a 12% annualized return.\n- Conducted in-depth market research and quantitative analysis to identify investment opportunities.\n- Presented portfolio performance and market outlook to institutional clients and stakeholders.' } ],
    education: [ { id: '1', institution: 'Harvard University', degree: 'Master in Finance', fieldOfStudy: 'Finance', startDate: '2013-09-01', endDate: '2015-01-25' } ],
    skills: [ { id: '1', name: 'Portfolio Management' }, { id: '2', name: 'Asset Allocation' }, { id: '3', name: 'Risk Management' }, { id: '4', name: 'Quantitative Analysis' }, { id: '5', name: 'CFA Charterholder' }, { id: '6', name: 'Bloomberg Terminal' } ],
    projects: [],
    awards: [ { id: '1', name: 'Chartered Financial Analyst (CFA)', issuer: 'CFA Institute', date: '2017-08-22' } ]
};

const startupData: ResumeData = {
    personalInfo: { fullName: 'Leo Fitz', email: 'leo.fitz@email.com', phoneNumber: '512-555-0456', address: 'Austin, TX', linkedIn: 'https://linkedin.com/in/leofitz-growth', github: '', photo: '' },
    summary: 'Versatile and energetic marketing professional with 5 years of experience in growth marketing and business development within fast-paced startup environments. Proven ability to drive user acquisition and revenue growth through data-driven strategies.',
    workExperience: [ { id: '1', jobTitle: 'Growth Marketing Lead', company: 'Innovatech Startup', location: 'Austin, TX', startDate: '2019-11-01', endDate: '', isCurrent: true, description: '- Led user acquisition campaigns across multiple digital channels (SEO, SEM, Social), increasing sign-ups by 300% in one year.\n- Optimized conversion funnels through rigorous A/B testing and user feedback analysis.\n- Developed and managed a content marketing strategy that grew organic traffic by 150%.' } ],
    education: [ { id: '1', institution: 'University of Texas at Austin', degree: 'Bachelor of Business Administration', fieldOfStudy: 'Marketing', startDate: '2013-08-25', endDate: '2017-05-18' } ],
    skills: [ { id: '1', name: 'Agile Methodologies' }, { id: '2', name: 'Growth Hacking' }, { id: '3', name: 'SEO/SEM' }, { id: '4', name: 'A/B Testing' }, { id: '5', name: 'Product-Led Growth' }, { id: '6', name: 'User Acquisition & Retention' } ],
    projects: [],
    awards: []
};

const consultantData: ResumeData = {
    personalInfo: { fullName: 'Chloe Dubois', email: 'chloe.dubois@email.com', phoneNumber: '415-555-0789', address: 'San Francisco, CA', linkedIn: 'https://linkedin.com/in/chloedubois-consultant', github: '', photo: '' },
    summary: 'Strategic Consultant with 5 years of experience at a top-tier firm, specializing in market entry strategy and business process improvement for Fortune 500 clients in the tech industry. Adept at solving complex problems and driving impactful change.',
    workExperience: [ { id: '1', jobTitle: 'Management Consultant', company: 'McKinsey & Company', location: 'San Francisco, CA', startDate: '2019-08-01', endDate: '', isCurrent: true, description: '- Led a team of analysts on a client engagement to optimize supply chain logistics, resulting in $15M in annual savings.\n- Conducted comprehensive market analysis to inform a client’s international expansion strategy.\n- Developed and presented strategic recommendations to C-level executives.' } ],
    education: [ { id: '1', institution: 'Stanford Graduate School of Business', degree: 'MBA', fieldOfStudy: 'Strategy', startDate: '2017-09-01', endDate: '2019-06-10' } ],
    skills: [ { id: '1', name: 'Strategic Planning' }, { id: '2', name: 'Market Analysis' }, { id: '3', name: 'Business Process Improvement' }, { id: '4', name: 'Change Management' }, { id: '5', name: 'Stakeholder Engagement' }, { id: '6', name: 'Data Analysis & Visualization' } ],
    projects: [],
    awards: []
};

const corporateData: ResumeData = {
    personalInfo: { fullName: 'Benjamin Carter', email: 'ben.carter@email.com', phoneNumber: '704-555-0123', address: 'Charlotte, NC', linkedIn: 'https://linkedin.com/in/bencarter-strategy', github: '', photo: '' },
    summary: 'Driven Corporate Strategy Manager with over 8 years of experience in long-range planning, competitive analysis, and M&A integration for a multinational corporation. Excels at translating high-level goals into actionable strategic initiatives.',
    workExperience: [ { id: '1', jobTitle: 'Corporate Strategy Manager', company: 'Bank of America', location: 'Charlotte, NC', startDate: '2016-05-01', endDate: '', isCurrent: true, description: '- Developed and maintained the company’s 5-year strategic plan in collaboration with business unit leaders.\n- Analyzed market trends and competitor activities to identify strategic risks and opportunities.\n- Supported M&A due diligence and led post-merger integration workstreams.' } ],
    education: [ { id: '1', institution: 'Duke University - Fuqua School of Business', degree: 'MBA', fieldOfStudy: 'Corporate Strategy', startDate: '2014-08-20', endDate: '2016-05-12' } ],
    skills: [ { id: '1', name: 'Corporate Strategy' }, { id: '2', name: 'Project Management' }, { id: '3', name: 'Regulatory Compliance' }, { id: '4', name: 'Contract Negotiation' }, { id: '5', name: 'Budget Management' }, { id: '6', name: 'ERP Systems' } ],
    projects: [],
    awards: []
};

const projectManagerData: ResumeData = {
    personalInfo: { fullName: 'Isabella Rossi', email: 'isabella.rossi@email.com', phoneNumber: '206-555-0888', address: 'Seattle, WA', linkedIn: 'https://linkedin.com/in/isabellarossi-pmp', github: '', photo: '' },
    summary: 'PMP-certified Senior Project Manager with a decade of experience leading and delivering complex, cross-functional technology projects on time and within budget. Expert in Agile methodologies and stakeholder communication.',
    workExperience: [ { id: '1', jobTitle: 'Senior IT Project Manager', company: 'Amazon', location: 'Seattle, WA', startDate: '2017-02-10', endDate: '', isCurrent: true, description: '- Managed the end-to-end lifecycle of 10+ software development projects with budgets up to $5M.\n- Coordinated with cross-functional teams of engineers, designers, and marketers to ensure project alignment.\n- Implemented Agile/Scrum processes that improved team velocity by 25%.' } ],
    education: [ { id: '1', institution: 'University of Washington', degree: 'Bachelor of Science', fieldOfStudy: 'Information Technology', startDate: '2009-09-20', endDate: '2013-06-15' } ],
    skills: [ { id: '1', name: 'Agile & Scrum Methodologies' }, { id: '2', name: 'Jira & Confluence' }, { id: '3', name: 'Risk Management' }, { id: '4', name: 'Budgeting & Forecasting' }, { id: '5', name: 'Stakeholder Communication' }, { id: '6', name: 'Process Improvement' } ],
    projects: [],
    awards: [ { id: '1', name: 'Project Management Professional (PMP)', issuer: 'Project Management Institute (PMI)', date: '2016-10-05' } ]
};

const registeredNurseData: ResumeData = {
    personalInfo: { fullName: 'Emily Tran', email: 'emily.tran@email.com', phoneNumber: '720-555-0345', address: 'Denver, CO', linkedIn: 'https://linkedin.com/in/emilytran-rn', github: '', photo: '' },
    summary: 'Compassionate and skilled Registered Nurse with 5 years of experience in fast-paced hospital emergency departments. Dedicated to providing high-quality, patient-centered care and collaborating effectively with medical teams.',
    workExperience: [ { id: '1', jobTitle: 'Registered Nurse, Emergency Department', company: 'Denver General Hospital', location: 'Denver, CO', startDate: '2019-06-01', endDate: '', isCurrent: true, description: '- Assessed and triaged patients with varying acuity levels in a high-volume Level I Trauma Center.\n- Administered medications, performed wound care, and assisted with critical procedures.\n- Educated patients and their families on treatment plans and post-discharge care.' } ],
    education: [ { id: '1', institution: 'University of Colorado', degree: 'Bachelor of Science in Nursing (BSN)', fieldOfStudy: 'Nursing', startDate: '2015-08-24', endDate: '2019-05-18' } ],
    skills: [ { id: '1', name: 'Patient Assessment & Care' }, { id: '2', name: 'Electronic Health Records (EHR)' }, { id: '3', name: 'Medication Administration' }, { id: '4', name: 'IV Therapy & Phlebotomy' }, { id: '5', name: 'ACLS & BLS Certified' }, { id: '6', name: 'Wound Care Management' } ],
    projects: [],
    awards: [ { id: '1', name: 'Registered Nurse (RN)', issuer: 'Colorado Board of Nursing', date: '2019-07-15' } ]
};

const surgeonData: ResumeData = {
    personalInfo: { fullName: 'Dr. Marcus Cole', email: 'marcus.cole.md@email.com', phoneNumber: '215-555-0999', address: 'Philadelphia, PA', linkedIn: 'https://linkedin.com/in/marcuscole-md', github: '', photo: '' },
    summary: 'Board-certified General Surgeon with over 12 years of experience in minimally invasive and robotic surgery. Committed to patient safety, excellent surgical outcomes, and advancing surgical techniques through clinical research.',
    workExperience: [ { id: '1', jobTitle: 'General Surgeon', company: 'Penn Medicine', location: 'Philadelphia, PA', startDate: '2012-07-01', endDate: '', isCurrent: true, description: '- Performed a high volume of complex laparoscopic and robotic surgeries with a focus on colorectal procedures.\n- Provided comprehensive pre- and post-operative care, resulting in a 15% reduction in complication rates.\n- Mentored surgical residents and published 5 articles in peer-reviewed journals.' } ],
    education: [ { id: '1', institution: 'Johns Hopkins School of Medicine', degree: 'Doctor of Medicine (MD)', fieldOfStudy: 'Medicine', startDate: '2004-08-20', endDate: '2008-05-22' } ],
    skills: [ { id: '1', name: 'Advanced Surgical Procedures' }, { id: '2', name: 'Laparoscopic & Robotic Surgery' }, { id: '3', name: 'Patient Consultation' }, { id: '4', name: 'Post-operative Care' }, { id: '5', name: 'Medical Compliance' }, { id: '6', name: 'Team Leadership' } ],
    projects: [],
    awards: [ { id: '1', name: 'Fellow of the American College of Surgeons (FACS)', issuer: 'American College of Surgeons', date: '2015-10-10' } ]
};

const psychiatristData: ResumeData = {
    personalInfo: { fullName: 'Dr. Elena Petrova', email: 'elena.petrova.md@email.com', phoneNumber: '650-555-0678', address: 'Palo Alto, CA', linkedIn: 'https://linkedin.com/in/elenapetrova-md', github: '', photo: '' },
    summary: 'Empathetic and knowledgeable Psychiatrist with expertise in diagnosing and treating a wide range of mental health disorders through evidence-based psychotherapy and psychopharmacology. Specializes in adolescent and young adult mental health.',
    workExperience: [ { id: '1', jobTitle: 'Staff Psychiatrist', company: 'Stanford Health Care', location: 'Palo Alto, CA', startDate: '2017-09-01', endDate: '', isCurrent: true, description: '- Conducted comprehensive psychiatric evaluations for patients aged 16-25.\n- Developed and managed holistic treatment plans incorporating medication, therapy, and lifestyle changes.\n- Provided individual and group therapy using CBT and DBT modalities.' } ],
    education: [ { id: '1', institution: 'Yale School of Medicine', degree: 'Psychiatry Residency', fieldOfStudy: 'Psychiatry', startDate: '2013-07-01', endDate: '2017-06-30' } ],
    skills: [ { id: '1', name: 'Psychiatric Evaluation' }, { id: '2', name: 'Psychotherapy (CBT, DBT)' }, { id: '3', name: 'DSM-5 Diagnosis' }, { id: '4', name: 'Psychopharmacology' }, { id: '5', name: 'Crisis Intervention' }, { id: '6', name: 'Telepsychiatry Platforms' } ],
    projects: [],
    awards: [ { id: '1', name: 'Board Certified in Psychiatry', issuer: 'American Board of Psychiatry and Neurology', date: '2017-10-25' } ]
};

const dataScientistData: ResumeData = {
    personalInfo: { fullName: 'Kenji Tanaka', email: 'kenji.tanaka@email.com', phoneNumber: '408-555-1122', address: 'San Jose, CA', linkedIn: 'https://linkedin.com/in/kenjitanaka-ds', github: 'https://github.com/kenjitanaka', photo: '' },
    summary: 'Data Scientist with a strong background in machine learning, statistical analysis, and data visualization. Passionate about leveraging data to solve complex business problems and drive product innovation.',
    workExperience: [ { id: '1', jobTitle: 'Data Scientist', company: 'Netflix', location: 'Los Gatos, CA', startDate: '2020-02-01', endDate: '', isCurrent: true, description: '- Built and deployed machine learning models to personalize content recommendations, improving user engagement by 10%.\n- Performed exploratory data analysis on massive datasets to uncover user behavior patterns.\n- Collaborated with product managers to design and analyze A/B tests for new features.' } ],
    education: [ { id: '1', institution: 'Carnegie Mellon University', degree: 'Master of Science', fieldOfStudy: 'Machine Learning', startDate: '2018-09-01', endDate: '2019-12-15' } ],
    skills: [ { id: '1', name: 'Python (Pandas, Scikit-learn)' }, { id: '2', name: 'R' }, { id: '3', name: 'SQL' }, { id: '4', name: 'Machine Learning' }, { id: '5', name: 'TensorFlow/PyTorch' }, { id: '6', name: 'Data Visualization (Tableau)' } ],
    projects: [ { id: '1', name: 'Kaggle Competition: Titanic Survival Prediction', description: 'Achieved a top 5% ranking by developing a gradient boosting model with advanced feature engineering.', url: '' } ],
    awards: []
};

const uxDesignerData: ResumeData = {
    personalInfo: { fullName: 'Aisha Khan', email: 'aisha.khan@email.com', phoneNumber: '917-555-0555', address: 'Brooklyn, NY', linkedIn: 'https://linkedin.com/in/aishakhan-ux', github: '', photo: '' },
    summary: 'Creative and user-centric UX/UI Designer with a passion for crafting intuitive and beautiful digital experiences. Proficient in the end-to-end design process, from user research and wireframing to high-fidelity prototyping and usability testing.',
    workExperience: [ { id: '1', jobTitle: 'UX/UI Designer', company: 'Spotify', location: 'New York, NY', startDate: '2019-07-01', endDate: '', isCurrent: true, description: '- Led the redesign of the mobile app’s search functionality, resulting in a 20% increase in user satisfaction scores.\n- Conducted user research, including interviews and usability tests, to inform design decisions.\n- Created wireframes, prototypes, and high-fidelity mockups using Figma, and contributed to the internal design system.' } ],
    education: [ { id: '1', institution: 'Pratt Institute', degree: 'Bachelor of Fine Arts (BFA)', fieldOfStudy: 'Communications Design', startDate: '2015-09-01', endDate: '2019-05-20' } ],
    skills: [ { id: '1', name: 'Figma' }, { id: '2', name: 'Sketch' }, { id: '3', name: 'Adobe XD' }, { id: '4', name: 'User Research' }, { id: '5', name: 'Prototyping & Wireframing' }, { id: '6', name: 'Design Systems' } ],
    projects: [ { id: '1', name: 'Personal Portfolio', description: 'My design portfolio showcasing a range of projects from mobile apps to responsive websites.', url: 'https://aishakhan.design' } ],
    awards: []
};

const itSupportData: ResumeData = {
    personalInfo: { fullName: 'Marco Diaz', email: 'marco.diaz@email.com', phoneNumber: '305-555-0321', address: 'Miami, FL', linkedIn: 'https://linkedin.com/in/marcodiaz-itsupport', github: '', photo: '' },
    summary: 'Customer-focused IT Support Specialist with 4 years of experience resolving technical issues in both hardware and software. Skilled in troubleshooting, system administration, and providing excellent user support in a corporate environment.',
    workExperience: [ { id: '1', jobTitle: 'IT Support Specialist', company: 'Global Tech Corp', location: 'Miami, FL', startDate: '2020-03-01', endDate: '', isCurrent: true, description: '- Provided Tier 1 and Tier 2 technical support to over 500 employees, resolving 95% of tickets within SLA.\n- Managed user accounts, permissions, and software licensing using Active Directory and Okta.\n- Onboarded new hires by setting up hardware, software, and providing initial IT training.' } ],
    education: [ { id: '1', institution: 'Florida International University', degree: 'Associate of Science', fieldOfStudy: 'Information Technology', startDate: '2018-01-10', endDate: '2019-12-20' } ],
    skills: [ { id: '1', name: 'Troubleshooting' }, { id: '2', name: 'Help Desk Software (Zendesk)' }, { id: '3', name: 'Active Directory' }, { id: '4', name: 'Network Configuration' }, { id: '5', name: 'Hardware & Software Installation' }, { id: '6', name: 'Customer Service' } ],
    projects: [],
    awards: [ { id: '1', name: 'CompTIA A+ Certified', issuer: 'CompTIA', date: '2020-02-15' } ]
};

const solutionsArchitectData: ResumeData = {
    ...softwareEngineerData,
    personalInfo: { ...softwareEngineerData.personalInfo, fullName: 'Chen Wei', email: 'chen.wei@email.com' },
    summary: 'Solutions Architect with over 10 years of experience in designing and implementing scalable, secure, and cost-effective cloud solutions on AWS and Azure. Expert in translating business requirements into technical architecture.',
    workExperience: [ { id: '1', jobTitle: 'Solutions Architect', company: 'Amazon Web Services', location: 'Seattle, WA', startDate: '2018-05-01', endDate: '', isCurrent: true, description: '- Designed and deployed cloud-native architectures for enterprise clients, leading to a 30% reduction in infrastructure costs.\n- Provided technical guidance and best practices to clients on topics such as serverless computing, containers, and data analytics.\n- Led proof-of-concept projects to demonstrate the value of new cloud services.' } ],
    skills: [ { id: '1', name: 'System Design' }, { id: '2', name: 'Cloud Architecture (AWS/GCP/Azure)' }, { id: '3', name: 'Microservices' }, { id: '4', name: 'DevOps & CI/CD' }, { id: '5', name: 'Infrastructure as Code (Terraform)' }, { id: '6', name: 'Solutioning' } ],
};

const engineeringManagerData: ResumeData = {
    ...softwareEngineerData,
    personalInfo: { ...softwareEngineerData.personalInfo, fullName: 'Sarah Connor', email: 'sarah.connor@email.com' },
    summary: 'Experienced Engineering Manager with a track record of building and leading high-performing software development teams. Passionate about fostering a positive engineering culture, mentoring developers, and delivering high-quality products.',
    workExperience: [ { id: '1', jobTitle: 'Engineering Manager', company: 'Cyberdyne Systems', location: 'Sunnyvale, CA', startDate: '2019-10-01', endDate: '', isCurrent: true, description: '- Managed a team of 12 full-stack engineers, responsible for hiring, performance management, and career development.\n- Led the development of a next-generation AI platform, delivering the project on-time and on-budget.\n- Improved team productivity by 20% by introducing streamlined agile processes and reducing technical debt.' } ],
    skills: [ { id: '1', name: 'Team Leadership' }, { id: '2', name: 'Agile Project Management' }, { id: '3', name: 'System Architecture' }, { id: '4', name: 'Recruiting & Hiring' }, { id: '5', name: 'Technical Strategy' }, { id: '6', name: 'Budget Management' } ],
};

export const templateDataMap: Partial<Record<TemplateKey, ResumeData>> = {
    // Finance
    'finance': financialAnalystData,
    'executive': investmentBankerData,
    'classic': accountantData,
    'portfolioManager': portfolioManagerData,
    // Business
    'startup': startupData,
    'consulting': consultantData,
    'corporate': corporateData,
    'projectManager': projectManagerData,
    // Healthcare
    'registeredNurse': registeredNurseData,
    'surgeon': surgeonData,
    'psychiatrist': psychiatristData,
    'medicalDoctor': registeredNurseData, // Using RN as a base for general MD
    // Technology
    'techModern': softwareEngineerData,
    'techMinimal': softwareEngineerData,
    'techPro': softwareEngineerData,
    'techSupporter': itSupportData,
    'techArch': solutionsArchitectData,
    'techManager': engineeringManagerData,
    'dataScientist': dataScientistData,
    'uxDesigner': uxDesignerData,
};

// --- END: Sample Resume Data for Templates ---

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData>(softwareEngineerData);
  const [isAssistantModalOpen, setIsAssistantModalOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Check for a logged-in user in session storage on initial load
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    
    // Check for saved theme preference
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);

  }, []);

  useEffect(() => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('currentUser');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:to-slate-800 transition-colors duration-300 flex flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 px-4 md:px-6">
          <div className="flex gap-6 md:gap-10">
            <a href="#" className="flex items-center space-x-2">
              <BuilderIcon className="h-6 w-6 text-primary" />
              <span className="inline-block font-bold">AI Resume Builder</span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
             {currentUser && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
                  Welcome,{' '}
                  <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                    {currentUser.fullName.split(' ')[0]}!
                  </span>
                </span>
                 <Button variant="default" size="sm" onClick={() => setIsAssistantModalOpen(true)}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  AI Assistant
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                  {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                </Button>
                <Button variant="destructive" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="flex-grow">
        {currentUser ? (
          <ResumeBuilder 
            resumeData={resumeData} 
            setResumeData={setResumeData} 
            templateDataMap={templateDataMap}
          />
        ) : (
          <AuthPage onLogin={handleLogin} />
        )}
      </main>
      <footer className="bg-muted py-4 border-t">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
           <p>
            Crafted with{' '}
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              AI-Powered Precision
            </span>{' '}
            to help you land your dream job.
          </p>
          <p className="text-xs mt-1">
            © {new Date().getFullYear()}{' '}
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              AI Resume Builder
            </span>
            . All Rights Reserved.
          </p>
        </div>
      </footer>
      {isAssistantModalOpen && (
        <AIAssistantModal 
          isOpen={isAssistantModalOpen}
          onClose={() => setIsAssistantModalOpen(false)}
          resumeData={resumeData}
        />
      )}
    </div>
  );
};

export default App;
