import { ADMIN_INFO } from '@/data/scroll-props';
import Image from 'next/image';
import { useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import styles from '../../styles/Section.module.css';
import AdminFieldButton from './AdminFieldButton';
import AdminFieldItem from './AdminFieldItem';

const AdminField = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => swiperRef?.current?.swiper.slideNext();
  const goPrev = () => swiperRef?.current?.swiper.slidePrev();
  const changeSlideHandler = (swiper: SwiperType) => setActiveIndex(swiper.realIndex);

  return (
    <section className={styles.adminBox}>
      <div className={styles.wrapper}>
        <Swiper
          className={styles.swiperWrapper}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          ref={swiperRef}
          onSlideChange={changeSlideHandler}
        >
          {ADMIN_INFO.map(info => (
            <SwiperSlide key={info.id}>
              <div className={styles.slideScreen}>
                <Image src={info.src} width={1000} height={700} alt={info.alt} priority />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* 현재 활성화된 슬라이드에 해당하는 설명만 보여줌 */}
      <div className={styles.description}>
        <AdminFieldItem activeIndex={activeIndex} />
        <AdminFieldButton goPrev={goPrev} goNext={goNext} />
      </div>
    </section>
  );
};

export default AdminField;
