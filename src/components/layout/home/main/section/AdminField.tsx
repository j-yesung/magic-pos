import { MenuOptionShot, MenuShot, OrderCheckShot, ProdShot } from '@/data/screenshot-export';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '../../styles/Section.module.css';

const SWIPER_IMAGES = [
  { id: 1, svg: <ProdShot /> },
  { id: 2, svg: <MenuShot /> },
  { id: 3, svg: <MenuOptionShot /> },
  { id: 4, svg: <OrderCheckShot /> },
];

const AdminField = () => {
  return (
    <section className={styles.adminBox}>
      <Swiper
        className={styles.swiperWrapper}
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        // navigation={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {SWIPER_IMAGES.map(item => (
          <SwiperSlide className={styles.sliderItem} key={item.id}>
            {item.svg}
          </SwiperSlide>
        ))}
        <button className="swiper-button-next" style={{ color: '#7433ff' }}></button>
        <button className="swiper-button-prev" style={{ color: '#7433ff' }}></button>
      </Swiper>
    </section>
  );
};

export default AdminField;
