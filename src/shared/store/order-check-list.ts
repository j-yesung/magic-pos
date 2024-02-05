import dayjs from 'dayjs';
import { create } from 'zustand';

interface OrderCheckListType {
  listType: string;
  startDate: string;
  endDate: string;
  isShowStartCalender: boolean;
  isShowEndCalender: boolean;
  setListType: (value: string) => void;
  setStartTime: (value: string) => void;
  setEndTime: (value: string) => void;
  setIsShowStartCalender: (value: boolean) => void;
  setIsShowEndCalender: (value: boolean) => void;
}

const today = dayjs().format('YYYY-MM-DD');
const useOrderCheckListStore = create<OrderCheckListType>(set => ({
  listType: 'default',
  startDate: today,
  endDate: today,
  isShowStartCalender: false,
  isShowEndCalender: false,
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
  setIsShowStartCalender: value =>
    set(() => ({
      isShowStartCalender: value,
    })),
  setIsShowEndCalender: value =>
    set(() => ({
      isShowEndCalender: value,
    })),
}));

export default useOrderCheckListStore;
