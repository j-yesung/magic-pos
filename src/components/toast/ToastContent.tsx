import React from 'react';
import styles from '@/components/toast/styles/Toast.module.css';
import clsx from 'clsx';
import { ToastTypeOption } from '@/types/common';

const ToastContent = ({
  list,
  position,
}: {
  list: ToastTypeOption[];
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}) => {
  return (
    <div className={clsx(styles.toastContainer, styles[position])}>
      {list.map(item => (
        <div key={item.id} className={clsx(styles.toastContent, styles[item.animation ?? ''])}>
          {item.content}
        </div>
      ))}
    </div>
  );
};

export default ToastContent;
