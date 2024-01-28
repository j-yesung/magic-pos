import React from 'react';
import styles from './styles/Loading.module.css';
import MagicWind from '/public/images/magic-wind.svg';
import Logo from '/public/logo.svg';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.magicWind}>
        <motion.div animate={{ y: [0, -10, 0, 10, 0] }} transition={{ ease: 'linear', duration: 1, repeat: Infinity }}>
          <MagicWind />
        </motion.div>
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
