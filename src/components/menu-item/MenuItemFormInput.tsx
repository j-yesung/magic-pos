import { useModal } from '@/hooks/modal/useModal';
import useMenuItemStore from '@/shared/store/menu-item';
import Image from 'next/image';
import { ChangeEvent } from 'react';
import MenuItemFormOption from './MenuItemFormOption';
import styles from './styles/menu-item-form.module.css';


const MenuItemFormInput = () => {
  const { MagicModal } = useModal();

  const {
    menuItem,
    setMenuItem,
    categoryWithMenuItem,
    setMenuItemImgFile,
    menuItemSampleImg,
    setMenuItemSampleImg,
  } = useMenuItemStore();

   // 썸네일 이미지 보여주기
   const handleChangeImg = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files[0] !== null) {
      const file = e.target.files[0];
      if (file && file.type.substring(0, 5) === 'image') {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        setMenuItemImgFile(file);
        reader.onloadend = async () => {
          setMenuItemSampleImg(reader.result as string);
        };
      } else {
        e.target.value = '';
        setMenuItemImgFile(null);
        setMenuItemSampleImg(menuItem.image_url ?? '');
      }
    }
  };

  // 메뉴 input handler
  const changeMenuItemHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, maxLength, name } = e.target;
    if (name === 'recommended') {
      let isCheckRecommended: boolean = false;

      const redcommendedNum = categoryWithMenuItem.menu_item.filter(item => item.recommended).length;

      if (redcommendedNum > 4 && !menuItem.recommended) {
        MagicModal.alert({ content: '추천 메뉴는 최대 5개입니다.' });
        return (isCheckRecommended = true);
      }

      if (!isCheckRecommended) setMenuItem({ ...menuItem, recommended: !menuItem.recommended });
    } else setMenuItem({ ...menuItem, [name]: value.slice(0, maxLength) });
  };

  return (
    <>
      <div className={styles['img-wrap']}>
        <label htmlFor="sampleImg"></label>
        <Image src={menuItemSampleImg} alt={menuItem.name ?? ''} width={220} height={220} />
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
          name="name"
          value={menuItem.image_url ?? ''}
          minLength={2}
          maxLength={20}
        />
      </div>
      <div className={styles['txt-wrap']}>
        <div className={styles['checkbox-wrap']}>
          <label htmlFor="recommended">추천메뉴</label>
          <input
            type="checkbox"
            onChange={changeMenuItemHandler}
            id="recommended"
            name="recommended"
            checked={menuItem.recommended}
          />
        </div>
        <div className={styles['input-wrap']}>
          <input
            type="text"
            onChange={changeMenuItemHandler}
            name="name"
            value={menuItem.name ?? ''}
            minLength={2}
            maxLength={20}
            placeholder="메뉴명"
          />
          <input
            type="number"
            onChange={changeMenuItemHandler}
            name="price"
            value={menuItem.price ?? ''}
            minLength={2}
            maxLength={20}
            placeholder="가격"
          />
          <input
            type="number"
            onChange={changeMenuItemHandler}
            name="remain_ea"
            value={menuItem.remain_ea ?? ''}
            minLength={2}
            maxLength={20}
            placeholder="수량"
          />
        </div>
        <MenuItemFormOption/>
      </div>
    </>
  )
}

export default MenuItemFormInput