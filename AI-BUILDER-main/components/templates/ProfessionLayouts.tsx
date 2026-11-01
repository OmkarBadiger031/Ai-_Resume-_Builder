import React from 'react';
import type { ResumeData, SectionKey } from '../../types';

export type ResumeLayout =
  | 'classic'
  | 'developer'
  | 'corporate'
  | 'minimal'
  | 'creative'
  | 'finance'
  | 'nurse'
  | 'surgeon'
  | 'clinical'
  | 'executive'
  | 'data'
  | 'academic'
  | 'graduate'
  | 'marketing'
  | 'engineering'
  | 'sales'
  | 'people'
  | 'consultant'
  | 'portfolio'
  | 'support'
  | 'architect';

interface ProfessionLayoutProps {
  resumeData: ResumeData;
  sectionOrder: SectionKey[];
  layout: ResumeLayout;
}

const layoutPresentation: Record<ResumeLayout, {
  page: string;
  header: string;
  name: string;
  contact: string;
  section: string;
  title: string;
  sidebarSections: SectionKey[];
  mainSections: SectionKey[];
}> = {
  classic: {
    page: 'bg-white text-black font-serif px-10 py-9 shadow-md',
    header: 'text-center border-b border-black pb-4 mb-5',
    name: 'text-3xl font-bold uppercase tracking-[0.12em]',
    contact: 'mt-2 flex flex-wrap justify-center gap-x-2 text-[10px] text-gray-700',
    section: 'mb-5',
    title: 'mb-2 border-b border-gray-500 pb-1 text-[12px] font-bold uppercase tracking-widest',
    sidebarSections: [],
    mainSections: ['summary', 'workExperience', 'education', 'skills', 'projects', 'awards'],
  },
  developer: {
    page: 'bg-white text-slate-800 font-sans shadow-md md:flex',
    header: 'border-l-8 border-blue-600 bg-slate-950 px-7 py-7 text-white md:hidden',
    name: 'text-3xl font-bold tracking-tight',
    contact: 'mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-blue-100',
    section: 'mb-5',
    title: 'mb-2 border-b-2 border-blue-600 pb-1 text-xs font-bold uppercase tracking-wider text-slate-800',
    sidebarSections: ['skills', 'education', 'awards'],
    mainSections: ['summary', 'workExperience', 'projects'],
  },
  corporate: {
    page: 'bg-white text-slate-800 font-sans shadow-md',
    header: 'border-t-8 border-slate-800 bg-slate-100 px-9 py-7',
    name: 'text-3xl font-semibold uppercase tracking-wide text-slate-900',
    contact: 'mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-600',
    section: 'mb-5',
    title: 'mb-2 border-b border-slate-400 pb-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-700',
    sidebarSections: [],
    mainSections: ['summary', 'workExperience', 'skills', 'education', 'projects', 'awards'],
  },
  minimal: {
    page: 'bg-white text-neutral-800 font-sans px-11 py-11 shadow-md',
    header: 'mb-8',
    name: 'text-4xl font-light tracking-tight text-neutral-950',
    contact: 'mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-neutral-500',
    section: 'mb-7',
    title: 'mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500',
    sidebarSections: [],
    mainSections: ['summary', 'workExperience', 'education', 'skills', 'projects', 'awards'],
  },
  creative: {
    page: 'bg-white text-zinc-800 font-sans shadow-md md:flex',
    header: 'border-b-4 border-fuchsia-500 px-7 py-7 md:hidden',
    name: 'text-3xl font-black tracking-tight text-zinc-900',
    contact: 'mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-zinc-500',
    section: 'mb-5',
    title: 'mb-2 border-l-4 border-fuchsia-500 pl-2 text-xs font-bold uppercase tracking-wider text-zinc-800',
    sidebarSections: ['skills', 'education', 'awards'],
    mainSections: ['summary', 'workExperience', 'projects'],
  },
  finance: {
    page: 'bg-white text-slate-800 font-serif shadow-md md:flex',
    header: 'border-b-2 border-amber-700 px-8 py-6 md:hidden',
    name: 'text-3xl font-bold text-slate-900',
    contact: 'mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-600',
    section: 'mb-5',
    title: 'mb-2 border-b-2 border-amber-700 pb-1 text-xs font-bold uppercase tracking-widest text-slate-800',
    sidebarSections: ['skills', 'education', 'awards'],
    mainSections: ['summary', 'workExperience', 'projects'],
  },
  nurse: {
    page: 'bg-white text-slate-800 font-sans shadow-md md:flex',
    header: 'border-b-4 border-teal-700 bg-teal-50 px-7 py-6 md:hidden',
    name: 'text-3xl font-bold text-teal-950',
    contact: 'mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-teal-900',
    section: 'mb-5',
    title: 'mb-2 border-b border-teal-700 pb-1 text-xs font-bold uppercase tracking-wider text-teal-900',
    sidebarSections: ['education', 'skills', 'awards'],
    mainSections: ['summary', 'workExperience', 'projects'],
  },
  surgeon: {
    page: 'bg-white text-slate-800 font-sans px-9 py-8 shadow-md',
    header: 'mb-5 border-b-2 border-emerald-800 pb-4',
    name: 'text-3xl font-semibold tracking-tight text-slate-950',
    contact: 'mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-600',
    section: 'mb-5',
    title: 'mb-2 border-l-4 border-emerald-800 bg-emerald-50 px-2 py-1 text-xs font-bold uppercase tracking-wider text-emerald-950',
    sidebarSections: [],
    mainSections: ['summary', 'education', 'workExperience', 'skills', 'projects', 'awards'],
  },
  clinical: {
    page: 'bg-white text-slate-800 font-sans px-10 py-9 shadow-md',
    header: 'mb-7 border-b border-violet-300 pb-4 text-center',
    name: 'text-3xl font-semibold text-slate-900',
    contact: 'mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] text-slate-500',
    section: 'mb-6',
    title: 'mb-2 border-b border-violet-300 pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-violet-900',
    sidebarSections: [],
    mainSections: ['summary', 'workExperience', 'education', 'skills', 'projects', 'awards'],
  },
  executive: {
    page: 'bg-white text-slate-800 font-sans shadow-md md:flex',
    header: 'bg-slate-900 px-7 py-7 text-white md:hidden',
    name: 'text-3xl font-bold tracking-tight',
    contact: 'mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-200',
    section: 'mb-5',
    title: 'mb-2 border-b-2 border-indigo-700 pb-1 text-xs font-bold uppercase tracking-wider text-slate-900',
    sidebarSections: ['skills', 'education', 'awards'],
    mainSections: ['summary', 'workExperience', 'projects'],
  },
  data: {
    page: 'bg-white text-slate-800 font-sans shadow-md',
    header: 'border-l-8 border-indigo-600 bg-indigo-50 px-7 py-6',
    name: 'text-3xl font-bold text-indigo-950',
    contact: 'mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-600',
    section: 'mb-5',
    title: 'mb-2 text-xs font-bold uppercase tracking-wider text-indigo-900',
    sidebarSections: [],
    mainSections: ['summary', 'skills', 'workExperience', 'projects', 'education', 'awards'],
  },
  academic: {
    page: 'bg-white text-slate-800 font-serif px-10 py-9 shadow-md',
    header: 'mb-6 border-b border-slate-400 pb-4',
    name: 'text-3xl font-semibold tracking-tight text-slate-950',
    contact: 'mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-600',
    section: 'mb-5',
    title: 'mb-2 border-b border-slate-400 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-800',
    sidebarSections: [],
    mainSections: ['education', 'projects', 'workExperience', 'skills', 'awards', 'summary'],
  },
  graduate: {
    page: 'bg-white text-slate-800 font-sans px-9 py-8 shadow-md',
    header: 'mb-5 border-l-8 border-emerald-600 bg-emerald-50 px-5 py-5',
    name: 'text-3xl font-bold text-emerald-950',
    contact: 'mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-600',
    section: 'mb-5',
    title: 'mb-2 border-b-2 border-emerald-600 pb-1 text-xs font-bold uppercase tracking-wider text-emerald-950',
    sidebarSections: [],
    mainSections: ['education', 'projects', 'skills', 'awards', 'workExperience', 'summary'],
  },
  marketing: {
    page: 'bg-white text-zinc-800 font-sans shadow-md md:flex',
    header: 'mb-5 border-b-4 border-orange-500 pb-4',
    name: 'text-3xl font-black tracking-tight text-zinc-900',
    contact: 'mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-zinc-600',
    section: 'mb-5',
    title: 'mb-2 text-xs font-bold uppercase tracking-widest text-orange-800',
    sidebarSections: ['skills', 'projects', 'awards'],
    mainSections: ['summary', 'workExperience', 'education'],
  },
  engineering: {
    page: 'bg-white text-slate-800 font-mono shadow-md',
    header: 'mb-6 border-b-4 border-cyan-800 bg-slate-900 px-7 py-6 text-white',
    name: 'text-3xl font-bold tracking-tight',
    contact: 'mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-cyan-100',
    section: 'mb-5',
    title: 'mb-2 border-l-4 border-cyan-700 pl-2 text-xs font-bold uppercase tracking-wide text-slate-900',
    sidebarSections: [],
    mainSections: ['summary', 'skills', 'workExperience', 'projects', 'education', 'awards'],
  },
  sales: {
    page: 'bg-white text-slate-800 font-sans shadow-md',
    header: 'mb-7 border-b-4 border-blue-900 bg-blue-950 px-8 py-7 text-white',
    name: 'text-3xl font-bold tracking-tight',
    contact: 'mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-blue-100',
    section: 'mb-6',
    title: 'mb-2 border-b border-blue-900 pb-1 text-xs font-bold uppercase tracking-widest text-blue-950',
    sidebarSections: [],
    mainSections: ['summary', 'workExperience', 'projects', 'skills', 'education', 'awards'],
  },
  people: {
    page: 'bg-white text-slate-800 font-sans shadow-md md:flex',
    header: 'mb-5 border-b-2 border-rose-700 pb-4',
    name: 'text-3xl font-semibold tracking-tight text-slate-950',
    contact: 'mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-600',
    section: 'mb-5',
    title: 'mb-2 border-b border-rose-300 pb-1 text-xs font-bold uppercase tracking-wider text-rose-950',
    sidebarSections: ['skills', 'awards'],
    mainSections: ['summary', 'workExperience', 'education', 'projects'],
  },
  consultant: {
    page: 'bg-white text-slate-800 font-sans px-10 py-9 shadow-md',
    header: 'mb-6 border-t-4 border-indigo-800 border-b border-slate-300 py-5',
    name: 'text-3xl font-semibold text-slate-950',
    contact: 'mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-600',
    section: 'mb-5',
    title: 'mb-2 border-l-4 border-indigo-800 pl-2 text-xs font-bold uppercase tracking-wider text-slate-800',
    sidebarSections: [],
    mainSections: ['summary', 'workExperience', 'projects', 'education', 'skills', 'awards'],
  },
  portfolio: {
    page: 'bg-white text-slate-800 font-serif shadow-md md:flex',
    header: 'border-b-2 border-amber-800 px-7 py-6 md:hidden',
    name: 'text-3xl font-bold text-slate-950',
    contact: 'mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-600',
    section: 'mb-5',
    title: 'mb-2 border-b border-amber-700 pb-1 text-xs font-bold uppercase tracking-widest text-amber-950',
    sidebarSections: ['skills', 'education', 'awards'],
    mainSections: ['summary', 'workExperience', 'projects'],
  },
  support: {
    page: 'bg-white text-slate-800 font-sans px-9 py-8 shadow-md',
    header: 'mb-6 border-b border-slate-400 bg-slate-50 px-6 py-5',
    name: 'text-3xl font-bold tracking-tight text-slate-950',
    contact: 'mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-600',
    section: 'mb-5',
    title: 'mb-2 border-b border-slate-500 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-800',
    sidebarSections: [],
    mainSections: ['summary', 'skills', 'workExperience', 'education', 'projects', 'awards'],
  },
  architect: {
    page: 'bg-white text-slate-800 font-sans shadow-md md:flex',
    header: 'border-b-4 border-cyan-700 bg-slate-900 px-7 py-6 text-white md:hidden',
    name: 'text-3xl font-bold tracking-tight',
    contact: 'mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-cyan-100',
    section: 'mb-5',
    title: 'mb-2 border-l-4 border-cyan-700 pl-2 text-xs font-bold uppercase tracking-wide text-slate-900',
    sidebarSections: ['skills', 'education', 'awards'],
    mainSections: ['summary', 'workExperience', 'projects'],
  },
};

