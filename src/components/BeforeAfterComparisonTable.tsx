
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ComparisonResult } from '@/types/architecture';
import { metrics } from '@/data/metrics';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface BeforeAfterComparisonTableProps {
  data: ComparisonResult;
}

const BeforeAfterComparisonTable: React.FC<BeforeAfterComparisonTableProps> = ({ data }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Metric</TableHead>
            <TableHead>Before Scaling</TableHead>
            <TableHead>After Scaling</TableHead>
            <TableHead>Improvement</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {metrics.map((metric) => {
            const key = metric.key as keyof typeof data.beforeScaling;
            const before = data.beforeScaling[key] as number;
            const after = data.afterScaling[key] as number;
            const improvement = data.improvementPercentages[key];
            
            // For latency and resource utilization, lower is better
            const isPositiveImprovement = 
              (key === 'latency' || key === 'resourceUtilization') 
                ? improvement > 0 
                : improvement > 0;
            
            return (
              <TableRow key={metric.key}>
                <TableCell className="font-medium">
                  {metric.name}
                </TableCell>
                <TableCell>{before}</TableCell>
                <TableCell>{after}</TableCell>
                <TableCell>
                  <div className={`flex items-center gap-1 ${isPositiveImprovement ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositiveImprovement ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {Math.abs(improvement).toFixed(1)}%
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default BeforeAfterComparisonTable;
