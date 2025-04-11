
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PatternMetrics } from '@/types/architecture';
import { metrics } from '@/data/metrics';

interface MetricsBarChartProps {
  data: PatternMetrics[];
  metricKey: string;
}

const MetricsBarChart: React.FC<MetricsBarChartProps> = ({ data, metricKey }) => {
  const metric = metrics.find(m => m.key === metricKey);

  const chartData = data.map(item => ({
    name: item.pattern.name.replace('Architecture', '').trim(),
    value: item.metrics[metricKey as keyof typeof item.metrics],
    color: item.pattern.color
  }));

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-medium mb-2">{metric?.name || metricKey} Comparison</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
          <YAxis label={{ value: metric?.unit, angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => [`${value} ${metric?.unit}`, metric?.name]} />
          <Legend />
          {chartData.map((entry, index) => (
            <Bar 
              key={index} 
              dataKey="value" 
              name={entry.name} 
              fill={entry.color} 
              stackId={metricKey === "latency" || metricKey === "resourceUtilization" ? "negative" : "positive"} 
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricsBarChart;
