
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
              Enter an application URL below to run a comprehensive analysis of how different architecture patterns would perform for your application's scaling needs.
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
                <h3 className="text-lg font-medium mb-2">Input Application URL</h3>
                <p className="text-sm text-muted-foreground">
                  Provide the URL of your application or API endpoint to analyze.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Architecture Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Our system evaluates multiple architecture patterns against your application.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Review Results</h3>
                <p className="text-sm text-muted-foreground">
                  Get detailed metrics and recommendations for optimal architecture patterns.
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
