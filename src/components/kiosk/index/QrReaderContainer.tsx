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
            videoContainerStyle={{ display: 'flex', justifyContent: 'center' }}
            videoStyle={{ height: '30rem', width: 'fit-content' }}
            onResult={result => {
              if (result) {
                const url = result.getText();
                if (
                  url.startsWith('https://magic-pos.vercel.app') ||
                  url.startsWith('https://magic-pos.com') ||
                  url.startsWith('http://localhost:3000')
                ) {
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
