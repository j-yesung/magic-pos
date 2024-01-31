import styles from '@/components/menu-item/styles/menu-item-category.module.css';
import useMenuItemStore, { setCategoryWithMenuItem, setMenuItemList } from '@/shared/store/menu/menu-item';
import { CategoryWithMenuItem } from '@/types/supabase';
import clsx from 'clsx';
import { useState } from 'react';
import 'swiper/css';
import { Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as swipers } from 'swiper/types';

const MenuItemCategoryPage = () => {
  const categoryWithMenuItem = useMenuItemStore(state => state.categoryWithMenuItem);
  const categoryWithMenuItemList = useMenuItemStore(state => state.categoryWithMenuItemList);
  const [onSwiperIndex, setOnSwiperIndex] = useState(0);

  // 카테고리 선택
  const clickChoiceCategoryHandler = (item: CategoryWithMenuItem) => {
    setCategoryWithMenuItem({
      ...categoryWithMenuItem,
      id: item.id,
      menu_item: item.menu_item,
    });
    setMenuItemList(item.menu_item);
  };

  const handleSlideChange = (swiper: swipers) => {
    // 슬라이드 변경 후에 호출됩니다.
    setOnSwiperIndex(swiper.activeIndex);
    // 마지막 슬라이드에 도달했을 때
    if (swiper.isEnd) {
      setOnSwiperIndex(-1);
    }
  };

  return (
    <div className={styles['wrap']}>
      <div className={styles['drag-info']}>※ 드래그 앤 드롭으로 메뉴 순서를 변경해보세요.</div>
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
            {/* 버튼으로 하면 슬라이드 기능이 에러 발생해서 p태그로 대체 */}
            <p>{item.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MenuItemCategoryPage;
