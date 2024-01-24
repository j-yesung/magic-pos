import React, { useState } from 'react';
import styles from './styles/LanguageList.module.css';
import { useTranslation } from 'react-i18next';
import { FaCheck } from 'react-icons/fa6';

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
    id: 'lang-jp',
    text: '日本語',
  },
];

const LanguageList = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('lang-ko');

  const handleClickLanguage = (e: React.MouseEvent<HTMLLIElement>) => {
    const id = e.currentTarget.id;
    if (id) {
      setSelectedLanguage(id);
      i18n.changeLanguage(id.split('-')[1]);
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
