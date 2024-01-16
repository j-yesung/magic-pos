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

type ToastAnimationType = 'hide-top-right' | 'hide-top-left' | 'hide-bottom-right' | 'hide-bottom-left' | null;
type ToastPositionType = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
interface ToastTypeOption {
  id: string;
  content: string;
  showCloseButton: boolean;
  position: ToastPositionType;
  type: 'info' | 'success' | 'warn' | 'danger';
  autoClose: number;
  animation: ToastAnimationType;
}

interface AuthState {
  auth: {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    user: {
      app_metadata: {
        provider: string;
        provider_access_token: string;
        provider_user_id: string;
      };
      aud: string;
      created_at: string;
      email: string;
      id: string;
      role: string;
      updated_at: string;
      user_metadata: {
        full_name: string;
      };
    };
  } | null;
  storeId: string | null;
  storeName: string | null;
  storeBno: string | null;
  setStoreName: (name: string) => void;
  setStoreBno: (bno: string) => void;
  setSession: (auth) => void;
  setStoreId: (id: string) => void;
}

interface OrderConfirmType {
  id: string;
  number: number;
  isTogo: boolean;
}
