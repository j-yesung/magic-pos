import { ADMIN_INFO } from '@/data/scroll-props';
import Image from 'next/image';
import { useRef } from 'react';
import { MdArrowForwardIos as NextArrow, MdArrowBackIos as PrevArrow } from 'react-icons/md';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import styles from '../../styles/Section.module.css';

const AdminField = () => {
  const swiperRef = useRef<SwiperRef>(null);

  const goNext = () => swiperRef?.current?.swiper.slideNext();
  const goPrev = () => swiperRef?.current?.swiper.slidePrev();

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
        >
          {ADMIN_INFO.map(info => (
            <SwiperSlide key={info.id}>
              <div className={styles.slideScreen}>
                <Image src={info.src} width={1370} height={700} alt={info.alt} priority />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.actionButton}>
          <PrevArrow className={styles.arrow} size={70} onClick={goPrev} />
          <NextArrow className={styles.arrow} size={70} onClick={goNext} />
        </div>
      </div>
    </section>
  );
};

export default AdminField;
