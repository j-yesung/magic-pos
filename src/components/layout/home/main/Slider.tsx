import { data } from '@/data/dummy';
import styles from '../styles/Home.module.css';

const SliderArea = () => {
  const dataChunks = [data.slice(0, 10), data.slice(10, 20)];

  return (
    <section>
      {dataChunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex} className={styles.cardWrapper}>
          <ul className={chunkIndex === 0 ? styles.cardList : styles.cardListDynamic}>
            {chunk.map(list => (
              <li key={list.id + chunkIndex * 10}>
                <p>{list.icon}</p>
                <p>{list.title}</p>
                <p>{list.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default SliderArea;
