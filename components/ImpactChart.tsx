import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const data = [
  { name: 'NPM Supply Chain', impact: 90, color: '#f97316' }, // Spice 500
  { name: 'GitHub Actions', impact: 85, color: '#ea580c' },   // Spice 600
  { name: 'AWS Credentials', impact: 75, color: '#c2410c' },  // Spice 700
  { name: 'GCP Credentials', impact: 60, color: '#9a3412' },  // Spice 800
  { name: 'Azure Credentials', impact: 60, color: '#7c2d12' }, // Spice 900
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-stone-900 border border-stone-700 p-3 rounded-lg shadow-xl">
        <p className="text-spice-100 font-semibold">{label}</p>
        <p className="text-spice-400 text-sm">
          Risk Severity: {payload[0].value}/100
        </p>
      </div>
    );
  }
  return null;
};

export const ImpactChart: React.FC = () => {
  return (
    <div className="bg-worm-800 border border-stone-800 rounded-xl overflow-hidden shadow-2xl p-6 h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-spice-100">Attack Surface Impact</h2>
        <p className="text-sm text-stone-400">Relative severity based on exfiltration targets and persistence mechanisms.</p>
      </div>
      
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#44403c" horizontal={false} />
            <XAxis type="number" stroke="#a8a29e" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={120} 
              stroke="#a8a29e" 
              tick={{fill: '#d6d3d1', fontSize: 12}}
            />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
            <Bar dataKey="impact" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};