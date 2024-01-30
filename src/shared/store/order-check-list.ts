import moment from 'moment';
import { create } from 'zustand';

interface OrderCheckListType {
  listType: string;
  startDate: string;
  endDate: string;
  setListType: (value: string) => void;
  setStartTime: (value: string) => void;
  setEndTime: (value: string) => void;
}

const today = moment().format('YYYY-MM-DD');
const useOrderCheckListStore = create<OrderCheckListType>(set => ({
  listType: 'default',
  startDate: today,
  endDate: today,
  setListType: value =>
    set(() => ({
      listType: value,
    })),
  setStartTime: value =>
    set(() => ({
      startDate: value,
    })),
  setEndTime: value =>
    set(() => ({
      endDate: value,
    })),
}));

export default useOrderCheckListStore;
