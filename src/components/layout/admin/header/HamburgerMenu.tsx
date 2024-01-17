import useSideBar from '@/shared/store/sidebar';
import styles from '../styles/AdminLayout.module.css';
import Hamburger from '/public/icons/hamburger.svg';

const HamburgerMenu = () => {
  const toggleIsSideBarOpen = useSideBar(state => state.toggleIsSideBarOpen);

  return (
    <div onClick={toggleIsSideBarOpen}>
      <Hamburger className={styles.hamburger} width={30} height={30} />
    </div>
  );
};

export default HamburgerMenu;
