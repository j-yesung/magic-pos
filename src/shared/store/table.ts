import { RefObject } from 'react';
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
  refSideBar: RefObject<HTMLDivElement> | null,
  refDummySideBar: RefObject<HTMLDivElement> | null;
  refSideBarBg: RefObject<HTMLDivElement> | null,

  TableItemClick: (value: valueType) => void;
  setMaxGuest: (value: number) => void;
  setIsDisabled: (value: number) => void;
  setsideBarRef: (value: RefObject<HTMLDivElement>) => void;
  setDummyideBarRef: (value: RefObject<HTMLDivElement>) => void;
  setideBarBgRef: (value: RefObject<HTMLDivElement>) => void;
}

const useTableStore = create<TableStoreType>(set => ({
  // state 영역
  tableId: '',
  tableNumber: 0,
  maxGuest: 0,
  isDisabled: 0,
  isClick: false,
  refSideBar: null,
  refDummySideBar: null,
  refSideBarBg: null,

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
  setsideBarRef: value =>
    set(() => ({
      refSideBar: value,
    })),
  setDummyideBarRef: value =>
    set(() => ({
      refDummySideBar: value,
    })),
  setideBarBgRef: value =>
    set(() => ({
      refSideBarBg: value,
    })),
}));

export default useTableStore;
