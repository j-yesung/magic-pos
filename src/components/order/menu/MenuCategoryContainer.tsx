import React, { Dispatch, SetStateAction } from 'react';
import { CategoryWithMenuItem } from '@/types/supabase';
import styles from './styles/MenuCategoryContainer.module.css';
import MenuCategory from '@/components/order/menu/MenuCategory';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual } from 'swiper/modules';

interface MenCategoryContainerProps {
  menuData: CategoryWithMenuItem;
  setSelectedCategory: Dispatch<SetStateAction<string | null>>;
  selectedCategory: string | null;
}

const MenuCategoryContainer = ({ menuData, selectedCategory, setSelectedCategory }: MenCategoryContainerProps) => {
  return (
    <div className={styles.container}>
      <Swiper
        modules={[Virtual]}
        spaceBetween={20}
        slidesPerView={3.5}
        centeredSlides={true}
        centeredSlidesBounds={true}
        slideToClickedSlide={true}
      >
        {menuData.map((category, index) => (
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
