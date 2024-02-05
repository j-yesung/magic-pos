import { OrderConfirmType } from '@/types/common';
import { OrderDataWithStoreName } from '@/types/supabase';
import { create } from 'zustand';

interface managementType {
  orderData: OrderDataWithStoreName[];
  orderId: string[];
  orderStatus: string;
  tableNumber: string;
  orderConfirmData: OrderConfirmType[];
  isSideBar: boolean;
  setOrderData: (value: OrderDataWithStoreName[]) => void;
  setOrderId: (value: { id: string[]; status: string; number: string }) => void;
  addOrderConfirmData: (value: OrderConfirmType) => void;
  removeOrderConfirmData: (value: string) => void;
  setIsSideBar: () => void;
}

const useManagementStore = create<managementType>(set => ({
  orderData: [],
  orderId: [],
  orderStatus: '',
  tableNumber: '',
  orderConfirmData: [],
  isSideBar: false,
  setOrderData: value =>
    set(() => ({
      orderData: value,
    })),
  setOrderId: value =>
    set(() => ({
      orderId: value.id,
      orderStatus: value.status,
      tableNumber: value.number,
    })),
  addOrderConfirmData: value =>
    set(state => ({
      orderConfirmData: [...state.orderConfirmData, value],
    })),
  removeOrderConfirmData: value =>
    set(state => ({
      orderConfirmData: [...state.orderConfirmData.filter(x => x.id !== value)],
    })),
  setIsSideBar: () =>
    set(state => ({
      isSideBar: !state.isSideBar,
    })),
}));

export default useManagementStore;
