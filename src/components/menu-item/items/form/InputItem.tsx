import styles from '@/components/menu-item/styles/menu-item-form.module.css';
import { MENU_ITEM, MENU_TOAST } from '@/data/menu-item';
import useMenuToast from '@/hooks/service/menu/useMenuToast';
import useMenuItemStore, { setMenuItem, setMenuItemImgFile, setMenuItemSampleImg } from '@/shared/store/menu/menu-item';
import clsx from 'clsx';
import Image from 'next/image';
import { ChangeEvent } from 'react';
import { FaCheck } from 'react-icons/fa6';
import MenuItemFormOption from '../../options/form/MenuItemFormOption';
import CloseButton from '/public/icons/close.svg';
import EditButton from '/public/icons/pencil.svg';

const MenuItemFormInput = () => {
  const { showCompleteToast } = useMenuToast();
  const menuItem = useMenuItemStore(state => state.menuItem);
  const categoryWithMenuItem = useMenuItemStore(state => state.categoryWithMenuItem);
  const categoryWithMenuItemList = useMenuItemStore(state => state.categoryWithMenuItemList);
  const menuItemSampleImg = useMenuItemStore(state => state.menuItemSampleImg);

  // 썸네일 이미지 보여주기
  const handleChangeImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files || [];
    if (fileList?.length !== 0) {
      const file = fileList[0];
      const currentImgUrl = URL.createObjectURL(file);

      setMenuItemImgFile(file);
      setMenuItemSampleImg(currentImgUrl);
    }
  };

  // 썸네일 지우기
  const removeMenuImage = () => {
    setMenuItemImgFile(null);
    setMenuItemSampleImg('');
  };

  // 메뉴 input handler
  const changeMenuItemHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, maxLength, name } = e.target;
    if (name === 'recommended') {
      const recommendedList = categoryWithMenuItemList.filter(list => list.id === categoryWithMenuItem.id);
      const recommendedNum = recommendedList[0].menu_item.filter(item => item.recommended).length;
      const recommendedItem = recommendedList[0].menu_item.filter(item => item.id === menuItem.id);

      if (recommendedItem.length > 0) {
        if (recommendedNum > 4 && !recommendedItem[0].recommended) {
          showCompleteToast(MENU_TOAST.ITEM_RECOMMENDED, 'warn');
          return;
        }
      } else if (recommendedNum > 4 && !menuItem.recommended) {
        showCompleteToast(MENU_TOAST.ITEM_RECOMMENDED, 'warn');
        return;
      }

      setMenuItem({ ...menuItem, recommended: !menuItem.recommended });
    } else if (name === 'price' || name === 'remain_ea') {
      const newValue = value.replace(/[^0-9e]/gi, '');
      setMenuItem({ ...menuItem, [name]: newValue.slice(0, maxLength) });
    } else {
      setMenuItem({ ...menuItem, [name]: value.slice(0, maxLength) });
    }
  };

  return (
    <>
      <div className={styles['img-txt-wrap']}>
        <div
          className={clsx(styles['img-wrap'], {
            [styles.active]: menuItemSampleImg.length !== 0,
          })}
        >
          <label htmlFor="sampleImg">
            <span className={styles['edit-img']}>
              <EditButton width={26} height={26} />
            </span>
          </label>
          {menuItemSampleImg === '' ? (
            <p className={styles['default-text']}>
              {MENU_ITEM.IMAGE_LABEL1}
              <br />
              {MENU_ITEM.IMAGE_LABEL2}
            </p>
          ) : (
            <Image src={menuItemSampleImg} alt={menuItem.name ?? 'Sample Image'} width={123} height={123} />
          )}
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            id="sampleImg"
            name="sampleImg"
            onChange={handleChangeImg}
          />
          <input
            type="text"
            onChange={changeMenuItemHandler}
            id="imageUrl"
            name="imageUrl"
            value={menuItem.image_url ?? ''}
          />
          <button className={styles['remove-img-button']} type="button" onClick={removeMenuImage}>
            <CloseButton width={26} height={26} />
          </button>
        </div>
        <div className={styles['txt-wrap']}>
          <div className={clsx(styles['input-wrap'], styles['bottom'])}>
            <p>
              <label className={styles['input-name']} htmlFor="name">
                {MENU_ITEM.NAME_LABEL}
              </label>
              <input
                type="text"
                className={styles['input']}
                onChange={changeMenuItemHandler}
                id="name"
                name="name"
                value={menuItem.name ?? ''}
                minLength={1}
                maxLength={20}
                placeholder={MENU_ITEM.NAME_PLACEHOLDER}
                required
              />
            </p>
          </div>
          <div className={clsx(styles['input-wrap'], styles['top'])}>
            <p>
              <label className={styles['input-name']} htmlFor="price">
                {MENU_ITEM.PRICE_LABEL}
              </label>
              <input
                type="text"
                className={styles['input']}
                onChange={changeMenuItemHandler}
                id="price"
                name="price"
                value={menuItem.price!}
                minLength={1}
                maxLength={20}
                placeholder={MENU_ITEM.PRICE_PLACEHOLDER}
                required
              />
            </p>
            <p>
              <label className={styles['input-name']} htmlFor="remain_ea">
                {MENU_ITEM.REMAIN_EA_LABEL}
              </label>
              <input
                type="text"
                className={styles['input']}
                onChange={changeMenuItemHandler}
                name="remain_ea"
                value={menuItem.remain_ea!}
                minLength={1}
                maxLength={20}
                placeholder={MENU_ITEM.REMAIN_EA_PLACEHOLDER}
                required
              />
            </p>
          </div>
        </div>
      </div>
      <div className={styles['checkbox-wrap']}>
        <span className={styles['input-name']}>{MENU_ITEM.RECOMMENDED_LABEL}</span>
        <p>
          <label
            className={clsx(styles['checkbox-label'], {
              [styles.active]: menuItem.recommended,
            })}
            htmlFor="recommended"
          >
            <FaCheck size={14} />
          </label>
          <input
            type="checkbox"
            onChange={changeMenuItemHandler}
            id="recommended"
            name="recommended"
            checked={menuItem.recommended}
          />
        </p>
        <label className={styles['checkbox-info']} htmlFor="recommended">
          {MENU_ITEM.RECOMMENDED_PLACEHOLDER}
        </label>
      </div>
      <div className={styles['line-wrap']}></div>
      <MenuItemFormOption />
    </>
  );
};

export default MenuItemFormInput;
