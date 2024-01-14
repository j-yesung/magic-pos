import useMenuItemStore from '@/shared/store/menu-item';
// import { Navigation, Pagination, Scrollbar } from 'swiper';
import { CategoryWithMenuItem } from '@/types/supabase';
import clsx from 'clsx';
import 'swiper/css';
import { Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './styles/menu-item-category.module.css';

const MenuItemCategoryPage = () => {
  const { setMenuItemList, categoryWithMenuItem, setCategoryWithMenuItem, categoryWithMenuItemList } =
    useMenuItemStore();

  // 카테고리 선택
  const clickChoiceCategoryHandler = (item: CategoryWithMenuItem) => {
    setCategoryWithMenuItem({
      ...categoryWithMenuItem,
      id: item.id,
      menu_item: item.menu_item,
    });
    setMenuItemList(item.menu_item);
  };

  return (
    <div className={styles['wrap']}>
      <Swiper modules={[Virtual]} spaceBetween={10} slidesPerView={'auto'} className={styles['swiper']}>
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