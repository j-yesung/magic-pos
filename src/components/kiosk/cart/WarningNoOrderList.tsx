import styles from './styles/WarningNoOrderList.module.css';

const WarningNoOrderList = () => {
  return (
    <div className={styles.container}>
      <h1>담은 메뉴가 없습니다.</h1>
      <p>메뉴를 먼저 담아주세요! 😅</p>
    </div>
  );
};

export default WarningNoOrderList;
