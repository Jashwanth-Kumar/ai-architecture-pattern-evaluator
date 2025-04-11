
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TestResultCard from '@/components/TestResultCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TestResult } from '@/types/architecture';
import { sampleTestResults } from '@/data/test-results';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

const ResultsPage = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the latest test result from sessionStorage if it exists
    const latestResultJson = sessionStorage.getItem('latestTestResult');
    
    if (latestResultJson) {
      try {
        const latestResult = JSON.parse(latestResultJson) as TestResult;
        
        // Add the latest result to the sample results
        setTestResults([latestResult, ...sampleTestResults]);
      } catch (error) {
        console.error('Error parsing test result:', error);
        setTestResults(sampleTestResults);
      }
    } else {
      // Just use sample results if no latest result
      setTestResults(sampleTestResults);
    }
  }, []);

  // Add function to remove a test result
  const handleRemoveResult = (index: number) => {
    const updatedResults = [...testResults];
    updatedResults.splice(index, 1);
    setTestResults(updatedResults);
    
    // Remove from session storage if it's the first item
    if (index === 0 && sessionStorage.getItem('latestTestResult')) {
      sessionStorage.removeItem('latestTestResult');
    }
    
    toast.success("Test result removed successfully");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Architecture Analysis Results</h1>
            <Button onClick={() => navigate('/test')}>
              <Plus className="h-4 w-4 mr-2" />
              New Analysis
            </Button>
          </div>
          
          {testResults.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold mb-2">No Results Yet</h2>
              <p className="text-muted-foreground mb-8">
                Run an architecture analysis to see results here.
              </p>
              <Button onClick={() => navigate('/test')}>
                <Plus className="h-4 w-4 mr-2" />
                Run Architecture Analysis
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testResults.map((result, index) => (
                <TestResultCard 
                  key={index} 
                  result={result}
                  onRemove={() => handleRemoveResult(index)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResultsPage;
