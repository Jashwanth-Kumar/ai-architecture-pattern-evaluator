
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { PatternMetrics } from '@/types/architecture';

interface ThroughputVsLatencyChartProps {
  data: PatternMetrics[];
}

// Generate synthetic data points for throughput vs latency at different load levels
const generateLoadPoints = (baseLatency: number, baseThroughput: number, patternId: string) => {
  // How each pattern scales with load
  const scalingFactors: Record<string, number[]> = {
    monolithic: [1, 1.2, 1.5, 2.0, 3.0, 5.0],  // Poor scaling
    microservices: [1, 1.1, 1.25, 1.5, 1.9, 2.5],  // Good scaling
    serverless: [1, 1.05, 1.1, 1.2, 1.4, 2.0],  // Excellent scaling
    eventdriven: [1, 1.1, 1.2, 1.4, 1.7, 2.2],  // Very good scaling
    p2p: [1, 1.15, 1.4, 1.8, 2.5, 3.5],  // Moderate scaling
    soa: [1, 1.2, 1.4, 1.7, 2.2, 3.0]  // Fair scaling
  };

  const factors = scalingFactors[patternId] || scalingFactors.monolithic;
  
  // Generate points for 6 different load levels
  return [
    { load: "10%", throughput: Math.round(baseThroughput * 0.1), latency: Math.round(baseLatency * factors[0]) },
    { load: "25%", throughput: Math.round(baseThroughput * 0.25), latency: Math.round(baseLatency * factors[1]) },
    { load: "50%", throughput: Math.round(baseThroughput * 0.5), latency: Math.round(baseLatency * factors[2]) },
    { load: "75%", throughput: Math.round(baseThroughput * 0.75), latency: Math.round(baseLatency * factors[3]) },
    { load: "90%", throughput: Math.round(baseThroughput * 0.9), latency: Math.round(baseLatency * factors[4]) },
    { load: "100%", throughput: baseThroughput, latency: Math.round(baseLatency * factors[5]) }
  ];
};

const ThroughputVsLatencyChart: React.FC<ThroughputVsLatencyChartProps> = ({ data }) => {
  const loadData = data.map(pattern => ({
    pattern: pattern.pattern,
    points: generateLoadPoints(pattern.metrics.latency, pattern.metrics.throughput, pattern.pattern.id)
  }));

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-medium mb-2">Throughput vs Latency under Load</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid />
          <XAxis 
            type="number" 
            dataKey="throughput" 
            name="Throughput"
            domain={[0, 'dataMax']}
          >
            <Label value="Throughput (req/s)" offset={-10} position="insideBottom" />
          </XAxis>
          <YAxis 
            type="number" 
            dataKey="latency" 
            name="Latency"
            domain={[0, 'dataMax']}
          >
            <Label value="Latency (ms)" angle={-90} position="insideLeft" />
          </YAxis>
          <ZAxis type="category" dataKey="load" name="Load" />
          <Tooltip 
            formatter={(value, name, props) => {
              const unit = name === 'Throughput' ? 'req/s' : 'ms';
              return [`${value} ${unit}`, name];
            }}
            cursor={{ strokeDasharray: '3 3' }}
          />
          <Legend />
          
          {loadData.map((item, index) => (
            <Scatter 
              key={index}
              name={item.pattern.name}
              data={item.points}
              fill={item.pattern.color}
              line={{ stroke: item.pattern.color, strokeWidth: 1 }}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ThroughputVsLatencyChart;
