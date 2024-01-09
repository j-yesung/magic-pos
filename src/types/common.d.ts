import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';

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
