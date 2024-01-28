import { FIRST_CAPTIONS, MAIN_TITLES, SCROLL_THRESHOLDS, SECOND_CAPTIONS } from '@/data/scroll-props';
import { throttle } from 'lodash';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from '../../styles/Section.module.css';
import { TransitionBox, TransitionText } from '../animation/module-export';

const KioskVideo = () => {
  const [index, setIndex] = useState(0);
  const [ref] = useInView({ triggerOnce: true, threshold: 0.8 });

  useEffect(() => {
    const handleScroll = throttle(() => {
      for (let i = 0; i < SCROLL_THRESHOLDS.length; i++) {
        if (window.scrollY > SCROLL_THRESHOLDS[i]) setIndex(i);
      }
    }, 200);

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.kioskBox}>
      <div className={styles.stickyBox}>
        <TransitionBox index={index} />
        <div className={styles.titleBox} ref={ref}>
          <TransitionText className={styles.t1} text={MAIN_TITLES[index]} index={index} />
          <div className={styles.subTitle}>
            <TransitionText text={FIRST_CAPTIONS[index]} index={index} />
            <TransitionText text={SECOND_CAPTIONS[index]} index={index} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default KioskVideo;
