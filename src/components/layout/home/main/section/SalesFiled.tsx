import { CalendarSales, CurrentSales } from '@/data/module-export';
import { useObserver } from '@/hooks/service/useObserver';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import styles from '../../styles/Section.module.css';

const Analysis = () => {
  const target = useRef(null);
  const { isVisible } = useObserver({ target, option: { threshold: 0.5 } });

  return (
    <motion.section ref={target} className={styles.salesShotBox}>
      <div className={styles.firstSection}>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          <CurrentSales />
        </motion.div>
      </div>
      <div className={styles.secondSection}>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <CalendarSales />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Analysis;
