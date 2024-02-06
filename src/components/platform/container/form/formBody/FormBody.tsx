import React from 'react';
import ImgForm from './imgForm/ImgForm';
import Input from './input/Input';
import styles from './styles/formBody.module.css';
const FormBody = ({ mode }: { mode: boolean }) => {
  return (
    <div className={styles.formBody}>
      <ImgForm mode={mode} />
      <Input mode={mode} />
    </div>
  );
};

export default React.memo(FormBody);
