import '@/styles/globals.css';
import '@/styles/reset.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { NextPageWithLayout } from '@/types/common';
import Modal from '@/components/modal/Modal';

const queryClient = new QueryClient();

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);
  return (
    <QueryClientProvider client={queryClient}>
      {getLayout(<Component {...pageProps} />)}
      <Modal />
    </QueryClientProvider>
  );
}
