import { useObserver } from '@/hooks/ui/useObserver';
import { useRef } from 'react';
import styles from '../../styles/Section.module.css';
import SliderImage from './SliderImage';

const Analysis = () => {
  const target = useRef(null);
  const { isVisible } = useObserver({ target, option: { threshold: 0.3 } });

  return (
    <>
      <section className={`${styles.fadeWrapper} ${isVisible ? styles.fadeIn : ''}`} ref={target}>
        <div className={styles.fadaContainer}>
          <h1>꼼꼼한 매출 분석까지 도와드려요.</h1>
        </div>
      </section>

      <section className={styles.salesWrapper}>
        <div className={styles.salesTextArea}>
          <h1>우리 가게는 언제 가장 매출이 높았는지 플랜을 세워보세요.</h1>
        </div>

        <div className={styles.salsePictrueArea}>
          <div className={styles.salesContentsContainer}>
            <h1>매출 분석</h1>
            <SliderImage />
          </div>
          <div className={styles.salesContentsContainer}>
            <h1>다른 기능</h1>
            <SliderImage />
          </div>
        </div>
      </section>
    </>
  );
};

export default Analysis;
