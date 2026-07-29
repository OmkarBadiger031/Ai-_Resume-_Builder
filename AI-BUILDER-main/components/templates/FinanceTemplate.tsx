
import React from 'react';
import { ResumeData, SectionKey, Skill } from '../../types';

interface TemplateProps {
  resumeData: ResumeData;
  sectionOrder: SectionKey[];
}

export const FinanceTemplate: React.FC<TemplateProps> = ({ resumeData, sectionOrder }) => {
    const { personalInfo, summary, workExperience, education, skills, projects, awards } = resumeData;

    const defaultSkills: Skill[] = [
        { id: 'fin1', name: 'Financial Modeling' },
        { id: 'fin2', name: 'Excel & VBA' },
        { id: 'fin3', name: 'SQL Database Management' },
        { id: 'fin4', name: 'Bloomberg Terminal' },
        { id: 'fin5', name: 'Valuation (DCF, LBO)' },
        { id: 'fin6', name: 'Risk Analysis' },
    ];
    const initialTechSkillsSet = new Set(['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker']);
    const currentSkillsSet = new Set(skills.map(s => s.name));
    const isUsingDefaultTechSkills = initialTechSkillsSet.size === currentSkillsSet.size && [...initialTechSkillsSet].every(skill => currentSkillsSet.has(skill));
    const skillsToDisplay = isUsingDefaultTechSkills ? defaultSkills : skills;

    const sectionComponents: Record<SectionKey, React.ReactNode> = {
        summary: (
            <section className="mb-6">
                 <h2 className="text-lg font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-300 pb-1 mb-2 border-b-2 border-primary dark:border-blue-400">Professional Summary</h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{summary || 'A brief summary about your professional background and career goals.'}</p>
            </section>
        ),
        workExperience: workExperience.length > 0 && (
            <section className="mb-6">
                <h2 className="text-lg font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-300 pb-1 mb-3 border-b-2 border-primary dark:border-blue-400">Professional Experience</h2>
                {workExperience.map((exp) => (
                    <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-md text-gray-900 dark:text-white">{exp.jobTitle || 'Job Title'}</h3>
                            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</span>
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
                <h2 className="text-md font-bold uppercase tracking-wider text-gray-800 dark:text-gray-300 pb-1 mb-3">Key Skills</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                    {skillsToDisplay.map((skill) => (
                       <span key={skill.id} className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs font-medium px-2.5 py-1 rounded-md">{skill.name}</span>
                    ))}
                </div>
            </section>
        ),
        projects: projects.length > 0 && (
            <section className="mb-6">
                <h2 className="text-lg font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-300 pb-1 mb-3 border-b-2 border-primary dark:border-blue-400">Projects</h2>
                 {projects.map((project) => (
                    <div key={project.id} className="mb-4">
                         <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-md text-gray-900 dark:text-white">{project.name || 'Project Name'}</h3>
                            {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 dark:text-blue-400">View Project</a>}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">{project.description}</p>
                    </div>
                ))}
            </section>
        ),
        education: education.length > 0 && (
            <section>
                <h2 className="text-md font-bold uppercase tracking-wider text-gray-800 dark:text-gray-300 pb-1 mb-3">Education</h2>
                {education.map((edu) => (
                    <div key={edu.id} className="mb-3 text-sm">
                        <h3 className="font-bold text-gray-900 dark:text-white">{edu.institution || 'University Name'}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{edu.degree || 'Degree'}, {edu.fieldOfStudy || 'Field of Study'}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{edu.startDate} - {edu.endDate}</p>
                    </div>
                ))}
            </section>
        ),
        awards: awards && awards.length > 0 && (
            <section>
                <h2 className="text-md font-bold uppercase tracking-wider text-gray-800 dark:text-gray-300 pb-1 mb-3">Certifications</h2>
                {awards.map((award) => (
                    <div key={award.id} className="mb-3 text-sm">
                        <h3 className="font-bold text-gray-900 dark:text-white">{award.name || 'Award Name'}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{award.issuer || 'Issuing Body'}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{award.date || 'Date'}</p>
                    </div>
                ))}
            </section>
        ),
        personalInfo: null
    };
    
    const mainSections: SectionKey[] = ['summary', 'workExperience', 'projects'];
    const sidebarSections: SectionKey[] = ['skills', 'education', 'awards'];

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg h-full flex font-sans text-sm">
            <aside className="w-1/3 bg-gray-50 dark:bg-gray-900/50 p-6">
                <header className="text-left mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">{personalInfo.fullName || 'Your Name'}</h1>
                </header>
                 <div className="text-xs space-y-3 mb-8 border-t border-b py-4 border-gray-200 dark:border-gray-600 w-full">
                    <p className="font-semibold text-gray-700 dark:text-gray-300">Email: <span className="font-normal block">{personalInfo.email || 'your.email@example.com'}</span></p>
                    <p className="font-semibold text-gray-700 dark:text-gray-300">Phone: <span className="font-normal block">{personalInfo.phoneNumber || '(123) 456-7890'}</span></p>
                    <p className="font-semibold text-gray-700 dark:text-gray-300">Location: <span className="font-normal block">{personalInfo.address || 'Your City, State'}</span></p>
                    {personalInfo.linkedIn && <p className="font-semibold text-gray-700 dark:text-gray-300">LinkedIn: <a href={personalInfo.linkedIn} className="text-blue-600 dark:text-blue-400 block break-all font-normal" target="_blank" rel="noopener noreferrer">Profile Link</a></p>}
                    {personalInfo.github && <p className="font-semibold text-gray-700 dark:text-gray-300">GitHub: <a href={personalInfo.github} className="text-blue-600 dark:text-blue-400 block break-all font-normal" target="_blank" rel="noopener noreferrer">Profile Link</a></p>}
                </div>
                 <div className="flex-grow w-full space-y-6">
                    {sectionOrder
                        .filter(key => sidebarSections.includes(key))
                        .map(key => sectionComponents[key] && <div key={key}>{sectionComponents[key]}</div>)
                    }
                 </div>
            </aside>
            <main className="w-2/3 p-8 border-l border-gray-100 dark:border-gray-700/50">
                 {sectionOrder
                    .filter(key => mainSections.includes(key))
                    .map(key => sectionComponents[key] && <div key={key}>{sectionComponents[key]}</div>)
                }
            </main>
        </div>
    );
};
