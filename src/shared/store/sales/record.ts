import { RecordType } from '@/types/sales';
import { create } from 'zustand';
interface RecordStore {
  record: RecordType;
}

const useRecordStore = create<RecordStore>()(() => ({
  record: {
    currentSales: 0,
    dateType: 'day',
  },
}));

export const setRecordData = (sales: RecordType) =>
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
      dateType: 'day',
    },
  }));
export default useRecordStore;
