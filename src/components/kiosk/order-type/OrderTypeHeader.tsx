import React from 'react';
import { useTranslation } from 'next-i18next';

const OrderTypeHeader = () => {
  const { t } = useTranslation();

  return (
    <h1>
      {t('order-type.title-1')} <br />
      {t('order-type.title-2')}
    </h1>
  );
};

export default OrderTypeHeader;
