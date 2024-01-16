import { useEffect, useState } from 'react';
import styles from '../styles/StickBar.module.css';

const ScrollTop = () => {
  const [showButton, setShowButton] = useState(false);

  const clickScrollTopHandler = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const clickShowButtonHandler = () => {
      if (window.scrollY > 700) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', clickShowButtonHandler);

    return () => {
      window.removeEventListener('scroll', clickShowButtonHandler);
    };
  }, []);

  return (
    <>
      {showButton && (
        <div className={styles.scrollTopBox}>
          <button onClick={clickScrollTopHandler}>
            <p>Top</p>
          </button>
        </div>
      )}
    </>
  );
};

export default ScrollTop;
