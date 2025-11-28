'use client';
import { useState, useEffect } from 'react';
import { SalesFilter } from '@/components/filters/SalesFilter';
import { ChartContainer } from '@/components/charts/ChartContainer';
import { Card } from '@/components/ui/Card';
import { mockSalesData } from '@/lib/data';
import { TrendingUp, DollarSign, Package, Users } from 'lucide-react';

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [threshold, setThreshold] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentData = mockSalesData[selectedYear];
  const totalSales = currentData.reduce((sum, item) => sum + item.sales, 0);
  const totalRevenue = currentData.reduce((sum, item) => sum + item.revenue, 0);
  const averageSales = Math.round(totalSales / currentData.length);

  const stats = [
    { icon: Package, label: 'Total Sales', value: totalSales.toLocaleString(), change: '+12%' },
    { icon: DollarSign, label: 'Total Revenue', value: `$${(totalRevenue / 1000000).toFixed(1)}M`, change: '+15%' },
    { icon: TrendingUp, label: 'Avg Monthly Sales', value: averageSales.toLocaleString(), change: '+8%' },
    { icon: Users, label: 'Growth Rate', value: '24%', change: '+5%' },
  ];

  // Prevent hydration by not rendering until client-side
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sales Dashboard</h1>
          <p className="text-gray-600">Analyze your sales performance across different years</p>
        </div>

        <SalesFilter 
          onThresholdChange={setThreshold}
          onYearChange={setSelectedYear}
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last year</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Chart */}
        <ChartContainer data={currentData} threshold={threshold} />

        {/* Data Summary */}
        <Card className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Data Summary for {selectedYear}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Best Month</p>
              <p className="font-semibold">
                {currentData.reduce((max, item) => item.sales > max.sales ? item : max).month}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Peak Revenue</p>
              <p className="font-semibold">
                ${Math.max(...currentData.map(item => item.revenue)).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Total Transactions</p>
              <p className="font-semibold">{currentData.length} months</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}