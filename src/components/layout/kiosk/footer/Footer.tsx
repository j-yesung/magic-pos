import { useEffect, useState } from 'react';
import styles from './styles/Footer.module.css';
import StepButton from '@/components/layout/kiosk/footer/StepButton';
import useKioskState, { ORDER_STEP } from '@/shared/store/kiosk';

const Footer = () => {
  const step = useKioskState(state => state.step);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    setIsPageLoading(false);
  }, []);

  return (
    <>
      {step > ORDER_STEP.CHOOSE_ORDER_TYPE && (
        <footer className={styles.container}>{!isPageLoading && <StepButton />}</footer>
      )}
    </>
  );
};

export default Footer;
