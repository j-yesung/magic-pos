import style from '@/components/error/styles/ErrorContainer.module.css';
import { HOME_PATH } from '@/data/url-list';
import useToast from '@/hooks/service/ui/useToast';
import useErrorState, { setErrorLink, setErrorMessage, setErrorSubMessage } from '@/shared/store/error';
import useKioskState from '@/shared/store/kiosk';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ErrorImage from '/public/images/error.svg';

const ErrorContainer = () => {
  const { title, message, subMessage, link } = useErrorState();
  const tableId = useKioskState(state => state.tableId);
  const storeId = useKioskState(state => state.storeId);
  const router = useRouter();
  const { query } = router;
  const { toast } = useToast();

  const onClickImage = () => {
    if (link) router.push(link);
    else router.push(HOME_PATH);
  };

  const getBackLink = () => {
    let link = `/kiosk/${storeId}`;
    if (tableId) link += `?tableId=${tableId}`;
    return link;
  };

  useEffect(() => {
    if (query.code) {
      setErrorMessage(query.code.toString());
    }
    if (query.message) {
      setErrorSubMessage(query.message.toString());
      setErrorLink(getBackLink());
    }
  }, [query]);

  useEffect(() => {
    setErrorLink(getBackLink());
    toast('에러가 발생했습니다! 마법봉을 클릭하여 되돌아가세요!', {
      type: 'danger',
      position: 'top-right',
      autoClose: 3000,
      showCloseButton: true,
    });
  }, []);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>{title}</h1>
      </div>
      <motion.div
        onClick={onClickImage}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.0 }}
        animate={{
          rotate: [0, 0, 3, 0, -3, 0],
        }}
        transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
      >
        <ErrorImage />
      </motion.div>
      <div className={style.messageContainer}>
        <h2>{message}</h2>
        <p>{subMessage}</p>
      </div>
    </div>
  );
};

export default ErrorContainer;
