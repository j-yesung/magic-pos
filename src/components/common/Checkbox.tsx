import clsx from 'clsx';
import { nanoid } from 'nanoid';
import React from 'react';
import { FaCheck } from 'react-icons/fa6';
import styles from './styles/Checkbox.module.css';

interface CheckboxProps {
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  defaultChecked?: boolean;
}

const Checkbox = (props: CheckboxProps) => {
  const id = nanoid();
  return (
    <>
      <input
        id={`checkbox_${id}`}
        type="checkbox"
        onClick={props.onClick}
        defaultChecked={props.defaultChecked}
        className={clsx(styles.checkbox, props.className)}
      />
      <label htmlFor={`checkbox_${id}`}>
        <FaCheck size={12} />
      </label>
    </>
  );
};

export default Checkbox;
