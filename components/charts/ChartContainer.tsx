'use client';
import { useState } from 'react';
import { SalesBarChart } from './BarChart';
import { SalesLineChart } from './LineChart';
import { SalesPieChart } from './PieChart';
import { ChartProps } from '@/types';

type ChartType = 'bar' | 'line' | 'pie';

export const ChartContainer = ({ data, threshold = 0 }: ChartProps) => {
  const [chartType, setChartType] = useState<ChartType>('bar');

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <SalesBarChart data={data} threshold={threshold} />;
      case 'line':
        return <SalesLineChart data={data} threshold={threshold} />;
      case 'pie':
        return <SalesPieChart data={data} threshold={threshold} />;
      default:
        return <SalesBarChart data={data} threshold={threshold} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Sales Overview</h3>
        <div className="flex gap-2">
          {(['bar', 'line', 'pie'] as ChartType[]).map((type) => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`px-4 py-2 rounded-lg capitalize ${
                chartType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {type} Chart
            </button>
          ))}
        </div>
      </div>
      {renderChart()}
    </div>
  );
};