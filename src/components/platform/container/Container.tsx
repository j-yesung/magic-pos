import { useState } from 'react';
import Card from './card/Card';
import Form from './form/Form';
import Button from './form/button/Button';
import styles from './styles/container.module.css';
const Container = () => {
  const [cardList, setCardList] = useState<
    {
      name: string;
      link_url: string;
      image_url?: string;
      store_id: string;
      id?: string;
    }[]
  >([]);

  const [isRegist, setIsRegist] = useState(false);

  return (
    <div className={styles.container}>
      <Button setIsRegist={setIsRegist} cardList={cardList} buttonType="regist" />

      <Card cardList={cardList} />

      {isRegist && <Form setCardList={setCardList} />}
    </div>
  );
};

export default Container;
