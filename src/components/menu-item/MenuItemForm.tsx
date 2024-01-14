import {
  downloadMenuItemUrl,
  removeMenuItem,
  removeMenuItemFromStorage,
  updateMenuItem,
  uploadMenuItem,
} from '@/server/api/supabase/menu-item';
import useMenuItemStore from '@/shared/store/menu-item';
import Image from 'next/image';
import { ChangeEvent } from 'react';
import styles from './styles/menu-item-form.module.css';

const MenuItemFormPage = () => {
  const {
    isShow,
    toggleShow,
    menuItem,
    setMenuItem,
    categoryWithMenuItem,
    updateMenuItemStore,
    removeMenuItemStore,
    menuItemImgFile,
    setMenuItemImgFile,
    menuItemSampleImg,
    setMenuItemSampleImg,
  } = useMenuItemStore();

  // 메뉴 input handler
  const changeMenuItemHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, maxLength, name } = e.target;
    if (name === 'recommended') {
      let recommendedNum: number = 0;
      let isCheckRecommended: boolean = false;

      if (!menuItem.recommended) {
        for (let i = 0; i < categoryWithMenuItem.menu_item.length; i++) {
          if (categoryWithMenuItem.menu_item[i].recommended) recommendedNum++;
          if (recommendedNum > 4) {
            alert('추천 메뉴는 최대 5개입니다.');
            return (isCheckRecommended = true);
          }
        }
      }

      if (!isCheckRecommended) setMenuItem({ ...menuItem, recommended: !menuItem.recommended });
    } else setMenuItem({ ...menuItem, [name]: value.slice(0, maxLength) });
  };

  // 메뉴 수정
  const submitupdateMenuItemHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let updateData = { ...menuItem };
    if (menuItemImgFile !== null) {
      await removeMenuItemFromStorage(menuItem);
      const uploadedMenuImage = await fetchNewMenuItemImgUrl();
      updateData = {
        ...menuItem,
        image_url: uploadedMenuImage,
      };
    }
    updateMenuItemStore(updateData);
    await updateMenuItem(updateData);
    toggleShow(false);
    setMenuItemImgFile(null);
  };

  // 메뉴 삭제
  const clickRemoveCategoryHandler = async () => {
    removeMenuItemStore(menuItem);
    setMenuItem({ ...menuItem, id: '', name: '', price: 0, remain_ea: 0 });
    await removeMenuItem(menuItem.id);
    toggleShow(false);
  };

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

  // 사진 업로드, 사진 URL 저장
  const fetchNewMenuItemImgUrl = async () => {
    const { data } = await uploadMenuItem(menuItem, getTodayDate(), menuItemImgFile!);
    const downloadedMenuImage = await downloadMenuItemUrl(menuItem, data.path.split('/')[3]);
    return downloadedMenuImage;
  };

  // 현재 시간 계산
  const getTodayDate = (): string => {
    const today = new Date();
    const formattedDate = today.toISOString();
    return formattedDate;
  };

  // 입력창 숨기기
  const clickFormHideHandler = () => {
    toggleShow(false);
    setMenuItem({ ...menuItem, id: '' });
  };

  return (
    <form
      onSubmit={submitupdateMenuItemHandler}
      className={isShow ? `${styles['wrap']} ${styles['active']}` : `${styles['wrap']}`}
    >
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
      </div>
      <div className={styles['btn-wrap']}>
        <button className={styles['update-btn']} type="submit">
          수정 완료
        </button>
        <button className={styles['delete-btn']} type="button" onClick={clickRemoveCategoryHandler}>
          메뉴 삭제
        </button>
      </div>
      <button className={styles['x-wrap']} type="button" onClick={clickFormHideHandler}>
        X
      </button>
    </form>
  );
};

export default MenuItemFormPage;
