import styles from './styles/header.module.css';
import CloseSvg from '/public/icons/x.svg';
const Header = ({ clickHiddenModal }: { clickHiddenModal: () => void }) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>매출 엑셀표 다운로드</p>
      <button type="button" onClick={clickHiddenModal} className={styles.button}>
        <CloseSvg width={26} height={26} />
      </button>
    </div>
  );
};

export default Header;
