
export interface ArchitecturePattern {
  id: string;
  name: string;
  description: string;
  color: string;
  benefits: string[];
  limitations: string[];
}

export interface Metric {
  name: string;
  key: keyof MetricsData;
  description: string;
  unit: string;
}

export interface MetricsData {
  throughput: number;      // Requests per second
  latency: number;         // Milliseconds
  availability: number;    // Percentage
  resourceUtilization: number; // Percentage
  faultTolerance: number;  // Scale 1-10
  elasticity: number;      // Scale 1-10
  costEfficiency: number;  // Scale 1-10
  dataConsistency: number; // Scale 1-10
}

export interface PatternMetrics {
  pattern: ArchitecturePattern;
  metrics: MetricsData;
}

export interface ComparisonResult {
  beforeScaling: MetricsData;
  afterScaling: MetricsData;
  patternUsed: ArchitecturePattern;
  improvementPercentages: {
    [key in keyof MetricsData]: number;
  };
}

export interface TestResult {
  timestamp: string;
  url: string;
  allPatterns: PatternMetrics[];
  bestPattern: ArchitecturePattern;
  comparisonResult: ComparisonResult;
}
