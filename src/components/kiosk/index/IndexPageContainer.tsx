import React from 'react';
import QrReaderContainer from '@/components/kiosk/index/QrReaderContainer';
import styles from './styles/IndexPageContainer.module.css';

const IndexPageContainer = () => {
  const handler = async () => {
    const constraints = {
      video: true,
    };

    navigator.mediaDevices.getUserMedia(constraints).catch(err => {
      // always check for errors at the end.
      console.error(`${err.name}: ${err.message}`);
    });
  };

  return (
    <div className={styles.container}>
      <h1>MAGIC POS</h1>
      <button onClick={handler}>QR 코드 찍기</button>
      <div>
        <QrReaderContainer />
      </div>
    </div>
  );
};

export default IndexPageContainer;
