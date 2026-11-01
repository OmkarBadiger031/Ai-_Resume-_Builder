import React from 'react';
import type { ResumeData, SectionKey, TemplateKey } from '../types';
import { ProfessionLayout, type ResumeLayout } from './templates/ProfessionLayouts';

interface ResumePreviewProps {
  resumeData: ResumeData;
  sectionOrder: SectionKey[];
  template: TemplateKey;
}

const templateLayouts: Record<TemplateKey, ResumeLayout> = {
  classic: 'classic',
  executive: 'executive',
  corporate: 'corporate',
  consulting: 'consultant',
  finance: 'finance',
  registeredNurse: 'nurse',
  startup: 'creative',
  surgeon: 'surgeon',
  psychiatrist: 'clinical',
  techModern: 'developer',
  techMinimal: 'minimal',
  techPro: 'data',
  techSupporter: 'support',
  techArch: 'architect',
  techManager: 'executive',
  portfolioManager: 'portfolio',
  projectManager: 'corporate',
  medicalDoctor: 'clinical',
  dataScientist: 'data',
  uxDesigner: 'creative',
  teacher: 'academic',
  academicResearcher: 'academic',
  graduate: 'graduate',
  marketing: 'marketing',
  sales: 'sales',
  humanResources: 'people',
  engineer: 'engineering',
  accountant: 'finance',
};

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, sectionOrder, template }) => (
  <ProfessionLayout
    resumeData={resumeData}
    sectionOrder={sectionOrder}
    layout={templateLayouts[template] || 'developer'}
  />
);