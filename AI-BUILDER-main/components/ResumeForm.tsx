



import React, { useState } from 'react';
import { ResumeData, WorkExperience, Skill, Project, Education, SectionKey, Award } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';
import { Sparkles, PlusCircle, Trash2, ChevronDown, ArrowUp, ArrowDown } from './icons';
import { generateWorkExperienceBullets } from '../services/geminiService';

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  sections: SectionKey[];
  onMoveSection: (index: number, direction: 'up' | 'down') => void;
}

const AccordionSection: React.FC<{ 
    title: string, 
    children: React.ReactNode, 
    defaultOpen?: boolean,
    moveControls?: React.ReactNode 
}> = ({ title, children, defaultOpen = true, moveControls }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center p-4 bg-muted/30 dark:bg-muted/10">
        {moveControls}
        <div className="flex-1 flex items-center justify-between cursor-pointer ml-2" onClick={() => setIsOpen(!isOpen)}>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </CardHeader>
      {isOpen && <CardContent className="p-4 pt-4">{children}</CardContent>}
    </Card>
  );
};


export const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData, setResumeData, sections, onMoveSection }) => {
    const [aiLoading, setAiLoading] = useState<Record<string, boolean>>({});

    const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [name]: value } }));
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                const base64 = loadEvent.target?.result as string;
                setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, photo: base64 }
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = () => {
        setResumeData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, photo: '' }
        }));
    };

    const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setResumeData(prev => ({ ...prev, summary: e.target.value }));
    };

    // --- Work Experience Handlers ---
    const handleWorkExperienceChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => ({
            ...prev,
            workExperience: prev.workExperience.map(exp => exp.id === id ? { ...exp, [name]: value } : exp)
        }));
    };
    
    const handleWorkExperienceCheck = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setResumeData(prev => ({
            ...prev,
            workExperience: prev.workExperience.map(exp => exp.id === id ? { ...exp, [name]: checked, endDate: checked ? '' : exp.endDate } : exp)
        }));
    };
    
    const addWorkExperience = () => {
        const newExp: WorkExperience = { id: Date.now().toString(), jobTitle: '', company: '', location: '', startDate: '', endDate: '', isCurrent: false, description: '' };
        setResumeData(prev => ({ ...prev, workExperience: [...prev.workExperience, newExp] }));
    };

    const removeWorkExperience = (id: string) => {
        setResumeData(prev => ({ ...prev, workExperience: prev.workExperience.filter(exp => exp.id !== id) }));
    };
    
    const handleGenerateBullets = async (exp: WorkExperience) => {
        setAiLoading(prev => ({ ...prev, [exp.id]: true }));
        try {
            const bullets = await generateWorkExperienceBullets(exp.jobTitle, exp.company, exp.description);
            const formattedBullets = bullets.map(b => `- ${b}`).join('\n');
            const newDescription = exp.description ? `${exp.description}\n${formattedBullets}` : formattedBullets;
            setResumeData(prev => ({
                ...prev,
                workExperience: prev.workExperience.map(item => item.id === exp.id ? { ...item, description: newDescription } : item)
            }));
        } catch (error) {
            console.error("Failed to generate bullet points", error);
        } finally {
            setAiLoading(prev => ({ ...prev, [exp.id]: false }));
        }
    };

    // --- Skills Handlers ---
    const handleSkillChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setResumeData(prev => ({
            ...prev,
            skills: prev.skills.map(skill => skill.id === id ? { ...skill, name: value } : skill)
        }));
    };
    const addSkill = () => {
        const newSkill: Skill = { id: Date.now().toString(), name: '' };
        setResumeData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
    };
    const removeSkill = (id: string) => {
        setResumeData(prev => ({ ...prev, skills: prev.skills.filter(skill => skill.id !== id) }));
    };

    // --- Projects Handlers ---
    const handleProjectChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => ({
            ...prev,
            projects: prev.projects.map(proj => proj.id === id ? { ...proj, [name]: value } : proj)
        }));
    };
    const addProject = () => {
        const newProject: Project = { id: Date.now().toString(), name: '', description: '', url: '' };
        setResumeData(prev => ({ ...prev, projects: [...prev.projects, newProject] }));
    };
    const removeProject = (id: string) => {
        setResumeData(prev => ({ ...prev, projects: prev.projects.filter(proj => proj.id !== id) }));
    };

    // --- Education Handlers ---
    const handleEducationChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => ({
            ...prev,
            education: prev.education.map(edu => edu.id === id ? { ...edu, [name]: value } : edu)
        }));
    };
    const addEducation = () => {
        const newEducation: Education = { id: Date.now().toString(), institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' };
        setResumeData(prev => ({ ...prev, education: [...prev.education, newEducation] }));
    };
    const removeEducation = (id: string) => {
        setResumeData(prev => ({ ...prev, education: prev.education.filter(edu => edu.id !== id) }));
    };

    // --- Awards Handlers ---
    const handleAwardChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => ({
            ...prev,
            awards: prev.awards.map(award => award.id === id ? { ...award, [name]: value } : award)
        }));
    };
    const addAward = () => {
        const newAward: Award = { id: Date.now().toString(), name: '', issuer: '', date: '' };
        setResumeData(prev => ({ ...prev, awards: [...(prev.awards || []), newAward] }));
    };
    const removeAward = (id: string) => {
        setResumeData(prev => ({ ...prev, awards: prev.awards.filter(award => award.id !== id) }));
    };

    const sectionComponents: Record<SectionKey, { title: string; component: React.ReactNode; defaultOpen?: boolean }> = {
        personalInfo: {
            title: "Personal Information",
            component: <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-sm font-medium">Profile Photo</label>
                    <div className="flex items-center gap-4">
                        {resumeData.personalInfo.photo ? (
                            <img src={resumeData.personalInfo.photo} alt="Profile" className="h-16 w-16 rounded-full object-cover" />
                        ) : (
                            <span className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs text-center p-1">No Photo</span>
                        )}
                        <Input id="photo-upload" type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                        <Button variant="outline" size="sm" type="button" onClick={() => document.getElementById('photo-upload')?.click()}>
                            {resumeData.personalInfo.photo ? 'Change' : 'Upload'}
                        </Button>
                        {resumeData.personalInfo.photo && (
                            <Button variant="ghost" size="sm" type="button" onClick={removePhoto} className="text-destructive hover:text-destructive">
                                Remove
                            </Button>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <Input name="fullName" placeholder="Full Name" value={resumeData.personalInfo.fullName} onChange={handlePersonalInfoChange} />
                    <Input name="email" type="email" placeholder="Email" value={resumeData.personalInfo.email} onChange={handlePersonalInfoChange} />
                    <Input name="phoneNumber" placeholder="Phone Number" value={resumeData.personalInfo.phoneNumber} onChange={handlePersonalInfoChange} />
                    <Input name="address" placeholder="City, State" value={resumeData.personalInfo.address} onChange={handlePersonalInfoChange} />
                    <Input name="linkedIn" placeholder="LinkedIn Profile URL" value={resumeData.personalInfo.linkedIn} onChange={handlePersonalInfoChange} />
                    <Input name="github" placeholder="GitHub Profile URL" value={resumeData.personalInfo.github} onChange={handlePersonalInfoChange} />
                </div>
            </div>,
        },
        summary: {
            title: "Professional Summary",
            component: <Textarea placeholder="Write a brief professional summary..." rows={4} value={resumeData.summary} onChange={handleSummaryChange} />,
        },
        workExperience: {
            title: "Work Experience",
            component: <div className="space-y-6">
                {resumeData.workExperience.map((exp) => (
                    <Card key={exp.id} className="bg-muted/50 dark:bg-muted/20">
                        <CardContent className="p-4 space-y-4">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Input name="jobTitle" placeholder="Job Title" value={exp.jobTitle} onChange={(e) => handleWorkExperienceChange(exp.id, e)} />
                              <Input name="company" placeholder="Company" value={exp.company} onChange={(e) => handleWorkExperienceChange(exp.id, e)} />
                              <Input name="location" placeholder="Location" value={exp.location} onChange={(e) => handleWorkExperienceChange(exp.id, e)} />
                              <div className="flex items-center space-x-2 md:col-span-2">
                                 <Input name="startDate" type="date" placeholder="Start Date" value={exp.startDate} onChange={(e) => handleWorkExperienceChange(exp.id, e)} />
                                 <span>-</span>
                                 <Input name="endDate" type="date" placeholder="End Date" value={exp.endDate} onChange={(e) => handleWorkExperienceChange(exp.id, e)} disabled={exp.isCurrent}/>
                                 <label className="flex items-center space-x-2 text-sm whitespace-nowrap"><input type="checkbox" name="isCurrent" checked={exp.isCurrent} onChange={(e) => handleWorkExperienceCheck(exp.id, e)} /><span>Current</span></label>
                              </div>
                           </div>
                           <Textarea name="description" placeholder="Describe your responsibilities and achievements..." rows={5} value={exp.description} onChange={(e) => handleWorkExperienceChange(exp.id, e)} />
                           <div className="flex justify-between items-center">
                              <Button variant="outline" size="sm" onClick={() => handleGenerateBullets(exp)} disabled={aiLoading[exp.id] || !exp.jobTitle}>
                                  <Sparkles className={`mr-2 h-4 w-4 ${aiLoading[exp.id] ? 'animate-spin' : ''}`} />
                                  {aiLoading[exp.id] ? 'Generating...' : 'Enhance with AI'}
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => removeWorkExperience(exp.id)} aria-label="Remove work experience">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                           </div>
                        </CardContent>
                    </Card>
                ))}
                <Button variant="secondary" className="w-full" onClick={addWorkExperience}>
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    Add Work Experience
                </Button>
            </div>,
        },
        skills: {
            title: "Skills",
            component: <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {resumeData.skills.map((skill) => (
                        <div key={skill.id} className="flex items-center space-x-2">
                            <Input name="name" placeholder="e.g. React" value={skill.name} onChange={(e) => handleSkillChange(skill.id, e)} />
                            <Button variant="ghost" size="icon" onClick={() => removeSkill(skill.id)} aria-label={`Remove ${skill.name || 'skill'}`}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    ))}
                </div>
                <Button variant="secondary" className="w-full" onClick={addSkill}>
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    Add Skill
                </Button>
            </div>,
        },
        projects: {
            title: "Projects",
            defaultOpen: false,
            component: <div className="space-y-6">
                {resumeData.projects.map((project) => (
                    <Card key={project.id} className="bg-muted/50 dark:bg-muted/20">
                        <CardContent className="p-4 space-y-4">
                            <Input name="name" placeholder="Project Name" value={project.name} onChange={(e) => handleProjectChange(project.id, e)} />
                            <Input name="url" placeholder="Project URL" value={project.url} onChange={(e) => handleProjectChange(project.id, e)} />
                            <Textarea name="description" placeholder="Project description..." rows={3} value={project.description} onChange={(e) => handleProjectChange(project.id, e)} />
                            <div className="flex justify-end">
                                <Button variant="ghost" size="icon" onClick={() => removeProject(project.id)} aria-label="Remove project">
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                <Button variant="secondary" className="w-full" onClick={addProject}>
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    Add Project
                </Button>
            </div>,
        },
        education: {
            title: "Education",
            defaultOpen: false,
            component: <div className="space-y-6">
                {resumeData.education.map((edu) => (
                    <Card key={edu.id} className="bg-muted/50 dark:bg-muted/20">
                        <CardContent className="p-4 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input name="institution" placeholder="Institution" value={edu.institution} onChange={(e) => handleEducationChange(edu.id, e)} />
                                <Input name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleEducationChange(edu.id, e)} />
                                <Input name="fieldOfStudy" placeholder="Field of Study" value={edu.fieldOfStudy} onChange={(e) => handleEducationChange(edu.id, e)} className="md:col-span-2" />
                                <Input name="startDate" type="date" placeholder="Start Date" value={edu.startDate} onChange={(e) => handleEducationChange(edu.id, e)} />
                                <Input name="endDate" type="date" placeholder="End Date" value={edu.endDate} onChange={(e) => handleEducationChange(edu.id, e)} />
                            </div>
                            <div className="flex justify-end">
                                <Button variant="ghost" size="icon" onClick={() => removeEducation(edu.id)} aria-label="Remove education">
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                <Button variant="secondary" className="w-full" onClick={addEducation}>
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    Add Education
                </Button>
            </div>,
        },
        awards: {
            title: "Awards & Certificates",
            defaultOpen: false,
            component: <div className="space-y-6">
                {(resumeData.awards || []).map((award) => (
                    <Card key={award.id} className="bg-muted/50 dark:bg-muted/20">
                        <CardContent className="p-4 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input name="name" placeholder="Award or Certificate Name" value={award.name} onChange={(e) => handleAwardChange(award.id, e)} className="md:col-span-2" />
                                <Input name="issuer" placeholder="Issuing Organization" value={award.issuer} onChange={(e) => handleAwardChange(award.id, e)} />
                                <Input name="date" type="date" placeholder="Date" value={award.date} onChange={(e) => handleAwardChange(award.id, e)} />
                            </div>
                            <div className="flex justify-end">
                                <Button variant="ghost" size="icon" onClick={() => removeAward(award.id)} aria-label="Remove award">
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                <Button variant="secondary" className="w-full" onClick={addAward}>
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    Add Award or Certificate
                </Button>
            </div>,
        },
    };

    return (
        <div className="space-y-6">
            {sections.map((sectionKey, index) => {
                const section = sectionComponents[sectionKey];
                if (!section) return null;

                const moveControls = (
                    <div className="flex flex-col">
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onMoveSection(index, 'up')} disabled={index === 0} aria-label={`Move ${section.title} up`}>
                            <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onMoveSection(index, 'down')} disabled={index === sections.length - 1} aria-label={`Move ${section.title} down`}>
                            <ArrowDown className="h-4 w-4" />
                        </Button>
                    </div>
                );

                return (
                    <AccordionSection
                        key={sectionKey}
                        title={section.title}
                        defaultOpen={section.defaultOpen}
                        moveControls={moveControls}
                    >
                        {section.component}
                    </AccordionSection>
                )
            })}
        </div>
    );
};