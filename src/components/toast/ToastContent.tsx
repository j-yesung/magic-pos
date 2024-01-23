import React from 'react';
import styles from '@/components/toast/styles/Toast.module.css';
import clsx from 'clsx';
import { ToastPositionType, ToastTypeOption } from '@/types/common';
import { IoCloseCircle } from 'react-icons/io5';
import { subtractToastList } from '@/shared/store/toast';

const ToastContent = ({ list, position }: { list: ToastTypeOption[]; position: ToastPositionType }) => {
  console.log(list);
  return (
    <div className={clsx(styles.toastContainer, styles[position])}>
      {list.map(item => (
        <div key={item.id} className={clsx(styles.toastContent, styles[item.animation ?? ''], styles[item.type])}>
          {(item.showCloseButton === undefined ? true : item.showCloseButton) && (
            <button onClick={() => subtractToastList(item.id)}>
              <IoCloseCircle size={14} />
            </button>
          )}
          <span>{item.content}</span>
        </div>
      ))}
    </div>
  );
};

export default ToastContent;
