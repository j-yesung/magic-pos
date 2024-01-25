import Button from '@/components/common/Button';
import { downloadPlatFormImageUrl, insertPlatFormRow, uploadPlatFormImage } from '@/server/api/supabase/platform';
import {
  resetAddPlatForm,
  setAddDataToFetchPlatForm,
  setIsRegist,
  default as usePlatformStore,
} from '@/shared/store/platform';
import { AddPlatFormType } from '@/types/platform';
import clsx from 'clsx';
import moment from 'moment';
import { FormEvent } from 'react';
import ImgForm from './img/ImgForm';
import Input from './input/Input';
import styles from './styles/form.module.css';
import CloseButton from '/public/icons/close.svg';
const Form = () => {
  const addPlatform = usePlatformStore(state => state.addPlatForm);

  const submitAddCard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // image 경로로 사용하기 위해 createdAt를 넣었습니다.
    let updateData: AddPlatFormType = { ...addPlatform, createdAt: moment().toISOString() };
    /**useModal 사용하기 */
    if (!addPlatform.name.trim() || !addPlatform.link_url.trim()) return alert('써라');

    if (updateData.file) {
      await uploadPlatFormImage(updateData);
      const { publicUrl: image_url } = downloadPlatFormImageUrl(updateData);
      updateData = {
        ...addPlatform,
        image_url,
      };
      const { data } = await insertPlatFormRow(updateData);
      setAddDataToFetchPlatForm(data!);
    } else {
      console.log(updateData);
      const { file, createdAt, ...insertData } = updateData;
      console.log(insertData);
      const { data } = await insertPlatFormRow(updateData);
      setAddDataToFetchPlatForm(data!);
    }
    resetAddPlatForm();
    setIsRegist(false);
  };

  const closeAddFormModal = () => {
    setIsRegist(false);
    resetAddPlatForm();
  };

  return (
    <form onSubmit={submitAddCard} className={styles.formContainer}>
      <div className={styles.formHeader}>
        <p className={styles.formHeaderTitle}>새 플랫폼 등록</p>
        <button type="button" className={styles.closeButton} onClick={closeAddFormModal}>
          <CloseButton />
        </button>
      </div>
      <div className={styles.formWrapper}>
        <ImgForm />
        <div className={styles.inputWrapper}>
          <Input name="link_url" type="text" placeholder="link를 넣어주세요" className={styles.input} />
          <Input className={styles.input} name="name" type="text" placeholder="어디사이트인가요?" />
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <Button type="button" className={styles.button} onClick={closeAddFormModal}>
          취소
        </Button>
        <Button type="submit" className={clsx(styles.button, styles.addButton)}>
          등록
        </Button>
      </div>
    </form>
  );
};

export default Form;
