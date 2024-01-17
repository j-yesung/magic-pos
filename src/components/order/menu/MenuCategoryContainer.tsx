import React, { Dispatch, SetStateAction } from 'react';
import { CategoryWithMenuItemWithStore } from '@/types/supabase';
import styles from './styles/MenuCategoryContainer.module.css';
import MenuCategory from '@/components/order/menu/MenuCategory';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual } from 'swiper/modules';
import { isEmptyObject } from '@/shared/helper';

interface MenCategoryContainerProps {
  menuData: CategoryWithMenuItemWithStore[];
  setSelectedCategory: Dispatch<SetStateAction<string | null>>;
  selectedCategory: string | null;
}

const MenuCategoryContainer = ({ menuData, selectedCategory, setSelectedCategory }: MenCategoryContainerProps) => {
  return (
    <div className={styles.container}>
      <Swiper
        modules={[Virtual]}
        spaceBetween={0}
        height={200}
        slidesPerView={3.5}
        centeredSlides={true}
        centeredSlidesBounds={true}
        slideToClickedSlide={true}
      >
        {!isEmptyObject(menuData) &&
          menuData?.map((category, index) => (
            <SwiperSlide key={category.id} virtualIndex={index}>
              <MenuCategory
                key={category.id}
                category={category}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MenuCategoryContainer;
