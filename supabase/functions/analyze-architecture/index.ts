
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Define architecture patterns directly in this file instead of importing from src/data
const architecturePatterns = [
  {
    id: "monolithic",
    name: "Monolithic Architecture",
    color: "#4f46e5",
    description: "A single, unified codebase where all components of an application are interconnected and run as a single service.",
    benefits: [
      "Simplicity in development and deployment",
      "Easier to test as a complete unit",
      "Less cross-cutting concerns like logging, security",
      "Straightforward debugging process",
      "Lower complexity for smaller applications"
    ],
    limitations: [
      "Scalability becomes challenging as the application grows",
      "Single point of failure risk",
      "Technology stack is fixed for the entire application",
      "Continuous deployment can be difficult",
      "Team coordination becomes complex with large codebases"
    ]
  },
  {
    id: "microservices",
    name: "Microservices Architecture",
    color: "#0891b2",
    description: "An architectural approach where an application is built as a collection of small, independent services that communicate over a network.",
    benefits: [
      "Independent development and deployment",
      "Technology diversity - different services can use different stacks",
      "Improved fault isolation",
      "Scalability - individual services can be scaled independently",
      "Better suited for large, complex applications"
    ],
    limitations: [
      "Increased operational complexity",
      "Network latency between services",
      "Distributed system challenges (consistency, transactions)",
      "Testing complexity across service boundaries",
      "Requires strong DevOps practices"
    ]
  },
  {
    id: "serverless",
    name: "Serverless Architecture",
    color: "#9333ea",
    description: "A cloud computing execution model where the cloud provider manages the infrastructure, automatically provisioning and scaling resources as needed.",
    benefits: [
      "No server management needed",
      "Pay-per-use pricing model",
      "Automatic scaling",
      "Reduced operational costs for variable workloads",
      "Focus on code rather than infrastructure"
    ],
    limitations: [
      "Cold start latency issues",
      "Limited execution duration",
      "Vendor lock-in concerns",
      "Debugging and monitoring challenges",
      "Less control over underlying infrastructure"
    ]
  },
  {
    id: "eventdriven",
    name: "Event-Driven Architecture",
    color: "#16a34a",
    description: "A software architecture pattern promoting the production, detection, consumption of, and reaction to events between loosely coupled components.",
    benefits: [
      "Loose coupling between components",
      "Highly scalable and responsive",
      "Good for real-time data processing",
      "Adaptable to changing requirements",
      "Facilitates asynchronous operations"
    ],
    limitations: [
      "Complexity in event tracking and debugging",
      "Eventual consistency challenges",
      "Event versioning and compatibility issues",
      "Potential event storms under heavy load",
      "Can be overkill for simple applications"
    ]
  },
  {
    id: "p2p",
    name: "Peer-to-Peer Architecture",
    color: "#f59e0b",
    description: "A distributed architecture where tasks and workloads are shared among peers without a centralized server, creating a network of equals.",
    benefits: [
      "High resilience - no single point of failure",
      "Efficient resource utilization across the network",
      "Scales naturally with more peers",
      "Reduced central infrastructure costs",
      "Better privacy as data can be distributed"
    ],
    limitations: [
      "Security challenges with distributed trust",
      "Inconsistent performance based on peer availability",
      "Complex coordination and consensus mechanisms",
      "Discovery and NAT traversal challenges",
      "Regulatory compliance can be difficult"
    ]
  },
  {
    id: "soa",
    name: "Service-Oriented Architecture (SOA)",
    color: "#ef4444",
    description: "An architectural style where services are provided to other components through a communication protocol over a network.",
    benefits: [
      "Reusable services across different applications",
      "Standardized service contracts",
      "Business-focused approach to service design",
      "Integration with legacy systems",
      "Improved maintainability through service abstraction"
    ],
    limitations: [
      "Can become complex with service orchestration",
      "Potential performance overhead from layers of abstraction",
      "Service governance challenges",
      "Requires careful service design and granularity",
      "Can lead to distributed monoliths if not carefully implemented"
    ]
  }
];

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
