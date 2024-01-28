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
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from '@/components/common/Loading';
import clsx from 'clsx';

const myFont = localFont({ src: '../../public/fonts/PretendardVariable.woff2', variable: '--main-font' });

const queryClient = new QueryClient();

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const getLayout = Component.getLayout ?? (page => page);
  //
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsPageLoading(true);
    });
    //
    router.events.on('routeChangeComplete', () => {
      setIsPageLoading(false);
    });
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {isPageLoading && <Loading />}
      <main className={clsx(myFont.variable, { ['blur']: isPageLoading })}>
        {getLayout(<Component {...pageProps} />)}
      </main>
      <Modal />
      <Toast />
    </QueryClientProvider>
  );
};

export default appWithTranslation(App);
