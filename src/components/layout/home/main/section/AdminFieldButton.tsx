import styles from '../../styles/Section.module.css';
import PrevArrow from '/public/icons/arrow-left.svg';
import NextArrow from '/public/icons/arrow-right.svg';

interface AdminFieldButtonProps {
  goPrev: () => void;
  goNext: () => void;
}

const AdminFieldButton = (props: AdminFieldButtonProps) => {
  const { goPrev, goNext } = props;

  return (
    <div className={styles.actionButton}>
      <PrevArrow className={styles.arrow} width={80} onClick={goPrev} />
      <NextArrow className={styles.arrow} width={80} onClick={goNext} />
    </div>
  );
};

export default AdminFieldButton;
