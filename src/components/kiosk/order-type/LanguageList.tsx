import React, { Dispatch, SetStateAction } from 'react';
import styles from './styles/LanguageList.module.css';
import { useTranslation } from 'next-i18next';
import { FaCheck } from 'react-icons/fa6';
import { setSelectedLanguage, useKioskState } from '@/shared/store/kiosk';
import { useRouter } from 'next/router';

interface LanguageListProps {
  setShowLanguageList: Dispatch<SetStateAction<boolean>>;
}

const LANGUAGE_LIST = [
  {
    id: 'lang-ko',
    text: '한국어',
  },
  {
    id: 'lang-en',
    text: 'English',
  },
  {
    id: 'lang-zh',
    text: '中文',
  },
  {
    id: 'lang-ja',
    text: '日本語',
  },
];

const LanguageList = ({ setShowLanguageList }: LanguageListProps) => {
  const { i18n } = useTranslation();
  const selectedLanguage = useKioskState(state => state.selectedLanguage);
  const storeId = useKioskState(state => state.storeId);
  const tableId = useKioskState(state => state.tableId);
  const router = useRouter();

  const handleClickLanguage = (e: React.MouseEvent<HTMLLIElement>) => {
    const id = e.currentTarget.id;
    if (id) {
      setSelectedLanguage(id);
      const lang = id.split('-')[1];
      i18n.changeLanguage(lang);
      setShowLanguageList(false);
      let newURL = `/kiosk/${storeId}`;

      if (tableId && tableId !== 'null') {
        newURL += `?tableId=${tableId}&lang=${lang}`;
      } else {
        newURL += `?lang=${lang}`;
      }

      router.push(newURL);
    }
  };

  return (
    <ul className={styles.container}>
      {LANGUAGE_LIST.map(language => (
        <li key={language.id} id={language.id} onClick={handleClickLanguage}>
          {selectedLanguage === language.id && <FaCheck size={13} />}
          <span>{language.text}</span>
        </li>
      ))}
    </ul>
  );
};

export default LanguageList;
