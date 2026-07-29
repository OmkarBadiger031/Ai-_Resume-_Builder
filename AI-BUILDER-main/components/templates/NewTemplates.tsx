
import React from 'react';
import { ResumeData, SectionKey, Skill } from '../../types';

interface TemplateProps {
  resumeData: ResumeData;
  sectionOrder: SectionKey[];
}

const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

export const PortfolioManagerTemplate: React.FC<TemplateProps> = ({ resumeData, sectionOrder }) => {
    const { personalInfo, summary, workExperience, education, skills, projects, awards } = resumeData;
    
    const defaultSkills: Skill[] = [
        { id: 'pm1', name: 'Portfolio Management' },
        { id: 'pm2', name: 'Asset Allocation' },
        { id: 'pm3', name: 'Risk Management' },
        { id: 'pm4', name: 'Quantitative Analysis' },
        { id: 'pm5', name: 'CFA Charterholder' },
        { id: 'pm6', name: 'Bloomberg' },
    ];
    const initialTechSkillsSet = new Set(['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker']);
    const currentSkillsSet = new Set(skills.map(s => s.name));
    const isUsingDefaultTechSkills = initialTechSkillsSet.size === currentSkillsSet.size && [...initialTechSkillsSet].every(skill => currentSkillsSet.has(skill));
    const skillsToDisplay = isUsingDefaultTechSkills ? defaultSkills : skills;

    const sectionComponents = {
        summary: (
            <section className="mb-6">
                <h2 className="text-lg font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-300 pb-1 mb-2 border-b-2 border-primary dark:border-blue-400">Executive Summary</h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{summary}</p>
            </section>
        ),
        workExperience: (
            <section className="mb-6">
                <h2 className="text-lg font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-300 pb-1 mb-3 border-b-2 border-primary dark:border-blue-400">Investment Experience</h2>
                {workExperience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <h3 className="font-bold text-md text-gray-900 dark:text-white">{exp.jobTitle} at {exp.company}</h3>
                        <p className="text-xs font-mono text-gray-500 dark:text-gray-400">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}</ul>
                    </div>
                ))}
            </section>
        ),
        skills: (
            <section className="mb-6">
                <h2 className="text-md font-bold uppercase tracking-wider text-gray-800 dark:text-gray-300 pb-1 mb-3">Financial Skills</h2>
                <div className="flex flex-wrap gap-2">{skillsToDisplay.map(skill => <span key={skill.id} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-md dark:bg-blue-900/50 dark:text-blue-200">{skill.name}</span>)}</div>
            </section>
        ),
        projects: null,
        education: (
            <section>
                <h2 className="text-md font-bold uppercase tracking-wider text-gray-800 dark:text-gray-300 pb-1 mb-3">Education & Credentials</h2>
                {education.map(edu => (
                    <div key={edu.id} className="mb-3 text-sm">
                        <h3 className="font-bold text-gray-900 dark:text-white">{edu.institution}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{edu.degree}, {edu.fieldOfStudy}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{edu.startDate} - {edu.endDate}</p>
                    </div>
                ))}
            </section>
        ),
        awards: (
            <section>
                <h2 className="text-md font-bold uppercase tracking-wider text-gray-800 dark:text-gray-300 pb-1 mb-3">Certifications</h2>
                {awards.map(award => (
                    <div key={award.id} className="mb-3 text-sm">
                        <h3 className="font-bold text-gray-900 dark:text-white">{award.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{award.issuer}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{award.date}</p>
                    </div>
                ))}
            </section>
        ),
        personalInfo: null,
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg h-full flex font-sans text-sm">
            <aside className="w-1/3 bg-gray-50 dark:bg-gray-900/50 p-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-4">{personalInfo.fullName}</h1>
                <div className="text-xs space-y-3 mb-8 border-t border-b py-4 border-gray-200 dark:border-gray-600">
                    <p>{personalInfo.email}</p>
                    <p>{personalInfo.phoneNumber}</p>
                    <p>{personalInfo.address}</p>
                    {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="text-blue-600 dark:text-blue-400 block break-all" target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                </div>
                <div className="space-y-6">
                    {sectionOrder.filter(k => ['skills', 'education', 'awards'].includes(k)).map(key => sectionComponents[key])}
                </div>
            </aside>
            <main className="w-2/3 p-8 border-l border-gray-100 dark:border-gray-700/50">
                {sectionOrder.filter(k => ['summary', 'workExperience'].includes(k)).map(key => sectionComponents[key])}
            </main>
        </div>
    );
};

export const ProjectManagerTemplate: React.FC<TemplateProps> = ({ resumeData, sectionOrder }) => {
    const { personalInfo, summary, workExperience, education, skills, projects, awards } = resumeData;
    
    const defaultSkills: Skill[] = [
        { id: 'pjm1', name: 'Agile & Scrum Methodologies' },
        { id: 'pjm2', name: 'PMP Certification' },
        { id: 'pjm3', name: 'Jira & Confluence' },
        { id: 'pjm4', name: 'Risk Management' },
        { id: 'pjm5', name: 'Budgeting & Forecasting' },
        { id: 'pjm6', name: 'Stakeholder Communication' },
    ];
    const initialTechSkillsSet = new Set(['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker']);
    const currentSkillsSet = new Set(skills.map(s => s.name));
    const isUsingDefaultTechSkills = initialTechSkillsSet.size === currentSkillsSet.size && [...initialTechSkillsSet].every(skill => currentSkillsSet.has(skill));
    const skillsToDisplay = isUsingDefaultTechSkills ? defaultSkills : skills;

    const sectionComponents = {
        summary: <section className="mb-6"><p className="text-sm text-gray-700 dark:text-gray-300">{summary}</p></section>,
        workExperience: (
            <section className="mb-6">
                <h2 className="text-base font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 border-b-2 border-gray-300 dark:border-gray-600 pb-1 mb-2">Professional Experience</h2>
                {workExperience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <h3 className="font-bold text-md text-gray-900 dark:text-white">{exp.jobTitle} | {exp.company}</h3>
                        <p className="text-xs font-mono text-gray-500 dark:text-gray-400">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{exp.description.split('\n').map((l, i) => l.trim() && <li key={i}>{l.replace(/^- /, '')}</li>)}</ul>
                    </div>
                ))}
            </section>
        ),
        skills: (
            <section className="mb-6">
                <h2 className="text-base font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 border-b-2 border-gray-300 dark:border-gray-600 pb-1 mb-2">Core Competencies</h2>
                <p className="text-sm text-gray-700 dark:text-gray-300">{skillsToDisplay.map(s => s.name).join(' | ')}</p>
            </section>
        ),
        projects: (
             <section className="mb-6">
                <h2 className="text-base font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 border-b-2 border-gray-300 dark:border-gray-600 pb-1 mb-2">Key Projects</h2>
                {projects.map(p => (
                    <div key={p.id} className="mb-4">
                        <h3 className="font-bold text-md text-gray-900 dark:text-white">{p.name}</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{p.description}</p>
                    </div>
                ))}
            </section>
        ),
        education: (
            <section className="mb-6">
                <h2 className="text-base font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 border-b-2 border-gray-300 dark:border-gray-600 pb-1 mb-2">Education</h2>
                {education.map(edu => <div key={edu.id}><h3 className="font-bold text-md text-gray-900 dark:text-white">{edu.institution}</h3><p className="text-sm italic text-gray-600 dark:text-gray-300">{edu.degree}</p></div>)}
            </section>
        ),
        awards: null,
        personalInfo: null,
    };
    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 h-full text-sm font-[helvetica,arial,sans-serif]">
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-wider">{personalInfo.fullName}</h1>
                <p className="text-md text-gray-500 dark:text-gray-400 mt-1">Project Manager</p>
            </header>
            <main>{sectionOrder.map(key => sectionComponents[key])}</main>
        </div>
    );
};

