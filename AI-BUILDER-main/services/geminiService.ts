import { ResumeData } from "../types";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"
).replace(/\/+$/, "");

async function callBackend<T>(
  action: string,
  payload: Record<string, unknown>
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/api/ai/${action}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      result && typeof result.error === "string"
        ? result.error
        : `AI request failed with status ${response.status}.`;

    throw new Error(message);
  }

  if (!result || !("result" in result)) {
    throw new Error("The backend returned an invalid response.");
  }

  return result.result as T;
}

export async function generateWorkExperienceBullets(
  jobTitle: string,
  company: string,
  existingDescription: string
): Promise<string[]> {
  try {
    return await callBackend<string[]>("work-experience-bullets", {
      jobTitle,
      company,
      existingDescription,
    });
  } catch (error) {
    console.error("Error generating bullet points:", error);
    return [];
  }
}

export async function generateResumeFromPrompt(
  prompt: string
): Promise<ResumeData> {
  try {
    return await callBackend<ResumeData>("generate-resume", {
      prompt,
    });
  } catch (error) {
    console.error("Error generating resume:", error);

    const message =
      error instanceof Error ? error.message : "Unknown backend error.";

    throw new Error(`Resume generation failed: ${message}`);
  }
}

export async function getGeneralAIAssistance(
  query: string,
  resumeData: ResumeData
): Promise<string> {
  const resumeForAssistance = {
    ...resumeData,
    personalInfo: {
      ...resumeData.personalInfo,
      photo: "",
    },
  };

  return callBackend<string>("general-assistance", {
    query,
    resumeData: resumeForAssistance,
  });
}

export async function analyzeUploadedResume(
  resumeContent: string | { mimeType: string; data: string }
): Promise<{ score: number; feedback: string[] }> {
  return callBackend<{ score: number; feedback: string[] }>(
    "analyze-resume",
    {
      resumeContent,
    }
  );
}