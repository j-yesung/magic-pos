import Item from './item/Item';
import styles from './styles/card.module.css';

interface CardPropsType {
  cardList: {
    name: string;
    link_url: string;
  }[];
}
const Card = ({ cardList }: CardPropsType) => {
  return (
    <div className={styles.cardContainer}>
      {cardList.length >= 1 &&
        cardList.map((card, idx) => {
          return <Item key={`${card.link_url + card.name + idx}`} link={card.link_url} title={card.name} />;
        })}
    </div>
  );
};

export default Card;
