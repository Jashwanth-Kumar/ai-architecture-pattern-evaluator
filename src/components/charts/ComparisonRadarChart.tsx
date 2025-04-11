
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { PatternMetrics } from '@/types/architecture';
import { metrics } from '@/data/metrics';

interface ComparisonRadarChartProps {
  data: PatternMetrics[];
}

const ComparisonRadarChart: React.FC<ComparisonRadarChartProps> = ({ data }) => {
  // Transform the data for the radar chart
  const radarData = metrics.map(metric => {
    const result: any = { metric: metric.name };
    
    data.forEach(pattern => {
      // For latency and resource utilization, lower is better, so we invert the scale
      if (metric.key === 'latency' || metric.key === 'resourceUtilization') {
        const maxValue = Math.max(...data.map(p => p.metrics[metric.key as keyof typeof p.metrics] as number));
        result[pattern.pattern.name] = maxValue - (pattern.metrics[metric.key as keyof typeof pattern.metrics] as number) + 1;
      } else {
        result[pattern.pattern.name] = pattern.metrics[metric.key as keyof typeof pattern.metrics];
      }
    });
    
    return result;
  });

  return (
    <div className="w-full h-96">
      <h3 className="text-lg font-medium mb-2">Multi-Metric Comparison</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={radarData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
          
          {data.map((pattern, index) => (
            <Radar
              key={index}
              name={pattern.pattern.name}
              dataKey={pattern.pattern.name}
              stroke={pattern.pattern.color}
              fill={pattern.pattern.color}
              fillOpacity={0.2}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparisonRadarChart;
