import React from 'react';
import styles from './styles/Auth.module.css';

interface BurrtonProps {
  type: 'submit' | 'button';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button = ({ type, onClick, children, className, disabled }: BurrtonProps) => {
  return (
    <button
      className={!disabled ? `${styles.button} ${className}` : styles.disabledButton}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <p>{children}</p>
    </button>
  );
};

export default Button;
