import React from 'react';
import QrReaderContainer from '@/components/kiosk/index/QrReaderContainer';
import styles from './styles/IndexPageContainer.module.css';
import Logo from '/public/logo.svg';
import { IoCameraOutline } from 'react-icons/io5';
import useToast from '@/hooks/service/ui/useToast';

const IndexPageContainer = () => {
  const { toast } = useToast();
  const handler = async () => {
    const constraints = {
      video: true,
    };

    navigator.mediaDevices.getUserMedia(constraints).catch(err => {
      // always check for errors at the end.
      console.error(`${err.name}: ${err.message}`);
      toast(`${err.name}: ${err.message}`, {
        type: 'danger',
        position: 'bottom-right',
      });
    });
  };

  return (
    <div className={styles.container}>
      <header onClick={handler}>
        <Logo />
      </header>
      <div className={styles.description1} onClick={handler}>
        <div>
          <div className={styles.camera}>
            <IoCameraOutline size={32} />
          </div>
        </div>
        <p>QR코드를 촬영해 주세요</p>
      </div>
      <QrReaderContainer />
      <p className={styles.description2}>화면 안에 QR코드가 전부 들어오도록 촬영해 주세요.</p>
    </div>
  );
};

export default IndexPageContainer;
