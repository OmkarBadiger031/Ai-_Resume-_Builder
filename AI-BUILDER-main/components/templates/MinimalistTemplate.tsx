
import React from 'react';
import { ResumeData, SectionKey } from '../../types';

export const TechMinimalTemplate: React.FC<{ resumeData: ResumeData, sectionOrder: SectionKey[] }> = ({ resumeData, sectionOrder }) => {
    const { personalInfo, summary, workExperience, education, skills, projects, awards } = resumeData;

    const sectionComponents: Record<SectionKey, React.ReactNode> = {
        summary: summary ? (
            <section className="mb-8">
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">{summary}</p>
            </section>
        ) : null,
        workExperience: workExperience.length > 0 && (
            <section className="mb-8">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">Experience</h2>
                {workExperience.map((exp) => (
                    <div key={exp.id} className="mb-5">
                        <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-1 text-right">
                                 <p className="text-xs text-gray-500 dark:text-gray-400">{exp.startDate} {exp.startDate && (exp.isCurrent ? '– Present' : exp.endDate && `– ${exp.endDate}`)}</p>
                            </div>
                            <div className="col-span-3">
                                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{exp.jobTitle}</h3>
                                <p className="text-md text-gray-600 dark:text-gray-300">{exp.company} {exp.company && exp.location && `| ${exp.location}`}</p>
                                <div className="mt-2 text-base text-gray-600 dark:text-gray-400 whitespace-pre-wrap prose prose-sm dark:prose-invert">
                                   <ul>
                                    {exp.description.split('\n').map((line, index) => line.trim() && <li key={index}>{line.replace(/^- /, '')}</li>)}
                                   </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        ),
        skills: skills.length > 0 && (
            <section className="mb-8">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">Skills</h2>
                <p className="text-base text-gray-600 dark:text-gray-300 font-mono">
                    {skills.map(s => s.name).join(' / ')}
                </p>
            </section>
        ),
        projects: projects.length > 0 && (
            <section className="mb-8">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">Projects</h2>
                 {projects.map((project) => (
                    <div key={project.id} className="mb-4">
                        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{project.name}</h3>
                        {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 dark:text-blue-400 font-mono">{project.url}</a>}
                        <p className="text-gray-600 dark:text-gray-400 mt-1 text-base">{project.description}</p>
                    </div>
                ))}
            </section>
        ),
        education: education.length > 0 && (
            <section className="mb-8">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">Education</h2>
                {education.map((edu) => (
                    <div key={edu.id} className="mb-2">
                         <div className="grid grid-cols-4 gap-4">
                             <div className="col-span-1 text-right">
                                <p className="text-xs text-gray-500 dark:text-gray-400">{edu.startDate} {edu.startDate && edu.endDate && `– ${edu.endDate}`}</p>
                            </div>
                            <div className="col-span-3">
                                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{edu.institution}</h3>
                                <p className="text-md text-gray-600 dark:text-gray-300">{edu.degree}{edu.degree && edu.fieldOfStudy && ', '}{edu.fieldOfStudy}</p>
                            </div>
                         </div>
                    </div>
                ))}
            </section>
        ),
        awards: awards && awards.length > 0 && (
            <section>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">Certifications</h2>
                {awards.map((award) => (
                    <div key={award.id} className="mb-2">
                        <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-1 text-right">
                                <p className="text-xs text-gray-500 dark:text-gray-400">{award.date}</p>
                            </div>
                            <div className="col-span-3">
                                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{award.name}</h3>
                                <p className="text-md text-gray-600 dark:text-gray-300">{award.issuer}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        ),
        personalInfo: null
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-10 h-full text-sm font-sans">
            <header className="text-center mb-10 pb-4 border-b border-gray-200 dark:border-gray-600">
                <h1 className="text-5xl font-light tracking-wider text-gray-800 dark:text-white">{personalInfo.fullName}</h1>
                <div className="flex justify-center flex-wrap gap-x-6 mt-3 text-sm text-gray-500 dark:text-gray-400 font-mono">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phoneNumber && <span>{personalInfo.phoneNumber}</span>}
                    {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="text-blue-600 dark:text-blue-400" target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                    {personalInfo.github && <a href={personalInfo.github} className="text-blue-600 dark:text-blue-400" target="_blank" rel="noopener noreferrer">GitHub</a>}
                </div>
            </header>
            <main>
                {sectionOrder.filter(key => key !== 'personalInfo').map(key => sectionComponents[key] && <div key={key}>{sectionComponents[key]}</div>)}
            </main>
        </div>
    );
};
