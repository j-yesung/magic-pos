import { motion, useScroll } from 'framer-motion';
import styles from '../../styles/Home.module.css';

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  return <motion.div className={styles.progressBar} style={{ scaleX: scrollYProgress }} />;
};

export default ProgressBar;
