import { IsTakeOutType } from '@/types/sales';
import SalesProduct from './product/SalesProduct';

interface Info {
  store?: IsTakeOutType[] | null;
  toGo?: IsTakeOutType[] | null;
  type: boolean;
}

const ModalContents = ({ store, toGo, type }: Info) => {
  return (
    <div>
      {type && <SalesProduct products={store!} />}

      {!type && <SalesProduct products={toGo!} />}
    </div>
  );
};

export default ModalContents;
