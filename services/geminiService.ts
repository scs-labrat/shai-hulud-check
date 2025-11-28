import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { REPORT_TEXT } from '../constants';

const apiKey = process.env.API_KEY || '';

// Initialize client securely
// Note: In a real prod environment, this should be proxied through a backend to hide the key.
// For this frontend-only demo, we assume the environment variable is injected.
const ai = new GoogleGenAI({ apiKey });

export const analyzeThreatQuery = async (userQuery: string): Promise<string> => {
  if (!apiKey) {
    return "API Key not configured. Please check your environment settings.";
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: userQuery }]
        }
      ],
      config: {
        systemInstruction: `You are a cybersecurity threat intelligence analyst named 'Wayfinder'.
        You have just released a critical report regarding the 'Shai-Hulud Worm 2.0' (Sha1-Hulud).
        
        Here is the full technical report context:
        ${REPORT_TEXT}

        Answer the user's questions specifically based on this report.
        If they ask for remediation, provide the specific steps listed (Revoke tokens, MFA, etc).
        If they ask for IOCs, list the SHA1 hashes or filenames.
        Maintain a professional, urgent, but calm tone.
        Format your response with Markdown for readability.`,
        temperature: 0.3, // Low temperature for factual accuracy
      }
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while consulting the intelligence database.";
  }
};