import Head from 'next/head';
import React, { ReactElement } from 'react';

/**
 * 일반인 KIOSK 레이아웃
 * @param props
 * @constructor
 */
const Layout = (props: { children: ReactElement }) => {
  return (
    <>
      <Head>
        <title>MAGIC-POS : 주문</title>
      </Head>
      <div className="mx-auto max-w-screen-md h-screen pt-5 pb-5">
        <div className="flex h-full">{props.children}</div>
      </div>
    </>
  );
};

export default Layout;
