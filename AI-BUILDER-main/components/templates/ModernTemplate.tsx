
import React from 'react';
import { ResumeData, SectionKey } from '../../types';

export const TechModernTemplate: React.FC<{ resumeData: ResumeData, sectionOrder: SectionKey[] }> = ({ resumeData, sectionOrder }) => {
    const { personalInfo, summary, workExperience, education, skills, projects, awards } = resumeData;

    const mainSections: SectionKey[] = ['summary', 'workExperience', 'projects'];
    const sidebarSections: SectionKey[] = ['skills', 'education', 'awards'];

    const sectionComponents: Record<SectionKey, React.ReactNode> = {
        summary: summary && (
            <section className="mb-6">
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{summary}</p>
            </section>
        ),
        workExperience: workExperience.length > 0 && (
            <section className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 border-b-2 border-gray-300 dark:border-gray-600 pb-2 mb-4">Experience</h2>
                {workExperience.map((exp) => (
                    <div key={exp.id} className="mb-5">
                        <h3 className="font-bold text-md text-gray-900 dark:text-white">{exp.jobTitle} {exp.company && `@ ${exp.company}`}</h3>
                        <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-1">{exp.startDate} {exp.startDate && (exp.isCurrent ? '- Present' : exp.endDate && `- ${exp.endDate}`)} {exp.location && `| ${exp.location}`}</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            {exp.description.split('\n').map((line, index) => line.trim() && <li key={index}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        ),
        skills: skills.length > 0 && (
            <section className="mb-6">
                 <h2 className="text-md font-bold uppercase tracking-wider text-white border-b border-white/50 pb-1 mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill) => (
                       <span key={skill.id} className="bg-white/20 text-white text-xs font-medium px-2 py-1 rounded font-mono">{skill.name}</span>
                    ))}
                </div>
            </section>
        ),
        projects: projects.length > 0 && (
            <section className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 border-b-2 border-gray-300 dark:border-gray-600 pb-2 mb-4">Projects</h2>
                 {projects.map((project) => (
                    <div key={project.id} className="mb-4">
                        <h3 className="font-bold text-md text-gray-900 dark:text-white">{project.name}</h3>
                        {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 dark:text-blue-400 font-mono">{project.url}</a>}
                        <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">{project.description}</p>
                    </div>
                ))}
            </section>
        ),
        education: education.length > 0 && (
            <section>
                <h2 className="text-md font-bold uppercase tracking-wider text-white border-b border-white/50 pb-1 mb-3">Education</h2>
                {education.map((edu) => (
                    <div key={edu.id} className="mb-3 text-sm">
                        <h3 className="font-bold text-white">{edu.institution}</h3>
                        <p className="text-gray-200">{edu.degree}{edu.degree && edu.fieldOfStudy && ', '}{edu.fieldOfStudy}</p>
                        <p className="text-xs text-gray-300">{edu.startDate} {edu.startDate && edu.endDate && `- ${edu.endDate}`}</p>
                    </div>
                ))}
            </section>
        ),
        awards: awards && awards.length > 0 && (
            <section>
                <h2 className="text-md font-bold uppercase tracking-wider text-white border-b border-white/50 pb-1 mb-3">Certifications</h2>
                {awards.map((award) => (
                    <div key={award.id} className="mb-3 text-sm">
                        <h3 className="font-bold text-white">{award.name}</h3>
                        <p className="text-gray-200">{award.issuer}</p>
                        <p className="text-xs text-gray-300">{award.date}</p>
                    </div>
                ))}
            </section>
        ),
        personalInfo: null
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg h-full flex font-sans text-sm">
            <aside className="w-1/3 bg-gray-700 dark:bg-gray-900 text-white p-6 flex flex-col">
                <header className="text-left mb-8">
                    <h1 className="text-3xl font-bold text-white leading-tight">{personalInfo.fullName}</h1>
                </header>
                <div className="text-xs space-y-3 mb-8 border-t border-b py-4 border-white/50">
                    {personalInfo.email && <p>{personalInfo.email}</p>}
                    {personalInfo.phoneNumber && <p>{personalInfo.phoneNumber}</p>}
                    {personalInfo.address && <p>{personalInfo.address}</p>}
                    {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="text-gray-200 hover:text-white block break-all" target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                    {personalInfo.github && <a href={personalInfo.github} className="text-gray-200 hover:text-white block break-all" target="_blank" rel="noopener noreferrer">GitHub</a>}
                </div>
                <div className="flex-grow space-y-6">
                    {sectionOrder.filter(key => sidebarSections.includes(key)).map(key => sectionComponents[key] && <div key={key}>{sectionComponents[key]}</div>)}
                </div>
            </aside>
            <main className="w-2/3 p-8">
                {sectionOrder.filter(key => mainSections.includes(key)).map(key => sectionComponents[key] && <div key={key}>{sectionComponents[key]}</div>)}
            </main>
        </div>
    );
};
