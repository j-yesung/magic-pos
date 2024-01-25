import { create } from 'zustand';

interface ChartStore {
  chartData: {
    x: string;
    y: number;
  }[];
}

const useChartState = create<ChartStore>()(() => ({
  chartData: [],
}));

export const setChartData = (sales: { x: string; y: number }[]) =>
  useChartState.setState(state => ({
    ...state,
    chartData: sales,
  }));
export const resetChartData = () =>
  useChartState.setState(state => ({
    ...state,
    chartData: [],
  }));
export default useChartState;
