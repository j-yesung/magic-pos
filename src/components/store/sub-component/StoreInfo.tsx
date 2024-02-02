import styles from '../styles/StoreContents.module.css';

interface StoreInfoProps {
  storeInfo: { id: number; label: string; htmlFor: string; name: string | null }[];
}

const StoreInfo = ({ storeInfo }: StoreInfoProps) => {
  return (
    <>
      {storeInfo.map(info => {
        return (
          <div key={info.id} className={styles.infoContainer}>
            <label htmlFor={info.htmlFor}>{info.label}</label>
            <p>{info.name}</p>
          </div>
        );
      })}
    </>
  );
};

export default StoreInfo;
