
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PatternMetrics } from '@/types/architecture';

interface SystemResourcesChartProps {
  data: PatternMetrics[];
}

// Generate synthetic resource utilization data over time
const generateResourceData = (baseUtilization: number, patternId: string) => {
  // How each pattern utilizes resources over time (CPU, Memory, Network I/O)
  const utilizationPatterns: Record<string, { cpu: number[], memory: number[], network: number[] }> = {
    monolithic: {
      cpu: [0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.0, 1.0, 0.9, 0.8],
      memory: [0.7, 0.7, 0.8, 0.9, 0.9, 1.0, 1.0, 1.0, 1.0, 1.0],
      network: [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.9, 0.8, 0.7]
    },
    microservices: {
      cpu: [0.3, 0.4, 0.4, 0.5, 0.6, 0.7, 0.8, 0.7, 0.6, 0.5],
      memory: [0.5, 0.5, 0.6, 0.6, 0.7, 0.7, 0.8, 0.8, 0.7, 0.6],
      network: [0.6, 0.7, 0.8, 0.9, 0.9, 0.9, 0.9, 0.8, 0.7, 0.6]
    },
    serverless: {
      cpu: [0.1, 0.2, 0.4, 0.7, 0.9, 0.8, 0.5, 0.3, 0.1, 0.1],
      memory: [0.1, 0.3, 0.4, 0.6, 0.8, 0.7, 0.5, 0.3, 0.2, 0.1],
      network: [0.2, 0.4, 0.6, 0.8, 0.9, 0.7, 0.5, 0.3, 0.2, 0.1]
    },
    eventdriven: {
      cpu: [0.2, 0.3, 0.5, 0.6, 0.7, 0.8, 0.7, 0.5, 0.4, 0.3],
      memory: [0.4, 0.5, 0.6, 0.7, 0.7, 0.8, 0.7, 0.6, 0.5, 0.4],
      network: [0.5, 0.6, 0.7, 0.8, 0.9, 0.9, 0.8, 0.7, 0.6, 0.5]
    },
    p2p: {
      cpu: [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.8, 0.7, 0.6, 0.5],
      memory: [0.5, 0.6, 0.7, 0.7, 0.8, 0.8, 0.8, 0.7, 0.7, 0.6],
      network: [0.7, 0.8, 0.9, 0.9, 1.0, 1.0, 0.9, 0.8, 0.7, 0.6]
    },
    soa: {
      cpu: [0.4, 0.5, 0.6, 0.7, 0.8, 0.8, 0.7, 0.6, 0.5, 0.4],
      memory: [0.6, 0.6, 0.7, 0.8, 0.8, 0.9, 0.9, 0.8, 0.7, 0.6],
      network: [0.5, 0.6, 0.7, 0.8, 0.8, 0.9, 0.8, 0.7, 0.6, 0.5]
    }
  };

  const patterns = utilizationPatterns[patternId] || utilizationPatterns.monolithic;
  const factor = baseUtilization / 100; // Convert from percentage to factor
  
  // Generate points for 10 time intervals
  return Array.from({ length: 10 }, (_, i) => ({
    time: `T${i+1}`,
    CPU: Math.round(patterns.cpu[i] * factor * 100),
    Memory: Math.round(patterns.memory[i] * factor * 100),
    Network: Math.round(patterns.network[i] * factor * 100)
  }));
};

const SystemResourcesChart: React.FC<SystemResourcesChartProps> = ({ data }) => {
  const pattern = data[0]?.pattern;
  if (!pattern) return null;
  
  const resourceData = generateResourceData(data[0].metrics.resourceUtilization, pattern.id);

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-medium mb-2">Resource Utilization Over Time ({pattern.name})</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={resourceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis label={{ value: 'Utilization (%)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          
          <Area 
            type="monotone" 
            dataKey="CPU" 
            stackId="1"
            stroke="#8884d8" 
            fill="#8884d8" 
            fillOpacity={0.5}
          />
          <Area 
            type="monotone" 
            dataKey="Memory" 
            stackId="1"
            stroke="#82ca9d" 
            fill="#82ca9d" 
            fillOpacity={0.5}
          />
          <Area 
            type="monotone" 
            dataKey="Network" 
            stackId="1"
            stroke="#ffc658" 
            fill="#ffc658" 
            fillOpacity={0.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SystemResourcesChart;
