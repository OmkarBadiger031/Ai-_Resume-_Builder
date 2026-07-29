
import React from 'react';
import { ResumeData, SectionKey, Skill } from '../../types';

interface TemplateProps {
  resumeData: ResumeData;
  sectionOrder: SectionKey[];
}

export const PsychiatristTemplate: React.FC<TemplateProps> = ({ resumeData, sectionOrder }) => {
    const { personalInfo, summary, workExperience, education, skills, projects, awards } = resumeData;

    const defaultSkills: Skill[] = [
        { id: 'psy1', name: 'Psychiatric Evaluation' },
        { id: 'psy2', name: 'Psychotherapy (CBT, DBT)' },
        { id: 'psy3', name: 'DSM-5 Diagnosis' },
        { id: 'psy4', name: 'Psychopharmacology' },
        { id: 'psy5', name: 'Crisis Intervention' },
        { id: 'psy6', name: 'Telepsychiatry Platforms' },
    ];
    const initialTechSkillsSet = new Set(['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker']);
    const currentSkillsSet = new Set(skills.map(s => s.name));
    const isUsingDefaultTechSkills = initialTechSkillsSet.size === currentSkillsSet.size && [...initialTechSkillsSet].every(skill => currentSkillsSet.has(skill));
    const skillsToDisplay = isUsingDefaultTechSkills ? defaultSkills : skills;

    const sectionComponents: Record<SectionKey, React.ReactNode> = {
        summary: summary ? (
            <section className="mb-8 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed max-w-3xl mx-auto">{summary}</p>
            </section>
        ) : null,
        workExperience: workExperience.length > 0 && (
            <section className="mb-8">
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 dark:text-gray-200 mb-4 border-b pb-2">Clinical & Professional Experience</h2>
                {workExperience.map((exp) => (
                    <div key={exp.id} className="mb-5">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{exp.jobTitle || 'Job Title'}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                        </div>
                        <p className="text-md text-gray-600 dark:text-gray-300">{exp.company || 'Company Name'} | {exp.location || 'City, State'}</p>
                        <ul className="mt-2 space-y-2 text-base text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                            {exp.description.split('\n').map((line, index) => line.trim() && <li key={index} className="relative pl-4"><span className="absolute left-0 top-2 h-1.5 w-1.5 bg-gray-400 dark:bg-gray-500"></span>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        ),
        skills: skillsToDisplay.length > 0 && (
             <section className="mb-8">
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 dark:text-gray-200 mb-4 border-b pb-2">Clinical Skills & Therapeutic Modalities</h2>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {skillsToDisplay.map((skill) => (
                       <span key={skill.id} className="text-base text-gray-600 dark:text-gray-300">{skill.name}</span>
                    ))}
                </div>
            </section>
        ),
        projects: projects.length > 0 && (
            <section className="mb-8">
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 dark:text-gray-200 mb-4 border-b pb-2">Publications & Presentations</h2>
                 {projects.map((project) => (
                    <div key={project.id} className="mb-4">
                        <div className="flex items-center gap-4">
                            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{project.name || 'Project Name'}</h3>
                            {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 dark:text-blue-400">{project.url}</a>}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mt-1 text-base">{project.description}</p>
                    </div>
                ))}
            </section>
        ),
        education: education.length > 0 && (
            <section className="mb-8">
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 dark:text-gray-200 mb-4 border-b pb-2">Education & Licensure</h2>
                {education.map((edu) => (
                    <div key={edu.id} className="mb-2">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{edu.institution || 'University Name'}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <p className="text-md text-gray-600 dark:text-gray-300">{edu.degree || 'Degree'}, {edu.fieldOfStudy || 'Field of Study'}</p>
                    </div>
                ))}
            </section>
        ),
        awards: awards && awards.length > 0 && (
            <section>
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 dark:text-gray-200 mb-4 border-b pb-2">Certifications & Awards</h2>
                {awards.map((award) => (
                    <div key={award.id} className="mb-2">
                         <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{award.name || 'Award Name'}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{award.date || 'Date'}</p>
                        </div>
                        <p className="text-md text-gray-600 dark:text-gray-300">{award.issuer || 'Issuing Organization'}</p>
                    </div>
                ))}
            </section>
        ),
        personalInfo: null
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-10 h-full text-sm font-sans">
            <header className="text-center mb-10 pb-4">
                <h1 className="text-5xl font-bold text-gray-800 dark:text-white">{personalInfo.fullName || 'Your Name'}</h1>
                <div className="flex justify-center flex-wrap gap-x-6 mt-3 text-sm text-gray-500 dark:text-gray-400">
                    <span>{personalInfo.email || 'your.email@example.com'}</span>
                    <span>{personalInfo.phoneNumber || '(123) 456-7890'}</span>
                    <span>{personalInfo.address || 'Your City, State'}</span>
                    {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="text-blue-600 dark:text-blue-400" target="_blank" rel="noopener noreferrer">LinkedIn</a>}
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
