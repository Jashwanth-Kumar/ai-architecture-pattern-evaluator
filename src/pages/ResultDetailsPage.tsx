
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import { TestResult } from '@/types/architecture';
import { generateTestResult } from '@/data/test-results';
import PatternComparisonTable from '@/components/PatternComparisonTable';
import BeforeAfterComparisonTable from '@/components/BeforeAfterComparisonTable';
import ArchitecturePatternCard from '@/components/ArchitecturePatternCard';
import MetricsBarChart from '@/components/charts/MetricsBarChart';
import ComparisonRadarChart from '@/components/charts/ComparisonRadarChart';
import LatencyDistributionChart from '@/components/charts/LatencyDistributionChart';
import ThroughputVsLatencyChart from '@/components/charts/ThroughputVsLatencyChart';
import SystemResourcesChart from '@/components/charts/SystemResourcesChart';

const ResultDetailsPage = () => {
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the selected test result from sessionStorage if it exists
    const resultJson = sessionStorage.getItem('selectedTestResult');
    
    try {
      if (resultJson) {
        const result = JSON.parse(resultJson) as TestResult;
        setTestResult(result);
      } else {
        // Fallback to a generated result if none is selected
        setTestResult(generateTestResult('https://example.com'));
      }
    } catch (error) {
      console.error('Error parsing test result:', error);
      // Fallback to a generated result
      setTestResult(generateTestResult('https://example.com'));
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDownloadReport = () => {
    if (!testResult) return;
    
    // Create a simple report content
    const reportContent = `
Architecture Analysis Report
---------------------------
URL: ${testResult.url}
Timestamp: ${testResult.timestamp}

Best Architecture Pattern: ${testResult.bestPattern.name}

Metrics Comparison:
${testResult.allPatterns.map(pattern => (
  `\n${pattern.pattern.name}:\n` + 
  Object.entries(pattern.metrics)
    .map(([key, value]) => `  - ${key}: ${value}`)
    .join('\n')
)).join('\n')}

Before/After Scaling Comparison:
${Object.entries(testResult.comparisonResult.beforeScaling)
  .map(([key, value]) => `  - ${key}: ${value} -> ${testResult.comparisonResult.afterScaling[key as keyof typeof testResult.comparisonResult.afterScaling]} (${testResult.comparisonResult.improvementPercentages[key as keyof typeof testResult.comparisonResult.improvementPercentages].toFixed(1)}%)`)
  .join('\n')}
`;

    // Create a blob and download it
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `architecture-analysis-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="flex-1 py-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!testResult) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="flex-1 py-12 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">No result data found</h2>
            <Button onClick={() => navigate('/results')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Results
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <Button variant="ghost" onClick={() => navigate('/results')} className="mb-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Results
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">Architecture Analysis Details</h1>
              <div className="flex items-center mt-2">
                <ExternalLink className="h-4 w-4 mr-2 opacity-70" />
                <a 
                  href={testResult.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {testResult.url}
                </a>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-muted-foreground">
                  {new Date(testResult.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
            <Button onClick={handleDownloadReport}>
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>
          
          <div className="grid gap-6 mb-8">
            <Card className="border-t-4" style={{ borderTopColor: testResult.bestPattern.color }}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Best Architecture Pattern
                      <Badge 
                        className="ml-auto" 
                        style={{ backgroundColor: testResult.bestPattern.color }}
                      >
                        Recommended
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Based on the analysis, this pattern is most suitable for your application
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <ArchitecturePatternCard pattern={testResult.bestPattern} selected />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">Before vs After Implementation</h3>
                    <BeforeAfterComparisonTable data={testResult.comparisonResult} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="comparison" className="space-y-6">
            <TabsList className="w-full sm:w-auto flex justify-center sm:inline-flex">
              <TabsTrigger value="comparison">Pattern Comparison</TabsTrigger>
              <TabsTrigger value="metrics">Metrics Detail</TabsTrigger>
              <TabsTrigger value="charts">Performance Charts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="comparison" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Architecture Pattern Comparison</CardTitle>
                  <CardDescription>
                    Complete metrics comparison across all supported architecture patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PatternComparisonTable data={testResult.allPatterns} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="metrics" className="mt-0">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {testResult.allPatterns.map((patternMetrics, index) => (
                  <Card key={index} className={patternMetrics.pattern.id === testResult.bestPattern.id ? 'border-2' : ''} style={{ borderColor: patternMetrics.pattern.id === testResult.bestPattern.id ? patternMetrics.pattern.color : '' }}>
                    <CardHeader className="pb-3">
                      <CardTitle 
                        className="flex items-center" 
                        style={{ color: patternMetrics.pattern.color }}
                      >
                        {patternMetrics.pattern.name}
                        {patternMetrics.pattern.id === testResult.bestPattern.id && (
                          <Badge 
                            className="ml-2" 
                            style={{ backgroundColor: patternMetrics.pattern.color }}
                          >
                            Best
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{patternMetrics.pattern.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Throughput</h4>
                          <p className="text-2xl font-bold">{patternMetrics.metrics.throughput} <span className="text-sm font-normal text-muted-foreground">req/s</span></p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Latency</h4>
                          <p className="text-2xl font-bold">{patternMetrics.metrics.latency} <span className="text-sm font-normal text-muted-foreground">ms</span></p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Availability</h4>
                          <p className="text-2xl font-bold">{patternMetrics.metrics.availability} <span className="text-sm font-normal text-muted-foreground">%</span></p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Resource Utilization</h4>
                          <p className="text-2xl font-bold">{patternMetrics.metrics.resourceUtilization} <span className="text-sm font-normal text-muted-foreground">%</span></p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Fault Tolerance</h4>
                          <div className="w-full bg-secondary rounded-full h-2.5">
                            <div 
                              className="h-2.5 rounded-full" 
                              style={{ 
                                width: `${(patternMetrics.metrics.faultTolerance / 10) * 100}%`,
                                backgroundColor: patternMetrics.pattern.color 
                              }}
                            ></div>
                          </div>
                          <p className="text-sm mt-1">{patternMetrics.metrics.faultTolerance}/10</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Elasticity</h4>
                          <div className="w-full bg-secondary rounded-full h-2.5">
                            <div 
                              className="h-2.5 rounded-full" 
                              style={{ 
                                width: `${(patternMetrics.metrics.elasticity / 10) * 100}%`,
                                backgroundColor: patternMetrics.pattern.color 
                              }}
                            ></div>
                          </div>
                          <p className="text-sm mt-1">{patternMetrics.metrics.elasticity}/10</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Cost Efficiency</h4>
                          <div className="w-full bg-secondary rounded-full h-2.5">
                            <div 
                              className="h-2.5 rounded-full" 
                              style={{ 
                                width: `${(patternMetrics.metrics.costEfficiency / 10) * 100}%`,
                                backgroundColor: patternMetrics.pattern.color 
                              }}
                            ></div>
                          </div>
                          <p className="text-sm mt-1">{patternMetrics.metrics.costEfficiency}/10</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Data Consistency</h4>
                          <div className="w-full bg-secondary rounded-full h-2.5">
                            <div 
                              className="h-2.5 rounded-full" 
                              style={{ 
                                width: `${(patternMetrics.metrics.dataConsistency / 10) * 100}%`,
                                backgroundColor: patternMetrics.pattern.color 
                              }}
                            ></div>
                          </div>
                          <p className="text-sm mt-1">{patternMetrics.metrics.dataConsistency}/10</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="charts" className="mt-0">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Overview</CardTitle>
                    <CardDescription>Multi-dimensional view of all metrics across patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ComparisonRadarChart data={testResult.allPatterns} />
                  </CardContent>
                </Card>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Throughput Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MetricsBarChart data={testResult.allPatterns} metricKey="throughput" />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Latency Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MetricsBarChart data={testResult.allPatterns} metricKey="latency" />
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Latency Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <LatencyDistributionChart data={testResult.allPatterns} />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Throughput vs Latency</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ThroughputVsLatencyChart data={testResult.allPatterns} />
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>System Resources Utilization</CardTitle>
                    <CardDescription>
                      Resource usage comparison across architecture patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SystemResourcesChart data={testResult.allPatterns} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResultDetailsPage;
