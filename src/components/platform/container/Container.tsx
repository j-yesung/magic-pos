import Link from 'next/link';
import styles from './styles/container.module.css';
const Container = () => {
  return (
    <div className={styles.container}>
      <div className="card-container">
        <Link href={'https://zep.us/@nbcamp-3nd-React/25651j'} target={'_blank'}>
          내배켐
        </Link>
      </div>

      <form
        action=""
        onSubmit={e => {
          e.preventDefault();
        }}
        className={styles.form}
      >
        <div className={styles.inputWrapper}>
          <input name="link" type="text" placeholder="link를 넣어주세요" />
          <input name="title" type="text" placeholder="어디사이트인가요?" />
        </div>

        <button>등록</button>
      </form>
    </div>
  );
};

export default Container;
