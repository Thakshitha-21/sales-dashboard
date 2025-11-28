'use client';
import { useState } from 'react';

interface SalesFilterProps {
  onThresholdChange: (threshold: number) => void;
  onYearChange: (year: number) => void;
}

export const SalesFilter = ({ onThresholdChange, onYearChange }: SalesFilterProps) => {
  const [threshold, setThreshold] = useState('');
  const [selectedYear, setSelectedYear] = useState(2024);

  const handleThresholdChange = (value: string) => {
    setThreshold(value);
    onThresholdChange(Number(value) || 0);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    onYearChange(year);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex gap-4">
          {[2022, 2023, 2024].map((year) => (
            <button
              key={year}
              onClick={() => handleYearChange(year)}
              className={`px-4 py-2 rounded-lg ${
                selectedYear === year
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Min Sales:</label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => handleThresholdChange(e.target.value)}
            placeholder="Enter threshold"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};