export const MedicalDoctorTemplate: React.FC<TemplateProps> = ({ resumeData, sectionOrder }) => {
    const { personalInfo, summary, workExperience, education, skills, projects, awards } = resumeData;
    
    const defaultSkills: Skill[] = [
        { id: 'md1', name: 'Patient Diagnosis & Treatment' },
        { id: 'md2', name: 'Electronic Medical Records (EMR)' },
        { id: 'md3', name: 'Medical Research' },
        { id: 'md4', name: 'Surgical Procedures' },
        { id: 'md5', name: 'Patient & Family Counseling' },
        { id: 'md6', name: 'HIPAA Compliance' },
    ];
    const initialTechSkillsSet = new Set(['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker']);
    const currentSkillsSet = new Set(skills.map(s => s.name));
    const isUsingDefaultTechSkills = initialTechSkillsSet.size === currentSkillsSet.size && [...initialTechSkillsSet].every(skill => currentSkillsSet.has(skill));
    const skillsToDisplay = isUsingDefaultTechSkills ? defaultSkills : skills;

    const sectionComponents = {
        summary: <section className="mb-8"><p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{summary}</p></section>,
        workExperience: (
            <section className="mb-6">
                <h2 className="text-xl font-bold uppercase tracking-wider text-gray-800 dark:text-gray-300 pb-2 mb-4">Clinical Experience</h2>
                {workExperience.map(exp => (
                    <div key={exp.id} className="mb-5 relative pl-6 before:absolute before:left-1 before:top-1.5 before:w-2 before:h-2 before:bg-primary before:rounded-full">
                        <h3 className="font-bold text-md text-gray-900 dark:text-white">{exp.jobTitle} at {exp.company}</h3>
                        <p className="text-xs font-mono text-gray-500 dark:text-gray-400">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{exp.description.split('\n').map((l, i) => l.trim() && <li key={i}>{l.replace(/^- /, '')}</li>)}</ul>
                    </div>
                ))}
            </section>
        ),
        skills: (
            <section className="mb-6">
                 <h2 className="text-md font-bold uppercase tracking-wider text-gray-800 dark:text-gray-300 pb-1 mb-3">Medical Skills</h2>
                <div className="flex flex-wrap gap-2 mt-2">{skillsToDisplay.map(skill => <span key={skill.id} className="bg-gray-200 text-xs font-medium px-2.5 py-1 rounded-md">{skill.name}</span>)}</div>
            </section>
        ),
        projects: (
            <section className="mb-6">
                <h2 className="text-xl font-bold uppercase tracking-wider text-gray-800 dark:text-gray-300 pb-2 mb-4">Research</h2>
                {projects.map(p => <div key={p.id}><h3 className="font-bold text-md text-gray-900 dark:text-white">{p.name}</h3><p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">{p.description}</p></div>)}
            </section>
        ),
        education: (
            <section><h2 className="text-md font-bold uppercase tracking-wider text-gray-800 dark:text-gray-300 pb-1 mb-3">Medical Education</h2>{education.map(edu => <div key={edu.id}><h3 className="font-bold text-gray-900 dark:text-white">{edu.institution}</h3><p className="text-gray-600 dark:text-gray-300">{edu.degree}</p></div>)}</section>
        ),
        awards: (
            <section><h2 className="text-md font-bold uppercase tracking-wider text-gray-800 dark:text-gray-300 pb-1 mb-3">Licenses & Certifications</h2>{awards.map(award => <div key={award.id}><h3 className="font-bold text-gray-900 dark:text-white">{award.name}</h3></div>)}</section>
        ),
        personalInfo: null
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg h-full flex font-sans text-sm">
            <aside className="w-1/3 bg-gray-50 dark:bg-gray-900/50 p-6">
                 <div className="w-36 h-36 mx-auto mb-4">{personalInfo.photo ? <img src={personalInfo.photo} alt={personalInfo.fullName} className="rounded-full w-full h-full object-cover" /> : <div className="rounded-full w-full h-full bg-gray-200 flex items-center justify-center"><UserIcon className="w-20 h-20"/></div>}</div>
                <header className="text-center mb-8"><h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">{personalInfo.fullName}</h1></header>
                 <div className="text-xs space-y-3 mb-8 border-t border-b py-4"><p>{personalInfo.email}</p><p>{personalInfo.phoneNumber}</p></div>
                 <div className="flex-grow w-full space-y-6">{sectionOrder.filter(k => ['skills', 'education', 'awards'].includes(k)).map(key => sectionComponents[key])}</div>
            </aside>
            <main className="w-2/3 p-8 border-l">{sectionOrder.filter(k => ['summary', 'workExperience', 'projects'].includes(k)).map(key => sectionComponents[key])}</main>
        </div>
    );
};

export const DataScientistTemplate: React.FC<TemplateProps> = ({ resumeData, sectionOrder }) => {
    const { personalInfo, summary, workExperience, education, skills, projects, awards } = resumeData;
    const sectionComponents = {
        summary: <section className="mb-6"><p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{summary}</p></section>,
        workExperience: (
            <section className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 border-b-2 pb-2 mb-4">Experience</h2>
                {workExperience.map(exp => (
                    <div key={exp.id} className="mb-5">
                        <h3 className="font-bold text-md text-gray-900 dark:text-white">{exp.jobTitle} @ {exp.company}</h3>
                        <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-1">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{exp.description.split('\n').map((l, i) => l.trim() && <li key={i}>{l.replace(/^- /, '')}</li>)}</ul>
                    </div>
                ))}
            </section>
        ),
        skills: (
            <section className="mb-6">
                 <h2 className="text-md font-bold uppercase tracking-wider text-white border-b border-white/50 pb-1 mb-3">Technical Skills</h2>
                <div className="flex flex-wrap gap-2 mt-2">{skills.map(skill => <span key={skill.id} className="bg-white/20 text-white text-xs font-medium px-2 py-1 rounded font-mono">{skill.name}</span>)}</div>
            </section>
        ),
        projects: (
            <section className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 border-b-2 pb-2 mb-4">Data Science Projects</h2>
                 {projects.map(p => <div key={p.id} className="mb-4"><h3 className="font-bold text-md text-gray-900 dark:text-white">{p.name}</h3><p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">{p.description}</p></div>)}
            </section>
        ),
        education: (
            <section><h2 className="text-md font-bold uppercase tracking-wider text-white border-b border-white/50 pb-1 mb-3">Education</h2>{education.map(edu => <div key={edu.id} className="mb-3 text-sm"><h3 className="font-bold text-white">{edu.institution}</h3><p className="text-gray-200">{edu.degree}</p></div>)}</section>
        ),
        awards: null,
        personalInfo: null
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg h-full flex font-sans text-sm">
            <aside className="w-1/3 bg-gray-700 dark:bg-gray-900 text-white p-6 flex flex-col">
                <header className="mb-8"><h1 className="text-3xl font-bold text-white leading-tight">{personalInfo.fullName}</h1></header>
                <div className="text-xs space-y-3 mb-8 border-t border-b py-4 border-white/50"><p>{personalInfo.email}</p><p>{personalInfo.phoneNumber}</p>{personalInfo.github && <a href={personalInfo.github} className="text-gray-200 hover:text-white block break-all" target="_blank" rel="noopener noreferrer">GitHub</a>}</div>
                <div className="flex-grow space-y-6">{sectionOrder.filter(k => ['skills', 'education'].includes(k)).map(key => sectionComponents[key])}</div>
            </aside>
            <main className="w-2/3 p-8">{sectionOrder.filter(k => ['summary', 'workExperience', 'projects'].includes(k)).map(key => sectionComponents[key])}</main>
        </div>
    );
};


export const UXDesignerTemplate: React.FC<TemplateProps> = ({ resumeData, sectionOrder }) => {
    const { personalInfo, summary, workExperience, education, skills, projects, awards } = resumeData;
    const sectionComponents = {
        summary: <section className="mb-6"><p className="text-gray-700 dark:text-gray-300">{summary}</p></section>,
        workExperience: (
            <section className="mb-6">
                <h2 className="text-lg font-bold border-b-2 pb-1 mb-2 text-gray-900 dark:text-white">Experience</h2>
                {workExperience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <h3 className="font-bold text-md text-gray-900 dark:text-white">{exp.jobTitle}</h3>
                        <p className="text-sm italic text-gray-600 dark:text-gray-300">{exp.company}</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{exp.description.split('\n').map((l, i) => l.trim() && <li key={i}>{l.replace(/^- /, '')}</li>)}</ul>
                    </div>
                ))}
            </section>
        ),
        skills: (
            <section className="mb-6">
                <h2 className="text-lg font-bold border-b-2 pb-1 mb-2 text-gray-900 dark:text-white">Design Toolkit</h2>
                <p className="text-sm text-gray-700 dark:text-gray-300">{skills.map(s => s.name).join(' | ')}</p>
            </section>
        ),
        projects: (
            <section className="mb-6">
                <h2 className="text-lg font-bold border-b-2 pb-1 mb-2 text-gray-900 dark:text-white">Portfolio Projects</h2>
                 {projects.map(p => <div key={p.id} className="mb-4"><h3 className="font-bold text-md text-gray-900 dark:text-white">{p.name}</h3><p className="text-gray-700 dark:text-gray-300 mt-1">{p.description}</p></div>)}
            </section>
        ),
        education: (
            <section className="mb-6">
                <h2 className="text-lg font-bold border-b-2 pb-1 mb-2 text-gray-900 dark:text-white">Education</h2>
                {education.map(edu => <div key={edu.id}><h3 className="font-bold text-md text-gray-900 dark:text-white">{edu.institution}</h3><p className="text-sm italic text-gray-600 dark:text-gray-300">{edu.degree}</p></div>)}
            </section>
        ),
        awards: null,
        personalInfo: null,
    };
    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 h-full text-sm text-gray-800 dark:text-gray-200">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{personalInfo.fullName}</h1>
                <p className="text-md text-gray-500 dark:text-gray-400">UX/UI Designer</p>
                <div className="flex justify-center flex-wrap gap-x-4 mt-2 text-xs"><span>{personalInfo.email}</span><span>•</span><span>{personalInfo.phoneNumber}</span><span>•</span>{personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="text-blue-600 dark:text-blue-400" target="_blank" rel="noopener noreferrer">Portfolio/LinkedIn</a>}</div>
            </header>
            <main>{sectionOrder.map(key => sectionComponents[key])}</main>
        </div>
    );
};
