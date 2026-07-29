
import React, { useState, useRef } from 'react';
import { ResumeData, SectionKey, TemplateKey } from '../types';
import { ResumeForm } from './ResumeForm';
import { ResumePreview } from './ResumePreview';
import { TemplateGallery } from './TemplateGallery';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Sparkles, Check, FileTextIcon } from './icons';
import { analyzeUploadedResume, generateResumeFromPrompt } from '../services/geminiService';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';


declare var jspdf: any;
declare var html2canvas: any;

type Step = 'template' | 'ai' | 'content' | 'preview' | 'ats';

const STEPS: { id: Step, name: string }[] = [
    { id: 'template', name: 'Template' },
    { id: 'ai', name: 'AI Generate' },
    { id: 'content', name: 'Content' },
    { id: 'preview', name: 'Preview' },
    { id: 'ats', name: 'ATS Check' },
];

interface ResumeBuilderProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  templateDataMap: Partial<Record<TemplateKey, ResumeData>>;
}

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ resumeData, setResumeData, templateDataMap }) => {
  const [sections, setSections] = useState<SectionKey[]>([
    'personalInfo', 
    'summary', 
    'workExperience', 
    'skills', 
    'projects',
    'education',
    'awards',
  ]);
  const [activeTemplate, setActiveTemplate] = useState<TemplateKey>('techModern');
  const [step, setStep] = useState<Step>('template');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfFileName, setPdfFileName] = useState('resume');
  
  const [atsResult, setAtsResult] = useState<{ score: number; feedback: string[] } | null>(null);
  const [isAtsChecking, setIsAtsChecking] = useState(false);
  const [atsError, setAtsError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);


  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    setSections(prevSections => {
      const newSections = [...prevSections];
      const to = direction === 'up' ? index - 1 : index + 1;
      
      if (to < 0 || to >= newSections.length) {
        return newSections;
      }

      const [movedItem] = newSections.splice(index, 1);
      newSections.splice(to, 0, movedItem);
      return newSections;
    });
  };

  const handleSelectTemplate = (templateId: TemplateKey) => {
    setActiveTemplate(templateId);
    // Use a fallback to a default if a specific template isn't mapped
    const newResumeData = templateDataMap[templateId] || templateDataMap['techModern'];
    if (newResumeData) {
        setResumeData(newResumeData);
    }
  };

  const handleNextStep = () => {
    const currentStepIndex = STEPS.findIndex(s => s.id === step);
    if (currentStepIndex < STEPS.length - 1) {
        setStep(STEPS[currentStepIndex + 1].id);
    }
  };

  const handlePrevStep = () => {
    const currentStepIndex = STEPS.findIndex(s => s.id === step);
    if (currentStepIndex > 0) {
        setStep(STEPS[currentStepIndex - 1].id);
    }
  };
  
  const createProcessingOverlay = (text: string): HTMLDivElement => {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.backgroundColor = 'rgba(15, 23, 42, 0.8)'; // slate-900 with opacity
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';
    overlay.style.color = 'white';
    overlay.style.backdropFilter = 'blur(4px)';
    overlay.style.transition = 'opacity 0.2s ease-in-out';
    overlay.style.opacity = '0';

    const sparklesSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1.5s linear infinite;"><path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9 1.9 5.8 1.9-5.8 5.8-1.9-5.8-1.9z"/></svg>`;
    const textElement = document.createElement('p');
    textElement.textContent = text;
    textElement.style.marginTop = '16px';
    textElement.style.fontSize = '1rem';
    textElement.style.fontWeight = '500';

    overlay.innerHTML = sparklesSVG;
    overlay.appendChild(textElement);

    const styleSheetId = 'spin-animation-style';
    if (!document.getElementById(styleSheetId)) {
      const styleSheet = document.createElement("style");
      styleSheet.id = styleSheetId;
      styleSheet.innerText = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
      document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(overlay);
    
    // Fade in
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });

    return overlay;
  };


  const handleDownloadPdf = async () => {
    if (!pdfFileName.trim()) return;

    const elementToCapture = document.querySelector<HTMLElement>('#resume-preview-container > div');
    if (!elementToCapture) {
        console.error("Resume preview element not found for PDF generation!");
        return;
    }

    setIsDownloading(true);
    const htmlElement = document.documentElement;
    const isDarkMode = htmlElement.classList.contains('dark');
    let overlay: HTMLDivElement | null = null;

    if (isDarkMode) {
        overlay = createProcessingOverlay('Preparing PDF...');
        htmlElement.classList.remove('dark');
    }
    
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
        const canvas = await html2canvas(elementToCapture, {
            scale: 2, 
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
        });

        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;
        
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position -= pageHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save(`${pdfFileName}.pdf`);

    } catch (error) {
        console.error("Error generating PDF:", error);
    } finally {
        if (isDarkMode) {
            htmlElement.classList.add('dark');
            if (overlay) {
                document.body.removeChild(overlay);
            }
        }
        setIsDownloading(false);
        setIsPdfModalOpen(false);
    }
  };


  const handleRunAtsCheck = async () => {
      setIsAtsChecking(true);
      setAtsResult(null);
      setAtsError(null);

      const elementToCapture = document.querySelector<HTMLElement>('#resume-preview-container > div');
      
      if (!elementToCapture) {
        setAtsError("Could not find the resume preview to analyze. Please try again.");
        setIsAtsChecking(false);
        return;
      }
      
      const htmlElement = document.documentElement;
      const isDarkMode = htmlElement.classList.contains('dark');
      let overlay: HTMLDivElement | null = null;
      
      if (isDarkMode) {
          overlay = createProcessingOverlay('Analyzing resume...');
          htmlElement.classList.remove('dark');
      }

      await new Promise(resolve => setTimeout(resolve, 100));

      try {
        const canvas = await html2canvas(elementToCapture, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
        });
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        const base64Data = dataUrl.split(',')[1];

        const result = await analyzeUploadedResume({
            mimeType: 'image/jpeg',
            data: base64Data
        });

        setAtsResult(result);

      } catch (error) {
        console.error("Failed to run ATS check", error);
        setAtsError("Sorry, the AI analysis failed. Please try again.");
      } finally {
        if (isDarkMode) {
            htmlElement.classList.add('dark');
            if (overlay) {
                document.body.removeChild(overlay);
            }
        }
        setIsAtsChecking(false);
      }
  };

  const handleAnalyzeUploadedFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsAtsChecking(true);
    setAtsResult(null);
    setAtsError(null);

    const textMimeTypes = ['text/plain', 'text/markdown'];
    const isTextFile = textMimeTypes.includes(file.type) || file.name.endsWith('.txt') || file.name.endsWith('.md');

    if (isTextFile) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target?.result as string;
            if (text) {
                try {
                    const result = await analyzeUploadedResume(text);
                    setAtsResult(result);
                } catch (error) {
                    console.error("Failed to run ATS check on uploaded text file", error);
                    setAtsError("Sorry, the AI analysis for the uploaded file failed. Please try again.");
                } finally {
                    setIsAtsChecking(false);
                }
            } else {
                 setAtsError("Could not read the file content.");
                 setIsAtsChecking(false);
            }
        };
        reader.onerror = () => {
             setAtsError("Failed to read the file.");
             setIsAtsChecking(false);
        }
        reader.readAsText(file);
    } else {
        // Handle binary files (PDF, DOCX, images) by reading as base64
        const reader = new FileReader();
        reader.onload = async (e) => {
            const dataUrl = e.target?.result as string;
            if (dataUrl) {
                 try {
                    const base64Data = dataUrl.split(',')[1];
                    const result = await analyzeUploadedResume({
                        mimeType: file.type,
                        data: base64Data
                    });
                    setAtsResult(result);
                } catch (error) {
                    console.error("Failed to run ATS check on uploaded file", error);
                    setAtsError("Sorry, the AI analysis for the uploaded file failed. Please try again.");
                } finally {
                    setIsAtsChecking(false);
                }
            } else {
                setAtsError("Could not read the file content.");
                setIsAtsChecking(false);
            }
        };
        reader.onerror = () => {
            setAtsError("Failed to read the file.");
            setIsAtsChecking(false);
        }
        reader.readAsDataURL(file);
    }

    // Reset file input value to allow re-uploading the same file
    event.target.value = '';
  };
  
  const handleGenerateResumeFromPrompt = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiGenerating(true);
    setAiError(null);
    try {
      const newResumeData = await generateResumeFromPrompt(aiPrompt);
      // Sanitize data to ensure all arrays exist, preventing runtime errors
      const sanitizedData = {
        ...newResumeData,
        personalInfo: newResumeData.personalInfo || resumeData.personalInfo,
        summary: newResumeData.summary || '',
        workExperience: newResumeData.workExperience || [],
        education: newResumeData.education || [],
        skills: newResumeData.skills || [],
        projects: newResumeData.projects || [],
        awards: newResumeData.awards || [],
      };
      setResumeData(sanitizedData);
      setStep('content'); // Proceed to content editing step
    } catch (error) {
      console.error("Failed to generate resume from prompt", error);
      setAiError("Sorry, the AI failed to generate the resume. Please try refining your prompt or try again.");
    } finally {
      setIsAiGenerating(false);
    }
  };


  const ScoreCircle = ({ score, isLoading }: { score: number | null, isLoading?: boolean }) => {
    if (isLoading) {
        return (
            <div 
              className="w-36 h-36 rounded-full flex flex-col items-center justify-center relative my-6 bg-muted/50 dark:bg-muted/20 animate-pulse"
              role="progressbar"
              aria-busy="true"
            >
                <Sparkles className="h-10 w-10 text-muted-foreground animate-spin" />
                <span className="text-sm text-muted-foreground mt-2">Analyzing...</span>
            </div>
        );
    }
    
    if (score === null) return null;

    const getColor = () => {
        if (score < 50) return 'hsl(var(--destructive))';
        if (score < 85) return 'hsl(var(--warning))';
        return 'hsl(var(--success))';
    };

    const style = {
        background: `radial-gradient(closest-side, hsl(var(--card)) 79%, transparent 80% 100%),
                     conic-gradient(${getColor()} ${score}%, hsl(var(--muted)) 0)`,
    };

    return (
        <div 
          className="w-36 h-36 rounded-full flex flex-col items-center justify-center relative my-6" 
          style={style}
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={100}
        >
            <span className="text-4xl font-bold text-foreground">{score}</span>
            <span className="text-sm text-muted-foreground">/ 100</span>
        </div>
    );
  };


  const renderStepContent = () => {
      switch(step) {
          case 'template':
              return (
                   <>
                      <section className="text-center pb-8">
                          <div className="flex justify-center items-center gap-3">
                              <Sparkles className="h-8 w-8 text-purple-500" />
                              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                                      AI RESUME BUILDER
                                  </span>
                              </h1>
                              <Sparkles className="h-8 w-8 text-pink-500" />
                          </div>
                          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                              Craft your perfect resume with the power of AI. Start by choosing a template below.
                          </p>
                      </section>
                      <TemplateGallery 
                          activeTemplate={activeTemplate}
                          onSelectTemplate={handleSelectTemplate}
                      />
                  </>
              );
          case 'ai':
              return (
                  <div className="max-w-2xl mx-auto text-center">
                      <h2 className="text-3xl font-bold tracking-tight">Generate with AI</h2>
                      <p className="text-muted-foreground mt-3">
                          Describe your desired role, experience level, and key skills. The more detail you provide, the better the result. The AI will generate a complete resume draft for you to edit in the next step.
                      </p>
                      
                      <div className="mt-8 space-y-4 text-left">
                           <Textarea 
                              placeholder="e.g., A senior software engineer with 8 years of experience in backend development using Go and Python, specializing in cloud-native technologies on AWS and distributed systems..."
                              rows={8}
                              value={aiPrompt}
                              onChange={(e) => setAiPrompt(e.target.value)}
                              disabled={isAiGenerating}
                              className="text-base"
                          />
                          <Button onClick={handleGenerateResumeFromPrompt} disabled={isAiGenerating || !aiPrompt.trim()} className="w-full">
                              <Sparkles className={`mr-2 h-4 w-4 ${isAiGenerating ? 'animate-spin' : ''}`} />
                              {isAiGenerating ? 'Generating...' : 'Generate Full Resume'}
                          </Button>
                          <Button variant="link" onClick={() => setStep('content')} className="w-full">
                            Skip and edit manually
                          </Button>
                      </div>
                      {aiError && <p className="mt-4 text-sm text-destructive text-left">{aiError}</p>}
                  </div>
              );
          case 'content':
              return (
                  <ResumeForm 
                      resumeData={resumeData} 
                      setResumeData={setResumeData}
                      sections={sections}
                      onMoveSection={handleMoveSection}
                  />
              );
          case 'preview':
              return (
                 <>
                    <p className="text-center text-muted-foreground mb-4">Here's your generated resume. Review it, then proceed to the ATS check.</p>
                    <div className="max-w-4xl mx-auto" id="resume-preview-container">
                        <ResumePreview 
                            resumeData={resumeData} 
                            sectionOrder={sections} 
                            template={activeTemplate}
                        />
                    </div>
                 </>
              );
          case 'ats':
              return (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                          <h2 className="text-2xl font-bold tracking-tight">ATS Analysis</h2>
                          <p className="text-muted-foreground mt-2">See how your resume scores against an AI-powered Applicant Tracking System and get tips for improvement.</p>
                          
                          <div className="mt-6 flex flex-wrap gap-4">
                              <Button onClick={handleRunAtsCheck} disabled={isAtsChecking}>
                                  <Sparkles className={`mr-2 h-4 w-4 ${isAtsChecking ? 'animate-spin' : ''}`} />
                                  {isAtsChecking ? 'Analyzing...' : 'Analyze Current Resume'}
                              </Button>
                              <Button variant="secondary" onClick={() => fileInputRef.current?.click()} disabled={isAtsChecking}>
                                  Upload & Analyze Resume
                              </Button>
                              <input 
                                  type="file" 
                                  ref={fileInputRef} 
                                  onChange={handleAnalyzeUploadedFile} 
                                  className="hidden" 
                                  accept=".txt,.md,.pdf,.doc,.docx,image/*"
                              />
                          </div>
                          
                          {atsError && <p className="mt-4 text-sm text-destructive">{atsError}</p>}
                          
                          {isAtsChecking || atsResult ? (
                              <div className="mt-6">
                                  <div className="flex flex-col items-center">
                                      <ScoreCircle score={atsResult?.score ?? null} isLoading={isAtsChecking} />
                                  </div>
                                  {atsResult && (
                                      <div>
                                          <h3 className="font-semibold text-lg">Improvement Suggestions</h3>
                                          <ul className="mt-3 space-y-3">
                                              {atsResult.feedback.map((item, index) => (
                                                  <li key={index} className="flex items-start gap-3 text-sm">
                                                      <div className="flex-shrink-0 w-4 h-4 mt-1 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                                                          <Sparkles className="w-2.5 h-2.5" />
                                                      </div>
                                                      <span className="text-muted-foreground">{item}</span>
                                                  </li>
                                              ))}
                                          </ul>
                                      </div>
                                  )}
                              </div>
                          ) : !atsError && (
                              <div className="mt-8 text-center text-muted-foreground border rounded-lg p-8">
                                  Click a button above to analyze your resume.
                              </div>
                          )}

                      </div>
                      <div id="resume-preview-container">
                          <ResumePreview 
                              resumeData={resumeData} 
                              sectionOrder={sections} 
                              template={activeTemplate}
                          />
                      </div>
                  </div>
              );
          default:
              return null;
      }
  };

  const currentStepIndex = STEPS.findIndex(s => s.id === step);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Stepper UI */}
       <div className="w-full max-w-5xl mx-auto mb-16 px-4">
          <div className="relative flex justify-between items-start">
              {/* Progress Bar Layer */}
              <div className="absolute top-7 left-0 w-full h-1.5 transform -translate-y-1/2">
                  {/* Background line */}
                  <div className="w-full h-full bg-border rounded-full"></div>
                  {/* Filled line */}
                  <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: `${(currentStepIndex / (STEPS.length - 1)) * 100}%` }}
                  ></div>
              </div>
              
              {/* Steps Layer */}
              {STEPS.map((s, index) => {
                  const isCompleted = index < currentStepIndex;
                  const isCurrent = index === currentStepIndex;

                  return (
                      <div key={s.id} className="z-10 flex flex-col items-center w-24">
                          <button
                              onClick={() => setStep(s.id)}
                              className={`w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-300 font-bold text-2xl
                                  ${isCurrent 
                                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-primary-foreground border-white dark:border-card shadow-lg shadow-purple-500/40 scale-110' 
                                      : isCompleted
                                      ? 'bg-green-500 border-white dark:border-card text-white'
                                      : 'bg-card border-border text-muted-foreground hover:border-primary/50'
                                  }`}
                              aria-current={isCurrent ? 'step' : undefined}
                          >
                              {isCompleted ? <Check className="w-8 h-8" /> : index + 1}
                          </button>
                          <span className={`text-sm mt-3 font-medium text-center transition-colors
                              ${isCurrent ? 'text-primary font-bold' : isCompleted ? 'text-green-600 dark:text-green-500 font-semibold' : 'text-muted-foreground'}`
                          }>
                              {s.name}
                          </span>
                      </div>
                  );
              })}
          </div>
      </div>


      <Card className="bg-background/80 dark:bg-card/60 shadow-2xl shadow-indigo-500/10 dark:shadow-black/20">
          <CardContent className="p-4 sm:p-6 md:p-8">
              {renderStepContent()}
          </CardContent>
          <CardFooter className="p-4 sm:p-6 md:p-8 flex justify-between border-t">
              <Button variant="outline" onClick={handlePrevStep} disabled={step === 'template'}>
                  Previous
              </Button>
              {step === 'ats' ? (
                  <Button onClick={() => setIsPdfModalOpen(true)} disabled={isDownloading}>
                      {isDownloading ? 'Downloading...' : 'Download PDF'}
                  </Button>
              ) : (
                  <Button onClick={handleNextStep}>
                      Next Step
                  </Button>
              )}
          </CardFooter>
      </Card>
      
      {(step === 'preview' || step === 'ats' || step === 'ai') && (
            <div className="mt-6 flex justify-center gap-4">
                <Button variant="secondary" onClick={() => setStep('content')}>Edit Content</Button>
                <Button variant="secondary" onClick={() => setStep('template')}>Change Template</Button>
            </div>
      )}

      {isPdfModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileTextIcon className="h-5 w-5" />
                Save Your Resume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <label htmlFor="pdf-name" className="text-sm font-medium text-muted-foreground">
                Filename
              </label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="pdf-name"
                  value={pdfFileName}
                  onChange={(e) => setPdfFileName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleDownloadPdf(); }}
                  placeholder="Enter filename"
                  aria-label="PDF Filename"
                />
                <span className="text-muted-foreground">.pdf</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsPdfModalOpen(false)} disabled={isDownloading}>
                Cancel
              </Button>
              <Button onClick={handleDownloadPdf} disabled={isDownloading || !pdfFileName.trim()}>
                {isDownloading ? 'Saving...' : 'Save PDF'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};
