
import React from 'react';
import { ResumeData, SectionKey, Skill } from '../../types';

interface TemplateProps {
  resumeData: ResumeData;
  sectionOrder: SectionKey[];
}

export const RegisteredNurseTemplate: React.FC<TemplateProps> = ({ resumeData, sectionOrder }) => {
    const { personalInfo, summary, workExperience, education, skills, projects, awards } = resumeData;

    const defaultSkills: Skill[] = [
        { id: 'rn1', name: 'Patient Assessment & Care' },
        { id: 'rn2', name: 'Electronic Health Records (EHR)' },
        { id: 'rn3', name: 'Medication Administration' },
        { id: 'rn4', name: 'IV Therapy & Phlebotomy' },
        { id: 'rn5', name: 'ACLS & BLS Certified' },
        { id: 'rn6', name: 'Wound Care Management' },
    ];
    const initialTechSkillsSet = new Set(['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker']);
    const currentSkillsSet = new Set(skills.map(s => s.name));
    const isUsingDefaultTechSkills = initialTechSkillsSet.size === currentSkillsSet.size && [...initialTechSkillsSet].every(skill => currentSkillsSet.has(skill));
    const skillsToDisplay = isUsingDefaultTechSkills ? defaultSkills : skills;

    const sectionComponents: Record<SectionKey, React.ReactNode> = {
        summary: (
            <section className="mb-6">
                <h2 className="text-lg font-semibold tracking-wide border-b border-gray-300 dark:border-gray-600 pb-1 mb-3 text-primary dark:text-cyan-400">PROFESSIONAL PROFILE</h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{summary || 'A brief summary about your professional background and career goals.'}</p>
            </section>
        ),
        workExperience: workExperience.length > 0 && (
            <section className="mb-6">
                <h2 className="text-lg font-semibold tracking-wide border-b border-gray-300 dark:border-gray-600 pb-1 mb-3 text-primary dark:text-cyan-400">CLINICAL EXPERIENCE</h2>
                {workExperience.map((exp) => (
                    <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-md text-gray-900 dark:text-white">{exp.jobTitle || 'Job Title'}</h3>
                            <span className="text-xs text-gray-600 dark:text-gray-400">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{exp.company || 'Company Name'}</p>
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
                <h2 className="text-lg font-semibold tracking-wide border-b border-gray-300 dark:border-gray-600 pb-1 mb-3 text-primary dark:text-cyan-400">SKILLS & PROFICIENCIES</h2>
                 <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    {skillsToDisplay.map(skill => <li key={skill.id}>{skill.name}</li>)}
                </ul>
            </section>
        ),
        projects: projects.length > 0 && (
            <section className="mb-6">
                <h2 className="text-lg font-semibold tracking-wide border-b border-gray-300 dark:border-gray-600 pb-1 mb-3 text-primary dark:text-cyan-400">ADDITIONAL EXPERIENCE</h2>
                 {projects.map((project) => (
                    <div key={project.id} className="mb-4">
                        <h3 className="font-bold text-md text-gray-900 dark:text-white inline-block mr-2">{project.name || 'Project Name'}</h3>
                        {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 dark:text-blue-400">[Link]</a>}
                        <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">{project.description}</p>
                    </div>
                ))}
            </section>
        ),
        education: education.length > 0 && (
            <section className="mb-6">
                <h2 className="text-lg font-semibold tracking-wide border-b border-gray-300 dark:border-gray-600 pb-1 mb-3 text-primary dark:text-cyan-400">EDUCATION & LICENSURE</h2>
                {education.map((edu) => (
                    <div key={edu.id} className="mb-2">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-md text-gray-900 dark:text-white">{edu.institution || 'University Name'}</h3>
                            <span className="text-xs text-gray-600 dark:text-gray-400">{edu.startDate} - {edu.endDate}</span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{edu.degree || 'Degree'}, {edu.fieldOfStudy || 'Field of Study'}</p>
                    </div>
                ))}
            </section>
        ),
        awards: awards && awards.length > 0 && (
            <section>
                <h2 className="text-lg font-semibold tracking-wide border-b border-gray-300 dark:border-gray-600 pb-1 mb-3 text-primary dark:text-cyan-400">AWARDS & RECOGNITION</h2>
                {awards.map((award) => (
                    <div key={award.id} className="mb-2">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-md text-gray-900 dark:text-white">{award.name || 'Award Name'}</h3>
                            <span className="text-xs text-gray-600 dark:text-gray-400">{award.date || 'Date'}</span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{award.issuer || 'Issuing Organization'}</p>
                    </div>
                ))}
            </section>
        ),
        personalInfo: null
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 h-full text-sm text-gray-800 dark:text-gray-200 font-sans">
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{personalInfo.fullName || 'YOUR NAME'}</h1>
                <div className="flex justify-center flex-wrap gap-x-4 mt-2 text-xs text-gray-600 dark:text-gray-400">
                    <span>{personalInfo.address || 'Your City, State'}</span>
                    <span>|</span>
                    <span>{personalInfo.phoneNumber || '(123) 456-7890'}</span>
                    <span>|</span>
                    <span>{personalInfo.email || 'your.email@example.com'}</span>
                    {personalInfo.linkedIn && <span>|</span>}
                    {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="text-blue-600 dark:text-blue-400" target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                    {personalInfo.github && <span>|</span>}
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
