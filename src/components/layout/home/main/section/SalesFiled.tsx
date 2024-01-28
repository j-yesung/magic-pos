import { CalendarSales, CurrentSales } from '@/data/screenshot-export';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import styles from '../../styles/Section.module.css';
import TransitionSalesBox from '../animation/TransitionSalesBox';

const Analysis = () => {
  const target = useRef(null);

  return (
    <motion.section ref={target} className={styles.salesShotBox}>
      <div className={styles.imageSection}>
        <TransitionSalesBox target={target} delay={0.1}>
          <div className={styles.imageContainer}>
            <h1>한 눈에 확인하는 매출현황</h1>
            <div className={styles.desc}>
              <p>우리 매장의 황금 시간대는 언제일까?</p>
              <p>시간별 매출현황을 그래프로 확인해 볼 수 있어요.</p>
            </div>
            <Image src={CurrentSales} alt="not image" />
          </div>
        </TransitionSalesBox>
      </div>
      <div className={`${styles.imageSection} ${styles.empty}`}>
        <TransitionSalesBox target={target} delay={0.4}>
          <div className={styles.imageContainer}>
            <h1>달력으로도 확인할 수 있어요.</h1>
            <div className={styles.desc}>
              <p>우리 매장은 언제가 가장 바쁠까요?</p>
              <p>한 눈에 매출을 확인하고 플랜을 세워보세요.</p>
            </div>
            <Image src={CalendarSales} alt="not image" />
          </div>
        </TransitionSalesBox>
      </div>
    </motion.section>
  );
};

export default Analysis;
