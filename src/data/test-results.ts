
import { TestResult, ArchitecturePattern } from "@/types/architecture";
import { architecturePatterns } from "./architecture-patterns";

// Function to generate realistic metrics for each architecture pattern
function generatePatternMetrics(patternId: string, parameters?: any) {
  // Base values that make sense for each architecture
  const baseMetrics = {
    monolithic: {
      throughput: 1200, latency: 240, availability: 98.5, resourceUtilization: 85,
      faultTolerance: 5, elasticity: 3, costEfficiency: 7, dataConsistency: 9
    },
    microservices: {
      throughput: 2800, latency: 180, availability: 99.8, resourceUtilization: 65,
      faultTolerance: 8, elasticity: 9, costEfficiency: 6, dataConsistency: 7
    },
    serverless: {
      throughput: 3500, latency: 150, availability: 99.9, resourceUtilization: 45,
      faultTolerance: 9, elasticity: 10, costEfficiency: 9, dataConsistency: 6
    },
    eventdriven: {
      throughput: 4200, latency: 120, availability: 99.7, resourceUtilization: 60,
      faultTolerance: 8, elasticity: 8, costEfficiency: 7, dataConsistency: 6
    },
    p2p: {
      throughput: 1800, latency: 300, availability: 97.5, resourceUtilization: 70,
      faultTolerance: 9, elasticity: 7, costEfficiency: 8, dataConsistency: 5
    },
    soa: {
      throughput: 2200, latency: 200, availability: 99.0, resourceUtilization: 75,
      faultTolerance: 7, elasticity: 6, costEfficiency: 6, dataConsistency: 8
    }
  };

  // Apply load level factor if provided in parameters
  const loadFactor = parameters?.loadLevel ? parameters.loadLevel / 50 : 1;
  
  // Add some randomness to make it more realistic (+/- 10%)
  const randomFactor = () => 0.9 + Math.random() * 0.2;
  
  const base = baseMetrics[patternId as keyof typeof baseMetrics];
  
  return {
    throughput: Math.round(base.throughput * randomFactor() * loadFactor),
    latency: Math.round(base.latency * randomFactor() * (2 - loadFactor/2)),
    availability: Number((base.availability * (0.98 + (randomFactor() * 0.02))).toFixed(1)),
    resourceUtilization: Math.round(base.resourceUtilization * randomFactor() * loadFactor),
    faultTolerance: Math.min(10, Math.round(base.faultTolerance * randomFactor())),
    elasticity: Math.min(10, Math.round(base.elasticity * randomFactor())),
    costEfficiency: Math.min(10, Math.round(base.costEfficiency * randomFactor())),
    dataConsistency: Math.min(10, Math.round(base.dataConsistency * randomFactor()))
  };
}

export function generateTestResult(url: string, parameters?: any): TestResult {
  // Determine which patterns to include in the analysis
  const patternsToTest = parameters?.selectedPatterns && parameters.selectedPatterns.length > 0
    ? parameters.selectedPatterns
    : ['monolithic', 'microservices', 'serverless', 'eventdriven', 'soa', 'p2p'];
  
  // Create pattern metrics only for the selected patterns
  const allPatterns = architecturePatterns
    .filter(pattern => patternsToTest.includes(pattern.id))
    .map(pattern => ({
      pattern,
      metrics: generatePatternMetrics(pattern.id, parameters)
    }));

  // Find the best pattern by scoring each one
  const scoredPatterns = allPatterns.map(patternData => {
    const { metrics } = patternData;
    
    // Calculate score based on weighted metrics
    // Higher values are better for all except latency and resource utilization
    let score = 0;
    score += metrics.throughput / 1000 * 2; // Weight throughput higher
    score += (500 - metrics.latency) / 100; // Lower latency is better
    score += metrics.availability - 95; // Availability percentage points above 95%
    score += (100 - metrics.resourceUtilization) / 10; // Lower resource utilization is better
    score += metrics.faultTolerance;
    score += metrics.elasticity;
    score += metrics.costEfficiency;
    score += metrics.dataConsistency;
    
    // Apply test type adjustments
    if (parameters?.testType === 'api') {
      score += metrics.throughput / 500; // Boost throughput importance for APIs
    } else if (parameters?.testType === 'database') {
      score += metrics.dataConsistency * 1.5; // Data consistency is more important for databases
    }
    
    return {
      ...patternData,
      score
    };
  });
  
  // Sort by score and get the best pattern
  scoredPatterns.sort((a, b) => b.score - a.score);
  const bestPattern = scoredPatterns[0].pattern;
  
  // Generate before/after metrics for demonstration
  const beforeScaling = {
    throughput: 800,
    latency: 350,
    availability: 97.2,
    resourceUtilization: 92,
    faultTolerance: 4,
    elasticity: 3,
    costEfficiency: 5,
    dataConsistency: 8
  };
  
  const afterScaling = generatePatternMetrics(bestPattern.id, parameters);
  
  // Calculate improvement percentages
  const improvementPercentages = {
    throughput: ((afterScaling.throughput - beforeScaling.throughput) / beforeScaling.throughput * 100),
    latency: ((beforeScaling.latency - afterScaling.latency) / beforeScaling.latency * 100), // Lower is better
    availability: ((afterScaling.availability - beforeScaling.availability) / beforeScaling.availability * 100),
    resourceUtilization: ((beforeScaling.resourceUtilization - afterScaling.resourceUtilization) / beforeScaling.resourceUtilization * 100), // Lower is better
    faultTolerance: ((afterScaling.faultTolerance - beforeScaling.faultTolerance) / beforeScaling.faultTolerance * 100),
    elasticity: ((afterScaling.elasticity - beforeScaling.elasticity) / beforeScaling.elasticity * 100),
    costEfficiency: ((afterScaling.costEfficiency - beforeScaling.costEfficiency) / beforeScaling.costEfficiency * 100),
    dataConsistency: ((afterScaling.dataConsistency - beforeScaling.dataConsistency) / beforeScaling.dataConsistency * 100)
  };

  return {
    timestamp: new Date().toISOString(),
    url,
    allPatterns,
    bestPattern,
    comparisonResult: {
      beforeScaling,
      afterScaling,
      patternUsed: bestPattern,
      improvementPercentages
    }
  };
}

// Generate some test results for demo purposes
export const sampleTestResults: TestResult[] = [
  generateTestResult("https://example.com", {selectedPatterns: ['monolithic', 'microservices', 'serverless']}),
  generateTestResult("https://test-api.example.org", {testType: 'api', selectedPatterns: ['microservices', 'serverless', 'eventdriven']}),
  generateTestResult("https://ai-model-service.example.net", {testType: 'api', selectedPatterns: ['serverless', 'eventdriven']})
];
