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

      <section className={styles.videoWrapper}>
        <div className={styles.videoTextArea}>
          <h1>번거로운 키오스크는 이제 안녕! 👋</h1>
          <div>
            <p>매직 포스에서 메뉴 선택부터 주문까지</p>
            <p>그리고 점주분들은 매장 관리까지! 🖥️</p>
          </div>
        </div>

        <div className={styles.videoSection}>
          <div>비디오</div>
        </div>
      </section>
    </>
  );
};

export default Contents;
