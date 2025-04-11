
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TestResultCard from '@/components/TestResultCard';
import { Button } from '@/components/ui/button';
import { Plus, FileSearch } from 'lucide-react';
import { TestResult } from '@/types/architecture';
import { sampleTestResults } from '@/data/test-results';
import { toast } from "sonner";

const ResultsPage = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the latest test result from sessionStorage if it exists
    const latestResultJson = sessionStorage.getItem('latestTestResult');
    
    try {
      if (latestResultJson) {
        const latestResult = JSON.parse(latestResultJson) as TestResult;
        setTestResults([latestResult, ...sampleTestResults]);
      } else {
        // Just use sample results if no latest result
        setTestResults(sampleTestResults);
      }
    } catch (error) {
      console.error('Error loading test results:', error);
      setTestResults(sampleTestResults);
    } finally {
      setLoading(false);
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
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Architecture Analysis Results</h1>
              <p className="text-muted-foreground mt-1">
                View and compare architecture pattern analysis results
              </p>
            </div>
            <Button onClick={() => navigate('/test')} size="sm" className="md:w-auto w-full">
              <Plus className="h-4 w-4 mr-2" />
              New Analysis
            </Button>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : testResults.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-8 text-center">
              <FileSearch className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Results Yet</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Run an architecture analysis to see results here. The analyzer evaluates different patterns
                for your application and recommends the optimal architecture.
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
