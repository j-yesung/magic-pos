import { Tables } from '@/types/supabase';
import Item from './item/Item';
import styles from './styles/card.module.css';

interface CardPropsType {
  fetchDataList: Tables<'platform'>[];
}
const Card = ({ fetchDataList }: CardPropsType) => {
  return (
    <div className={styles.cardContainer}>
      {fetchDataList.length >= 1 &&
        fetchDataList.map((card, idx) => {
          return <Item key={`${card.link_url! + card.name! + idx}`} link={card.link_url!} title={card.name!} />;
        })}
    </div>
  );
};

export default Card;
