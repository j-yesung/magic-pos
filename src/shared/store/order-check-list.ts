import { create } from 'zustand';

interface OrderCheckListType {
  listType: string;
  setListTYpe: (value: string) => void;
}

const useOrderCheckListStore = create<OrderCheckListType>(set => ({
  listType: 'default',
  setListTYpe: value =>
    set(() => ({
      listType: value,
    })),
}));

export default useOrderCheckListStore;
