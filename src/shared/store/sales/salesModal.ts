import { create } from 'zustand';
interface SalesModal {
  modalType: boolean;
}
const useSalesModal = create<SalesModal>()(() => ({
  modalType: true,
}));

export const setSalesModalType = (param: boolean) =>
  useSalesModal.setState(state => ({
    ...state,
    modalType: param,
  }));

export default useSalesModal;
