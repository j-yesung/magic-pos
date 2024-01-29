import React from 'react';
import styles from './styles/Loading.module.css';
import { motion } from 'framer-motion';
import Image from 'next/image';
import DotSpinner from '@/components/common/DotSpinner';

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src={'/logo.svg'} alt={'logo'} width={252} height={50} />
      </div>
      <div className={styles.magicWind}>
        <motion.div animate={{ y: [0, -10, 0, 10, 0] }} transition={{ ease: 'linear', duration: 1, repeat: Infinity }}>
          <Image src={'/images/magic-wind.svg'} alt={'로딩'} width={148} height={147} />
          {/*<MagicWind />*/}
        </motion.div>
      </div>
      <div className={styles.loadingSpinner}>
        <p>Loading</p>
        <DotSpinner />
      </div>
    </div>
  );
};

export default Loading;
