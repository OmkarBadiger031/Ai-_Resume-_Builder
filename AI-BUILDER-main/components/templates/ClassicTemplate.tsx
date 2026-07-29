
import React from 'react';
import { ResumeData, SectionKey } from '../../types';

interface TemplateProps {
  resumeData: ResumeData;
  sectionOrder: SectionKey[];
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ resumeData, sectionOrder }) => {
    const { personalInfo, summary, workExperience, education, skills, projects, awards } = resumeData;

    const sectionComponents: Record<SectionKey, React.ReactNode> = {
        summary: summary && (
            <section className="mb-6">
                <h2 className="text-xl font-semibold tracking-wide border-b border-gray-400 dark:border-gray-500 pb-1 mb-3">SUMMARY</h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{summary}</p>
            </section>
        ),
        workExperience: workExperience.length > 0 && (
            <section className="mb-6">
                <h2 className="text-xl font-semibold tracking-wide border-b border-gray-400 dark:border-gray-500 pb-1 mb-3">EXPERIENCE</h2>
                {workExperience.map((exp) => (
                    <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-md text-gray-900 dark:text-white">{exp.jobTitle}</h3>
                            <span className="text-xs text-gray-600 dark:text-gray-400">{exp.startDate} {exp.startDate && (exp.isCurrent ? '- Present' : exp.endDate && `- ${exp.endDate}`)}</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{exp.company}</p>
                            <p className="text-xs italic text-gray-500 dark:text-gray-400">{exp.location}</p>
                        </div>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            {exp.description.split('\n').map((line, index) => line.trim() && <li key={index}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        ),
        skills: skills.length > 0 && (
            <section className="mb-6">
                <h2 className="text-xl font-semibold tracking-wide border-b border-gray-400 dark:border-gray-500 pb-1 mb-3">SKILLS</h2>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    {skills.map(skill => skill.name).join(' • ')}
                </p>
            </section>
        ),
        projects: projects.length > 0 && (
            <section className="mb-6">
                <h2 className="text-xl font-semibold tracking-wide border-b border-gray-400 dark:border-gray-500 pb-1 mb-3">PROJECTS</h2>
                 {projects.map((project) => (
                    <div key={project.id} className="mb-4">
                        <h3 className="font-bold text-md text-gray-900 dark:text-white inline-block mr-2">{project.name}</h3>
                        {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 dark:text-blue-400">[Link]</a>}
                        <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">{project.description}</p>
                    </div>
                ))}
            </section>
        ),
        education: education.length > 0 && (
            <section className="mb-6">
                <h2 className="text-xl font-semibold tracking-wide border-b border-gray-400 dark:border-gray-500 pb-1 mb-3">EDUCATION</h2>
                {education.map((edu) => (
                    <div key={edu.id} className="mb-2">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-md text-gray-900 dark:text-white">{edu.institution}</h3>
                            <span className="text-xs text-gray-600 dark:text-gray-400">{edu.startDate} {edu.startDate && edu.endDate && `- ${edu.endDate}`}</span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{edu.degree}{edu.degree && edu.fieldOfStudy && ', '}{edu.fieldOfStudy}</p>
                    </div>
                ))}
            </section>
        ),
        awards: awards && awards.length > 0 && (
            <section>
                <h2 className="text-xl font-semibold tracking-wide border-b border-gray-400 dark:border-gray-500 pb-1 mb-3">AWARDS & CERTIFICATIONS</h2>
                {awards.map((award) => (
                    <div key={award.id} className="mb-2">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-md text-gray-900 dark:text-white">{award.name}</h3>
                            <span className="text-xs text-gray-600 dark:text-gray-400">{award.date}</span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{award.issuer}</p>
                    </div>
                ))}
            </section>
        ),
        personalInfo: null
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 h-full text-sm text-gray-800 dark:text-gray-200 font-serif">
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold tracking-widest text-gray-900 dark:text-white uppercase">{personalInfo.fullName}</h1>
                <div className="flex justify-center flex-wrap gap-x-2 mt-2 text-xs text-gray-600 dark:text-gray-400">
                    {personalInfo.address && <span>{personalInfo.address}</span>}
                    {personalInfo.address && personalInfo.phoneNumber && <span>|</span>}
                    {personalInfo.phoneNumber && <span>{personalInfo.phoneNumber}</span>}
                    {personalInfo.phoneNumber && personalInfo.email && <span>|</span>}
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.email && personalInfo.linkedIn && <span>|</span>}
                    {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="text-blue-600 dark:text-blue-400" target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                    {personalInfo.linkedIn && personalInfo.github && <span>|</span>}
                    {personalInfo.github && <a href={personalInfo.github} className="text-blue-600 dark:text-blue-400" target="_blank" rel="noopener noreferrer">GitHub</a>}
                </div>
            </header>

            <main>
                {sectionOrder
                    .filter(key => key !== 'personalInfo')
                    .map(key => sectionComponents[key] && <div key={key}>{sectionComponents[key]}</div>)
                }
            </main>
        </div>
    );
};
