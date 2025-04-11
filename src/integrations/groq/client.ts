
// GROQ client for AI-powered test analysis
export const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Get API key from the environment
export const getGroqApiKey = () => {
  // This will be populated from Supabase secrets
  return process.env.GROQ_API_KEY || '';
};
