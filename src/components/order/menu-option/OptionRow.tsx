import React from 'react';
import { Tables } from '@/types/supabase';
import styles from './styles/OptionRow.module.css';

const OptionRow = ({ option }: { option: Tables<'menu_option'> }) => {
  return <div className={styles.container}>{option.name}</div>;
};

export default OptionRow;
