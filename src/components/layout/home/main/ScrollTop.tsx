import Button from '@/components/common/Button';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import styles from '../styles/StickBar.module.css';

const ScrollTop = () => {
  const [showButton, setShowButton] = useState(false);

  const clickScrollTopHandler = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const clickShowButtonHandler = debounce(() => {
    setShowButton(window.scrollY > 700);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', clickShowButtonHandler);

    return () => {
      window.removeEventListener('scroll', clickShowButtonHandler);
      clickShowButtonHandler.cancel();
    };
  }, [clickShowButtonHandler]);

  return (
    showButton && (
      <div className={styles.scrollTopBox}>
        <Button type="button" onClick={clickScrollTopHandler}>
          TOP
        </Button>
      </div>
    )
  );
};

export default ScrollTop;
