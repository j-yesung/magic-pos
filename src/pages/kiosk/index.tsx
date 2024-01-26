import React, { ReactNode, useEffect, useState } from 'react';
import OrderLayout from '@/components/layout/order/OrderLayout';
import QRCode from 'qrcode.react';
import { QrReader } from 'react-qr-reader';
import QrReaderContainer from '@/components/kiosk/index/QrReaderContainer';
import IndexPageContainer from '@/components/kiosk/index/IndexPageContainer';

const IndexPage = () => {
  return <IndexPageContainer />;
};

IndexPage.getLayout = (page: ReactNode) => <OrderLayout>{page}</OrderLayout>;

export default IndexPage;
