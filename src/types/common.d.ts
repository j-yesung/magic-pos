import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

// NextJS 중첩 레이아웃을 위한 타입
type NextPageWithLayout<P = NonNullable<unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface ModalAlertTypeOption {
  id?: string;
  content: string;
  showButton?: boolean;
  buttonText?: string;
  timeout?: number;
}

interface ModalConfirmTypeOption {
  id?: string;
  content: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonCallback?: (() => void) | null;
  cancelButtonCallback?: (() => void) | null;
}

type ToastAnimationType =
  | 'hide-top-right'
  | 'hide-top-left'
  | 'hide-top-center'
  | 'hide-bottom-right'
  | 'hide-bottom-left'
  | null;
type ToastPositionType = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left';
interface ToastTypeOption {
  id: string;
  content: string;
  showCloseButton: boolean;
  position: ToastPositionType;
  type: 'info' | 'success' | 'warn' | 'danger';
  autoClose: number;
  animation: ToastAnimationType;
}

interface OrderConfirmType {
  id: string;
  number: number;
  isTogo: boolean;
}
