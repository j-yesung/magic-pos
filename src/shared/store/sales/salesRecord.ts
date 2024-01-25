import { RecordType } from '@/types/sales';
import { create } from 'zustand';
interface RecordStore {
  record: RecordType;
}

const useSalesRecordState = create<RecordStore>()(() => ({
  record: {
    currentSales: 0,
    dateType: 'day',
  },
}));

export const setRecordData = (sales: RecordType) =>
  useSalesRecordState.setState(state => ({
    ...state,
    record: {
      currentSales: sales.currentSales,
      dateType: sales.dateType,
    },
  }));

export const resetRecordData = () =>
  useSalesRecordState.setState(() => ({
    record: {
      currentSales: 0,
      dateType: 'day',
    },
  }));
export default useSalesRecordState;
