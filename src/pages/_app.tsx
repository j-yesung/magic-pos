import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPageWithLayout } from '@/types/common';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? (page => page);

  return getLayout(<Component {...pageProps} />);
}
