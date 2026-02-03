
import { GoogleGenAI } from "@google/genai";
import { AIProject } from "../types";

export const askGeminiAboutProjects = async (query: string, projects: AIProject[]): Promise<string> => {
  // Check if API key exists in the environment
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    return "The AGM AI Assistant is currently in maintenance mode (Missing API Configuration). Please contact your system administrator.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Create context from projects data including risk and lifecycle
    const context = JSON.stringify(projects.map(p => ({
      name: p.name,
      domain: p.domain,
      status: p.status,
      maturity: p.maturityStage,
      risk: p.riskLevel,
      compliance: p.complianceStatus,
      researcher: p.researcher,
      kpis: p.kpis
    })));

    const systemInstruction = `
      You are the AGM Portal Governance Assistant, an internal tool for enterprise AI management and monitoring.
      
      CONTEXT:
      You have access to the following project portfolio:
      ${context}
      
      YOUR ROLE:
      1. Provide executive summaries for Senior Management.
      2. Help Researchers identify risks or technical gaps in their projects.
      3. Always refer to projects by their official names within the AGM system.
      
      GUIDELINES:
      - Use professional, concise corporate language.
      - Use Markdown tables for comparing project metrics (KPIs).
      - Highlight 'High' or 'Critical' risk levels specifically.
      - If no projects match the user's query, state that clearly based on the registry data.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    if (!response.text) {
      throw new Error("Empty response from model");
    }

    return response.text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    if (error?.message?.includes('429')) {
      return "The AGM AI Assistant is currently receiving too many requests. Please try again in a few moments.";
    }
    
    return "I encountered a technical issue while analyzing the portfolio registry. Our engineering team has been notified.";
  }
};
