import React from 'react';
import clsx from 'clsx';
import styles from './styles/Checkbox.module.css';
import { FaCheck } from 'react-icons/fa6';
import { nanoid } from 'nanoid';

interface CheckboxProps {
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
}

const Checkbox = (props: CheckboxProps) => {
  const id = nanoid();
  return (
    <>
      <input
        id={`checkbox_${id}`}
        type="checkbox"
        onClick={props.onClick}
        className={clsx(styles.checkbox, props.className)}
      />
      <label htmlFor={`checkbox_${id}`}>
        <FaCheck size={12} />
      </label>
    </>
  );
};

export default Checkbox;
