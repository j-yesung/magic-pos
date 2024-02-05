import Image from 'next/image';
import styles from '../styles/Home.module.css';

const WateMark = () => {
  return (
    <div className={styles.mainWatemark}>
      <Image src="/images/watemark.svg" alt="magic" width={0} height={0} />
    </div>
  );
};

export default WateMark;
