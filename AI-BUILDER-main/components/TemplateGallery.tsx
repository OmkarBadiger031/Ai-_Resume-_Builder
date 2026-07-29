
import React from 'react';
import { TemplateKey } from '../types';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';

interface Template {
  id: TemplateKey;
  name: string;
  description: string;
  thumbnailUrl: string;
}

interface TemplateCategory {
    title: string;
    icon: React.ReactNode;
    templates: Template[];
}

const FinanceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
);
const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9 18 7.5a6 6 0 0 0-12 0c0 1.5.3 2.7 1.5 3.9.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
);
const HeartPulseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path><path d="M3.22 12H9.5l.73-1.21a.5.5 0 0 1 .54-.3l.63.33a.5.5 0 0 0 .54-.3l.73-1.21H20.78"></path></svg>
);
const CodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
);


const templateCategories: TemplateCategory[] = [
    {
        title: "Finance Templates",
        icon: <FinanceIcon className="h-6 w-6" />,
        templates: [
            { id: 'finance', name: 'Financial Analyst', description: 'Clean & data-driven.', thumbnailUrl: 'https://i.imgur.com/5u1gW9h.jpg' },
            { id: 'executive', name: 'Investment Banker', description: 'Bold & professional.', thumbnailUrl: 'https://i.imgur.com/jNYz6p7.png' },
            { id: 'classic', name: 'CPA / Accountant', description: 'Traditional & clear.', thumbnailUrl: 'https://i.imgur.com/k2e4sNq.png' },
            { id: 'portfolioManager', name: 'Portfolio Manager', description: 'Results-driven & analytical.', thumbnailUrl: 'https://i.imgur.com/5u1gW9h.jpg' },
        ]
    },
    {
        title: "Business Templates",
        icon: <LightbulbIcon className="h-6 w-6" />,
        templates: [
            { id: 'startup', name: 'Startup', description: 'Dynamic & growth-oriented.', thumbnailUrl: 'https://i.imgur.com/cWf5pBi.png' },
            { id: 'consulting', name: 'Consultant', description: 'Impact-focused.', thumbnailUrl: 'https://i.imgur.com/yN1G4qf.png' },
            { id: 'corporate', name: 'Corporate', description: 'Structured & formal.', thumbnailUrl: 'https://i.imgur.com/b9QZp8P.png' },
            { id: 'projectManager', name: 'Project Manager', description: 'Organized & goal-oriented.', thumbnailUrl: 'https://i.imgur.com/b9QZp8P.png' },
        ]
    },
    {
        title: "Healthcare",
        icon: <HeartPulseIcon className="h-6 w-6" />,
        templates: [
            { id: 'registeredNurse', name: 'Registered Nurse', description: 'Clear & scannable.', thumbnailUrl: 'https://i.imgur.com/a5o0b0u.png' },
            { id: 'surgeon', name: 'Surgeon', description: 'Precise & authoritative.', thumbnailUrl: 'https://i.imgur.com/yN1G4qf.png' },
            { id: 'psychiatrist', name: 'Psychiatrist', description: 'Empathetic & detailed.', thumbnailUrl: 'https://i.imgur.com/b9QZp8P.png' },
            { id: 'medicalDoctor', name: 'Medical Doctor', description: 'Comprehensive & professional.', thumbnailUrl: 'https://i.imgur.com/yN1G4qf.png' },
        ]
    },
     {
        title: "Technology",
        icon: <CodeIcon className="h-6 w-6" />,
        templates: [
            { id: 'techModern', name: 'Tech Modern', description: 'Sleek, ATS-friendly design for modern tech roles.', thumbnailUrl: 'https://i.imgur.com/8L1p2g7.png' },
            { id: 'techMinimal', name: 'Tech Minimal', description: 'Clean, readable layout focusing on core skills.', thumbnailUrl: 'https://i.imgur.com/s2J2a1P.png' },
            { id: 'techPro', name: 'Tech Pro', description: 'Professional and detailed, perfect for senior roles.', thumbnailUrl: 'https://i.imgur.com/uR2gVfJ.png' },
            { id: 'techSupporter', name: 'Tech Supporter', description: 'Clear, organized, and scannable for support roles.', thumbnailUrl: 'https://i.imgur.com/5u1gW9h.jpg' },
            { id: 'techArch', name: 'Tech Arch', description: 'Strategic & detailed for solution architects.', thumbnailUrl: 'https://i.imgur.com/yN1G4qf.png' },
            { id: 'techManager', name: 'Tech Manager', description: 'Leadership-focused for management roles.', thumbnailUrl: 'https://i.imgur.com/jNYz6p7.png' },
            { id: 'dataScientist', name: 'Data Scientist', description: 'Data-focused & insightful.', thumbnailUrl: 'https://i.imgur.com/8L1p2g7.png' },
            { id: 'uxDesigner', name: 'UX/UI Designer', description: 'Creative & user-centric.', thumbnailUrl: 'https://i.imgur.com/uR2gVfJ.png' },
        ]
    }
];


interface TemplateGalleryProps {
  activeTemplate: TemplateKey;
  onSelectTemplate: (templateId: TemplateKey) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ activeTemplate, onSelectTemplate }) => {
  return (
    <div>
        {templateCategories.map((category) => (
            <div key={category.title} className="mb-12">
                <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-foreground">
                    {category.icon}
                    {category.title}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {category.templates.map((template) => (
                    <Card key={template.id} className={`overflow-hidden transition-all duration-300 ${activeTemplate === template.id ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'hover:shadow-lg'}`}>
                        <CardContent className="p-0">
                        <img src={template.thumbnailUrl} alt={`${template.name} template thumbnail`} className="w-full h-auto object-cover border-b aspect-[1/1.414]" />
                        <div className="p-4">
                            <h3 className="font-semibold text-lg">{template.name}</h3>
                            <p className="text-sm text-muted-foreground h-10 mt-1">{template.description}</p>
                            <Button 
                            className="w-full mt-4" 
                            onClick={() => onSelectTemplate(template.id)}
                            variant={activeTemplate === template.id ? 'default' : 'outline'}
                            aria-label={`Select ${template.name} template`}
                            >
                            {activeTemplate === template.id ? 'Selected' : 'Use Template'}
                            </Button>
                        </div>
                        </CardContent>
                    </Card>
                    ))}
                </div>
            </div>
        ))}
    </div>
  );
};