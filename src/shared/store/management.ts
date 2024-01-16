import { OrderConfirmType } from "@/types/common";
import { OrderDataWithStoreName } from "@/types/supabase";
import create from "zustand";

export type QRdataType = {
  qrRef: HTMLDivElement,
  qrUrl: string,
  orderType: string
}
interface managementType {
  orderData: OrderDataWithStoreName[];
  orderId: string[];
  orderStatus: string;
  tableNumber: string;
  orderConfirmData: OrderConfirmType[];
  qrData: QRdataType[]
  setOrderData: (value: OrderDataWithStoreName[]) => void
  setOrderId: (value: { id: string[], status: string, number: string }) => void
  addOrderConfirmData: (value: OrderConfirmType) => void
  removeOrderConfirmData: (value: string) => void
  setQrData: (value: QRdataType) => void
  reSetQrData: () => void
}

const useManagementStore = create<managementType>((set) => ({
  orderData: [],
  orderId: [],
  orderStatus: '',
  tableNumber: '',
  orderConfirmData: [],
  qrData: [],
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
  addOrderConfirmData: (value) =>
    set((state) => ({
      orderConfirmData: [...state.orderConfirmData, value]
    })),
  removeOrderConfirmData: (value) =>
    set((state) => ({
      orderConfirmData: [...state.orderConfirmData.filter((x) => x.id !== value)]
    })),
  setQrData: (value) =>
    set((state) => ({
      qrData: [...state.qrData, value]
    })),
  reSetQrData: () =>
    set(() => ({
      qrData: []
    }))
}))


export default useManagementStore