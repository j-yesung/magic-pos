import { CalendarSales, CurrentSales } from '@/data/screenshot-export';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import styles from '../../styles/Section.module.css';
import TransitionSalesBox from '../animation/TransitionSalesBox';

const Analysis = () => {
  const target = useRef(null);

  return (
    <motion.section ref={target} className={styles.salesShotBox}>
      <div className={styles.firstSection}>
        <TransitionSalesBox target={target} delay={0.1}>
          <CurrentSales />
        </TransitionSalesBox>
      </div>
      <div className={styles.secondSection}>
        <TransitionSalesBox target={target} delay={0.4}>
          <CalendarSales />
        </TransitionSalesBox>
      </div>
    </motion.section>
  );
};

export default Analysis;
