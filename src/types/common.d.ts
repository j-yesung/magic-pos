import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

// NextJS 중첩 레이아웃을 위한 타입
type NextPageWithLayout<P = NonNullable<unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface ModalAlertTypeOption {
  content: string;
  showButton?: boolean;
  buttonText?: string;
  timeout?: number;
}

interface ModalConfirmTypeOption {
  content: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonCallback?: (() => void) | null;
  cancelButtonCallback?: (() => void) | null;
}

interface AuthState {
  auth: Record<string, string | number> | null;
  storeId: string | null;
  setSession: (auth) => void;
  setStoreId: (id: string) => void;
}
