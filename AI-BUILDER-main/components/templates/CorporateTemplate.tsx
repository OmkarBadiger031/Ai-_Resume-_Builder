
import React from 'react';
import { ResumeData, SectionKey, Skill } from '../../types';

interface TemplateProps {
  resumeData: ResumeData;
  sectionOrder: SectionKey[];
}

export const CorporateTemplate: React.FC<TemplateProps> = ({ resumeData, sectionOrder }) => {
    const { personalInfo, summary, workExperience, education, skills, projects, awards } = resumeData;

    const defaultSkills: Skill[] = [
        { id: 'corp1', name: 'Corporate Strategy' },
        { id: 'corp2', name: 'Project Management' },
        { id: 'corp3', name: 'Regulatory Compliance' },
        { id: 'corp4', name: 'Contract Negotiation' },
        { id: 'corp5', name: 'Budget Management' },
        { id: 'corp6', name: 'ERP Systems (SAP/Oracle)' },
    ];
    const initialTechSkillsSet = new Set(['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker']);
    const currentSkillsSet = new Set(skills.map(s => s.name));
    const isUsingDefaultTechSkills = initialTechSkillsSet.size === currentSkillsSet.size && [...initialTechSkillsSet].every(skill => currentSkillsSet.has(skill));
    const skillsToDisplay = isUsingDefaultTechSkills ? defaultSkills : skills;

    const sectionComponents: Record<SectionKey, React.ReactNode> = {
        summary: (
            <section className="mb-6">
                <h2 className="text-base font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 border-b-2 border-gray-300 dark:border-gray-600 pb-1 mb-2">Summary</h2>
                <p className="text-sm text-gray-700 dark:text-gray-300">{summary || 'A brief summary about your professional background and career goals.'}</p>
            </section>
        ),
        workExperience: workExperience.length > 0 && (
            <section className="mb-6">
                <h2 className="text-base font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 border-b-2 border-gray-300 dark:border-gray-600 pb-1 mb-2">Experience</h2>
                {workExperience.map((exp) => (
                    <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-md text-gray-900 dark:text-white">{exp.jobTitle || 'Job Title'}</h3>
                            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                            <p className="text-sm italic font-semibold text-gray-600 dark:text-gray-300">{exp.company || 'Company Name'}</p>
                            <p className="text-xs italic text-gray-500 dark:text-gray-400">{exp.location || 'City, State'}</p>
                        </div>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            {exp.description.split('\n').map((line, index) => line.trim() && <li key={index}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        ),
        skills: skillsToDisplay.length > 0 && (
            <section className="mb-6">
                <h2 className="text-base font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 border-b-2 border-gray-300 dark:border-gray-600 pb-1 mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {skillsToDisplay.map((skill) => (
                       <span key={skill.id} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{skill.name}</span>
                    ))}
                </div>
            </section>
        ),
        projects: projects.length > 0 && (
            <section className="mb-6">
                <h2 className="text-base font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 border-b-2 border-gray-300 dark:border-gray-600 pb-1 mb-2">Projects</h2>
                 {projects.map((project) => (
                    <div key={project.id} className="mb-4">
                        <h3 className="font-bold text-md text-gray-900 dark:text-white">{project.name || 'Project Name'}</h3>
                        {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 dark:text-blue-400 ml-2">{project.url}</a>}
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{project.description}</p>
                    </div>
                ))}
            </section>
        ),
        education: education.length > 0 && (
            <section className="mb-6">
                <h2 className="text-base font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 border-b-2 border-gray-300 dark:border-gray-600 pb-1 mb-2">Education</h2>
                {education.map((edu) => (
                    <div key={edu.id} className="mb-2">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-md text-gray-900 dark:text-white">{edu.institution || 'University Name'}</h3>
                            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{edu.startDate} - {edu.endDate}</span>
                        </div>
                        <p className="text-sm italic text-gray-600 dark:text-gray-300">{edu.degree || 'Degree'}, {edu.fieldOfStudy || 'Field of Study'}</p>
                    </div>
                ))}
            </section>
        ),
        awards: awards && awards.length > 0 && (
            <section>
                <h2 className="text-base font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 border-b-2 border-gray-300 dark:border-gray-600 pb-1 mb-2">Awards & Certifications</h2>
                {awards.map((award) => (
                    <div key={award.id} className="mb-2">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-md text-gray-900 dark:text-white">{award.name || 'Award Name'}</h3>
                            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{award.date || 'Date'}</span>
                        </div>
                        <p className="text-sm italic text-gray-600 dark:text-gray-300">{award.issuer || 'Issuing Organization'}</p>
                    </div>
                ))}
            </section>
        ),
        personalInfo: null // Handled in the header
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 h-full text-sm text-gray-800 dark:text-gray-200 font-[helvetica,arial,sans-serif]">
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-wider">{personalInfo.fullName || 'YOUR NAME'}</h1>
                <div className="flex justify-center flex-wrap gap-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{personalInfo.address || 'Your City, State'}</span>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <span>{personalInfo.phoneNumber || '(123) 456-7890'}</span>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <span>{personalInfo.email || 'your.email@example.com'}</span>
                    {personalInfo.linkedIn && <span className="text-gray-300 dark:text-gray-600">•</span>}
                    {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="text-blue-600 dark:text-blue-400" target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                    {personalInfo.github && <span className="text-gray-300 dark:text-gray-600">•</span>}
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
