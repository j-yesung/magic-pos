import create from "zustand";

interface managementType {
  orderId: string[];
  orderStatus: string;
  tableNumber: string;
  setOrderId: (value: { id: string[], status: string, number: string }) => void
}

const useManagementStore = create<managementType>((set) => ({
  orderId: [],
  orderStatus: '',
  tableNumber: '',
  setOrderId: (value) =>
    set(() => ({
      orderId: value.id,
      orderStatus: value.status,
      tableNumber: value.number
    }))
}))


export default useManagementStore