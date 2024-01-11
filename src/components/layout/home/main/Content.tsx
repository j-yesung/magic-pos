import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import SliderArea from './Slider';
import StickBar from './StickBar';
import WateMark from './WateMark';

const Content = () => {
  const router = useRouter();

  const clickStartHandler = () => {
    // 로그인 세션 확인하고 관리자 페이지로 이동 or 로그인 페이지로 이동
    router.push('/auth/admin/');
  };

  return (
    <>
      <div>
        <span className={styles.mainTitle}>세상의 모든 키오스크가 내 손 안에</span>
        <div className={styles.mainDescription}>
          <p>키오스크를 통해 주문하고 결제하세요. 어쩌구 저쩌구 어쩌구 저쩌구</p>
          <p>주문한 내역은 키오스크에서 확인할 수 있습니다.</p>
        </div>
      </div>

      {/* 워터마커 */}
      <WateMark />

      <div className={styles.startWrapper}>
        <button className={styles.startButton} onClick={clickStartHandler}>
          시작하기
        </button>
      </div>

      {/* 슬라이더 */}
      <SliderArea />


      {/* 고정 탭 메뉴 */}
      <StickBar />
    </>
  );
};

export default Content;
