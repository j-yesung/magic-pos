import React, { useEffect, useState } from 'react';
import styles from './styles/QrReaderContainer.module.css';
import { QrReader } from 'react-qr-reader';
import { useRouter } from 'next/router';

const QrReaderContainer = () => {
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isVideoRendering, setIsVideoRendering] = useState(true);

  useEffect(() => {
    setIsPageLoading(false);
  }, []);

  return (
    <>
      {!isPageLoading && (
        <div className={styles.container}>
          <QrReader
            className={styles.qrReader}
            videoContainerStyle={{ display: 'flex', justifyContent: 'center', paddingTop: 0 }}
            videoStyle={{ height: '30rem', width: 'fit-content' }}
            onResult={result => {
              if (!isVideoRendering) {
                document.getElementById('qr-reader')!.setAttribute('crossorigin', 'true');
                setIsVideoRendering(false);
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
