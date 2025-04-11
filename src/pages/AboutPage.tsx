
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Globe, Users, Book } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-8">About the Project</h1>
          
          <div className="grid gap-8">
            <section>
              <Card>
                <CardHeader>
                  <CardTitle>Project Overview</CardTitle>
                  <CardDescription>Software Architecture Patterns for Deploying and Managing Generative AI Models at Scale</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    This project investigates and evaluates various software architecture patterns for the effective deployment and management of generative AI models at scale. With the increasing adoption of AI technologies, selecting the right architecture has become crucial for ensuring performance, scalability, and reliability.
                  </p>
                  <p>
                    The Architecture Pattern Analyzer provides a comprehensive framework for comparing different architectural approaches and identifying the most suitable pattern for specific AI deployment scenarios.
                  </p>
                </CardContent>
              </Card>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Project Objectives</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <FileText className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Evaluation Framework</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Develop a comprehensive framework for evaluating software architecture patterns specifically for AI model deployment and scaling.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <Globe className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Scalable Prototype</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Implement a prototype demonstrating the application of various architecture patterns in AI deployment contexts.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <Book className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Best Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Establish best practices and recommendations for selecting and implementing architecture patterns for AI model deployment.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Project Methodology</h2>
              <Card>
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-5 space-y-4">
                    <li>
                      <strong>Pattern Identification:</strong> Research and identify key software architecture patterns relevant to AI model deployment.
                    </li>
                    <li>
                      <strong>Metrics Definition:</strong> Define comprehensive metrics for evaluating the performance and scalability of each pattern.
                    </li>
                    <li>
                      <strong>Prototype Development:</strong> Develop a testing framework to measure and compare the performance of different patterns.
                    </li>
                    <li>
                      <strong>Data Collection:</strong> Collect performance data through simulated and real-world testing scenarios.
                    </li>
                    <li>
                      <strong>Analysis & Recommendation:</strong> Analyze the collected data and develop a recommendation system for optimal pattern selection.
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Conclusions and Future Work</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4">
                    The Architecture Pattern Analyzer demonstrates that different architecture patterns have significant implications for AI model deployment and scaling. While no single pattern is universally optimal, certain patterns excel in specific scenarios.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>
                      <strong>Microservices Architecture</strong> typically offers the best balance of scalability, fault tolerance, and development agility for complex AI deployments.
                    </li>
                    <li>
                      <strong>Serverless Architecture</strong> provides exceptional cost efficiency and elasticity for intermittent workloads.
                    </li>
                    <li>
                      <strong>Event-Driven Architecture</strong> excels in scenarios with high throughput requirements and asynchronous processing.
                    </li>
                  </ul>
                  <p className="font-medium">Future work includes:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Expanding the analyzer to include more architecture patterns</li>
                    <li>Incorporating machine learning for more personalized recommendations</li>
                    <li>Developing more detailed deployment guides for each architecture pattern</li>
                    <li>Creating hybrid pattern recommendations for complex scenarios</li>
                  </ul>
                </CardContent>
              </Card>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Project Team</h2>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-6 w-6 mr-2" />
                    Development Team
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="font-bold text-primary">KD</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Keshav Dubey</h3>
                        <p className="text-sm text-muted-foreground">Architecture Pattern Analyzer Developer</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">References and Resources</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Academic Resources</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        Richards, M. (2015). <em>Software Architecture Patterns</em>. O'Reilly Media.
                      </li>
                      <li>
                        Fowler, M. (2002). <em>Patterns of Enterprise Application Architecture</em>. Addison-Wesley.
                      </li>
                      <li>
                        Newman, S. (2021). <em>Building Microservices</em> (2nd ed.). O'Reilly Media.
                      </li>
                    </ul>
                    
                    <h3 className="font-medium mt-6">Online Resources</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <a href="https://aws.amazon.com/architecture/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          AWS Architecture Center
                        </a>
                      </li>
                      <li>
                        <a href="https://learn.microsoft.com/en-us/azure/architecture/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Microsoft Azure Architecture Center
                        </a>
                      </li>
                      <li>
                        <a href="https://cloud.google.com/architecture" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Google Cloud Architecture Center
                        </a>
                      </li>
                      <li>
                        <a href="https://huggingface.co/docs/inference-endpoints/architectural_overview" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Hugging Face Inference Endpoints Architecture
                        </a>
                      </li>
                    </ul>
                    
                    <h3 className="font-medium mt-6">Tools and Technologies</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <a href="https://jmeter.apache.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Apache JMeter
                        </a> - For load testing and performance measurement
                      </li>
                      <li>
                        <a href="https://prometheus.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Prometheus
                        </a> - For metrics collection and monitoring
                      </li>
                      <li>
                        <a href="https://grafana.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Grafana
                        </a> - For metrics visualization
                      </li>
                      <li>
                        <a href="https://kubernetes.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Kubernetes
                        </a> - For container orchestration and deployment
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
