import useSideBar from '@/shared/store/sidebar';
import useToggleState from '@/shared/store/toggle';
import styles from '../styles/AdminLayout.module.css';
import Hamburger from '/public/icons/hamburger.svg';

const HamburgerMenu = () => {
  const toggleIsSideBarOpen = useSideBar(state => state.toggleIsSideBarOpen);
  const { isChecked, changeToggle } = useToggleState();

  const clickSideBarOpenHandler = () => {
    toggleIsSideBarOpen();

    if (!isChecked) {
      return;
    } else {
      changeToggle();
    }
  };

  return (
    <div onClick={clickSideBarOpenHandler}>
      <Hamburger className={styles.hamburger} width={30} height={30} />
    </div>
  );
};

export default HamburgerMenu;
