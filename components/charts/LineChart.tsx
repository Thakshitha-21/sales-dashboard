'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartProps } from '@/types';

export const SalesLineChart = ({ data, threshold = 0 }: ChartProps) => {
  const filteredData = threshold ? data.filter(item => item.sales >= threshold) : data;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={filteredData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Sales Units" />
        <Line type="monotone" dataKey="revenue" stroke="#82ca9d" name="Revenue ($)" />
      </LineChart>
    </ResponsiveContainer>
  );
};