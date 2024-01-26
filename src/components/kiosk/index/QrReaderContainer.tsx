import React, { useEffect, useState } from 'react';
import styles from './styles/QrReaderContainer.module.css';
import { QrReader } from 'react-qr-reader';
import { useRouter } from 'next/router';

const QrReaderContainer = () => {
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    setIsPageLoading(false);
  }, []);

  return (
    <>
      {!isPageLoading && (
        <div className={styles.container}>
          <QrReader
            className={styles.qrReader}
            onResult={result => {
              if (result) {
                const url = result.getText();
                if (url.startsWith('https://magic-pos.vercel.app')) {
                  router.push(url);
                }
              }
            }}
            constraints={{ facingMode: 'environment' }}
          />
        </div>
      )}
    </>
  );
};

export default QrReaderContainer;
