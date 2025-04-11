
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArchitecturePattern, TestResult } from '@/types/architecture';
import { ExternalLink, BarChart2, Trash2 } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TestResultCardProps {
  result: TestResult;
  onRemove?: () => void;
}

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString();
};

const TestResultCard: React.FC<TestResultCardProps> = ({ result, onRemove }) => {
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
          <div className="flex items-center gap-2">
            <Badge 
              className="ml-auto" 
              style={{ backgroundColor: result.bestPattern.color }}
            >
              {result.bestPattern.name}
            </Badge>
            
            {onRemove && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove Test Result</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to remove this test result? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onRemove} className="bg-red-500 hover:bg-red-600">Remove</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
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
