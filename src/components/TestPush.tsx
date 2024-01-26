import useSendPush from '@/hooks/service/useSendPush';
import { getTokenHandler } from '@/shared/firebase';
import { useState } from 'react';
import styles from './TestPush.module.css';

const TestPush = () => {
  const sendPush = useSendPush();
  const [isToken, setIsToken] = useState('');

  const clickPushHandler2 = () => {
    Notification.requestPermission().then(permission => {
      if (permission !== 'granted') {
        // 푸시 거부됐을 때 처리할 내용
        console.log('푸시 거부됨');
      } else {
        // 푸시 승인됐을 때 처리할 내용
        console.log('푸시 승인됨');
      }
    });
  };

  // 토큰 받는 테스트
  const getTokens = async () => {
    const token = await getTokenHandler();
    console.log('token', token);
    setIsToken(token || '');
  };

  const sendPushHandler = () => {
    sendPush({
      title: '푸시 알림 테스트',
      body: '푸시 알림 테스트입니다.',
      click_action: '/', // 클릭 시 이동할 페이지
    });
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={clickPushHandler2}>알림 보내기</button>
      <button onClick={getTokens}>토큰 발급</button>
      {isToken && <div>{isToken}</div>}
      <button onClick={sendPushHandler}>푸시 알림 보내기</button>
    </div>
  );
};

export default TestPush;
