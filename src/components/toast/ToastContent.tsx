import React, { ReactElement } from 'react';
import styles from '@/components/toast/styles/Toast.module.css';
import clsx from 'clsx';
import { ToastPositionType, ToastType, ToastTypeOption } from '@/types/common';
import {
  IoAlertCircleSharp,
  IoCheckmarkCircleSharp,
  IoCloseCircleSharp,
  IoCloseSharp,
  IoInformationCircleSharp,
} from 'react-icons/io5';
import { subtractToastList } from '@/shared/store/toast';

const ICONS: { [key in ToastType]: ReactElement } = {
  info: <IoInformationCircleSharp size={22} />,
  danger: <IoCloseCircleSharp size={22} />,
  warn: <IoAlertCircleSharp size={22} />,
  success: <IoCheckmarkCircleSharp size={22} />,
};

const ToastContent = ({ list, position }: { list: ToastTypeOption[]; position: ToastPositionType }) => {
  return (
    <div className={clsx(styles.toastContainer, styles[position])}>
      {list.map(item => (
        <div key={item.id} className={clsx(styles.toastContent, styles[item.animation ?? ''], styles[item.type])}>
          <div>
            <div>{ICONS[item.type]}</div>
            <span>{item.content}</span>
          </div>
          {(item.showCloseButton === undefined ? true : item.showCloseButton) && (
            <button onClick={() => subtractToastList(item.id)}>
              <IoCloseSharp size={22} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ToastContent;
