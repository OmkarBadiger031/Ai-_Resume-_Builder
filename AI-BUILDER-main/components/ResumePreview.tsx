import React from 'react';
import { ResumeData, SectionKey, TemplateKey } from '../types';
import { TechSupporterTemplate } from './templates/ProfessionalTemplate';
import { TechModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { TechMinimalTemplate } from './templates/MinimalistTemplate';
import { TechProTemplate } from './templates/VisualTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { CorporateTemplate } from './templates/CorporateTemplate';
import { ConsultingTemplate } from './templates/ConsultingTemplate';
import { FinanceTemplate } from './templates/FinanceTemplate';
import { RegisteredNurseTemplate } from './templates/RegisteredNurseTemplate';
import { StartupTemplate } from './templates/MarketingTemplate';
import { SurgeonTemplate } from './templates/SurgeonTemplate';
import { PsychiatristTemplate } from './templates/PsychiatristTemplate';
import { TechArchTemplate, TechManagerTemplate } from './templates/CreativeTemplate';
import { PortfolioManagerTemplate, ProjectManagerTemplate, MedicalDoctorTemplate, DataScientistTemplate, UXDesignerTemplate } from './templates/NewTemplates';

interface ResumePreviewProps {
  resumeData: ResumeData;
  sectionOrder: SectionKey[];
  template: TemplateKey;
}

// Map template keys to their corresponding components
const templates: Record<TemplateKey, React.FC<Omit<ResumePreviewProps, 'template'>>> = {
    classic: ClassicTemplate,
    executive: ExecutiveTemplate,
    corporate: CorporateTemplate,
    consulting: ConsultingTemplate,
    finance: FinanceTemplate,
    registeredNurse: RegisteredNurseTemplate,
    startup: StartupTemplate,
    surgeon: SurgeonTemplate,
    psychiatrist: PsychiatristTemplate,
    techModern: TechModernTemplate,
    techMinimal: TechMinimalTemplate,
    techPro: TechProTemplate,
    techSupporter: TechSupporterTemplate,
    techArch: TechArchTemplate,
    techManager: TechManagerTemplate,
    portfolioManager: PortfolioManagerTemplate,
    projectManager: ProjectManagerTemplate,
    medicalDoctor: MedicalDoctorTemplate,
    dataScientist: DataScientistTemplate,
    uxDesigner: UXDesignerTemplate,
};

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, sectionOrder, template }) => {
    // Select the component based on the template prop, with a fallback
    const TemplateComponent = templates[template] || templates.techModern;
    
    return <TemplateComponent resumeData={resumeData} sectionOrder={sectionOrder} />;
};