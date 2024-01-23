import { create } from 'zustand';
interface RecordStore {
  record: {
    currentSales: number;
    dateType: string;
  };
}

const useRecordStore = create<RecordStore>()(() => ({
  record: {
    currentSales: 0,
    dateType: '',
  },
}));

export const setRecordData = (sales: { currentSales: number; dateType: string }) =>
  useRecordStore.setState(state => ({
    ...state,
    record: {
      currentSales: sales.currentSales,
      dateType: sales.dateType,
    },
  }));

export const resetRecordData = () =>
  useRecordStore.setState(() => ({
    record: {
      currentSales: 0,
      dateType: '',
    },
  }));
export default useRecordStore;
