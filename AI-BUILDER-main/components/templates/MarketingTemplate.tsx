
import React from 'react';
import { ResumeData, SectionKey, Skill } from '../../types';

export const StartupTemplate: React.FC<{ resumeData: ResumeData, sectionOrder: SectionKey[] }> = ({ resumeData, sectionOrder }) => {
    const { personalInfo, summary, workExperience, education, skills, projects, awards } = resumeData;

    const defaultSkills: Skill[] = [
        { id: 'su1', name: 'Agile Methodologies' },
        { id: 'su2', name: 'Growth Hacking' },
        { id: 'su3', name: 'SEO/SEM' },
        { id: 'su4', name: 'A/B Testing' },
        { id: 'su5', name: 'Product-Led Growth' },
        { id: 'su6', name: 'User Acquisition & Retention' },
    ];
    const initialTechSkillsSet = new Set(['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker']);
    const currentSkillsSet = new Set(skills.map(s => s.name));
    const isUsingDefaultTechSkills = initialTechSkillsSet.size === currentSkillsSet.size && [...initialTechSkillsSet].every(skill => currentSkillsSet.has(skill));
    const skillsToDisplay = isUsingDefaultTechSkills ? defaultSkills : skills;

    const mainSections: SectionKey[] = ['summary', 'workExperience', 'projects'];
    const sidebarSections: SectionKey[] = ['skills', 'education', 'awards'];

    const sectionComponents: Record<SectionKey, React.ReactNode> = {
        summary: (
            <section className="mb-8">
                <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">{summary || 'A brief summary about your professional background and career goals.'}</p>
            </section>
        ),
        workExperience: workExperience.length > 0 && (
            <section className="mb-6">
                <h2 className="text-xl font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 border-b-2 border-green-400 dark:border-green-500 pb-2 mb-4">Experience</h2>
                {workExperience.map((exp) => (
                    <div key={exp.id} className="mb-5">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-md text-gray-900 dark:text-white">{exp.jobTitle || 'Job Title'}</h3>
                            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</span>
                        </div>
                        <p className="text-sm font-semibold text-green-600 dark:text-green-400">{exp.company || 'Company Name'} | {exp.location || 'City, State'}</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            {exp.description.split('\n').map((line, index) => line.trim() && <li key={index}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        ),
        skills: skillsToDisplay.length > 0 && (
            <section className="mb-6">
                 <h2 className="text-md font-bold uppercase tracking-wider text-white">Skills</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                    {skillsToDisplay.map((skill) => (
                       <span key={skill.id} className="bg-white/30 text-white text-xs font-medium px-2 py-1 rounded">{skill.name}</span>
                    ))}
                </div>
            </section>
        ),
        projects: projects.length > 0 && (
            <section className="mb-6">
                <h2 className="text-xl font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 border-b-2 border-green-400 dark:border-green-500 pb-2 mb-4">Projects</h2>
                 {projects.map((project) => (
                    <div key={project.id} className="mb-4">
                        <h3 className="font-bold text-md text-gray-900 dark:text-white">{project.name || 'Project Name'}</h3>
                        {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 dark:text-green-400">View Project</a>}
                        <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">{project.description}</p>
                    </div>
                ))}
            </section>
        ),
        education: education.length > 0 && (
            <section>
                <h2 className="text-md font-bold uppercase tracking-wider text-white">Education</h2>
                {education.map((edu) => (
                    <div key={edu.id} className="mb-3 text-sm">
                        <h3 className="font-bold text-white">{edu.institution || 'University Name'}</h3>
                        <p className="text-green-100">{edu.degree || 'Degree'}</p>
                        <p className="text-xs text-green-200">{edu.startDate} - {edu.endDate}</p>
                    </div>
                ))}
            </section>
        ),
        awards: awards && awards.length > 0 && (
            <section>
                <h2 className="text-md font-bold uppercase tracking-wider text-white">Awards</h2>
                {awards.map((award) => (
                    <div key={award.id} className="mb-3 text-sm">
                        <h3 className="font-bold text-white">{award.name || 'Award Name'}</h3>
                        <p className="text-green-100">{award.issuer || 'Issuing Body'}</p>
                        <p className="text-xs text-green-200">{award.date || 'Date'}</p>
                    </div>
                ))}
            </section>
        ),
        personalInfo: null
    };
    
    const Sidebar = () => (
        <aside className="w-1/3 bg-green-500 dark:bg-green-800 text-white p-6 flex flex-col">
            {personalInfo.photo && (
                <div className="w-32 h-32 mb-4 mx-auto">
                    <img src={personalInfo.photo} alt={personalInfo.fullName} className="rounded-full w-full h-full object-cover shadow-md border-4 border-white" />
                </div>
            )}
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold text-white leading-tight">{personalInfo.fullName || 'Your Name'}</h1>
            </header>
            <div className="text-xs space-y-2 mb-8 border-t border-b py-4 border-white/50 w-full text-center">
                <p>{personalInfo.email || 'your.email@example.com'}</p>
                <p>{personalInfo.phoneNumber || '(123) 456-7890'}</p>
                <p>{personalInfo.address || 'Your City, State'}</p>
                {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="text-white hover:underline block break-all" target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                {personalInfo.github && <a href={personalInfo.github} className="text-white hover:underline block break-all" target="_blank" rel="noopener noreferrer">GitHub</a>}
            </div>
            <div className="flex-grow w-full space-y-6">
                {sectionOrder.filter(key => sidebarSections.includes(key)).map(key => sectionComponents[key] && <div key={key}>{sectionComponents[key]}</div>)}
            </div>
        </aside>
    );

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg h-full flex font-sans text-sm">
            <Sidebar />
            <main className="w-2/3 p-8">
                 {sectionOrder
                    .filter(key => mainSections.includes(key))
                    .map(key => sectionComponents[key] && <div key={key}>{sectionComponents[key]}</div>)
                }
            </main>
        </div>
    );
};
