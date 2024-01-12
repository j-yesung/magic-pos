import useMenuItemStore from '@/shared/store/menu-item';
import clsx from 'clsx';
import 'swiper/css';
import 'swiper/css/virtual';
import { Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './styles/menu-item-category.module.css';

const MenuItemCategoryPage = () => {
  const { setMenuItemList, categoryWithMenuItem, setCategoryWithMenuItem, categoryWithMenuItemList } =
    useMenuItemStore();

  // 카테고리 선택
  const clickChoiceCategoryHandler = (item: CategoryWithItemType) => {
    setCategoryWithMenuItem({
      ...categoryWithMenuItem,
      id: item.id,
      menu_item: item.menu_item,
    });
    setMenuItemList(item.menu_item);
  };
  return (
    <div className={styles['wrap']}>
      <Swiper
        modules={[Virtual]}
        slidesPerView={3.5}
        centeredSlides={true}
        centeredSlidesBounds={true}
        slideToClickedSlide={true}
        className={styles['swiper']}
      >
        {categoryWithMenuItemList.map((item, index) => {
          return (
            <SwiperSlide
              key={item.id}
              className={
                item.id === categoryWithMenuItem.id ? clsx(styles['slide'], styles['active']) : styles['slide']
              }
              virtualIndex={index}
            >
              <button type="button" onClick={() => clickChoiceCategoryHandler(item)}>
                {item.name}
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default MenuItemCategoryPage;
