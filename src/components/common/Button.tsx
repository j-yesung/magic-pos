import clsx from 'clsx';
import React from 'react';
import styles from '../auth/styles/Auth.module.css';

interface ButtonProps {
  type: 'submit' | 'button';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const { type, onClick, children, className = '', disabled = false } = props;

  return (
    <button
      className={clsx(styles.button, {
        [className]: !disabled,
        [styles.disabledButton]: disabled,
      })}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
