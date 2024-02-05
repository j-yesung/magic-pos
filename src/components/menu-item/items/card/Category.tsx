import { DRAG_INFO } from '@/data/menu-item';
import useMenuItemStore, { setCategoryWithMenuItem, setMenuItemList } from '@/shared/store/menu/menu-item';
import { CategoryWithMenuItem } from '@/types/supabase';
import clsx from 'clsx';
import { useState } from 'react';
import 'swiper/css';
import { Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as swipers } from 'swiper/types';
import styles from '../../styles/menu-item-category.module.css';

const MenuItemCategoryPage = () => {
  const categoryWithMenuItem = useMenuItemStore(state => state.categoryWithMenuItem);
  const categoryWithMenuItemList = useMenuItemStore(state => state.categoryWithMenuItemList);
  const [onSwiperIndex, setOnSwiperIndex] = useState(0);

  // 카테고리 선택
  const clickChoiceCategoryHandler = (item: CategoryWithMenuItem) => {
    setCategoryWithMenuItem(item);
    setMenuItemList(item.menu_item);
  };

  // 슬라이드 위치 확인
  const handleSlideChange = (swiper: swipers) => {
    setOnSwiperIndex(swiper.activeIndex);
    if (swiper.isEnd) {
      setOnSwiperIndex(-1);
    }
  };

  return (
    <div className={styles['wrap']}>
      <div className={styles['drag-info']}>{DRAG_INFO.MENU_ITEM}</div>
      <Swiper
        modules={[Virtual]}
        spaceBetween={15}
        slidesPerView={'auto'}
        onSlideChange={handleSlideChange}
        className={clsx(styles.swiper, {
          [styles.before]: onSwiperIndex !== 0,
          [styles.after]: onSwiperIndex !== -1,
        })}
      >
        {categoryWithMenuItemList.map((item, index) => (
          <SwiperSlide
            key={item.id}
            virtualIndex={index}
            className={item.id === categoryWithMenuItem.id ? clsx(styles['slide'], styles['active']) : styles['slide']}
            onClick={() => clickChoiceCategoryHandler(item)}
          >
            <p>{item.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MenuItemCategoryPage;
