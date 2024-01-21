import { useModal } from '@/hooks/modal/useModal';
import useMenuItemStore from '@/shared/store/menu-item';
import clsx from 'clsx';
import Image from 'next/image';
import { ChangeEvent } from 'react';
import { FaCheck } from 'react-icons/fa6';
import MenuItemFormOption from '../options/MenuItemFormOption';
import styles from '../styles/menu-item-form.module.css';

const MenuItemFormInput = () => {
  const { MagicModal } = useModal();
  const {
    sampleImage,
    menuItem,
    setMenuItem,
    categoryWithMenuItem,
    setMenuItemImgFile,
    menuItemSampleImg,
    setMenuItemSampleImg,
  } = useMenuItemStore();

  // 썸네일 이미지 보여주기
  const handleChangeImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files || [];
    if (fileList?.length !== 0) {
      const file = fileList[0];
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
    const { value, maxLength, name, type } = e.target;
    if (name === 'recommended') {
      let isCheckRecommended: boolean = false;

      const redcommendedNum = categoryWithMenuItem.menu_item.filter(item => item.recommended).length;

      if (redcommendedNum > 4 && !menuItem.recommended) {
        MagicModal.alert({ content: '추천 메뉴는 최대 5개입니다.' });
        return (isCheckRecommended = true);
      }

      if (!isCheckRecommended) setMenuItem({ ...menuItem, recommended: !menuItem.recommended });
    } else if (type === 'number') {
      const newValue = value.replace(/[^0-9]/g, '');
      if (newValue) setMenuItem({ ...menuItem, [name]: newValue.slice(0, maxLength) });
    } else {
      setMenuItem({ ...menuItem, [name]: value.slice(0, maxLength) });
    }
  };

  return (
    <>
      <div className={styles['img-txt-wrap']}>
        <div className={styles['img-wrap']}>
          <label htmlFor="sampleImg"></label>
          <Image
            src={menuItemSampleImg === '' ? sampleImage : menuItemSampleImg}
            alt={menuItem.name ?? 'Sample Image'}
            width={123}
            height={123}
          />
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
        </div>
        <div className={styles['txt-wrap']}>
          <div className={clsx(styles['input-wrap'], styles['bottom'])}>
            <p>
              <label className={styles['input-name']} htmlFor="name">
                메뉴명
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
                placeholder="메뉴명을 입력해주세요."
                required
              />
            </p>
          </div>
          <div className={clsx(styles['input-wrap'], styles['top'])}>
            <p>
              <label className={styles['input-name']} htmlFor="price">
                가격
              </label>
              <input
                type="number"
                className={styles['input']}
                onChange={changeMenuItemHandler}
                id="price"
                name="price"
                value={menuItem.price ?? ''}
                minLength={1}
                maxLength={20}
                placeholder="가격을 입력해주세요."
                required
              />
            </p>
            <p>
              <label className={styles['input-name']} htmlFor="remain_ea">
                수량
              </label>
              <input
                type="number"
                className={styles['input']}
                onChange={changeMenuItemHandler}
                name="remain_ea"
                value={menuItem.remain_ea ?? ''}
                minLength={1}
                maxLength={20}
                placeholder="수량을 입력해주세요."
                required
                pattern="[0-9]*"
              />
            </p>
          </div>
        </div>
      </div>
      <div className={styles['checkbox-wrap']}>
        <span className={styles['input-name']}>추천메뉴</span>
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
          이 메뉴를 추천 메뉴로 설정합니다.{' '}
        </label>
      </div>
      <div className={styles['line-wrap']}></div>
      <MenuItemFormOption />
    </>
  );
};

export default MenuItemFormInput;
