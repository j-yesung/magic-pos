import React from 'react';
import Icon from '/public/icons/cart.svg';
import styles from './styles/Icon.module.css';
import clsx from 'clsx';

const CartIcon = ({ amount }: { amount: number }) => {
  return (
    <>
      <span className={clsx(styles.blackColor, styles.cartIcon)}>{amount}</span>
      <Icon />
    </>
  );
};

export default CartIcon;
