
import { TestResult } from "@/types/architecture";
import { architecturePatterns } from "./architecture-patterns";

// Function to generate realistic metrics for each architecture pattern
function generatePatternMetrics(patternId: string) {
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

  // Add some randomness to make it more realistic (+/- 10%)
  const randomFactor = () => 0.9 + Math.random() * 0.2;
  
  const base = baseMetrics[patternId as keyof typeof baseMetrics];
  
  return {
    throughput: Math.round(base.throughput * randomFactor()),
    latency: Math.round(base.latency * randomFactor()),
    availability: Number((base.availability * randomFactor()).toFixed(1)),
    resourceUtilization: Math.round(base.resourceUtilization * randomFactor()),
    faultTolerance: Math.min(10, Math.round(base.faultTolerance * randomFactor())),
    elasticity: Math.min(10, Math.round(base.elasticity * randomFactor())),
    costEfficiency: Math.min(10, Math.round(base.costEfficiency * randomFactor())),
    dataConsistency: Math.min(10, Math.round(base.dataConsistency * randomFactor()))
  };
}

export function generateTestResult(url: string): TestResult {
  // Create pattern metrics for all patterns
  const allPatterns = architecturePatterns.map(pattern => ({
    pattern,
    metrics: generatePatternMetrics(pattern.id)
  }));

  // Find the best pattern (let's say it's microservices for this example)
  const bestPattern = architecturePatterns.find(p => p.id === "microservices")!;
  
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
  
  const afterScaling = generatePatternMetrics("microservices");
  
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
  generateTestResult("https://example.com"),
  generateTestResult("https://test-api.example.org"),
  generateTestResult("https://ai-model-service.example.net")
];
