import { OrderConfirmType } from "@/types/common";
import { OrderDataWithStoreName } from "@/types/supabase";
import create from "zustand";

interface managementType {
  orderData: OrderDataWithStoreName[];
  orderId: string[];
  orderStatus: string;
  tableNumber: string;
  isModal: boolean;
  isQRModal: boolean;
  orderConfirmData: OrderConfirmType[];
  setOrderData: (value: OrderDataWithStoreName[]) => void
  setOrderId: (value: { id: string[], status: string, number: string }) => void
  setIsModal: (value: boolean) => void
  setIsQRModal: (value: boolean) => void
  addOrderConfirmData: (value: OrderConfirmType) => void
  removeOrderConfirmData: (value: string) => void
}

const useManagementStore = create<managementType>((set) => ({
  orderData: [],
  orderId: [],
  orderStatus: '',
  tableNumber: '',
  isModal: false,
  isQRModal: false,
  orderConfirmData: [],
  setOrderData: (value) =>
    set(() => ({
      orderData: value
    })),
  setOrderId: (value) =>
    set(() => ({
      orderId: value.id,
      orderStatus: value.status,
      tableNumber: value.number
    })),
  setIsModal: (value) =>
    set(() => ({
      isModal: value
    })),
  setIsQRModal: (value) =>
    set(() => ({
      isQRModal: value
    })),
  addOrderConfirmData: (value) =>
    set((state) => ({
      orderConfirmData: [...state.orderConfirmData, value]
    })),
  removeOrderConfirmData: (value) =>
    set((state) => ({
      orderConfirmData: [...state.orderConfirmData.filter((x) => x.id !== value)]
    }))
}))


export default useManagementStore