export interface SalesData {
  [key: string]: string | number; // Add index signature
  year: number;
  month: string;
  sales: number;
  revenue: number;
}

export interface ChartProps {
  data: SalesData[];
  threshold?: number;
}