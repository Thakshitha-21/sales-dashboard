'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartProps } from '@/types';

export const SalesBarChart = ({ data, threshold = 0 }: ChartProps) => {
  const filteredData = threshold ? data.filter(item => item.sales >= threshold) : data;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={filteredData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#8884d8" name="Sales Units" />
        <Bar dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />
      </BarChart>
    </ResponsiveContainer>
  );
};