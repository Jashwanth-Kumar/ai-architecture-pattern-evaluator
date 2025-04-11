
// GROQ client for AI-powered test analysis
export const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Get API key from the environment
export const getGroqApiKey = () => {
  // This will be populated from Supabase secrets
  return process.env.GROQ_API_KEY || '';
};

// Helper function to make API calls to GROQ
export const analyzeWithGroq = async (url: string, parameters?: any) => {
  const apiKey = getGroqApiKey();
  
  if (!apiKey) {
    throw new Error('GROQ API key is not configured');
  }
  
  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: `You are an AI architecture analysis system that evaluates the most suitable software architecture 
                      pattern for a given application. Analyze the following URL: ${url}
                      
                      Consider these factors in your analysis:
                      1. Scalability requirements
                      2. Performance characteristics
                      3. Data consistency needs
                      4. Expected traffic patterns
                      5. Resource utilization`
          },
          {
            role: 'user',
            content: `Analyze the architecture requirements for: ${url}`
          }
        ],
        temperature: 0.4,
        max_tokens: 1000,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`GROQ API returned ${response.status}: ${await response.text()}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error calling GROQ API:', error);
    throw error;
  }
};
