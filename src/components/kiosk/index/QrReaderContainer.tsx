import React, { useEffect, useState } from 'react';
import styles from './styles/QrReaderContainer.module.css';
import { QrReader } from 'react-qr-reader';
import { useRouter } from 'next/router';

const QrReaderContainer = () => {
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isVideoRendereing, setIsVideoRendereing] = useState(true);

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
              if (!isVideoRendereing) {
                if (
                  navigator.userAgent.indexOf('Safari') != -1 &&
                  navigator.userAgent.indexOf('Mac') != -1 &&
                  navigator.userAgent.indexOf('Chrome') == -1
                ) {
                  document.getElementById('qr-reader')!.setAttribute('crossorigin', 'true');
                }
                setIsVideoRendereing(false);
              }

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
            videoId={'qr-reader'}
          />
        </div>
      )}
    </>
  );
};

export default QrReaderContainer;
