import { EnOrderType } from '@/types/sales';
import { MouseEvent } from 'react';
import styles from './styles/body.module.css';
import SelectGroup from '/public/icons/group-main.svg';
import DefaultGroup from '/public/icons/group-white.svg';
interface BodyPropsType {
  order_type: EnOrderType;
  setOrderType: React.Dispatch<React.SetStateAction<EnOrderType>>;
}
const Body = ({ order_type, setOrderType }: BodyPropsType) => {
  const clickOrderType = (e: MouseEvent<HTMLButtonElement>) => {
    setOrderType(e.currentTarget.name as EnOrderType);
  };
  return (
    <div className={styles.container}>
      <p className={styles.text}>다운로드할 매출을 선택해주세요</p>
      <div className={styles.selectContainer}>
        <div className={styles.selectWrapper}>
          {order_type === 'store' ? <SelectGroup width={21} height={21} /> : <DefaultGroup width={21} height={21} />}
          <button type="button" name="store" onClick={clickOrderType}>
            매장 매출
          </button>
        </div>
        <div className={styles.selectWrapper}>
          {order_type === 'togo' ? <SelectGroup width={21} height={21} /> : <DefaultGroup width={21} height={21} />}
          <button type="button" name="togo" onClick={clickOrderType}>
            포장 매출
          </button>
        </div>
      </div>
    </div>
  );
};

export default Body;
