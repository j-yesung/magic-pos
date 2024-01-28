import React from 'react';
import styles from './styles/TranslateLoading.module.css';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const TranslateLoading = () => {
  return (
    <div className={styles.container}>
      <h1>AI를 이용하여 번역 중입니다</h1>
      <LoadingSpinner boxSize={2} ballSize={0.4} interval={1.5} />
    </div>
  );
};

export default TranslateLoading;
