
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeData } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateWorkExperienceBullets(
  jobTitle: string,
  company: string,
  existingDescription: string
): Promise<string[]> {
    if (!API_KEY) {
        throw new Error("API key is not configured.");
    }
    
  const prompt = `
    You are an expert resume writer.
    Generate 3-5 professional, impactful, and quantifiable resume bullet points for the following role.
    Role: ${jobTitle} at ${company}
    Context: ${existingDescription}

    Return JSON: { "bulletPoints": ["bullet 1", "bullet 2"] }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bulletPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["bulletPoints"],
        },
      },
    });

    const jsonString = response.text;
    const parsed = JSON.parse(jsonString);
    return parsed.bulletPoints || [];
  } catch (error) {
    console.error("Error generating bullet points:", error);
    return [];
  }
}

export async function generateResumeFromPrompt(prompt: string): Promise<ResumeData> {
    if (!API_KEY) {
        throw new Error("API key is not configured.");
    }
    
    const generationPrompt = `
        You are a high-precision data extraction tool. Your job is to convert user requests into a structured Resume JSON.
        
        STRICT DATA FIDELITY RULES:
        1. QUANTITATIVE FACTS: If the user mentions a specific number of years of experience (e.g., "7 years of experience"), you MUST include this exact number in the "summary" field and/or the "description" field of the primary work experience. DO NOT OMIT IT.
        2. NO HALLUCINATION: Only use information provided in the prompt. If a field like email, phone, address, or LinkedIn is not provided, it MUST be an empty string ("").
        3. NO PLACEHOLDERS: Never generate dummy data like "example@email.com" or "(123) 456-7890".
        4. NO EXTRA SKILLS: Do NOT suggest or add any skills that were not explicitly named in the user request.
        5. EXTRACTIVE ONLY: Do not create jobs, degrees, or awards that weren't mentioned.
        
        User Request: "${prompt}"
    `;

    const resumeSchema = {
        type: Type.OBJECT,
        properties: {
            personalInfo: {
                type: Type.OBJECT,
                properties: {
                    fullName: { type: Type.STRING },
                    email: { type: Type.STRING },
                    phoneNumber: { type: Type.STRING },
                    address: { type: Type.STRING },
                    linkedIn: { type: Type.STRING },
                    github: { type: Type.STRING },
                    photo: { type: Type.STRING }
                },
                required: ['fullName', 'email', 'phoneNumber', 'address', 'linkedIn', 'github', 'photo']
            },
            summary: { type: Type.STRING, description: "Professional summary. MUST include years of experience if mentioned by user." },
            workExperience: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING },
                        jobTitle: { type: Type.STRING },
                        company: { type: Type.STRING },
                        location: { type: Type.STRING },
                        startDate: { type: Type.STRING },
                        endDate: { type: Type.STRING },
                        isCurrent: { type: Type.BOOLEAN },
                        description: { type: Type.STRING, description: "Job description. Include specific tenure/years if relevant." }
                    },
                    required: ['id', 'jobTitle', 'company', 'location', 'startDate', 'endDate', 'isCurrent', 'description']
                }
            },
            education: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING },
                        institution: { type: Type.STRING },
                        degree: { type: Type.STRING },
                        fieldOfStudy: { type: Type.STRING },
                        startDate: { type: Type.STRING },
                        endDate: { type: Type.STRING }
                    },
                    required: ['id', 'institution', 'degree', 'fieldOfStudy', 'startDate', 'endDate']
                }
            },
            skills: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING },
                        name: { type: Type.STRING }
                    },
                    required: ['id', 'name']
                }
            },
            projects: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING },
                        name: { type: Type.STRING },
                        description: { type: Type.STRING },
                        url: { type: Type.STRING }
                    },
                    required: ['id', 'name', 'description', 'url']
                }
            },
            awards: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING },
                        name: { type: Type.STRING },
                        issuer: { type: Type.STRING },
                        date: { type: Type.STRING }
                    },
                    required: ['id', 'name', 'issuer', 'date']
                }
            }
        },
        required: ['personalInfo', 'summary', 'workExperience', 'education', 'skills', 'projects', 'awards']
    };
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: generationPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: resumeSchema,
            },
        });

        return JSON.parse(response.text) as ResumeData;
    } catch (error) {
        console.error("Error generating resume:", error);
        throw new Error("Failed to generate resume from AI.");
    }
}

export async function getGeneralAIAssistance(query: string, resumeData: ResumeData): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Resume Content: ${JSON.stringify(resumeData)}\nUser Query: ${query}`,
        config: { systemInstruction: "You are a career coach helping a user improve their resume." }
    });
    return response.text;
}

export async function analyzeUploadedResume(
  resumeContent: string | { mimeType: string; data: string }
): Promise<{ score: number; feedback: string[] }> {
  const contents = typeof resumeContent === 'string' ? resumeContent : { parts: [{ inlineData: resumeContent }] };
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: contents as any,
    config: {
      systemInstruction: "Analyze the resume and return a JSON score (1-100) and feedback array.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.INTEGER },
          feedback: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["score", "feedback"]
      }
    }
  });
  return JSON.parse(response.text);
}