const sectionTitles: Record<SectionKey, string> = {
  personalInfo: 'Contact',
  summary: 'Professional Summary',
  workExperience: 'Professional Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  awards: 'Certifications & Awards',
};

const layoutAccents: Record<ResumeLayout, string> = {
  classic: '#111827',
  developer: '#2563eb',
  corporate: '#334155',
  minimal: '#a3a3a3',
  creative: '#d946ef',
  finance: '#a16207',
  nurse: '#0f766e',
  surgeon: '#065f46',
  clinical: '#7c3aed',
  executive: '#4338ca',
  data: '#4f46e5',
  academic: '#64748b',
  graduate: '#059669',
  marketing: '#ea580c',
  engineering: '#0e7490',
  sales: '#1e3a8a',
  people: '#be123c',
  consultant: '#3730a3',
  portfolio: '#92400e',
  support: '#475569',
  architect: '#0e7490',
};

const getDateRange = (start: string, end: string, isCurrent?: boolean) =>
  [start, isCurrent ? 'Present' : end].filter(Boolean).join(' – ');

const ResumeSection: React.FC<{
  section: Exclude<SectionKey, 'personalInfo'>;
  resumeData: ResumeData;
  layout: ResumeLayout;
  sectionClass: string;
  titleClass: string;
  accentColor: string;
}> = ({ section, resumeData, layout, sectionClass, titleClass, accentColor }) => {
  const heading = layout === 'nurse' && section === 'workExperience'
    ? 'Clinical Experience'
    : layout === 'surgeon' && section === 'education'
      ? 'Medical Education & Training'
      : layout === 'surgeon' && section === 'workExperience'
        ? 'Surgical & Clinical Experience'
        : layout === 'portfolio' && section === 'workExperience'
          ? 'Investment Experience'
          : layout === 'support' && section === 'workExperience'
            ? 'Technical Support Experience'
            : layout === 'sales' && section === 'workExperience'
              ? 'Sales & Business Development'
              : layout === 'people' && section === 'workExperience'
                ? 'People & Operations Experience'
                : layout === 'marketing' && section === 'projects'
                  ? 'Campaigns & Projects'
                  : layout === 'engineering' && section === 'projects'
                    ? 'Engineering Projects'
        : layout === 'clinical' && section === 'awards'
          ? 'Licensure, Certifications & Recognition'
          : layout === 'data' && section === 'skills'
            ? 'Analytical & Technical Skills'
            : sectionTitles[section];

  let content: React.ReactNode = null;
  if (section === 'summary') {
    content = resumeData.summary?.trim()
      ? <p className="break-words text-xs leading-relaxed text-slate-700">{resumeData.summary}</p>
      : null;
  } else if (section === 'workExperience') {
    const items = (resumeData.workExperience || []).filter(item => item.jobTitle || item.company || item.description);
    content = items.length ? <div className="space-y-3">{items.map(item => (
      <article key={item.id} className={layout === 'nurse' || layout === 'surgeon' ? 'border-l-2 border-teal-200 pl-3' : ''}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-2">
          <h3 className="break-words text-xs font-bold text-slate-900">{[item.jobTitle, item.company && `· ${item.company}`].filter(Boolean).join(' ')}</h3>
          {getDateRange(item.startDate, item.endDate, item.isCurrent) && <span className="text-[9px] text-slate-500">{getDateRange(item.startDate, item.endDate, item.isCurrent)}</span>}
        </div>
        {item.location && <p className="break-words text-[10px] text-slate-500">{item.location}</p>}
        {item.description?.trim() && <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[10px] leading-relaxed text-slate-700">{item.description.split('\n').map((line, index) => line.trim() && <li key={`${item.id}-${index}`} className="break-words">{line.replace(/^[-•]\s*/, '')}</li>)}</ul>}
      </article>
    ))}</div> : null;
  } else if (section === 'education') {
    const items = (resumeData.education || []).filter(item => item.institution || item.degree || item.fieldOfStudy);
    content = items.length ? <div className="space-y-2">{items.map(item => <article key={item.id}>
      <h3 className="break-words text-xs font-bold text-slate-900">{item.institution}</h3>
      <p className="break-words text-[10px] text-slate-700">{[item.degree, item.fieldOfStudy].filter(Boolean).join(' · ')}</p>
      {getDateRange(item.startDate, item.endDate) && <p className="text-[9px] text-slate-500">{getDateRange(item.startDate, item.endDate)}</p>}
    </article>)}</div> : null;
  } else if (section === 'skills') {
    const items = (resumeData.skills || []).filter(item => item.name?.trim());
    content = items.length ? <div className={layout === 'classic' ? 'text-[10px] leading-relaxed text-slate-700' : 'flex flex-wrap gap-1'}>{items.map(skill => layout === 'classic'
      ? <span key={skill.id}>{skill.name}{skill.id !== items[items.length - 1]?.id ? ' · ' : ''}</span>
      : <span key={skill.id} className={`max-w-full break-words ${layout === 'data' ? 'rounded-sm border border-indigo-200 px-1.5 py-0.5 text-[9px] text-indigo-900' : 'rounded bg-slate-100 px-1.5 py-0.5 text-[9px] text-slate-700'}`}>{skill.name}</span>)}</div> : null;
  } else if (section === 'projects') {
    const items = (resumeData.projects || []).filter(item => item.name || item.description || item.url);
    content = items.length ? <div className="space-y-2">{items.map(item => <article key={item.id}>
      <div className="flex flex-wrap items-baseline justify-between gap-1"><h3 className="break-words text-xs font-bold text-slate-900">{item.name}</h3>{item.url && <span className="max-w-full break-all text-[9px] text-blue-700">{item.url}</span>}</div>
      {item.description?.trim() && <p className="mt-0.5 break-words text-[10px] leading-relaxed text-slate-700">{item.description}</p>}
    </article>)}</div> : null;
  } else if (section === 'awards') {
    const items = (resumeData.awards || []).filter(item => item.name || item.issuer || item.date);
    content = items.length ? <div className="space-y-2">{items.map(item => <article key={item.id}>
      <div className="flex flex-wrap items-baseline justify-between gap-1"><h3 className="break-words text-xs font-bold text-slate-900">{item.name}</h3>{item.date && <span className="text-[9px] text-slate-500">{item.date}</span>}</div>
      {item.issuer && <p className="break-words text-[10px] text-slate-600">{item.issuer}</p>}
    </article>)}</div> : null;
  }

  if (!content) return null;
  return <section className={`${sectionClass} break-inside-avoid`}>
    <h2 className={`${titleClass} flex items-center gap-2`} style={{ borderBottom: 'none' }}>
      <span>{heading}</span>
      <span aria-hidden="true" className="h-px min-w-4 flex-1" style={{ backgroundColor: accentColor }} />
    </h2>
    {content}
  </section>;
};

const AdditionalSections: React.FC<{ resumeData: ResumeData; sectionClass: string; titleClass: string; accentColor: string }> = ({ resumeData, sectionClass, titleClass, accentColor }) => <>
  {(resumeData.additionalSections || []).map(section => {
    const entries = (section.entries || []).filter(entry => entry.title || entry.organization || entry.date || entry.description || entry.url);
    if (!section.title.trim() || !entries.length) return null;
    return <section key={section.id} className={`${sectionClass} break-inside-avoid`}>
      <h2 className={`${titleClass} flex items-center gap-2`} style={{ borderBottom: 'none' }}>
        <span>{section.title}</span>
        <span aria-hidden="true" className="h-px min-w-4 flex-1" style={{ backgroundColor: accentColor }} />
      </h2>
      <div className="space-y-2">{entries.map(entry => <article key={entry.id}>
        <div className="flex flex-wrap items-baseline justify-between gap-1">
          <h3 className="break-words text-xs font-bold text-slate-900">{entry.title}</h3>
          {entry.date && <span className="text-[9px] text-slate-500">{entry.date}</span>}
        </div>
        {entry.organization && <p className="break-words text-[10px] text-slate-600">{entry.organization}</p>}
        {entry.url && <p className="break-all text-[9px] text-blue-700">{entry.url}</p>}
        {entry.description && <p className="mt-0.5 break-words text-[10px] leading-relaxed text-slate-700">{entry.description}</p>}
      </article>)}</div>
    </section>;
  })}
</>;

export const ProfessionLayout: React.FC<ProfessionLayoutProps> = ({ resumeData, sectionOrder, layout }) => {
  const style = layoutPresentation[layout];
  const accentColor = layoutAccents[layout];
  const personal = resumeData.personalInfo;
  const contacts = [personal.email, personal.phoneNumber, personal.address, personal.linkedIn, personal.github].filter(Boolean);
  const currentRole = resumeData.workExperience?.find(item => item.isCurrent)?.jobTitle || resumeData.workExperience?.[0]?.jobTitle;
  const roleTextColor = ['developer', 'executive', 'architect', 'engineering', 'sales'].includes(layout) ? 'text-slate-200' : 'text-slate-600';
  const visibleOrder = sectionOrder.filter((key): key is Exclude<SectionKey, 'personalInfo'> => key !== 'personalInfo');
  const header = <header style={{ borderTop: `4px solid ${accentColor}` }} className={`${style.header} ${personal.photo && layout !== 'classic' ? 'flex items-start gap-3' : ''}`}>
    <div className="min-w-0 flex-1">
      <h1 className={`${style.name} break-words`}>{personal.fullName || 'Your Name'}</h1>
      {currentRole && <p className={`mt-1 break-words text-xs font-medium ${roleTextColor}`}>{currentRole}</p>}
      <div className={`${style.contact} break-all`}>{contacts.map((contact, index) => <React.Fragment key={`${contact}-${index}`}><span>{contact}</span>{index < contacts.length - 1 && <span aria-hidden="true">·</span>}</React.Fragment>)}</div>
    </div>
    {personal.photo && layout !== 'classic' && <img src={personal.photo} alt={`${personal.fullName || 'Profile'} profile`} className="h-14 w-14 shrink-0 rounded-full border border-slate-200 object-cover" />}
  </header>;
  const renderSection = (section: Exclude<SectionKey, 'personalInfo'>) => <ResumeSection key={section} section={section} resumeData={resumeData} layout={layout} sectionClass={style.section} titleClass={style.title} accentColor={accentColor} />;
  const resumeFooter = <footer className="mt-7 flex items-center justify-between gap-3 border-t pt-2 text-[9px] text-slate-400" style={{ borderColor: `${accentColor}66` }}>
    <span className="max-w-[70%] truncate">{personal.fullName || 'Resume'}</span>
    <span className="shrink-0 uppercase tracking-widest">Resume</span>
  </footer>;

  if (!style.sidebarSections.length) {
    return <article className={`${style.page} resume-template resume-template-${layout} min-h-[11in] w-full max-w-[8.5in] overflow-hidden`}>
      {header}<main>{visibleOrder.map(renderSection)}<AdditionalSections resumeData={resumeData} sectionClass={style.section} titleClass={style.title} accentColor={accentColor} />{resumeFooter}</main>
    </article>;
  }

  const mainHeader = layout === 'developer' || layout === 'creative' || layout === 'finance' || layout === 'executive' || layout === 'marketing' || layout === 'portfolio' || layout === 'architect'
    ? <header style={{ borderTop: `4px solid ${accentColor}` }} className={`${style.header.replace('md:hidden', '')} ${personal.photo ? 'flex items-start gap-3' : ''} hidden md:block`}><div className="min-w-0 flex-1"><h1 className={`${style.name} break-words`}>{personal.fullName || 'Your Name'}</h1>{currentRole && <p className={`mt-1 break-words text-xs font-medium ${roleTextColor}`}>{currentRole}</p>}<div className={`${style.contact} break-all`}>{contacts.map((contact, index) => <React.Fragment key={`${contact}-${index}`}><span>{contact}</span>{index < contacts.length - 1 && <span aria-hidden="true">·</span>}</React.Fragment>)}</div></div>{personal.photo && <img src={personal.photo} alt={`${personal.fullName || 'Profile'} profile`} className="h-14 w-14 shrink-0 rounded-full border border-slate-200 object-cover" />}</header>
    : null;

  return <article className={`${style.page} resume-template resume-template-${layout} min-h-[11in] w-full max-w-[8.5in] overflow-hidden`}>
    <div className="md:hidden">{header}</div>
    <aside className={`w-full shrink-0 border-b border-slate-200 p-6 md:w-[31%] md:border-b-0 md:border-r ${layout === 'developer' || layout === 'architect' ? 'bg-blue-50' : layout === 'nurse' ? 'bg-teal-50' : layout === 'finance' || layout === 'portfolio' ? 'bg-amber-50/70' : layout === 'creative' ? 'bg-fuchsia-50/60' : layout === 'people' ? 'bg-rose-50/70' : 'bg-slate-100'}`}>
      {(personal.email || personal.phoneNumber || personal.address || personal.linkedIn || personal.github) && <address className="mb-5 space-y-1 border-y border-slate-300 py-3 text-[10px] not-italic break-all text-slate-600">
        {[personal.email, personal.phoneNumber, personal.address, personal.linkedIn, personal.github].filter(Boolean).map((value, index) => <p key={`${value}-${index}`}>{value}</p>)}
      </address>}
      {visibleOrder.filter(key => style.sidebarSections.includes(key)).map(renderSection)}
    </aside>
    <main className="min-w-0 flex-1 p-6 md:p-8">
      {mainHeader && <div className="hidden md:block">{mainHeader}</div>}
      {visibleOrder.filter(key => style.mainSections.includes(key)).map(renderSection)}
      {visibleOrder.filter(key => !style.sidebarSections.includes(key) && !style.mainSections.includes(key)).map(renderSection)}
      <AdditionalSections resumeData={resumeData} sectionClass={style.section} titleClass={style.title} accentColor={accentColor} />
      {resumeFooter}
    </main>
  </article>;
};
