import styles from '../../styles/Section.module.css';
import OtherFeature from './OtherFeature';

const Analysis = () => {
  return (
    <>
      <section className={styles.salesWrapper}>
        <div className={styles.salesTextArea}>
          <h1>꼼꼼한 매출 분석까지 도와드려요.</h1>
          <span>우리 가게는 언제 가장 매출이 높았는지 플랜을 세워보세요.</span>
        </div>

        <div className={styles.salsePictrueArea}>
          <div className={styles.salesContentsContainer}>
            <h1>매출 분석</h1>
            <OtherFeature />
          </div>
          <div className={styles.salesContentsContainer}>
            <h1>다른 기능</h1>
            <OtherFeature />
          </div>
        </div>
      </section>
    </>
  );
};

export default Analysis;
