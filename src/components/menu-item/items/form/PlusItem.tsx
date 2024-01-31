import MenuItemModal from '@/components/menu-item/items/modal/MenuItemModal';
import styles from '@/components/menu-item/styles/menu-item-card.module.css';
import { useModal } from '@/hooks/service/ui/useModal';
import useMenuItemStore, {
  setIsEdit,
  setMenuItem,
  setMenuItemImgFile,
  setMenuItemSampleImg,
} from '@/shared/store/menu/menu-item';
import { setMenuOptions } from '@/shared/store/menu/menu-option';
import { Tables } from '@/types/supabase';
import PlusButton from '/public/icons/plus.svg';

const PlusItemComponent = () => {
  const { MagicModal } = useModal();
  const sampleImage = useMenuItemStore(state => state.sampleImage);
  const categoryWithMenuItemList = useMenuItemStore(state => state.categoryWithMenuItemList);
  const categoryWithMenuItem = useMenuItemStore(state => state.categoryWithMenuItem);

  // 메뉴 플러스
  const clickAddMenuItemHandler = async () => {
    const filterMenuItem = categoryWithMenuItemList.filter(item => item.id === categoryWithMenuItem.id);
    const checkMenuItem = filterMenuItem[0].menu_item;
    setIsEdit(false);
    MagicModal.fire(<MenuItemModal />);
    const newMenuItem: Tables<'menu_item'> = {
      id: '',
      name: '',
      category_id: categoryWithMenuItem.id,
      image_url: sampleImage,
      price: 0,
      remain_ea: 0,
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
