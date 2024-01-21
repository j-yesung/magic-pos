import useTableStore from '@/shared/store/table';
import styles from './styles/SideBarContainer.module.css';

const SideBarContainer = () => {
  const TABLE_STATUS = [
    {
      name: '사용',
      isDisabled: 0,
    },
    {
      name: '미사용',
      isDisabled: 1,
    },
  ];
  const { isDisabled, maxGuest, setMaxGuest, setIsDisabled } = useTableStore();

  const clickMaxGuestHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value <= 1) {
      setMaxGuest(1);
    } else {
      setMaxGuest(+e.target.value);
    }
  };
  const clickIsDisabledHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDisabled(+e.target.value);
  };
  return (
    <div className={styles['sideBarContainer']}>
      <div className={styles['sideBarTextbox']}>
        <label>최대인웓 수</label>
        <input type="number" value={`${maxGuest}`} onChange={clickMaxGuestHandler} />
      </div>
      <div className={styles['sideBarTextbox']}>
        {TABLE_STATUS.map(x => {
          return (
            <div key={x.name}>
              <label>{x.name}</label>
              <input
                type="radio"
                name="tableDisabled"
                value={`${x.isDisabled}`}
                onChange={clickIsDisabledHandler}
                checked={x.isDisabled === isDisabled ? true : false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBarContainer;
