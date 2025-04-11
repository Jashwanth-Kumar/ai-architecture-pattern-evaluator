
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
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
        {/* Hero Section - Simplified */}
        <section className="bg-gradient-to-b from-background to-secondary/20 py-16">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-6">
                AI Architecture Pattern Analysis
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Find the optimal architecture pattern for your AI application with data-driven analysis and recommendations.
              </p>
              <Button size="lg" onClick={() => navigate('/test')} className="mb-4">
                Run Architecture Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">Analyze Architecture Patterns</h2>
                <p className="text-muted-foreground mb-4">
                  Test your application against multiple architecture patterns to determine the optimal solution for your scaling needs.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Performance metrics comparison</li>
                  <li>Scalability assessment</li>
                  <li>Resource utilization analysis</li>
                </ul>
              </div>
              
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">AI-Powered Recommendations</h2>
                <p className="text-muted-foreground mb-4">
                  Get intelligent recommendations based on your application's unique requirements and performance characteristics.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Best pattern selection</li>
                  <li>Before/after performance comparison</li>
                  <li>Detailed implementation guidance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pattern Overview - Simplified */}
        <section className="py-16 bg-muted/50">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Supported Architecture Patterns</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {architecturePatterns.slice(0, 3).map((pattern) => (
                <ArchitecturePatternCard 
                  key={pattern.id} 
                  pattern={pattern} 
                />
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button variant="outline" onClick={() => navigate('/documentation')} className="mx-auto">
                View All Architecture Patterns
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
