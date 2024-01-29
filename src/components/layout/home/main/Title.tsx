import styles from '../styles/Home.module.css';

const Title = () => {
  return (
    <div>
      <span className={styles.mainTitle}>세상의 모든 키오스크가 내 손 안에</span>
      <div className={styles.mainDescription}>
        <p>키오스크를 통해 주문하고 결제하세요.</p>
        <p>주문한 내역은 키오스크에서 확인할 수 있습니다.</p>
      </div>
    </div>
  );
};

export default Title;
