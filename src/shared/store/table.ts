import { create } from 'zustand';

type valueType = {
  tableId?: string;
  tableNumber: number | null;
  maxGuest: number | null;
  isDisabled: number | null;
};

interface TableStoreType {
  tableId?: string;
  tableNumber: number | null;
  maxGuest: number | null;
  isDisabled: number | null;
  isClick: boolean;
  isUseTable: boolean;
  TableItemClick: (value: valueType) => void;
  setMaxGuest: (value: number) => void;
  setIsDisabled: (value: number) => void;
  resetTableState: () => void;
}

const useTableStore = create<TableStoreType>(set => ({
  // state 영역
  tableId: '',
  tableNumber: 0,
  maxGuest: 0,
  isDisabled: 0,
  isClick: false,
  isUseTable: true,

  // setState함수 영역
  TableItemClick: value =>
    set(() => ({
      tableId: value.tableId,
      tableNumber: value.tableNumber,
      maxGuest: value.maxGuest,
      isDisabled: value.isDisabled,
      isClick: true,
    })),
  setMaxGuest: value =>
    set(() => ({
      maxGuest: value,
    })),
  setIsDisabled: value =>
    set(() => ({
      isDisabled: value,
    })),
  resetTableState: () =>
    set(() => ({
      tableId: '',
      tableNumber: 0,
      maxGuest: 0,
      isDisabled: 0,
      isClick: false,
    })),
}));

export const setIsUseTable = (value: boolean) => useTableStore.setState({ isUseTable: value });

export default useTableStore;
