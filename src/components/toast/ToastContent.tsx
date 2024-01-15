import React from 'react';
import styles from '@/components/toast/styles/Toast.module.css';
import clsx from 'clsx';
import { ToastPositionType, ToastTypeOption } from '@/types/common';

const ToastContent = ({ list, position }: { list: ToastTypeOption[]; position: ToastPositionType }) => {
  return (
    <div className={clsx(styles.toastContainer, styles[position])}>
      {list.map(item => (
        <div key={item.id} className={clsx(styles.toastContent, styles[item.animation ?? ''], styles[item.type])}>
          {item.content}
        </div>
      ))}
    </div>
  );
};

export default ToastContent;
