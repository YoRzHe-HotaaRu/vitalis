import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { UserProfile, BiometricData } from "../types";

const SYSTEM_INSTRUCTION = `
You are Vitalis, an advanced AI Health Companion. 
Your goal is to provide hyper-personalized, evidence-based fitness and nutrition coaching.
You are proactive, not just reactive.

Key Behaviors:
1. **Context Aware**: Always reference the user's name, goals, and current biometric data in your advice.
2. **Three-Path Advice**: When giving actionable plans, often offer three tiers: "Quick/Easy", "Balanced", and "Ambitious".
3. **Evidence-Based**: Briefly mention "studies suggest" or "clinical evidence supports" when making claims.
4. **Tone**: Encouraging, professional, yet conversational. Use emojis sparingly but effectively.
5. **Format**: Use Markdown. Use bolding for key takeaways.

When the user asks for a meal plan or workout, structure your response clearly with bullet points.
`;

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

export const initializeGemini = () => {
  if (!process.env.API_KEY) {
    console.warn("API Key not found in environment variables.");
    return;
  }
  genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const createChatSession = async (profile: UserProfile, biometrics: BiometricData) => {
  if (!genAI) initializeGemini();
  if (!genAI) throw new Error("Gemini AI not initialized");

  const contextPrompt = `
    User Profile:
    Name: ${profile.name}
    Goals: ${profile.goals.join(", ")}
    Diet: ${profile.dietaryPreferences.join(", ")}
    Activity Level: ${profile.activityLevel}

    Current Status (Real-time):
    Energy Score: ${biometrics.energyScore}/100
    Steps Today: ${biometrics.steps}
    Sleep: ${biometrics.sleepHours} hours
    Water: ${biometrics.waterIntake} oz
  `;

  chatSession = genAI.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION + "\n\n" + contextPrompt,
      temperature: 0.7,
    },
  });

  return chatSession;
};

export const sendMessage = async (message: string): Promise<string> => {
  if (!chatSession) {
    throw new Error("Chat session not initialized");
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "I'm having trouble processing that right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I encountered a connection error. Please try again.";
  }
};

export const generateQuickTip = async (biometrics: BiometricData): Promise<string> => {
    if (!genAI) initializeGemini();
    if (!genAI) return "Drink more water!";

    const prompt = `Based on these stats: Energy ${biometrics.energyScore}/100, Steps ${biometrics.steps}, generate a 1-sentence proactive health micro-intervention.`;
    
    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text || "Take a deep breath and stretch.";
    } catch (e) {
        return "Take a moment to breathe.";
    }
}
