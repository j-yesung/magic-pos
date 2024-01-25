import { SCROLL_THRESHOLDS, SUB_TITLES, TITLES } from '@/data/scroll-props';
import { throttle } from 'lodash';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from '../../styles/Section.module.css';
import TransitionText from '../animation/TransitionText';
import Iphone from '/public/images/iphone.svg';

const KioskVideo = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.8,
  });

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollY = window.scrollY;

      for (let i = 0; i < SCROLL_THRESHOLDS.length; i++) {
        if (scrollY > SCROLL_THRESHOLDS[i]) {
          setTitleIndex(i);
        }
      }
    }, 200);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className={styles.kioskBox}>
      <div className={styles.stickyBox}>
        <div className={styles.titleBox} ref={ref}>
          <TransitionText className={styles.t1} text={TITLES[titleIndex]} index={titleIndex} />
          <div className={styles.subTitle}>
            <TransitionText text={SUB_TITLES[titleIndex]} index={titleIndex} />
          </div>
        </div>
        <Iphone />
      </div>
    </section>
  );
};

export default KioskVideo;
