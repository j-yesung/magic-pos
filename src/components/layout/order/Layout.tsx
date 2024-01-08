import Head from 'next/head';
import React, { ReactElement } from 'react';
import styles from './styles/layout.module.css';
import Footer from '@/components/layout/order/Footer';

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
      <section className={styles.container}>
        <article className={styles.children}>{props.children}</article>
        <Footer />
      </section>
    </>
  );
};

export default Layout;
