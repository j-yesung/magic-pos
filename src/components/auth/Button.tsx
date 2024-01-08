import React from 'react';
import styles from './styles/Auth.module.css';

interface BurrtonProps {
  type: 'submit' | 'button';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
}

const Button = ({ type, onClick, children, className }: BurrtonProps) => {
  return (
    <button className={`${styles['button']} ${className}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
