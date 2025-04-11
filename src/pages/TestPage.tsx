
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TestInputForm from '@/components/TestInputForm';

const TestPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight">Architecture Pattern Analysis</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Run a comprehensive analysis of how different architecture patterns would perform for your application's scaling needs.
            </p>
          </div>
          
          <TestInputForm />
          
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Enter Application Details</h3>
                <p className="text-sm text-muted-foreground">
                  Provide the URL and configuration details for your application or API.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-lg font-medium mb-2">AI Architecture Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI system evaluates multiple architecture patterns using advanced LLM analysis.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Review Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Get detailed metrics and implementation guidance for the optimal architecture pattern.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TestPage;
