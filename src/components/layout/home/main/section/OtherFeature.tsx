import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '../../styles/Section.module.css';

const SWIPER_DUMMY = [
  { id: 1, title: '첫 번째 이미지' },
  { id: 2, title: '두 번째 이미지' },
  { id: 3, title: '세 번째 이미지' },
];

const OtherFeature = () => {
  return (
    <>
      <div className={styles.salesContents}>
        <Swiper
          className={styles.swiperWrapper}
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          loop={true}
        >
          {SWIPER_DUMMY.map(item => (
            <SwiperSlide className={styles.sliderItem} key={item.id}>
              <h1>{item.title}</h1>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default OtherFeature;
