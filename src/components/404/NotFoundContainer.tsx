import React from 'react';
import NotFoundImage from '/public/images/404.svg';
import style from './styles/NotFoundContainer.module.css';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const NotFoundContainer = () => {
  const router = useRouter();

  const handleClickImage = () => {
    router.push('/');
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>404</h1>
        <p>Page not found</p>
      </div>
      <motion.div
        onClick={handleClickImage}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.0 }}
        animate={{
          rotate: [0, 0, 3, 0, -3, 0],
        }}
        transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
      >
        <NotFoundImage />
      </motion.div>
    </div>
  );
};

export default NotFoundContainer;
