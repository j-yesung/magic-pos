import React from 'react';
import QrReaderContainer from '@/components/kiosk/index/QrReaderContainer';
import styles from './styles/IndexPageContainer.module.css';
import Logo from '/public/logo.svg';
import { IoCameraOutline } from 'react-icons/io5';

const IndexPageContainer = () => {
  return (
    <div className={styles.container}>
      <header>
        <Logo />
      </header>
      <div className={styles.description1}>
        <div>
          <div className={styles.camera}>
            <IoCameraOutline size={32} />
          </div>
        </div>
        <p>QR코드를 촬영해 주세요</p>
      </div>
      <QrReaderContainer />
      <p className={styles.description2}>화면 안에 QR코드가 전부 들어오도록 촬영해 주세요.</p>
      <p className={styles.description2}>아이폰의 경우 iOS 17+ 환경에서 정상 동작합니다.</p>
    </div>
  );
};

export default IndexPageContainer;
