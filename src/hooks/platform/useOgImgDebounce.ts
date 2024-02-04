import { handleMetaImageException } from '@/components/platform/utility/usePlatformHelper';
import { getOpenGraphMetaImage } from '@/server/api/external/openGraph';
import usePlatFormState, { setPrevImg } from '@/shared/store/platform';
import { useEffect } from 'react';

const useOgImgDebounce = ({ mode }: { mode: boolean }) => {
  const { addPlatForm, editPlatForm } = usePlatFormState();

  useEffect(() => {
    let debounce: NodeJS.Timeout;
    if (mode) return;

    if (!addPlatForm.file && addPlatForm.link_url.length >= 1) {
      debounce = setTimeout(async () => {
        const extractedImage = await getOpenGraphMetaImage(addPlatForm?.link_url);
        const confirmedImageUrl = handleMetaImageException(extractedImage);
        usePlatFormState.setState(state => ({
          ...state,
          cardForm: {
            ...state.addPlatForm,
            metaImage: confirmedImageUrl,
          },
        }));
        setPrevImg(confirmedImageUrl);
      }, 300);
    }
    return () => clearTimeout(debounce);
  }, [addPlatForm.link_url]);

  useEffect(() => {
    let debounce: NodeJS.Timeout;
    if (!mode) return;
    if (!editPlatForm.file && editPlatForm.link_url.length >= 1) {
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

    return () => clearTimeout(debounce);
  }, [editPlatForm.link_url]);
};

export default useOgImgDebounce;
