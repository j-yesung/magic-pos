import Loading from '@/components/common/Loading';
import Modal from '@/components/modal/Modal';
import Toast from '@/components/toast/Toast';
import { makeTitle } from '@/shared/helper';
import '@/shared/i18n';
import '@/styles/globals.css';
import '@/styles/reset.css';
import { NextPageWithLayout } from '@/types/common';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import clsx from 'clsx';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DESCRIPTION =
  'Magic POS는 가게와 고객 간 손쉬운 주문 및 결제를 위한 혁신적인 솔루션입니다. 사장님은 주문, 매출 관리등을 웹에서 간편하게 수행하며, 사용자는 직관적이고 빠른 주문 체험을 즐길 수 있습니다. 비즈니스 생산성과 소비자 만족도를 높이는 효과적인 어플리케이션 입니다!';
const IMAGE =
  'https://opengraph.b-cdn.net/production/documents/4ecb8af4-b67b-42d0-b26a-0593317a1b02.png?token=7lAsUrvnBE60f81lzRzHhcBAlmUMCCZnGK946vcl2o0&height=630&width=1200&expires=33242459263';
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

  useEffect(() => {
    // 로딩이 길어질 때만 로딩창이 뜨도록 변경
    let timer: ReturnType<typeof setTimeout>;
    const handleRouteStart = () => {
      if (!timer) {
        timer = setTimeout(() => {
          setIsPageLoading(true);
        }, 150);
      }
    };
    const handleRouteComplete = () => {
      if (timer) clearTimeout(timer);
      setIsPageLoading(false);
    };

    const handleRouteChangeError = () => {
      if (timer) clearTimeout(timer);
      setIsPageLoading(false);
    };

    router.events.on('routeChangeError', handleRouteChangeError);
    router.events.on('routeChangeStart', handleRouteStart);
    router.events.on('routeChangeComplete', handleRouteComplete);

    return () => {
      if (timer) clearTimeout(timer);
      router.events.off('routeChangeStart', handleRouteStart);
      router.events.off('routeChangeComplete', handleRouteComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
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
