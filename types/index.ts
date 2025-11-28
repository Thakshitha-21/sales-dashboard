export interface SalesData {
  year: number;
  month: string;
  sales: number;
  revenue: number;
}

export interface ChartProps {
  data: SalesData[];
  threshold?: number;
}