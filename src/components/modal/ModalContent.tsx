import React from 'react';
import styles from '@/components/modal/styles/Modal.module.css';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const ModalContent = ({ id, className, children }: { id: string; className?: string; children: React.ReactNode }) => {
  return (
    <motion.div
      id={id}
      className={clsx(styles.modalContainer, styles.modalPositionCenter, styles.alertZIndex, className)}
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default ModalContent;
