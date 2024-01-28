import { MenuOptionShot, MenuShot, OrderCheckShot, ProdShot } from '@/data/screenshot-export';
import { adminDescription } from '@/data/scroll-props';
import { useRef } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import styles from '../../styles/Section.module.css';

const ADMIN_INFO = [
  { id: 1, svg: <ProdShot /> },
  { id: 2, svg: <OrderCheckShot /> },
  { id: 3, svg: <MenuShot /> },
  { id: 4, svg: <MenuOptionShot /> },
];
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
          {ADMIN_INFO.map(info => {
            const matchedInfo = adminDescription.find(item => item.id === info.id);
            return (
              <SwiperSlide key={info.id}>
                <div className={styles.slideScreen}>
                  {info.svg}
                  {matchedInfo && (
                    <div className={styles.info}>
                      <h1 className={styles.infoId}>{matchedInfo.id}</h1>
                      <h3 className={styles.infoTitle}>{matchedInfo.title}</h3>
                      <div className={styles.infoText}>
                        <p>{matchedInfo.desc}</p>
                        <p>{matchedInfo.caption}</p>
                      </div>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className={styles.actionButton}>
          <MdArrowBackIos className={styles.arrow} size={70} onClick={goPrev} />
          <MdArrowForwardIos className={styles.arrow} size={70} onClick={goNext} />
        </div>
      </div>
    </section>
  );
};

export default AdminField;
