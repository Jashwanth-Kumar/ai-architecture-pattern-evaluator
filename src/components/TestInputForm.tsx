
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Globe } from 'lucide-react';
import { generateTestResult } from '@/data/test-results';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const TestInputForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadLevel, setLoadLevel] = useState(50);
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>(['microservices', 'serverless', 'eventdriven']);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "URL is required",
        description: "Please enter a website URL to analyze.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate URL format
    try {
      new URL(url);
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL including http:// or https://",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // This would ideally call the Supabase edge function
      // For now we'll use the generated test results
      const testResult = generateTestResult(url, {
        loadLevel,
        selectedPatterns,
      });
      
      sessionStorage.setItem('latestTestResult', JSON.stringify(testResult));
      
      toast({
        title: "Analysis complete",
        description: "Architecture patterns have been evaluated successfully."
      });
      
      setLoading(false);
      navigate('/results');
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing the architecture. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const handlePatternToggle = (patternId: string) => {
    setSelectedPatterns(prev => 
      prev.includes(patternId) 
        ? prev.filter(id => id !== patternId)
        : [...prev, patternId]
    );
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Test Application Architecture</CardTitle>
        <CardDescription>
          Analyze your application across different architecture patterns.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <Input
                id="url"
                type="text"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
              />
            </div>
            <p className="text-sm text-muted-foreground">Enter the URL of your web application to test.</p>
          </div>
          
          <div className="space-y-2">
            <Label>Test Load Level</Label>
            <div className="pt-4">
              <Slider
                value={[loadLevel]}
                min={10}
                max={100}
                step={10}
                onValueChange={(vals) => setLoadLevel(vals[0])}
                disabled={loading}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Minimal</span>
              <span>Moderate</span>
              <span>Intensive</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Architecture Patterns to Test</Label>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="pattern-microservices"
                  checked={selectedPatterns.includes('microservices')}
                  onChange={() => handlePatternToggle('microservices')}
                  className="h-4 w-4 rounded border-gray-300"
                  disabled={loading}
                />
                <Label htmlFor="pattern-microservices" className="text-sm">Microservices</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="pattern-serverless"
                  checked={selectedPatterns.includes('serverless')}
                  onChange={() => handlePatternToggle('serverless')}
                  className="h-4 w-4 rounded border-gray-300"
                  disabled={loading}
                />
                <Label htmlFor="pattern-serverless" className="text-sm">Serverless</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="pattern-eventdriven"
                  checked={selectedPatterns.includes('eventdriven')}
                  onChange={() => handlePatternToggle('eventdriven')}
                  className="h-4 w-4 rounded border-gray-300"
                  disabled={loading}
                />
                <Label htmlFor="pattern-eventdriven" className="text-sm">Event-Driven</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="pattern-monolithic"
                  checked={selectedPatterns.includes('monolithic')}
                  onChange={() => handlePatternToggle('monolithic')}
                  className="h-4 w-4 rounded border-gray-300"
                  disabled={loading}
                />
                <Label htmlFor="pattern-monolithic" className="text-sm">Monolithic</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="pattern-soa"
                  checked={selectedPatterns.includes('soa')}
                  onChange={() => handlePatternToggle('soa')}
                  className="h-4 w-4 rounded border-gray-300"
                  disabled={loading}
                />
                <Label htmlFor="pattern-soa" className="text-sm">SOA</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="pattern-p2p"
                  checked={selectedPatterns.includes('p2p')}
                  onChange={() => handlePatternToggle('p2p')}
                  className="h-4 w-4 rounded border-gray-300"
                  disabled={loading}
                />
                <Label htmlFor="pattern-p2p" className="text-sm">P2P</Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/')}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Run Test"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TestInputForm;
