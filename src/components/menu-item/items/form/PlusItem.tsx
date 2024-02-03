import MenuItemModal from '@/components/menu-item/items/modal/MenuItemModal';
import styles from '@/components/menu-item/styles/menu-item-card.module.css';
import { useModal } from '@/hooks/service/ui/useModal';
import useMenuItemStore, {
  NewMenuItemType,
  setIsEdit,
  setMenuItem,
  setMenuItemImgFile,
  setMenuItemSampleImg,
} from '@/shared/store/menu/menu-item';
import { setMenuOptions } from '@/shared/store/menu/menu-option';
import PlusButton from '/public/icons/plus.svg';

const PlusItemComponent = () => {
  const { MagicModal } = useModal();
  const categoryWithMenuItemList = useMenuItemStore(state => state.categoryWithMenuItemList);
  const categoryWithMenuItem = useMenuItemStore(state => state.categoryWithMenuItem);

  // 메뉴 플러스
  const clickAddMenuItemHandler = async () => {
    const filterMenuItem = categoryWithMenuItemList.filter(item => item.id === categoryWithMenuItem.id);
    const checkMenuItem = filterMenuItem[0].menu_item;
    setIsEdit(false);
    MagicModal.fire(<MenuItemModal />);
    const newMenuItem: NewMenuItemType = {
      id: '',
      name: '',
      category_id: categoryWithMenuItem.id,
      image_url: '',
      price: null,
      remain_ea: null,
      recommended: false,
      position: checkMenuItem.length === 0 ? 0 : checkMenuItem[checkMenuItem.length - 1].position + 1,
    };
    setMenuItem(newMenuItem);
    setMenuItemSampleImg('');
    setMenuOptions([]);
    setMenuItemImgFile(null);
  };
  return (
    <button className={styles['plus']} type="button" onClick={clickAddMenuItemHandler}>
      <PlusButton width={22} height={22} />
    </button>
  );
};

export default PlusItemComponent;
