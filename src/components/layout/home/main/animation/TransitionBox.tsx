import { iphones } from '@/data/scroll-props';
import { motion } from 'framer-motion';
import styles from '../../styles/Section.module.css';

interface Props {
  index: number;
}

const TransitionBox = (props: Props) => {
  const { index } = props;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
      {iphones.map((Iphone, i) => (
        <motion.div
          className={styles.iphoneBox}
          key={i}
          initial={{ opacity: i === index ? 1 : 0 }}
          animate={{ opacity: i === index ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {i === index && <Iphone />}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TransitionBox;
