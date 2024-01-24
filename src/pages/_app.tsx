import Modal from '@/components/modal/Modal';
import Toast from '@/components/toast/Toast';
import '@/styles/globals.css';
import '@/styles/reset.css';
import { NextPageWithLayout } from '@/types/common';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import '@/shared/i18n';

const myFont = localFont({ src: './fonts/PretendardVariable.woff2', variable: '--main-font' });

const queryClient = new QueryClient();

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <main className={myFont.variable}>{getLayout(<Component {...pageProps} />)}</main>
      <Modal />
      <Toast />
    </QueryClientProvider>
  );
}
