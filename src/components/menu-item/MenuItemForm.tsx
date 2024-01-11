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
    sampleImage,
    isShow,
    toggleShow,
    menuItem,
    setMenuItem,
    menuItemList,
    setMenuItemList,
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
    setMenuItem({ ...menuItem, [name]: value.slice(0, maxLength) });
  };

  // 메뉴 수정
  const submitupdateMenuItemHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newImgUrl = { ...menuItem };
    if (menuItemImgFile !== null) {
      await removeMenuItemFromStorage(menuItem);
      const uploadedMenuImage = await fetchNewMenuItemImgUrl();
      newImgUrl = {
        ...menuItem,
        image_url: uploadedMenuImage,
      };
    }
    updateMenuItemStore(newImgUrl);
    await updateMenuItem(newImgUrl);
    toggleShow(false);
  };

  // 메뉴 삭제
  const clickRemoveCategoryHandler = async () => {
    removeMenuItemStore(menuItem);
    setMenuItem({ ...menuItem, id: '', name: '', price: 0, remain_ea: 0 });
    await removeMenuItem(menuItem.id);
    toggleShow(false);
  };

  // 미리보기 이미지 보여주기
  const handleChangeImg = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
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
        setMenuItemSampleImg(menuItem.image_url);
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
    const customToday = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}-${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`;
    return customToday;
  };

  return (
    <form
      onSubmit={submitupdateMenuItemHandler}
      className={isShow ? `${styles['wrap']} ${styles['active']}` : `${styles['wrap']}`}
    >
      <h3>메뉴 사진</h3>
      <Image src={menuItemSampleImg} alt={menuItem.name} width={200} height={200} />
      <label htmlFor="mainImg" className="writeLable"></label>
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        id="mainImg"
        name="mainImg"
        onChange={handleChangeImg}
        className="writeFile"
      />
      <input
        type="text"
        onChange={changeMenuItemHandler}
        name="name"
        value={menuItem.image_url}
        minLength={2}
        maxLength={20}
      />
      <button onClick={fetchNewMenuItemImgUrl}>사진 업로드</button>
      <h3>메뉴 명</h3>
      <input
        type="text"
        onChange={changeMenuItemHandler}
        name="name"
        value={menuItem.name}
        minLength={2}
        maxLength={20}
      />
      <h3>메뉴 가격</h3>
      <input
        type="number"
        onChange={changeMenuItemHandler}
        name="price"
        value={menuItem.price}
        minLength={2}
        maxLength={20}
      />
      <h3>메뉴 수량</h3>
      <input
        type="number"
        onChange={changeMenuItemHandler}
        name="remain_ea"
        value={menuItem.remain_ea}
        minLength={2}
        maxLength={20}
      />
      {/* <h3>추천 메뉴</h3>
      <input
        type="checkbox"
        onChange={changeMenuItemHandler}
        name="remain_ea"
        value={menuItem.remain_ea}
        minLength={2}
        maxLength={20}
      /> */}

      <div>
        <button className={styles['update-btn']} type="submit">
          수정 완료
        </button>
        <button className={styles['delete-btn']} type="button" onClick={clickRemoveCategoryHandler}>
          메뉴 삭제
        </button>
      </div>
    </form>
  );
};

export default MenuItemFormPage;
