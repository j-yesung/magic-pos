import Head from 'next/head';
import React, { ReactElement } from 'react';
import styles from './styles/layout.module.css';

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
      <div className={styles.container}>
        <div className={styles.children}>{props.children}</div>
      </div>
    </>
  );
};

export default Layout;
