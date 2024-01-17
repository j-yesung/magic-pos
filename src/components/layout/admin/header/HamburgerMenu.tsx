import styles from '../styles/AdminLayout.module.css';
import Hamburger from '/public/icons/hamburger.svg';

const HamburgerMenu = () => {

  return (
      <Hamburger className={styles.hamburger} width={30} height={30} />
    </div>
  );
};

export default HamburgerMenu;
