
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { architecturePatterns } from "../../../src/data/architecture-patterns.ts";

// Get GROQ API key from environment variables
const groqApiKey = Deno.env.get('GROQ_API_KEY');

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url, testType, parameters } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!groqApiKey) {
      return new Response(
        JSON.stringify({ error: 'GROQ API key is not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate system prompt based on the URL and test type
    const systemPrompt = `
      You are an AI architecture analysis system that evaluates the most suitable software architecture 
      pattern for a given application. Analyze the following URL: ${url}
      
      Test type: ${testType || 'standard'}
      
      Consider these factors in your analysis:
      1. Scalability requirements
      2. Performance characteristics
      3. Data consistency needs
      4. Expected traffic patterns
      5. Resource utilization
      
      Available architecture patterns:
      ${architecturePatterns.map(p => `- ${p.name}: ${p.description}`).join('\n')}
      
      Provide your analysis with the following data structure:
      {
        "bestPatternId": "id-of-best-pattern",
        "reasoning": "detailed explanation of why this pattern is best",
        "performanceMetrics": {
          "throughput": numeric-value,
          "latency": numeric-value,
          "availability": numeric-value,
          "resourceUtilization": numeric-value,
          "faultTolerance": numeric-value-1-10,
          "elasticity": numeric-value-1-10,
          "costEfficiency": numeric-value-1-10,
          "dataConsistency": numeric-value-1-10
        }
      }
    `;

    // Make request to GROQ API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze the architecture requirements for: ${url}` }
        ],
        temperature: 0.4,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("GROQ API error:", error);
      return new Response(
        JSON.stringify({ error: "Error calling GROQ API" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    let analysisResult;
    
    try {
      // Try to parse JSON from the GROQ response
      const content = data.choices[0].message.content;
      // Extract JSON from the content (it might be wrapped in markdown code blocks)
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || 
                        content.match(/```\n([\s\S]*?)\n```/) || 
                        content.match(/{[\s\S]*}/);
                        
      const jsonStr = jsonMatch ? jsonMatch[1] || jsonMatch[0] : content;
      analysisResult = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Error parsing GROQ response:", parseError);
      analysisResult = {
        bestPatternId: "serverless", // Default fallback
        reasoning: data.choices[0].message.content,
        performanceMetrics: {
          throughput: 3000,
          latency: 150,
          availability: 99.5,
          resourceUtilization: 60,
          faultTolerance: 8,
          elasticity: 9,
          costEfficiency: 8,
          dataConsistency: 7
        }
      };
    }

    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in architecture analysis function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
