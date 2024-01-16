import { useCallback, useEffect, useState } from 'react';
import styles from '../styles/StickBar.module.css';

const ScrollTop = () => {
  const [showButton, setShowButton] = useState(false);

  const clickScrollTopHandler = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const clickShowButtonHandler = useCallback(() => {
    setShowButton(window.scrollY > 700);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', clickShowButtonHandler);

    return () => {
      window.removeEventListener('scroll', clickShowButtonHandler);
    };
  }, [clickShowButtonHandler]);

  return (
    showButton && (
      <div className={styles.scrollTopBox}>
        <button onClick={clickScrollTopHandler}>Top</button>
      </div>
    )
  );
};

export default ScrollTop;
