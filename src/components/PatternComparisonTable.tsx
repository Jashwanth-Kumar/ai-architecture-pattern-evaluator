
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PatternMetrics } from '@/types/architecture';
import { metrics } from '@/data/metrics';

interface PatternComparisonTableProps {
  data: PatternMetrics[];
}

const PatternComparisonTable: React.FC<PatternComparisonTableProps> = ({ data }) => {
  // Find the best value for each metric
  const bestValues = metrics.reduce((acc, metric) => {
    const key = metric.key as keyof typeof data[0].metrics;
    // For latency and resource utilization, lower is better
    if (key === 'latency' || key === 'resourceUtilization') {
      acc[key] = Math.min(...data.map(item => item.metrics[key] as number));
    } else {
      acc[key] = Math.max(...data.map(item => item.metrics[key] as number));
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Architecture Pattern</TableHead>
            {metrics.map(metric => (
              <TableHead key={metric.key} title={metric.description}>
                {metric.name} ({metric.unit})
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((pattern) => (
            <TableRow key={pattern.pattern.id}>
              <TableCell className="font-medium" style={{ color: pattern.pattern.color }}>
                {pattern.pattern.name}
              </TableCell>
              
              {metrics.map(metric => {
                const key = metric.key as keyof typeof pattern.metrics;
                const value = pattern.metrics[key] as number;
                const isBest = value === bestValues[key];
                
                return (
                  <TableCell key={metric.key} className={isBest ? 'font-bold' : ''}>
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PatternComparisonTable;
