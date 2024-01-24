import { create } from 'zustand';

interface ChartStore {
  chartData: {
    x: string;
    y: number;
  }[];
}

const useChartStore = create<ChartStore>()(() => ({
  chartData: [],
}));

export const setChartData = (sales: { x: string; y: number }[]) =>
  useChartStore.setState(state => ({
    ...state,
    chartData: sales,
  }));
export const resetChartData = () =>
  useChartStore.setState(state => ({
    ...state,
    chartData: [],
  }));
export default useChartStore;
