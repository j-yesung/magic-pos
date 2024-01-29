import { convertNumberToWon } from '@/shared/helper';
import { IsTakeOutType } from '@/types/sales';
import NoneHistory from './NoneHistory';
import styles from './styles/salesProduct.module.css';
import CloseButton from '/public/icons/close.svg';
interface ProductInfo {
  products: IsTakeOutType[];
}
const SalesProduct = ({ products }: ProductInfo) => {
  return (
    <div className={styles.container}>
      {products ? (
        products.map(sale => {
          return (
            <div key={sale.product_name} className={styles.productContainer}>
              <div className={styles.productText}>
                <p className={styles.productName}>{sale.product_name}</p>
                <CloseButton width={14} height={14} />
                <p className={styles.productEa}>{sale.product_ea}</p>
              </div>
              <div>
                <p className={styles.sum}>{convertNumberToWon(sale.product_price).slice(0, -1) + '원'}</p>
              </div>
            </div>
          );
        })
      ) : (
        <NoneHistory />
      )}
    </div>
  );
};

export default SalesProduct;
