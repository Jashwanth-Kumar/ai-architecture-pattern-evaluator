
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { metrics } from '@/data/metrics';
import { architecturePatterns } from '@/data/architecture-patterns';

const DocumentationPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-8">Documentation</h1>
          
          <div className="grid gap-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">About the Analyzer</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4">
                    The Architecture Pattern Analyzer is designed to help developers and architects determine the most suitable architecture pattern for deploying and managing AI models at scale. The system analyzes various metrics and provides comprehensive comparisons across different architectural approaches.
                  </p>
                  <p className="mb-4">
                    Our analysis is based on industry-standard metrics for evaluating software architecture scalability, taking into account the unique requirements and challenges of AI model deployment.
                  </p>
                  <p>
                    The tool includes both simulated benchmarks and real-world performance data to provide accurate recommendations.
                  </p>
                </CardContent>
              </Card>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-5 space-y-4">
                    <li>
                      <strong>Data Collection:</strong> The analyzer collects or simulates performance data from your application URL.
                    </li>
                    <li>
                      <strong>Metrics Calculation:</strong> Various metrics are calculated for each architecture pattern, including throughput, latency, availability, and resource utilization.
                    </li>
                    <li>
                      <strong>Pattern Comparison:</strong> The system compares the performance of different architecture patterns based on the collected metrics.
                    </li>
                    <li>
                      <strong>Recommendation:</strong> The analyzer identifies the most suitable architecture pattern for your specific application needs.
                    </li>
                    <li>
                      <strong>Visualization:</strong> Results are presented through comprehensive charts and tables for easy understanding.
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Metrics Explained</h2>
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Unit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {metrics.map((metric) => (
                        <TableRow key={metric.key}>
                          <TableCell className="font-medium">{metric.name}</TableCell>
                          <TableCell>{metric.description}</TableCell>
                          <TableCell>{metric.unit}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Architecture Patterns</h2>
              <Accordion type="single" collapsible className="w-full">
                {architecturePatterns.map((pattern) => (
                  <AccordionItem key={pattern.id} value={pattern.id}>
                    <AccordionTrigger>
                      <span className="font-medium" style={{ color: pattern.color }}>
                        {pattern.name}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="p-4 space-y-4">
                        <p>{pattern.description}</p>
                        
                        <div>
                          <h4 className="font-medium mb-2">Benefits</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {pattern.benefits.map((benefit, index) => (
                              <li key={index}>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Limitations</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {pattern.limitations.map((limitation, index) => (
                              <li key={index}>{limitation}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq-1">
                  <AccordionTrigger>What data is used for the analysis?</AccordionTrigger>
                  <AccordionContent>
                    <p className="p-4">
                      Our analyzer uses a combination of simulated benchmarks, industry standards, and real-world performance data. In a production environment, the system would perform real load testing, but for demonstration purposes, this application uses synthetic data based on typical performance characteristics of each architecture pattern.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-2">
                  <AccordionTrigger>How accurate are the recommendations?</AccordionTrigger>
                  <AccordionContent>
                    <p className="p-4">
                      The recommendations are based on generally accepted best practices and performance characteristics of each architecture pattern. While they provide a good starting point, actual implementation details, specific requirements, and constraints of your project should also be considered when making architectural decisions.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-3">
                  <AccordionTrigger>Can I test any application URL?</AccordionTrigger>
                  <AccordionContent>
                    <p className="p-4">
                      In this demonstration version, the URL is used primarily for identification purposes. The analysis is based on simulated data rather than actual performance testing of the provided URL. In a production version, the system would perform real load testing and analysis on the specified application.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-4">
                  <AccordionTrigger>How does the system determine the "best" architecture pattern?</AccordionTrigger>
                  <AccordionContent>
                    <p className="p-4">
                      The system evaluates each architecture pattern against multiple metrics including throughput, latency, availability, resource utilization, fault tolerance, elasticity, cost efficiency, and data consistency. The "best" pattern is determined by a weighted score across these metrics, with different weights assigned based on the typical priorities for AI model deployment.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-5">
                  <AccordionTrigger>Can the analyzer be used for applications other than AI model deployment?</AccordionTrigger>
                  <AccordionContent>
                    <p className="p-4">
                      Yes, while the analyzer is optimized for AI model deployment scenarios, the architecture patterns and metrics evaluated are applicable to many types of applications. The relative importance of different metrics may vary depending on your specific use case.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DocumentationPage;
