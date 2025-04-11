
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cpu, Activity, Server, Database, BarChart2, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { architecturePatterns } from '@/data/architecture-patterns';
import ArchitecturePatternCard from '@/components/ArchitecturePatternCard';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-secondary/20 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  Software Architecture Patterns for AI Models at Scale
                </h1>
                <p className="text-lg text-muted-foreground">
                  Analyze and compare different architecture patterns for deploying AI models at scale. Determine the most suitable pattern for your application.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" onClick={() => navigate('/test')}>
                    Run Architecture Analysis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate('/documentation')}>
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <Cpu className="h-12 w-12 text-primary mb-2" />
                    <CardTitle>Performance Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Measure throughput, latency, and resource utilization across different patterns.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <Activity className="h-12 w-12 text-primary mb-2" />
                    <CardTitle>Scalability Testing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Evaluate how well each architecture scales under increased load.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <Server className="h-12 w-12 text-primary mb-2" />
                    <CardTitle>Pattern Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Compare multiple architecture patterns side-by-side with detailed metrics.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <Database className="h-12 w-12 text-primary mb-2" />
                    <CardTitle>Deployment Optimization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Get recommendations for optimizing your AI model deployment.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Architecture Patterns Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight">Supported Architecture Patterns</h2>
              <p className="mt-4 text-muted-foreground">
                Our analyzer evaluates applications against these industry-standard architecture patterns for AI deployment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {architecturePatterns.map((pattern) => (
                <ArchitecturePatternCard 
                  key={pattern.id} 
                  pattern={pattern} 
                />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button size="lg" onClick={() => navigate('/test')}>
                Start Architecture Analysis
                <BarChart2 className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
