import styles from '../styles/Home.module.css';
import { SliderArea, StartButton, StickBar, Title, WateMark } from './module-export';

const Contents = () => {
  return (
    <>
      <StickBar />
      <Title />
      <WateMark />
      <StartButton />
      <SliderArea />

      {/* 더미 박스 - 나중에 지울 것들 */}
      <div className={styles.dummyBox}>
        <div className={styles.dummyBorder}></div>
        <div className={styles.dummyBorder}></div>
        <div className={styles.dummyBorder}></div>
        <div className={styles.dummyBorder}></div>
        <div className={styles.dummyBorder}></div>
      </div>
    </>
  );
};

export default Contents;
