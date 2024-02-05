import { create } from 'zustand';

export type QRdataType = {
  qrRef: HTMLDivElement;
  orderType: string;
};
interface QRCodeType {
  qrData: QRdataType[];
  setQrData: (value: QRdataType) => void;
  resetQrData: () => void;
}

const useQRCodeStore = create<QRCodeType>(set => ({
  qrData: [],
  setQrData: value =>
    set(state => ({
      qrData: [...state.qrData, value],
    })),
  resetQrData: () =>
    set(() => ({
      qrData: [],
    })),
}));

export default useQRCodeStore;
