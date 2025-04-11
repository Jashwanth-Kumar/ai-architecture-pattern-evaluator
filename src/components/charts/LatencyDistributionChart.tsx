
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PatternMetrics } from '@/types/architecture';

interface LatencyDistributionChartProps {
  data: PatternMetrics[];
}

// Generate synthetic latency distribution data
const generateLatencyDistribution = (baseLatency: number, patternId: string) => {
  const distributions: Record<string, number[]> = {
    monolithic: [0.5, 0.7, 1.0, 1.5, 2.0, 3.0],
    microservices: [0.8, 1.0, 1.1, 1.2, 1.4, 2.5],
    serverless: [0.2, 0.3, 0.4, 1.0, 2.0, 5.0],  // Cold starts cause tail latency
    eventdriven: [0.4, 0.6, 0.8, 1.1, 1.5, 2.0],
    p2p: [0.5, 0.8, 1.2, 1.8, 2.5, 4.0],
    soa: [0.7, 0.9, 1.1, 1.3, 1.6, 2.2]
  };

  const distribution = distributions[patternId] || distributions.monolithic;
  
  return [
    { percentile: "50th", latency: Math.round(baseLatency * distribution[0]) },
    { percentile: "75th", latency: Math.round(baseLatency * distribution[1]) },
    { percentile: "90th", latency: Math.round(baseLatency * distribution[2]) },
    { percentile: "95th", latency: Math.round(baseLatency * distribution[3]) },
    { percentile: "99th", latency: Math.round(baseLatency * distribution[4]) },
    { percentile: "99.9th", latency: Math.round(baseLatency * distribution[5]) }
  ];
};

const LatencyDistributionChart: React.FC<LatencyDistributionChartProps> = ({ data }) => {
  // Create separate distributions for each pattern
  const distributionData = data.map(pattern => ({
    pattern: pattern.pattern,
    distribution: generateLatencyDistribution(pattern.metrics.latency, pattern.pattern.id)
  }));

  // Transform for recharts - we need data in the format [{percentile: '50th', Pattern1: value, Pattern2: value}, ...]
  const chartData = distributionData[0].distribution.map((item, index) => {
    const result: any = { percentile: item.percentile };
    distributionData.forEach(d => {
      result[d.pattern.name] = d.distribution[index].latency;
    });
    return result;
  });

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-medium mb-2">Latency Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="percentile" />
          <YAxis label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          
          {data.map((pattern, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={pattern.pattern.name}
              stroke={pattern.pattern.color}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LatencyDistributionChart;
