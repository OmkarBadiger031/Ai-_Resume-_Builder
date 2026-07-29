

export interface User {
  fullName: string;
  email: string;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  linkedIn: string;
  photo: string;
  github: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface Education {
  id:string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    url: string;
}

export interface Award {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  awards: Award[];
}

export type SectionKey = keyof ResumeData;

export type TemplateKey = 'classic' | 'executive' | 'corporate' | 'consulting' | 'finance' | 'registeredNurse' | 'surgeon' | 'psychiatrist' | 'techModern' | 'techMinimal' | 'techPro' | 'startup' | 'techSupporter' | 'techArch' | 'techManager' | 'portfolioManager' | 'projectManager' | 'medicalDoctor' | 'dataScientist' | 'uxDesigner';