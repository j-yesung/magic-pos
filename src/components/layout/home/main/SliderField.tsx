import { createDummyData } from '@/data/dummy';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import WateMark from './WateMark';

const SliderArea = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const data1 = createDummyData(40, 1);
  const data2 = createDummyData(40, 2);
  const dataChunks = [data1, data2];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded && (
        <section className={styles.sliderBox}>
          {dataChunks.map((chunk, chunkIndex) => (
            <div key={chunkIndex} className={styles.cardWrapper}>
              <ul className={chunkIndex === 0 ? styles.cardList : styles.cardListDynamic}>
                {chunk.map(review => (
                  <li key={review.id + chunkIndex * 10}>
                    <div className={styles.titleBox}>
                      <div className={styles.storeName}>
                        <span className={styles.icon}>{review.icon}</span>
                        <span className={styles.name}>{review.storeName}</span>
                      </div>
                      <div style={{ backgroundColor: review.bgColor }} className={styles.rvBg}>
                        <h1 style={{ color: review.fontColor }}>{review.nWeeksLater}주 사용 후기</h1>
                      </div>
                    </div>
                    <div className={styles.reviewBox}>
                      <p>{review.reviewContent}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <WateMark />
        </section>
      )}
    </>
  );
};

export default SliderArea;
