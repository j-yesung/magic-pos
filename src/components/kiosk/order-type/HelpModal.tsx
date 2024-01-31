import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { useRef, useState } from 'react';
import styles from './styles/HelpModal.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import step1 from '/public/images/help/step1.webp';
import step2 from '/public/images/help/step2.webp';
import step3 from '/public/images/help/step3.webp';
import Image from 'next/image';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';
import CloseButton from '/public/icons/close.svg';
import { useModal } from '@/hooks/service/ui/useModal';
import clsx from 'clsx';

const HelpModal = ({ modalId }: { modalId?: string }) => {
  const helpSwiperRef = useRef<SwiperRef>(null);
  const [helpStep, setHelpStep] = useState(1);
  const { MagicModal } = useModal();

  const handleClickClose = () => {
    if (modalId) {
      MagicModal.hide(modalId);
    }
  };

  const handleClickNext = () => {
    helpSwiperRef.current?.swiper.slideNext();
    setHelpStep(prev => ++prev);
  };

  const handleClickPrev = () => {
    helpSwiperRef.current?.swiper.slidePrev();
    setHelpStep(prev => --prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>iOS, Google Chrome 기준 입니다.</h1>
        <button onClick={handleClickClose}>
          <CloseButton width={26} height={26} />
        </button>
      </div>
      <div>
        {helpStep < 3 && (
          <button className={clsx(styles.sliderButtons, styles.nextButton)} onClick={handleClickNext}>
            <MdOutlineNavigateNext size={30} />
          </button>
        )}

        {helpStep > 1 && (
          <button className={clsx(styles.sliderButtons, styles.prevButton)} onClick={handleClickPrev}>
            <MdOutlineNavigateBefore size={30} />
          </button>
        )}
      </div>

      <h1>{helpStep} 단계</h1>
      <Swiper spaceBetween={50} slidesPerView={1} ref={helpSwiperRef} className={styles.slideContainer}>
        <SwiperSlide className={styles.slideContent}>
          <Image src={step1} width={400} height={800} alt={'1단계'} />
        </SwiperSlide>
        <SwiperSlide className={styles.slideContent}>
          <Image src={step2} width={400} height={800} alt={'2단계'} />
        </SwiperSlide>
        <SwiperSlide className={styles.slideContent}>
          <Image src={step3} width={400} height={800} alt={'3단계'} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HelpModal;
