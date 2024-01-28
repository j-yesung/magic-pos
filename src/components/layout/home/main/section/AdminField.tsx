import { MenuOptionShot, MenuShot, OrderCheckShot, ProdShot } from '@/data/screenshot-export';
import { useRef } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import styles from '../../styles/Section.module.css';

const ADMIN_INFO = [
  {
    id: 1,
    svg: <ProdShot />,
    title: '한 눈에 들어오는 직관적인 UI',
    desc: '우리 매장에 들어온 주문을 한 화면에서 전부 관리할 수 있어요.',
    caption: '매장 주문과 포장 주문을 직관적으로 나타내 빠르게 주문을 파악할 수 있답니다.',
  },
  {
    id: 2,
    svg: <OrderCheckShot />,
    title: '누가 먼저 주문하셨어요?',
    desc: '바쁜 매장, 어떤 주문을 먼저 처리해야 할까요?',
    caption: '매직포스에서 시간 순으로 나열된 주문내역을 보고 빠르게 주문을 관리해 보세요.',
  },
  {
    id: 3,
    svg: <MenuShot />,
    title: '매직포스는 눈 보다 빠르지',
    desc: '메뉴의 이름과 가격 설정은 물론, 수량과 다양한 옵션까지 추가해 보세요.',
    caption: '필요할 때, 언제든 쉽게 수정할 수 있어요.',
  },
  {
    id: 4,
    svg: <MenuOptionShot />,
    title: '따듯한 아이스 아메리카노는 이제 안녕',
    desc: '메뉴의 옵션을 다양하게 설정할 수 있어요.',
    caption: '헷갈리는 주문을 되물어볼 필요도 없고, 주문을 실수할 일도 없어지죠.',
  },
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
          modules={[Navigation, Pagination]}
          // modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          // autoplay={{
          //   delay: 5000,
          //   disableOnInteraction: false,
          // }}
          loop={true}
          ref={swiperRef}
        >
          {ADMIN_INFO.map(info => (
            <SwiperSlide key={info.id}>
              <div className={styles.slideScreen}>
                {info.svg}
                <div className={styles.info}>
                  <h1 className={styles.infoId}>{info.id}</h1>
                  <h3 className={styles.infoTitle}>{info.title}</h3>
                  <div className={styles.infoText}>
                    <p>{info.desc}</p>
                    <p>{info.caption}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
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
