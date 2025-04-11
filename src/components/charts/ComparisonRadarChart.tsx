
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
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

  // Create a custom formatter for the tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 rounded-md shadow border">
          <p className="font-medium">{payload[0].payload.metric}</p>
          <div className="mt-2 space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm">{entry.name}: <span className="font-medium">{entry.value}</span></span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-96">
      <h3 className="text-lg font-medium mb-2">Multi-Metric Comparison</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={radarData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <PolarGrid stroke="rgba(148, 163, 184, 0.2)" />
          <PolarAngleAxis dataKey="metric" tick={{ fill: "var(--muted-foreground)" }} />
          <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={{ fill: "var(--muted-foreground)" }} />
          
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          {data.map((pattern, index) => (
            <Radar
              key={index}
              name={pattern.pattern.name}
              dataKey={pattern.pattern.name}
              stroke={pattern.pattern.color}
              fill={pattern.pattern.color}
              fillOpacity={0.3}
              dot={true}
              activeDot={{ r: 6 }}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparisonRadarChart;
