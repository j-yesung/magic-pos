import { useModal } from '@/hooks/modal/useModal';
import {
  addMenuOption,
  addUpsertMenuOptionDetail,
  downloadMenuItemUrl,
  removeMenuItem,
  removeMenuItemFromStorage,
  removeMenuOption,
  updateMenuItem,
  updateMenuOption,
  uploadMenuItem,
} from '@/server/api/supabase/menu-item';
import useMenuItemStore from '@/shared/store/menu-item';
import { MenuOptionWithDetail, Tables } from '@/types/supabase';
import moment from 'moment';
import Image from 'next/image';
import { ChangeEvent } from 'react';
import MenuOptionModal from './MenuOptionModal';
import styles from './styles/menu-item-form.module.css';

const MenuItemFormPage = () => {
  const { MagicModal } = useModal();
  const {
    isShow,
    toggleShow,
    menuItem,
    setMenuItem,
    categoryWithMenuItem,
    updateMenuItemStore,
    removeMenuItemStore,
    menuItemImgFile,
    setMenuItemImgFile,
    menuItemSampleImg,
    setMenuItemSampleImg,
    menuOption,
    setMenuOption,
    menuOptions,
    setMenuOptions,
    origineMenuOptions,
    changeMenuOptions,
    setChangeMenuOptions,
    updateChangeMenuOptionsStore,
    removeChangeMenuOptionsStore,
    setMenuOptionDetailList,
    setMenuOptionIndex,
  } = useMenuItemStore();

  // 메뉴 input handler
  const changeMenuItemHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, maxLength, name } = e.target;
    if (name === 'recommended') {
      let isCheckRecommended: boolean = false;

      const redcommendedNum = categoryWithMenuItem.menu_item.filter(item => item.recommended).length;

      if (redcommendedNum > 4 && !menuItem.recommended) {
        MagicModal.alert({ content: '추천 메뉴는 최대 5개입니다.' });
        return (isCheckRecommended = true);
      }

      if (!isCheckRecommended) setMenuItem({ ...menuItem, recommended: !menuItem.recommended });
    } else setMenuItem({ ...menuItem, [name]: value.slice(0, maxLength) });
  };

  // 메뉴 수정
  const submitupdateMenuItemHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let updateData = { ...menuItem };
    if (menuItemImgFile !== null) {
      await removeMenuItemFromStorage(menuItem);
      const uploadedMenuImage = await fetchNewMenuItemImgUrl();
      updateData = {
        ...menuItem,
        image_url: uploadedMenuImage,
      };
    }
    updateMenuItemStore(updateData);
    await updateMenuItem(updateData);
    toggleShow(false);
    setMenuItemImgFile(null);
    setMenuItem({ ...menuItem, id: '' });

    // 옵션 업데이트 부분
    removerOptionHandler();
    filterOptionHandler();
    setMenuOptions([]);
  };

  // 옵션 삭제시 필터링
  const removerOptionHandler = () => {
    const missingInMenuOptions = origineMenuOptions.filter(item =>
      menuOptions.some(menu => menu.menu_id === item.menu_id),
    );
    const missingItems = missingInMenuOptions.filter(item => !menuOptions.some(menu => menu.id === item.id));

    if (missingItems.length > 0) {
      missingItems.forEach(async item => {
        removeChangeMenuOptionsStore(item);
        await removeMenuOption(item.id);
      });
    }
  };

  //
  const filterOptionHandler = () => {
    const differences = findDifferences(menuOptions, origineMenuOptions);

    differences.map(async item => {
      if (item.id === '') {
        // 옵션 항목 supabase에 추가
        const newOption = {
          name: item.name,
          is_use: item.is_use,
          max_detail_count: item.max_detail_count,
          menu_id: item.menu_id,
        };
        const { data: optionData } = await addMenuOption(newOption);

        // 해당 data 받아서 그 option_id로 detail들 추가
        item.menu_option_detail.map(async option => {
          const addOptionForm: Omit<Tables<'menu_option_detail'>, 'id'> = {
            name: option.name,
            option_id: optionData[0].id,
            price: option.price,
          };
          await addUpsertMenuOptionDetail(addOptionForm);
        });
        const newOptionList: MenuOptionWithDetail = {
          id: optionData[0].id,
          name: optionData[0].name,
          is_use: optionData[0].is_use,
          max_detail_count: optionData[0].max_detail_count,
          menu_id: optionData[0].menu_id,
          menu_option_detail: item.menu_option_detail,
        };
        setChangeMenuOptions([...changeMenuOptions, { ...newOptionList }]);
      } else {
        // 옵션은 있는거니까 해당 detail을 옵션 아이디로 supabase 추가
        await updateMenuOption(item);
        const newOptionList: MenuOptionWithDetail = {
          id: item.id,
          name: item.name,
          is_use: item.is_use,
          max_detail_count: item.max_detail_count,
          menu_id: item.menu_id,
          menu_option_detail: [],
        };
        // 디테일 있는것도 있고 없는것도 있으니까 upsert
        item.menu_option_detail.map(async option => {
          let addOptionForm: Omit<Tables<'menu_option_detail'>, 'id'> | Tables<'menu_option_detail'>;

          option.id === ''
            ? (addOptionForm = {
                name: option.name,
                option_id: newOptionList.id,
                price: option.price,
              })
            : (addOptionForm = {
                id: option.id,
                name: option.name,
                option_id: newOptionList.id,
                price: option.price,
              });

          await addUpsertMenuOptionDetail(addOptionForm);
        });
        updateChangeMenuOptionsStore(prevMenuOptions =>
          prevMenuOptions.map(option =>
            option.id === item.id
              ? {
                  ...item,
                  name: item.name ?? '',
                  is_use: item.is_use ?? false,
                  max_detail_count: item.max_detail_count ?? 1,
                }
              : item,
          ),
        );
      }
    });
  };

  // 옵션 비교 함수
  const findDifferences = (optionNowArray: MenuOptionWithDetail[], optionOriginArray: MenuOptionWithDetail[]) => {
    const differentArray: MenuOptionWithDetail[] = [];

    optionNowArray.forEach(itemNum1 => {
      const itemNum2 = optionOriginArray.find(findItem => findItem.id === itemNum1.id);

      if (
        !itemNum2 ||
        itemNum1.is_use !== itemNum2.is_use ||
        itemNum1.name !== itemNum2.name ||
        itemNum1.max_detail_count !== itemNum2.max_detail_count ||
        !compareMenuOptions(itemNum1.menu_option_detail, itemNum2.menu_option_detail)
      ) {
        differentArray.push(itemNum1);
      }
    });

    return differentArray;
  };

  // 옵션 디테일 배열을 비교하는 함수
  const compareMenuOptions = (
    optionNowArray: Tables<'menu_option_detail'>[],
    optionOriginArray: Tables<'menu_option_detail'>[],
  ) => {
    const newItems = [];

    optionNowArray.forEach(itemNum1 => {
      const itemNum2 = optionOriginArray.find(item => item.name === itemNum1.name);

      if (!itemNum2) {
        newItems.push(itemNum1);
      }
    });

    return newItems.length === 0; // 반환 값이 true이면 두 배열이 같다는 것을 의미
  };

  // 메뉴 삭제
  const clickRemoveCategoryHandler = async () => {
    removeMenuItemStore(menuItem);
    setMenuItem({ ...menuItem, id: '', name: '', price: 0, remain_ea: 0 });
    await removeMenuItem(menuItem.id);
    toggleShow(false);
  };

  // 썸네일 이미지 보여주기
  const handleChangeImg = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files[0] !== null) {
      const file = e.target.files[0];
      if (file && file.type.substring(0, 5) === 'image') {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        setMenuItemImgFile(file);
        reader.onloadend = async () => {
          setMenuItemSampleImg(reader.result as string);
        };
      } else {
        e.target.value = '';
        setMenuItemImgFile(null);
        setMenuItemSampleImg(menuItem.image_url ?? '');
      }
    }
  };

  // 사진 업로드, 사진 URL 저장
  const fetchNewMenuItemImgUrl = async () => {
    const { data } = await uploadMenuItem(menuItem, getTodayDate(), menuItemImgFile!);
    const downloadedMenuImage = await downloadMenuItemUrl(menuItem, data.path.split('/')[3]);
    return downloadedMenuImage;
  };

  // 현재 시간 계산
  const getTodayDate = (): string => {
    const formattedDate = moment().toISOString();
    return formattedDate;
  };

  // 입력창 숨기기
  const clickFormHideHandler = () => {
    toggleShow(false);
    setMenuItem({ ...menuItem, id: '' });
  };

  // 옵션 추가
  const clickAddOptionHandler = async () => {
    const newOption: MenuOptionWithDetail = {
      id: '',
      is_use: false,
      menu_id: menuItem.id,
      name: '',
      menu_option_detail: [],
      max_detail_count: 1,
    };
    setMenuOptionDetailList([]);
    setMenuOption(newOption);
    setMenuOptionIndex(-1);
    MagicModal.fire(<MenuOptionModal />);
  };

  // 옵션 수정
  const clickUpdateOptionHandler = (item: MenuOptionWithDetail, index: number) => {
    setMenuOptionDetailList(item.menu_option_detail);
    setMenuOption({
      ...menuOption,
      name: menuOptions[index].name,
      is_use: menuOptions[index].is_use,
      max_detail_count: menuOptions[index].max_detail_count,
      id: menuOptions[index].id,
    });
    setMenuOptionIndex(index);
    MagicModal.fire(<MenuOptionModal />);
  };

  return (
    <form
      onSubmit={submitupdateMenuItemHandler}
      className={isShow ? `${styles['wrap']} ${styles['active']}` : `${styles['wrap']}`}
    >
      <div className={styles['img-wrap']}>
        <label htmlFor="sampleImg"></label>
        <Image src={menuItemSampleImg} alt={menuItem.name ?? ''} width={220} height={220} />
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          id="sampleImg"
          name="sampleImg"
          onChange={handleChangeImg}
        />
        <input
          type="text"
          onChange={changeMenuItemHandler}
          name="name"
          value={menuItem.image_url ?? ''}
          minLength={2}
          maxLength={20}
        />
      </div>
      <div className={styles['txt-wrap']}>
        <div className={styles['checkbox-wrap']}>
          <label htmlFor="recommended">추천메뉴</label>
          <input
            type="checkbox"
            onChange={changeMenuItemHandler}
            id="recommended"
            name="recommended"
            checked={menuItem.recommended}
          />
        </div>
        <div className={styles['input-wrap']}>
          <input
            type="text"
            onChange={changeMenuItemHandler}
            name="name"
            value={menuItem.name ?? ''}
            minLength={2}
            maxLength={20}
            placeholder="메뉴명"
          />
          <input
            type="number"
            onChange={changeMenuItemHandler}
            name="price"
            value={menuItem.price ?? ''}
            minLength={2}
            maxLength={20}
            placeholder="가격"
          />
          <input
            type="number"
            onChange={changeMenuItemHandler}
            name="remain_ea"
            value={menuItem.remain_ea ?? ''}
            minLength={2}
            maxLength={20}
            placeholder="수량"
          />
        </div>
        {menuOptions ? (
          <div className={styles['option-wrap']}>
            {menuOptions.map((item, index) => (
              <button type="button" key={index} onClick={() => clickUpdateOptionHandler(item, index)}>
                {item.name}
              </button>
            ))}
            <button type="button" onClick={clickAddOptionHandler}>
              +
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className={styles['btn-wrap']}>
        <button className={styles['update-btn']} type="submit">
          수정 완료
        </button>
        <button className={styles['delete-btn']} type="button" onClick={clickRemoveCategoryHandler}>
          메뉴 삭제
        </button>
      </div>
      <button className={styles['x-wrap']} type="button" onClick={clickFormHideHandler}>
        X
      </button>
    </form>
  );
};

export default MenuItemFormPage;
