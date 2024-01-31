import { IPHONES } from '@/data/scroll-props';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../../styles/Section.module.css';

interface Props {
  index: number;
}

const TransitionBox = (props: Props) => {
  const { index } = props;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
      {IPHONES.map((iphone, i) => (
        <motion.div
          className={styles.iphoneBox}
          key={iphone.id}
          initial={{ opacity: i === index ? 1 : 0 }}
          animate={{ opacity: i === index ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {i === index && <Image className={styles.iphoneImg} src={iphone.src} width={0} height={0} alt={iphone.alt} />}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TransitionBox;
