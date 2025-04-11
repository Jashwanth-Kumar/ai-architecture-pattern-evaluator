
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArchitecturePattern, TestResult } from '@/types/architecture';
import { ExternalLink, BarChart2 } from 'lucide-react';

interface TestResultCardProps {
  result: TestResult;
}

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString();
};

const TestResultCard: React.FC<TestResultCardProps> = ({ result }) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    // Store this result as the selected result and navigate to details
    sessionStorage.setItem('selectedTestResult', JSON.stringify(result));
    navigate('/results/details');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">Test Result</CardTitle>
            <CardDescription>{formatDate(result.timestamp)}</CardDescription>
          </div>
          <Badge 
            className="ml-auto" 
            style={{ backgroundColor: result.bestPattern.color }}
          >
            {result.bestPattern.name}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <ExternalLink className="h-4 w-4 mr-2 opacity-70" />
            <a 
              href={result.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {result.url}
            </a>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Throughput</p>
              <p className="font-medium">{result.comparisonResult.afterScaling.throughput} req/s</p>
            </div>
            <div>
              <p className="text-muted-foreground">Latency</p>
              <p className="font-medium">{result.comparisonResult.afterScaling.latency} ms</p>
            </div>
            <div>
              <p className="text-muted-foreground">Availability</p>
              <p className="font-medium">{result.comparisonResult.afterScaling.availability}%</p>
            </div>
            <div>
              <p className="text-muted-foreground">Resource Utilization</p>
              <p className="font-medium">{result.comparisonResult.afterScaling.resourceUtilization}%</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleViewDetails}
        >
          <BarChart2 className="h-4 w-4 mr-2" />
          View Detailed Analysis
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TestResultCard;
