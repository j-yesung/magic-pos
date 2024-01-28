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
import Head from 'next/head';
import { makeTitle } from '@/shared/helper';

const DESCRIPTION =
  'Magic POS는 가게와 고객 간 손쉬운 주문 및 결제를 위한 혁신적인 솔루션입니다. 사장님은 주문, 매출 관리등을 웹에서 간편하게 수행하며, 사용자는 직관적이고 빠른 주문 체험을 즐길 수 있습니다. 비즈니스 생산성과 소비자 만족도를 높이는 효과적인 어플리케이션 입니다!';
const IMAGE =
  'https://opengraph.b-cdn.net/production/documents/3a4e44d2-127e-4b7d-9c73-a8d7979179e1.svg?token=Nkw6igTCSzK5jA0sAxRXGb8iN-LlZlMm2i0dSr-_-jk&height=630&width=1200&expires=33242457699';
const URL = 'https://magic-pos.com/';
const TITLE = 'Magic POS - 웹기반 POS & KIOSK 솔루션';

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
      <Head>
        <title>{makeTitle('')}</title>
        <meta property="description" content={DESCRIPTION} />
        <meta property={'og:url'} content={URL} />
        <meta property={'og:type'} content={'website'} />
        <meta property={'og:title'} content={TITLE} />
        <meta property={'og:description'} content={DESCRIPTION} />
        <meta property={'og:image'} content={IMAGE} />

        <meta name={'twitter:card'} content="summary_large_image" />
        <meta property={'twitter:domain'} content={'magic-pos.com'} />
        <meta property={'twitter:url'} content={URL} />
        <meta property={'twitter:title'} content={TITLE} />
        <meta property={'twitter:description'} content={DESCRIPTION} />
        <meta property={'twitter:image'} content={IMAGE} />
      </Head>
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
