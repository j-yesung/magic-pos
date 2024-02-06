import { handleMetaImageException } from '@/components/platform/utility/usePlatformHelper';
import { getOpenGraphMetaImage } from '@/server/api/external/openGraph';
import usePlatFormState, { setAddPlatForm, setEditPlatForm, setPrevImg } from '@/shared/store/platform';
import { ChangeEvent, useEffect, useRef } from 'react';

const usePlatFormInputWithDebounce = ({ mode }: { mode: boolean }) => {
  const { addPlatForm, editPlatForm, prevImg } = usePlatFormState();
  const initialEditDebounce = useRef<boolean>(false);
  const changePlatFormCardText = (e: ChangeEvent<HTMLInputElement>) => {
    if (!mode) {
      setAddPlatForm(e);
    }
    if (mode) {
      setEditPlatForm(e);
    }
  };

  useEffect(() => {
    let debounce: NodeJS.Timeout;
    if (mode) return;

    if (!addPlatForm.file && addPlatForm.link_url.length >= 1 && !prevImg) {
      debounce = setTimeout(async () => {
        const extractedImage = await getOpenGraphMetaImage(addPlatForm?.link_url);
        const confirmedImageUrl = handleMetaImageException(extractedImage);
        usePlatFormState.setState(state => ({
          ...state,
          addPlatForm: {
            ...state.addPlatForm,
            metaImage: confirmedImageUrl,
          },
        }));
        setPrevImg(confirmedImageUrl);
      }, 150);
    }
    return () => clearTimeout(debounce);
  }, [addPlatForm.link_url]);

  useEffect(() => {
    let debounce: NodeJS.Timeout;
    if (!mode) return;
    //처음 이미지 추출이 실행이 되므로 useRef를 넣어 처음에 실행 안되게 함
    if (!initialEditDebounce.current) {
      initialEditDebounce.current = true;
      return;
    }
    if (!editPlatForm.file && editPlatForm.link_url.length >= 1 && !prevImg) {
      debounce = setTimeout(async () => {
        const extractedImage = await getOpenGraphMetaImage(editPlatForm.link_url);
        const confirmedImageUrl = handleMetaImageException(extractedImage);
        usePlatFormState.setState(state => ({
          ...state,
          editPlatForm: {
            ...state.editPlatForm,
            metaImage: confirmedImageUrl,
          },
        }));
        setPrevImg(confirmedImageUrl);
      }, 300);
    }

    return () => {
      clearTimeout(debounce);
    };
  }, [editPlatForm.link_url]);

  return { changePlatFormCardText };
};

export default usePlatFormInputWithDebounce;
