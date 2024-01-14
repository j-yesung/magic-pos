import { OrderDataWithStoreName } from "@/types/supabase";
import create from "zustand";

interface managementType {
  orderData: OrderDataWithStoreName[];
  orderId: string[];
  orderStatus: string;
  tableNumber: string;
  isModal: boolean;
  orderConfirmData: { id: string, number: number }[];
  setOrderData: (value: OrderDataWithStoreName[]) => void
  setOrderId: (value: { id: string[], status: string, number: string }) => void
  setIsModal: (value: boolean) => void
  addOrderConfirmData: (value: { id: string, number: number }) => void
  removeOrderConfirmData: (value: { id: string, number: number }) => void
}

const useManagementStore = create<managementType>((set) => ({
  orderData: [],
  orderId: [],
  orderStatus: '',
  tableNumber: '',
  isModal: false,
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
  addOrderConfirmData: (value) =>
    set((state) => ({
      orderConfirmData: [...state.orderConfirmData, value]
    })),
  removeOrderConfirmData: (value) =>
    set((state) => ({
      orderConfirmData: [...state.orderConfirmData.filter((x) => x.id !== value.id)]
    }))
}))


export default useManagementStore