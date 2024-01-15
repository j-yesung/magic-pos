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
  setSideBarRef: (value: RefObject<HTMLDivElement>) => void;
  setDummySideBarRef: (value: RefObject<HTMLDivElement>) => void;
  setSideBarBgRef: (value: RefObject<HTMLDivElement>) => void;
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
  setSideBarRef: value =>
    set(() => ({
      refSideBar: value,
    })),
  setDummySideBarRef: value =>
    set(() => ({
      refDummySideBar: value,
    })),
  setSideBarBgRef: value =>
    set(() => ({
      refSideBarBg: value,
    })),
}));

export default useTableStore;
